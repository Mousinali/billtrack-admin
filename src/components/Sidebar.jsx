import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import adminLogo from "../assets/logo/favicon.png";

export default function Sidebar() {
  const [openProducts, setOpenProducts] = useState(false);

  const location = useLocation();
  const isProductsRoute = location.pathname.startsWith("/products");


  useEffect(() => {
    if (isProductsRoute) setOpenProducts(true);
  }, [isProductsRoute]);

  const item =
    "flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer transition-all relative";

  const leftItem = "flex items-center gap-3 text-[16px]";

  return (
    <aside className="hidden md:flex w-75 flex-col bg-white border-r border-slate-200 px-4  relative z-[99]">

      {/* TOP LOGO */}
      <div className="h-16 flex py-2 mb-4 items-center border-b border-slate-200">
        <img
          src={adminLogo}
          alt="Admin Logo"
          className="h-10 w-10 rounded-lg border border-slate-200"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold text-slate-900">BillTrack</p>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      <div className="space-y-1">

        {/* DASHBOARD */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-dashboard-3-line text-lg mt-0.5"></i>
            <span>Dashboard</span>
          </div>
        </NavLink>

        {/* PRODUCTS DROPDOWN BUTTON */}
        <button
          onClick={() => setOpenProducts(!openProducts)}
          className={`
            ${item} w-full mb-0 transition-all
            ${openProducts || isProductsRoute
              ? "bg-slate-100 border border-slate-200 text-slate-800"
              : "text-slate-700 hover:bg-slate-100 border border-transparent"
            }
          `}
        >
          <div className={leftItem}>
            <i className="ri-price-tag-3-line text-lg mt-0.5"></i>
            <span>Products</span>
          </div>

          <i
            className={`
              ri-arrow-down-s-line transition-all
              ${openProducts || isProductsRoute ? "rotate-180 text-[#EA6B23]" : ""}
            `}
          ></i>
        </button>

        {/* PRODUCTS SUBMENU */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${openProducts || isProductsRoute ? "max-h-40 mt-1" : "max-h-0"}
          `}
        >
          {/* Add New Product */}
          <NavLink
            to="/products/add-product"
            className={({ isActive }) =>
              `flex items-center gap-2 ml-9 py-1.5 text-sm ${isActive
                ? "text-[#EA6B23]"
                : "text-slate-600 hover:text-[#EA6B23]"
              }`
            }
          >
            <i className="ri-checkbox-blank-circle-fill text-[7px]"></i>
            Add New Product
          </NavLink>

          {/* All Products */}
          <NavLink
            to="/products/product-list"
            className={({ isActive }) =>
              `flex items-center gap-2 ml-9 py-1.5 text-sm ${isActive
                ? "text-[#EA6B23]"
                : "text-slate-600 hover:text-[#EA6B23]"
              }`
            }
          >
            <i className="ri-checkbox-blank-circle-fill text-[7px]"></i>
            All Products
          </NavLink>

          {/* Active Products */}
          <NavLink
            to="/products/active-products"
            className={({ isActive }) =>
              `flex items-center gap-2 ml-9 py-1.5 text-sm ${isActive
                ? "text-[#EA6B23]"
                : "text-slate-600 hover:text-[#EA6B23]"
              }`
            }
          >
            <i className="ri-checkbox-blank-circle-fill text-[7px]"></i>
            Active Products
          </NavLink>
        </div>

        {/* INVOICE LIST */}
        <NavLink
          to="/invoice-list"
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-file-text-line text-lg mt-0.5"></i>
            <span>Invoice List</span>
          </div>
        </NavLink>

        {/* CREATE INVOICE */}
        <NavLink
          to="/create-invoice"
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-file-add-line text-lg mt-0.5"></i>
            <span>Create Invoice</span>
          </div>
        </NavLink>

        {/* SUBSCRIPTION */}
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-vip-crown-line text-lg mt-0.5"></i>
            <span>Subscription</span>
          </div>
        </NavLink>

        {/* REPORTS */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-bar-chart-line text-lg mt-0.5"></i>
            <span>Reports</span>
          </div>
        </NavLink>

        {/* HELP */}
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `${item} ${isActive
              ? "bg-[#EA6B23]/5 border border-[#f8d9c6] text-[#EA6B23]"
              : "hover:bg-slate-100 text-slate-700 border border-transparent"
            }`
          }
        >
          <div className={leftItem}>
            <i className="ri-customer-service-2-line text-lg mt-0.5"></i>
            <span>Help & Support</span>
          </div>
        </NavLink>
      </div>

      {/* FOOTER */}
      <div className="mt-auto py-4 justify-between border-t flex items-center border-slate-200 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <p className="font-semibold text-[#EA6B23] cursor-pointer">
          About Us
        </p>
      </div>

    </aside>
  );
}
