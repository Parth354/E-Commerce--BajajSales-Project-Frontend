import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from '../store/store.js';
import Registeration from '../pages/register.jsx';
import { AuthLayout } from './components/index.js'
import Login from '../pages/login.jsx';
import Home from '../pages/Home.jsx';
import Seller from '../pages/Seller.jsx';
import AddProducts from '../pages/addProduct.jsx';
import SellerDashBoard from '../pages/SellerDashboard.jsx';
import Seller_Products from '../pages/seller_Products.jsx';
import ProductPage from '../pages/ProductPage.jsx';
import Sl_Login from '../pages/Sl_Login.jsx';
import Cart from '../pages/cart.jsx';
import Category from '../pages/CategoryPage.jsx';
import UserDashboard from '../pages/userDashboard.jsx';
import ChangePassword from '../pages/changePassword.jsx';
import OrderStatus from '../pages/orderStatus.jsx';
import Checkout from '../pages/checkout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: "/product/:slug",
        element: <ProductPage />,
    },
    {
      path: "/product/category/:item",
      element: <Category />,
  },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Registeration />
          </AuthLayout>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <AuthLayout authentication={false} slug='/user-dashboard'>
            <UserDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/change-password",
        element: (
          <AuthLayout authentication={false} slug='/change-password'>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "/user-status",
        element: (
          <AuthLayout authentication={false} slug='/user-status'>
            <Registeration />
          </AuthLayout>
        ),
      },
      {
        path: "/order-status",
        element: (
            <OrderStatus />
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/checkout",
        element: (
          <AuthLayout authentication={false} slug="/checkout">
            <Checkout />
          </AuthLayout>
        ),
      },
    ]
  },
  {
    path: "/seller-register",
    element: <Seller />,
  },
  {
    path: "/seller-login",
    element: <Sl_Login />,
  },
  {
    path: "/seller-dashboard",
    element: (
      <AuthLayout authentication={false}>
        <SellerDashBoard />
      </AuthLayout>
    ),
    children: [
      {
        path: "/seller-dashboard/",
        element: <Seller_Products />
      },
      {
        path: "/seller-dashboard/addProducts",
        element: <AddProducts />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
