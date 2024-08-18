import Home from "./Components/Home";
import { Dashboard } from "./Components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="bg-gray-800/20 w-full h-full selection:text-white selection:bg-black">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
