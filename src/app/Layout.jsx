import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useCallback, useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();

  const goToCreateInvoice = useCallback(() => navigate("/create-invoice"), [navigate]);
  const goToInvoiceList = useCallback(() => navigate("/invoice-list"), [navigate]);
  const goToDashboard = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        goToCreateInvoice();
      }

      if (e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        goToInvoiceList();
      }

      // FIXED: SHIFT + D → DASHBOARD
      if (e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        goToDashboard();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToCreateInvoice, goToInvoiceList, goToDashboard]);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
