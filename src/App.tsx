import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import NewSecret from "./components/NewSecret";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/new",
        element: <NewSecret />
      },
      {
        path: "/edit/:id",
        element: <NewSecret isEdit  />
      }
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
