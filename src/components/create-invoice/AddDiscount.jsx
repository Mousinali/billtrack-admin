

import { useEffect, useState } from "react";

export default function AddDiscount() {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState("");

    // Button Component
    const RightBtn = ({ label, keyLabel, onClick }) => (
        <button
            onClick={onClick}
            className="flex-1 border border-slate-400 px-3 py-2 text-xs bg-white flex justify-between cursor-pointer"
        >
            <span>{label}</span>
            <span className="text-gray-400">[{keyLabel}]</span>
        </button>
    );

    // F2 → open modal
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "F2") {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // ESC closes modal, ENTER submits
    useEffect(() => {
        if (!isOpen) return;

        const handler = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
            }

            if (e.key === "Enter") {
                e.preventDefault();
                submitAmount();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, amount]);

    // Submit Logic (you can modify)
    const submitAmount = () => {
        if (!amount) return alert("Enter amount");
        alert("Extra Charge Added: ₹" + amount);
        setIsOpen(false);
        setAmount("");
    };

    return (
        <>
            {/* BUTTON */}
            <div className="flex gap-2">
                <RightBtn label="Add Discount" keyLabel="F2" onClick={() => setIsOpen(true)} />
            </div>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-[99] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-lg shadow-xl p-6 relative">

                        {/* Close */}
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                             <i className="ri-close-line text-3xl text-red-600"></i>
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Enter Discount</h2>

                        {/* Input */}
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="Enter amount"
                            autoFocus
                            className="w-full px-3 py-2 border rounded border-slate-400 focus:ring-1 focus:ring-purple-500 outline-none"
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-2 mt-5">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel [ESC]
                            </button>

                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded"
                                onClick={submitAmount}
                            >
                                Add [ENTER]
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
