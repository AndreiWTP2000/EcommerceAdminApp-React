import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./components/authorization/Login";
import Admin from "./components/admin-pages/Admin";
import MainLayout from "./components/MainLayout";

import ProductsView from "./components/admin-pages/admin-views/ProductsView";
import OrdersView from "./components/admin-pages/admin-views/OrdersView";
import DashboardView from "./components/admin-pages/admin-views/DashboardView";
import AdminView from "./components/admin-pages/admin-views/AdminView";
import NewItem from "./components/admin-pages/products-pages/NewItem";
import NotFound from "./components/NotFound";
import EditModal from "./components/admin-pages/products-pages/EditModal";
import NewOrder from "./components/admin-pages/orders-pages/NewOrder";
import EditOrder from "./components/admin-pages/orders-pages/EditOrder";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {!authToken ? (
          <Route index element={<Login />} />
        ) : (
          <Route path="/" element={<Admin />}>
            <Route index element={<AdminView />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="products" element={<ProductsView />}>
              <Route path="edit/:id" element={<EditModal />} />
            </Route>
            <Route path="products/new-item" element={<NewItem />} />
            <Route path="orders" element={<OrdersView />}>
              <Route path="new-order" element={<NewOrder />} />
              <Route path="edit/:id" element={<EditOrder />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<NotFound authToken={authToken} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
