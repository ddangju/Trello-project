import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DragDropPage from "../pages/DragDropPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <DragDropPage /> }],
  },
]);

export default router;
