import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "../AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import UserManagement from "../pages/UserManagement";
import Orders from "../pages/Orders";
import Analytics from "../pages/Analytics";
import Products from "../pages/Products";
import Transactions from "../pages/Transactions";
import Enquiries from "../pages/Enquiries";
import OverallVisitorTrends from "../components/OverallVisitorTrends";
// import Login from "../pages/Login";
import CustomerDetail from "../pages/CustomerDetail";
import Blog from "../pages/Blog";
import Gifts from "../pages/Gifts";
import Login from "../pages/Login";
import AdminProtector from "./AdminProtector";
import GetUserOrdersDetail from "../pages/GetUserOrdersDetail";
import AddProduct from "../pages/AddProduct";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Start app → go to login */}
      {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Pages */}
      <Route path="/" element={<AdminProtector compo={<AdminLayout />} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/products/add" element={<AddProduct />} />
        <Route path="admin/products/edit/:id" element={<AddProduct />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="customer-detail" element={<CustomerDetail />} />
        <Route path="customerdetail/:orderId" element={<CustomerDetail />} />
        {/* <Route path="getuserordersdetail" element={<GetUserOrdersDetail />} /> */}
        <Route path="getuserordersdetail/:userId" element={<GetUserOrdersDetail />} />

        <Route path="overallVisitorTrends" element={<OverallVisitorTrends />} />
        <Route path="blog" element={<Blog />} />
        <Route path="gifts" element={<Gifts />} />
      </Route>

    </Routes>

  );
};

export default AppRoutes;
