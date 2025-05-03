import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./paged/auth/login";
import AuthRegister from "./paged/auth/register";
import AdminLayout from "./components/admin-view/adminLayout";
import AdminDashboard from "./paged/admin-view/dashboard";
import AdminProducts from "./paged/admin-view/product";
import AdminOrders from "./paged/admin-view/orders";
import AdminFeatures from "./paged/admin-view/features";
import ShopingLayout from "./components/shopping view/shopinglayout";
import NotFound from "./paged/notfound/notfound";
import ShopingHome from "./paged/shoping-view/home";
import ShopingListing from "./paged/shoping-view/listing";
import ShopingCheckout from "./paged/shoping-view/checkout";
import ShopingAccount from "./paged/shoping-view/account";
import CheckAuth from "./components/common-/check-auth";
import UnauthPage from "./paged/unauthpage/unauthpage";
import PaypalReturnPage from "./paged/shoping-view/paypal-return";
import PaymentSuccessPage from "./paged/shoping-view/payment-success";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";


import Wishlist from "./paged/shoping-view/wishlist"; // wishlist page
import SearchProducts from "./paged/shoping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full h-screen bg-black" />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Routes>
      <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        // Authentication pages
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        // Admin pages
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        // Shoping pages
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopingHome />} />
          <Route path="listing" element={<ShopingListing />} />
          <Route path="checkout" element={<ShopingCheckout />} />
          <Route path="account" element={<ShopingAccount />} />
          //wishlist
          <Route path="wishlist" element={<Wishlist />} />
          //payment
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts/>} />
        </Route>
        // Unauthenticated page
        <Route path="unauthpage" element={<UnauthPage />} />
        // Not found page
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Common footer */}
    </div>
  );
}

export default App;
