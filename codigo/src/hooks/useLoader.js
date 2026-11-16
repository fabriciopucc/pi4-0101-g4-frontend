import { LoaderContext } from "@/contexts/LoaderContext";
import { useContext} from "react"

const useLoader = () => {

  const {visibilidadeCardLoader, exibirCardLoader, esconderCardLoader} = useContext(LoaderContext);
  return{visibilidadeCardLoader, exibirCardLoader, esconderCardLoader};
}

export default useLoader;