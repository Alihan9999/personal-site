import { LazyMotion, domAnimation } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <RouterProvider router={router} />
    </LazyMotion>
  );
}

export default App;
