import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function SalesChart() {
    
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
        <div className="bg-white rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-medium text-slate-900">
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
    );
}