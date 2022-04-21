import{ Suspense } from 'react'
import { useRoutes } from 'react-router-dom';
import PageSpin from './components/pageSpin';
import routers from './router/index';

function App() {
  const routersElement = useRoutes(routers)
  return (
    <Suspense fallback={<PageSpin />}>
      { routersElement }
    </Suspense>
  );
}

export default App;
