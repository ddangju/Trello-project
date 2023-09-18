import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainPage from "../components/test/Main";
// import DragDropPage from "../pages/DragDropPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [{ path: "/", element: <DragDropPage /> }],
    children: [{ path: "/", element: <MainPage /> }],
  },
]);

export default router;
