import ReactApexChart from "react-apexcharts";








export default function SubscriptionChart() {
    // ------------------ SUBSCRIPTION GAUGE ------------------
    const totalDays = 365;
    const usedDays = 65;
    const remainingDays = totalDays - usedDays;
    const percent = (remainingDays / totalDays) * 100;

    const gaugeOptions = {
        chart: {
            type: "radialBar",
            toolbar: { show: false },
            offsetY: -10,
            animations: { enabled: true },
        },

        plotOptions: {
            radialBar: {
                startAngle: -140,
                endAngle: 140,

                hollow: {
                    size: "60%",
                },

                track: {
                    background: "#eef2f7",
                    strokeWidth: "90%",
                },

                dataLabels: {
                    name: { show: false },
                    value: {
                        show: true,
                        fontSize: "26px",
                        fontWeight: 700,
                        color: "#0f172a",
                        offsetY: 6,
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

        stroke: {
            lineCap: "butt",
            dashArray: 4,
        },
        responsive: [
            {
                breakpoint: 9999,
                options: {
                    chart: {
                        height: 230,
                    },
                },
            },
        ],
    };

    const gaugeSeries = [percent];

    return (
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all space-y-4 flex flex-col justify-between">



            <div className="flex flex-col justify-between">
                <p className="text-lg font-semibold text-slate-900">
                    Subscription Status
                </p>
                <ReactApexChart
                    key={percent}
                    options={gaugeOptions}
                    series={gaugeSeries}
                    type="radialBar"
                    height={235}
                    className="mt-8"
                />
            </div>
            <div>
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
    );
}
