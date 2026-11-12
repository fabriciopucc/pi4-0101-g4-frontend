import { Outlet } from "react-router-dom";
import MessageBox from './components/MessageBox';
import useRotas from "./hooks/useRotas";
import PrivatePage from "./pages/custom/PrivatePage";

function App() {

  const {verificarSeRotaEPrivada} = useRotas();

  return (
    <>

      <MessageBox/>
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