import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Suspense } from "react";
import { Loader } from "./components/loader/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
