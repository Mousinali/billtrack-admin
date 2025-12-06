import { Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/product-img/1.jpg";
import img2 from "../../assets/product-img/2.jpg";
import img3 from "../../assets/product-img/3.jpg";
import img4 from "../../assets/product-img/4.jpg";
import img5 from "../../assets/product-img/5.jpg";
import img6 from "../../assets/product-img/6.jpg";

export default function ProductList() {
const navigate = useNavigate();

    // ------------------ PRODUCT DATA (IN STATE) ------------------
    const [products, setProducts] = useState([
        {
            id: "1",
            image: img1,
            name: "Chicken Biryani",
            category: "Non veg",
            gst: 5,
            price: "180.00",
            active: true,
        },
        {
            id: "2",
            image: img2,
            name: "Veg Fried Rice",
            category: "Veg",
            gst: 5,
            price: "120.00",
            active: true,
        },
        {
            id: "3",
            image: img3,
            name: "Mutton Curry",
            category: "Non veg",
            gst: 12,
            price: "260.00",
            active: false,
        },
        {
            id: "4",
            image: img4,
            name: "Paneer Butter Masala",
            category: "Veg",
            gst: 12,
            price: "220.00",
            active: true,
        },
        {
            id: "5",
            image: img5,
            name: "Chicken Lollipop",
            category: "Non veg",
            gst: 5,
            price: "150.00",
            active: true,
        },
        {
            id: "6",
            image: img6,
            name: "Veg Manchurian",
            category: "Veg",
            gst: 5,
            price: "140.00",
            active: false,
        },
    ]);


    const [search, setSearch] = useState("");

    // ------------------ TOGGLE ACTIVE STATUS ------------------
    const toggleStatus = (id) => {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    // ------------------ FILTER SEARCH ------------------
    const filteredData = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
    );

    // ------------------ DOWNLOAD: PDF ------------------
    const downloadPDF = () => {
        const exportData = filteredData.map((item, index) => ({
            "SL No": index + 1,
            "Product Name": item.name,
            "Category": item.category,
            "GST %": item.gst,
            "Price": item.price,
            "Active": item.active ? "Active" : "Inactive",
        }));

        const pdfContent = JSON.stringify(exportData, null, 2);
        const blob = new Blob([pdfContent], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "product_list.pdf";
        link.click();
    };

    // ---------------- DOWNLOAD: CSV ----------------
    const downloadCSV = () => {
        const headers = ["SL No", "Product Name", "Category", "GST %", "Price", "Active"];

        const rows = filteredData.map((item, i) =>
            [
                i + 1,
                item.name,
                item.category,
                item.gst,
                item.price,
                item.active ? "Active" : "Inactive",
            ].join(",")
        );

        const csvContent = [headers.join(","), ...rows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "product_list.csv";
        link.click();
    };

    // ---------------- DOWNLOAD: EXCEL (.xls) ----------------
    const downloadExcel = () => {
        const headers = ["SL No", "Product Name", "Category", "GST %", "Price", "Active"];

        const rows = filteredData.map((item, i) =>
            [
                i + 1,
                item.name,
                item.category,
                item.gst,
                item.price,
                item.active ? "Active" : "Inactive",
            ].join("\t")
        );

        const excelContent = [headers.join("\t"), ...rows].join("\n");

        const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "product_list.xls";
        link.click();
    };

    // ------------------ COLUMNS ------------------
    const columns = [
        {
            name: "SL No",
            selector: (row, index) => index + 1,
            width: "80px",
        },

        {
            name: "Image",
            width: "110px",
            cell: (row) => (
                <img
                    src={row.image}
                    alt={row.name}
                    className="w-12 h-12 object-cover rounded-md border"
                />
            ),
        },

        {
            name: "Product Name",
            selector: (row) => row.name,
            sortable: true,
            grow: 2,
        },

        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            width: "140px",
            cell: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${row.category === "Veg"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                >
                    {row.category}
                </span>
            ),
        },

        {
            name: "GST %",
            selector: (row) => row.gst,
            width: "150px",
            sortable: true,
            style: {
                justifyContent: "flex-end",
            },
        },

        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
            width: "150px",
            style: {
                justifyContent: "flex-end",
            },
            cell: (row) => (
                <span className="text-end">
                    {row.price}
                </span>
            ),
        },

        {
            name: "Action",
            width: "160px",
            cell: (row) => (
                <div className="flex items-center gap-4">

                    {/* EDIT ICON */}
                    <i
                        className="ri-edit-line text-blue-600 hover:text-blue-800 text-xl cursor-pointer"
                        onClick={() => navigate(`/products/edit/${row.id}`)}
                    ></i>

                    {/* TOGGLE */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={row.active}
                            onChange={() => toggleStatus(row.id)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full 
                    peer-checked:translate-x-5 transition-all"></div>
                    </label>

                </div>
            ),
        },

    ];

    // ------------------ CUSTOM STYLES ------------------
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

    const SortIcon = () => (
        <span className="flex flex-col items-center justify-center ml-1">
            <span className="triangle-up" />
            <span className="triangle-down mt-1" />
        </span>
    );

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Product List</h1>
                    <p className="text-sm text-slate-500">A complete list of all your products.</p>
                </div>

                <Link to="/products/product-list" className="Btn">
                    <div className="text">
                        Active Products <i className="ri-checkbox-circle-line font-normal"></i>
                    </div>
                </Link>
            </div>

            {/* TABLE CARD */}
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

                                <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"></i>
                            </div>

                            <label className="text-sm text-slate-600 font-medium">entries</label>
                        </div>

                        {/* Search + Export Buttons */}
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
                                    className="border border-slate-300 rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            </div>
                        </div>
                    </div>

                    {/* DATA TABLE */}
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
