export default function ActiveProducts() {
    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Active Products</h1>
                    <p className="text-sm text-slate-500">A complete list of all your invoices.</p>
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
        </div>
    );
}