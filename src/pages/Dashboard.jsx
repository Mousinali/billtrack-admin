import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "remixicon/fonts/remixicon.css";

const statCards = [
  {
    label: "Total Invoices",
    value: "2,430",
    change: "+12%",
    positive: true,
  },
  {
    label: "Paid Invoices",
    value: "1,980",
    change: "+8%",
    positive: true,
  },
  {
    label: "Unpaid Invoices",
    value: "450",
    change: "-3%",
    positive: false,
  },
  {
    label: "Total Revenue",
    value: "₹7,85,400",
    change: "+10%",
    positive: true,
  },
];

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

const periodOptions = ["12 months", "30 days", "7 days", "24 hours"];

export default function InvoiceDashboard() {
  const [activePeriod, setActivePeriod] = useState("30 days");

  // Simple static data – you can swap based on activePeriod if you want
  const barSeries = [
    {
      name: "Invoices",
      data: [160, 220, 190, 260, 210, 240, 280, 200, 230, 260, 220, 300],
    },
  ];

  const barOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    colors: ["#EA6B23"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "40%",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} invoices`,
      },
    },
    legend: { show: false },
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Invoice Analytics</h1>
        <p className="text-sm text-slate-500">
          Overview of invoice performance and recent activity.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm px-5 py-4 flex flex-col justify-between"
          >
            <p className="text-xs text-slate-500">{card.label}</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {card.value}
            </p>
            <div className="mt-2 inline-flex items-center text-[11px]">
              <span
                className={`px-2 py-[3px] rounded-full font-medium mr-2 ${
                  card.positive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {card.change}
              </span>
              <span className="text-slate-400">Vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS + CHART */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Analytics</p>
            <p className="text-xs text-slate-500">
              Invoice analytics of last 30 days
            </p>
          </div>

          <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
            {periodOptions.map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-3 py-1 rounded-full whitespace-nowrap ${
                  activePeriod === p
                    ? "bg-white shadow-sm text-slate-900"
                    : "text-slate-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={320}
        />
      </div>

      {/* INVOICE TABLE CARD */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        {/* TOP CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <select className="border border-slate-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA6B23]/30">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-full max-w-xs ml-auto">
            <input
              type="text"
              placeholder="Search…"
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 pr-9 text-sm focus:ring-2 focus:ring-[#EA6B23]/30 focus:outline-none"
            />
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]" />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Invoice ID
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Phone
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Date &amp; Time
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-100 hover:bg-slate-50/60 transition"
                >
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {inv.id}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{inv.customer}</td>
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {inv.phone}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {inv.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inv.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {inv.date}
                    <span className="text-slate-400 ml-1">• {inv.time}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 text-lg">
                      {/* PRINT */}
                      <button
                        type="button"
                        className="text-slate-500 hover:text-slate-800"
                        title="Print"
                      >
                        <i className="ri-printer-line" />
                      </button>

                      {/* WHATSAPP */}
                      <button
                        type="button"
                        className="text-green-600 hover:text-green-700"
                        title="Send WhatsApp"
                      >
                        <i className="ri-whatsapp-line" />
                      </button>

                      {/* SMS */}
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-600"
                        title="Send SMS"
                      >
                        <i className="ri-message-2-line" />
                      </button>

                      {/* VIEW */}
                      <button
                        type="button"
                        className="text-[#EA6B23] hover:text-[#c9561b]"
                        title="View details"
                      >
                        <i className="ri-eye-line" />
                      </button>
                    </div>
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
