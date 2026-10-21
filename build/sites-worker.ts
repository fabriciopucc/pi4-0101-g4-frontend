import { api, listing } from "../lib/api";
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

export default {
  fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    const path=new URL(request.url).pathname;
    if(path==='/api/live' && request.headers.get('Upgrade')?.toLowerCase()==='websocket'){
      if(request.headers.get('Origin')!==new URL(request.url).origin)return new Response('Origem inválida',{status:403});
      const pair=new WebSocketPair(); const [client,server]=Object.values(pair); server.accept();
      let busy=false;
      server.addEventListener('message',async(e)=>{if(e.data!=='sync'||busy)return;busy=true;try{server.send(JSON.stringify({providers:await listing((env as any).DB)}));}catch{server.send(JSON.stringify({error:'Atualização indisponível'}));}finally{busy=false;}});
      return new Response(null,{status:101,webSocket:client});
    }
    if(path.startsWith('/api/'))return api(request,env);
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    return runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
  },
};
