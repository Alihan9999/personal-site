import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
