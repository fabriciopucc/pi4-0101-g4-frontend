import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {

  const [visibilidadeCardLoader, setVisibilidadeCardLoader] = useState(false);
  
    const exibirCardLoader = () => {
     setVisibilidadeCardLoader(true);
    }
  
    const esconderCardLoader = () => {
      setVisibilidadeCardLoader(false);
    }

    return(
      <LoaderContext.Provider
        value={{visibilidadeCardLoader, exibirCardLoader, esconderCardLoader}}
      >
        {children}
      </LoaderContext.Provider>
    );

}