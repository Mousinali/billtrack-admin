import { useState } from "react";
import ItemSearch from "../components/create-invoice/ItemSearch";
import ItemTable from "../components/create-invoice/ItemTable";
import NewItemAdd from "../components/create-invoice/NewItemAdd";
import AddDiscount from "../components/create-invoice/AddDiscount";
import InvoiceOverview from "../components/create-invoice/InvoiceOverview";



export default function CreateInvoice() {
  const [selectedItems, setSelectedItems] = useState([]);

  // 2️⃣ FUNCTIONS THAT USE selectedItems
  const addItemToTable = (item) => {
    setSelectedItems((prev) => {
      if (prev.some((x) => x.name === item.name)) return prev;

      return [
        ...prev,
        {
          no: prev.length + 1,
          name: item.name,
          price: item.price,
          qty: 1,
          amount: item.price,
          checked: false,
        },
      ];
    });
  };

  // 3️⃣ CALCULATIONS (MUST COME AFTER selectedItems is declared)
  const subTotal = selectedItems.reduce((sum, item) => sum + item.amount, 0);

  const taxRate = 0.05;
  const taxAmount = +(subTotal * taxRate).toFixed(2);

  const totalAmount = +(subTotal + taxAmount).toFixed(2);


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

  const CardBox = ({ children }) => (
    <div className="border border-slate-400 p-3 bg-white">{children}</div>
  );







  return (
    <div className=" h-screen  gap-4 p-4 bg-gray-50 grid-cols-4 grid">

      {/* LEFT SIDE */}
      <div className=" flex flex-col col-span-3">

        {/* Top Quick Buttons */}
        <NewItemAdd />

        {/* Search Bar */}
        <ItemSearch addItemToTable={addItemToTable} rows={selectedItems} />

        {/* Items Table */}
        <ItemTable rows={selectedItems} setRows={setSelectedItems} />

        {/* Bottom Footer */}

      </div>

      {/* RIGHT SIDE */}
      <div className=" flex flex-col gap-4">

        {/* Discount + Additional Charge Buttons */}
        <AddDiscount />

        {/* Bill Details */}
        <InvoiceOverview
          subTotal={subTotal}
          taxAmount={taxAmount}
          totalAmount={totalAmount}
        />


        {/* Received Amount */}
        <CardBox>
          <SectionTitle title="Received Amount" shortKey="F4" />

          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-semibold text-gray-900">₹ 250</p>

            <select className="border px-2 py-1 text-sm">
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </div>
        </CardBox>

        {/* Save Buttons */}
        <div className="mt-5 flex gap-2">
          <button className="flex-1 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-100 cursor-pointer py-2 text-sm">
            Save & Print [F6]
          </button>
          <button className="flex-1 bg-[#554de9] text-white cursor-pointer py-2 text-sm">
            Save Bill [F7]
          </button>
        </div>
      </div>


    </div>
  );
}


