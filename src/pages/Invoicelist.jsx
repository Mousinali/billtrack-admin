import { Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "react-data-table-component";


export default function Invoice() {
  // ---------------- DOWNLOAD: PDF ----------------
  const downloadPDF = () => {
    const data = filteredData.map(item => ({
      InvoiceID: item.id,
      Customer: item.customer,
      Phone: item.phone,
      Date: item.date,
      Time: item.time,
      Status: item.status,
      Amount: item.amount,
    }));

    const pdfContent = JSON.stringify(data, null, 2);
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice_list.pdf";
    link.click();
  };


  // ---------------- DOWNLOAD: CSV ----------------
  const downloadCSV = () => {
    const headers = ["Invoice ID", "Customer", "Phone", "Date", "Time", "Status", "Amount"];

    const rows = filteredData.map(item =>
      [item.id, item.customer, item.phone, item.date, item.time, item.status, item.amount].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice_list.csv";
    link.click();
  };


  // ---------------- DOWNLOAD: EXCEL ----------------
  const downloadExcel = () => {
    const headers = ["Invoice ID", "Customer", "Phone", "Date", "Time", "Status", "Amount"];

    const rows = filteredData.map(item =>
      [item.id, item.customer, item.phone, item.date, item.time, item.status, item.amount]
    );

    // Convert to Excel-friendly CSV
    let excelData = headers.join("\t") + "\n";
    rows.forEach(row => (excelData += row.join("\t") + "\n"));

    const blob = new Blob([excelData], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice_list.xls";
    link.click();
  };

  // ------------------ INVOICE DATA ------------------
  const invoices = [
    {
      id: "INV-20241",
      customer: "Rahul Sharma",
      phone: "6290397299",
      date: "21 Feb 2025",
      time: "11:32 AM",
      status: "Paid",
      amount: "1,200.00",
    },
    {
      id: "INV-20242",
      customer: "Neha Patel",
      phone: "7001239870",
      date: "21 Feb 2025",
      time: "10:12 AM",
      status: "Unpaid",
      amount: "900.00",
    },
    {
      id: "INV-20243",
      customer: "Arjun Singh",
      phone: "9087654210",
      date: "20 Feb 2025",
      time: "05:44 PM",
      status: "Paid",
      amount: "2,450.00",
    },
    {
      id: "INV-20244",
      customer: "Priya Das",
      phone: "7896541230",
      date: "20 Feb 2025",
      time: "03:20 PM",
      status: "Unpaid",
      amount: "780.00",
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
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
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
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      style: {
        justifyContent: "flex-end",
      },
      cell: (row) => (
        <span className="text-end">
          {row.amount}
        </span>
      ),
    },
    {
      name: "Action",
      cell: () => (
        <div className="flex items-center gap-3 text-xl">

          <i className="ri-printer-line text-red-600 hover:text-red-800 cursor-pointer"></i>

          <i className="ri-message-2-line text-blue-600 hover:text-blue-800 cursor-pointer"></i>

          <i className="ri-whatsapp-line text-green-600 hover:text-green-800 cursor-pointer"></i>

          <i className="ri-eye-line text-gray-700 hover:text-indigo-600 cursor-pointer"></i>

        </div>
      ),
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
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Invoice List</h1>
          <p className="text-sm text-slate-500">A complete list of all your invoices.</p>
        </div>

        <Link
          to="/create-invoice"
          className="Btn"
        >
          <div className="text">
            Create Invoice <i className="ri-add-line"></i>
          </div>
        </Link>
      </div>
      <div className="bg-white rounded-xl p-6 pb-3
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
        <div className="pb-0">
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
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-3">

                {/* PDF */}
                <button
                  onClick={downloadPDF}
                  className="px-2 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-200 transition"
                >
                  <i className="ri-file-pdf-line text-lg leading-none"></i>
                </button>

                {/* Excel */}
                <button
                  onClick={downloadExcel}
                  className="px-2 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-200 transition"
                >
                  <i className="ri-file-excel-line text-lg leading-none"></i>
                </button>

                {/* CSV */}
                <button
                  onClick={downloadCSV}
                  className="px-2 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-200 transition"
                >
                  <i className="ri-file-text-line text-lg leading-none"></i>
                </button>

              </div>
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
  )
}


