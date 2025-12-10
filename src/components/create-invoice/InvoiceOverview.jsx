export default function InvoiceOverview({ subTotal, taxAmount, totalAmount }) {
    const CardBox = ({ children }) => (
        <div className="border border-slate-400 p-3 bg-white">{children}</div>
    );

    const SectionTitle = ({ title, shortKey }) => (
        <p className="text-sm text-gray-600 mb-2 flex justify-between">
            {title}
            {shortKey && <span className="text-gray-400">[{shortKey}]</span>}
        </p>
    );

    const Row = ({ label, value, bold }) => (
        <div className="flex justify-between text-sm py-1">
            <span className={bold ? "font-semibold text-gray-900" : "text-gray-700"}>
                {label}
            </span>
            <span className={bold ? "font-semibold text-gray-900" : "text-gray-700"}>
                {value}
            </span>
        </div>
    );

    return (
        <CardBox>
            <SectionTitle title="Bill details" />

            <Row label="Sub Total" value={`₹ ${subTotal}`} />
            <Row label="Tax" value={`₹ ${taxAmount}`} />

            <div className="mt-3 py-2 px-2 bg-green-50 border-l-4 border-green-500">
                <Row label="Total Amount" value={`₹ ${totalAmount}`} bold />
            </div>
        </CardBox>
    );
}
