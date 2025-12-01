import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

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

  const [search, setSearch] = useState("");

  const filteredData = invoices.filter(
    (item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.customer}</span>
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${row.status === "Paid"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
  ];


  const customStyles = {
    table: {
      style: {
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      },
    },

    head: {
      style: {
        backgroundColor: "#f8fafc",
        minHeight: "46px",
      },
    },

    headCells: {
      style: {
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
        fontSize: "14px",
        color: "#334155",
        paddingTop: "14px",
        paddingBottom: "14px",
        backgroundColor: "#e9e8ff",
      },
    },

    rows: {
      style: {
        minHeight: "54px",
        fontSize: "15px",
        borderBottom: "1px solid #f1f5f9",
      },
    },

    cells: {
      style: {
        paddingTop: "12px",
        paddingBottom: "12px",
        color: "#475569",
      },
    },

    highlightOnHoverStyle: {
      backgroundColor: "#eef6ff",
      borderBottomColor: "#e2e8f0",
    },
  };


  const SortIcon = () => {
    return (
      <span className="flex flex-col items-center justify-center ml-1 leading-none">
        <span className="triangle-up" />
        <span className="triangle-down mt-1" />
      </span>
    );
  };




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

  // ------------------ SUBSCRIPTION GAUGE ------------------
  const totalDays = 365;
  const usedDays = 90;
  const remainingDays = totalDays - usedDays;
  const percent = (remainingDays / totalDays) * 100;


  const gaugeOptions = {
    chart: {
      type: "radialBar",
      toolbar: { show: false },
    },

    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "60%",
        },
        track: {
          background: "#e2e8f0",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
            offsetY: 8,
            formatter: () => `${remainingDays} Days`,
          },
        },
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        gradientToColors: ["#6366f1"],
        stops: [0, 100],
      },
      colors: ["#4f46e5"],
    },

    stroke: { lineCap: "round" },
  };

  const gaugeSeries = [percent];

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
          className="Btn"
        >
          <div className="text">
            Create Invoice <i className="ri-add-line"></i>
          </div>
        </button>
      </div>

      {/* --------- Overview ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* LEFT SIDE: Revenue + Invoice + Active Products */}
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

        {/* Subscription overview */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all space-y-4">

          <p className="text-lg font-semibold text-slate-900">
            Subscription Status
          </p>

          <ReactApexChart
            options={gaugeOptions}
            series={gaugeSeries}
            type="radialBar"
            height={235}
          />

          {/* Remaining Days Text */}
          <p className="text-center text-slate-600 text-sm -mt-2">
            Renewal in <span className="font-semibold">{remainingDays} days</span>
          </p>

          {/* Last 2 Transactions */}
          <div className="mt-4 bg-orange-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-800 mb-2">
              Last Transactions
            </p>

            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 text-sm">Subscription Renewed</span>
              <span className="text-slate-600 text-sm">12 Feb 2024</span>
              <span className="font-semibold text-green-600 text-sm">₹1999</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 text-sm">Subscription Renewed</span>
              <span className="text-slate-600 text-sm">18 Feb 2025</span>
              <span className="font-semibold text-green-600 text-sm">₹1999</span>
            </div>
          </div>

        </div>


      </div>

      {/* -------------------- DATA TABLE -------------------- */}
      <div className="bg-white rounded-xl p-6 pb-3
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
        <div className="p-4 pb-0">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-medium">Recent Entries</h2>
            <Link
              to="/invoice-list"
              className="Btn"
            >
              <div className="text">
                Invoice List <i className="ri-list-check"></i>
              </div>
            </Link>
          </div>
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-6">

            {/* Entries Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600 font-medium">Show</label>

              <div className="relative">
                <select
                  className="appearance-none border border-slate-300 bg-white rounded-lg 
                  px-3 py-1.5 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:ring-0 transition cursor-pointer"
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>

                {/* Custom Arrow */}
                <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"></i>
              </div>

              <label className="text-sm text-slate-600 font-medium">entries</label>
            </div>


            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="
                border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-64 text-sm
                focus:outline-none focus:ring-0.75 focus:border-blue-500 
                transition-all
              "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            </div>

          </div>



          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            sortIcon={<SortIcon />}
          />
          
        </div>
      </div>

    </div>
  );
}
