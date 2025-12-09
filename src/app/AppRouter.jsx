import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Subscription from "../pages/Subscription";
import Invoice from "../pages/Invoicelist";
import Createinvoice from "../pages/Createinvoice";
import AddProduct from "../pages/products/AddProduct";
import ProductList from "../pages/products/ProductList";
import ActiveProducts from "../pages/products/ActiveProducts";
import EditProduct from "../pages/products/EditProduct";




export default function AppRouter() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="create-invoice" element={<Createinvoice />} />
            <Route path="invoice-list" element={<Invoice />} />
            <Route path="subscription" element={<Subscription />} />
            {/* Product Routes */}
            <Route path="products/add-product" element={<AddProduct />} />
            <Route path="products/product-list" element={<ProductList />} />
            <Route path="products/active-products" element={<ActiveProducts />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
