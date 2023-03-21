import { createBrowserRouter } from "react-router-dom";

import Layout from "./component/Layout";
import ListPage from "./component/ListPage";
import EditPage from "./component/EditPage";
import NotFound from "./component/NotFound";
// import { getList, getOne } from "./services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <ListPage />,
        // loader: async () => {
        //   return getList();
        // },
      },
      {
        path: "/edit/:id",
        element: <EditPage pageEdit />,
        // loader: async ({ params }) => {
        //   return getOne(params.id);
        // },
      },
      {
        path: "/new",
        element: <EditPage pageNew />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
