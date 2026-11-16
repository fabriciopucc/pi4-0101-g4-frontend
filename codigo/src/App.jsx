import { Outlet } from "react-router-dom";
import MessageBox from './components/utils/MessageBox';
import useRotas from "./hooks/useRotas";
import PrivatePage from "./pages/custom/PrivatePage";
import CardLoader from "./components/utils/CardLoader";

function App() {

  const {verificarSeRotaEPrivada} = useRotas();

  return (
    <>
      <MessageBox/>
      <CardLoader/>

      {
        verificarSeRotaEPrivada() ? (
          <PrivatePage>
            <Outlet/>
          </PrivatePage>
        ) : (
          <Outlet/>
        )
      }
    </>
  );
}
export default App;