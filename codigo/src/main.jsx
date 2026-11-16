import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/public/Home/index.jsx";
import Cadastro from "./pages/public/Cadastro/index.jsx";
import Login from "./pages/public/Login/index.jsx";
import Perfil from "./pages/private/Perfil/index.jsx";
import { MessageBoxProvider } from "./contexts/MesageBoxContext.jsx";
import { SessaoProvider } from "./contexts/SessaoContext";
import { LoaderProvider } from "./contexts/LoaderContext";
import Avaliar from "./pages/private/Avaliar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/avaliar/:id_prestador",
        element: <Avaliar/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      }
    ]
  }
]);


createRoot(document.getElementById("root")).render(
  <SessaoProvider>
    <MessageBoxProvider>
      <LoaderProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </LoaderProvider>
    </MessageBoxProvider>
  </SessaoProvider>
);
