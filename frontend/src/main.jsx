import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store/store.js";
import App from "./App.jsx";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/product/ProductDetails.jsx";
import Products from "./component/product/Products.jsx";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound.jsx";

const stripeApiKey =
  "";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:keyword", element: <Products /> },
      { path: "/login", element: <LoginSignUp /> },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/update",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/password/update",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/password/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "/Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shipping",
        element: (
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/confirm",
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/process/payment",
        element: { stripeApiKey } && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          </Elements>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute isAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product",
        element: (
          <ProtectedRoute isAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute isAdmin={true}>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/order/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/user/:id",
        element: (
          <ProtectedRoute isAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/reviews",
        element: (
          <ProtectedRoute isAdmin={true}>
            <ProductReviews />
          </ProtectedRoute>
        ),
      },
      // Catch-all route for undefined paths
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE,
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} className="alert">
      <RouterProvider router={router} />
    </AlertProvider>
  </Provider>
);
