// import { Link } from "react-router-dom";

export default function Subscription() {
    const plans = [
        {
            name: "Free Plan",
            tagline: "For new users",
            price: "Free",
            button: "Start Free",
            features: [
                { text: "Billing Limit: Unlimited for first 14 days", available: true },
                { text: "WhatsApp Invoice Sharing", available: true },
                { text: "SMS Sending", available: false },
                { text: "Sales Analytics", available: true },
                { text: "Printer Provided & Support", available: false },
                { text: "Auto Downgrade After Subscription: Moves to Free", available: true },
            ],
        },
        {
            name: "Basic Plan (Yearly)",
            tagline: "Best for small businesses",
            price: "₹999",
            button: "Get Basic",
            popular: true,
            features: [
                { text: "Billing Limit: Unlimited", available: true },
                { text: "WhatsApp Invoice Sharing", available: true },
                { text: "SMS Sending", available: true },
                { text: "Sales Analytics", available: true },
                { text: "Printer Provided & Support", available: false },
                { text: "Auto Downgrade After Subscription: Moves to Free", available: true },
            ],
        },
        {
            name: "Pro Plan (Yearly)",
            tagline: "For professional businesses",
            price: "₹1499 Software + Printer Price",
            button: "Get Pro",
            features: [
                { text: "Billing Limit: Unlimited", available: true },
                { text: "WhatsApp Invoice Sharing", available: true },
                { text: "SMS Sending", available: true },
                { text: "Sales Analytics", available: true },
                { text: "Printer Provided & Support", available: true },
                { text: "Auto Downgrade After Subscription: Moves to Free", available: true },
            ],
        },
    ];
    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Subscription</h1>
                    <p className="text-sm text-slate-500">Get key insights into your business at a glance.</p>
                </div>

                {/* <Link
                    to="/create-invoice"
                    className="Btn"
                >
                    <div className="text">
                        Create Invoice <i className="ri-add-line"></i>
                    </div>
                </Link> */}
            </div>
            <div className="max-w-8xl grid grid-cols-1 md:grid-cols-3 gap-6">

                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-xl p-6 bg-white border 
      transition duration-200 hover:shadow-md 
      ${plan.popular ? "border-green-500/70" : "border-gray-200"}`}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium 
                             bg-green-100 text-green-700 rounded-full border border-green-200">
                                Popular
                            </span>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 mb-4">{plan.tagline}</p>

                        {/* Price */}
                        <p className="text-2xl font-bold text-gray-900">{plan.price}</p>
                        <p className="text-xs text-gray-500 mb-4">Billed yearly</p>

                        {/* Button */}
                        <button className="
                        w-full py-2.5 rounded-lg text-sm font-semibold mb-5
                        bg-green-500 text-white hover:bg-green-600 transition">
                            {plan.button}
                        </button>

                        <div className="border-b border-slate-300 mb-4"></div>

                        <h4 className="text-sm font-medium text-gray-800 mb-3">Features</h4>

                        {/* Features */}
                        <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    {feature.available ? (
                                        <svg
                                            className="w-3.5 h-3.5 text-green-600 mt-0.5"
                                            fill="none" stroke="currentColor" strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-3.5 h-3.5 text-red-500 mt-0.5"
                                            fill="none" stroke="currentColor" strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <span className="text-gray-700">{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Note */}
            <p className="text-sm text-gray-500 text-center mt-6 max-w-xl mx-auto leading-relaxed">
                <span className="text-red-600 font-semibold">Note:</span> After the trial period, the Free Plan will be limited to 20 bills per day.
            </p>


        </div>
    );
}