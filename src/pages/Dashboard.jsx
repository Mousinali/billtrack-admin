import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // ------------------ INVOICE DATA ------------------
  const invoices = [
    {
      id: "INV-20241",
      customer: "Rahul Sharma",
      phone: "6290397299",
      amount: "₹1,200",
      status: "Paid",
      date: "21 Feb 2025",
      time: "11:32 AM",
    },
    {
      id: "INV-20242",
      customer: "Neha Patel",
      phone: "7001239870",
      amount: "₹900",
      status: "Unpaid",
      date: "21 Feb 2025",
      time: "10:12 AM",
    },
    {
      id: "INV-20243",
      customer: "Arjun Singh",
      phone: "9087654210",
      amount: "₹2,450",
      status: "Paid",
      date: "20 Feb 2025",
      time: "05:44 PM",
    },
    {
      id: "INV-20244",
      customer: "Priya Das",
      phone: "7896541230",
      amount: "₹780",
      status: "Unpaid",
      date: "20 Feb 2025",
      time: "03:20 PM",
    },
  ];

  // ------------------ TABLE LOGIC ------------------
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const filteredInvoices = invoices.filter((inv) =>
    inv.customer.toLowerCase().includes(search.toLowerCase()) ||
    inv.phone.includes(search) ||
    inv.id.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------ CREATE INVOICE SHORTCUT ------------------
  const goToCreateInvoice = () => navigate("/create-invoice");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        goToCreateInvoice();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ------------------ BAR CHART ------------------
  const [filter, setFilter] = useState("monthly");

  // -------------------------------
  // MONTHLY (30 days)
  // -------------------------------
  const monthlyDays = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const monthlyData = [
    120, 95, 140, 160, 110, 180, 200, 90, 130, 150,
    170, 210, 190, 100, 125, 160, 230, 95, 80, 260,
    300, 210, 190, 130, 170, 200, 220, 250, 180, 140
  ];

  // -------------------------------
  // HOURLY DATA (Today - 24 hours)
  // -------------------------------
  const hourlyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const hourlyData = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 100) + 20
  );

  // FILTER RESULTS
  let labels = [];
  let data = [];

  // TODAY (Hourly)
  if (filter === "today") {
    labels = hourlyLabels;
    data = hourlyData;
  }

  // THIS WEEK (last 7 days)
  if (filter === "this_week") {
    labels = monthlyDays.slice(-7);
    data = monthlyData.slice(-7);
  }

  // LAST WEEK (previous 7 days)
  if (filter === "last_week") {
    labels = monthlyDays.slice(-14, -7);
    data = monthlyData.slice(-14, -7);
  }

  // MONTHLY (all days)
  if (filter === "monthly") {
    labels = monthlyDays;
    data = monthlyData;
  }

  // -------------------------------
  // CHART OPTIONS
  // -------------------------------
  const barOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#4F46E5"],
    plotOptions: {
      bar: { borderRadius: 5, columnWidth: filter === "today" ? "60%" : "40%" },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: labels,
      labels: { style: { colors: "#94A3B8", fontSize: filter === "today" ? "10px" : "12px" } },
    },
    yaxis: { labels: { style: { colors: "#94A3B8" } } },
    grid: { borderColor: "#E2E8F0" },
  };

  const barSeries = [
    { name: filter === "today" ? "Hourly Sales" : "Daily Sales", data: data },
  ];



  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your business performance.</p>
        </div>

        <button
          onClick={goToCreateInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          Create Invoice <i className="ri-add-line"></i>
        </button>
      </div>

      {/* --------- TOP LAYOUT EXACT LIKE IMAGE ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE: Revenue + Orders + Monthly Sales */}
        <div className="col-span-2 space-y-6">

          {/* Revenue + Orders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* REVENUE CARD */}
            <div className="
              bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300
            ">
              <div className="flex items-center gap-4 justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Today's Sales</p>
                  <div className="flex items-end mt-1 gap-3">
                    <p className="text-2xl font-semibold text-slate-900">₹3,782</p>
                    <span className="
                 inline-flex items-center gap-1 text-emerald-600
                text-xs font-semibold pb-0.75
              ">
                      <i className="ri-arrow-up-s-line"></i> 11.01%
                    </span>
                  </div>
                </div>

                <div className="
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                  bg-gradient-to-br from-indigo-50 to-white border border-indigo-100
                ">
                  <i className="ri-money-rupee-circle-line text-indigo-600"></i>
                </div>
              </div>


            </div>

            {/* Invoices CARD */}
            <div className="
              bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300
            ">
              <div className="flex items-center gap-4 justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Invoices</p>
                  <div className="flex items-end mt-1 gap-3">
                    <p className="text-2xl font-semibold text-slate-900">18</p>
                    <span className="
                 inline-flex items-center gap-1 text-emerald-600
                text-xs font-semibold pb-0.75
              ">
                      <i className="ri-arrow-up-s-line"></i> 11.01%
                    </span>
                  </div>
                </div>

                <div className="
                  w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                  bg-gradient-to-br from-green-50 to-white border border-green-100
                ">
                  <i className="ri-bill-line text-green-600"></i>
                </div>
              </div>
            </div>

            {/* Active Products CARD */}
            <div className="
              bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300
            ">
              <div className="flex items-center gap-4 justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Active Products</p>
                  <div className="flex items-end mt-1 gap-3">
                    <p className="text-2xl font-semibold text-slate-900">146</p>
                  </div>
                </div>

                <div className="
                  w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                  bg-gradient-to-br from-rose-50 to-white border border-rose-100
                ">
                  <i className="ri-box-3-line text-rose-600"></i>
                </div>
              </div>
            </div>

          </div>

          {/* MONTHLY SALES CHART */}
          <div className="bg-white rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-slate-900">
                Sales Overview
              </p>

              {/* FILTER BUTTONS */}
              <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
                {[
                  { key: "today", label: "Today" },
                  { key: "this_week", label: "This Week" },
                  { key: "last_week", label: "Last Week" },
                  { key: "monthly", label: "Monthly" },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setFilter(btn.key)}
                    className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${filter === btn.key
                        ? "bg-white shadow-sm text-blue-900"
                        : "text-gray-600 hover:text-gray-800"
                      }`}>
                    {btn.label}
                  </button>
                ))}
              </div>

            </div>

            <ReactApexChart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={260}
            />
          </div>

        </div>

        {/* RIGHT SIDE — Your Target Gauge will go here later */}

      </div>

      {/* -------------------- DATA TABLE -------------------- */}
      <div className="bg-white rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">

        {/* TOP CONTROLS */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">

          {/* SHOW ENTRIES */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Show</span>

            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-slate-300 rounded-xl px-3 py-1.5
              text-sm text-slate-700 focus:ring-2 focus:ring-indigo-200 outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

            <span className="text-slate-600">entries</span>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search invoices…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 pr-10
              text-sm text-slate-700 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-200 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wide">
                <th className="py-3 px-4 text-left">Invoice ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.slice(0, entries).map((inv) => (
                <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-medium text-slate-800">{inv.id}</td>
                  <td className="py-3 px-4">{inv.customer}</td>
                  <td className="py-3 px-4 text-slate-500">{inv.phone}</td>
                  <td className="py-3 px-4 font-semibold">{inv.amount}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${inv.status === "Paid"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                        }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-500">
                    {inv.date} <span className="text-slate-400">• {inv.time}</span>
                  </td>

                  <td className="py-3 px-4 flex items-center gap-4 text-lg">
                    <i className="ri-printer-line text-slate-500 hover:text-slate-800 cursor-pointer"></i>
                    <i className="ri-whatsapp-line text-green-600 hover:text-green-700 cursor-pointer"></i>
                    <i className="ri-message-2-line text-blue-500 hover:text-blue-600 cursor-pointer"></i>
                    <i className="ri-eye-line text-orange-500 hover:text-orange-600 cursor-pointer"></i>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}
