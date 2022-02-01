import { useRoutes } from 'react-router-dom';
import routers from './router/index';

function App() {
  const routersElement = useRoutes(routers)
  return (
    <>
      { routersElement }
    </>
  );
}

export default App;
