import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ItemSearch from "../components/create-invoice/ItemSearch";
import ItemTable from "../components/create-invoice/ItemTable";
import NewItemAdd from "../components/create-invoice/NewItemAdd";
import AddDiscount from "../components/create-invoice/AddDiscount";
import InvoiceOverview from "../components/create-invoice/InvoiceOverview";



export default function CreateInvoice() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectAll, setSelectAll] = useState(false); // if you use this elsewhere

  // Add item
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

  // CALCULATIONS
  const subTotal = selectedItems.reduce((sum, item) => sum + item.amount, 0);

  const taxRate = 0.05;
  const taxAmount = +(subTotal * taxRate).toFixed(2);

  const totalBeforeDiscount = +(subTotal + taxAmount).toFixed(2);

  // FINAL TOTAL AFTER DISCOUNT
  const totalAmount = +(totalBeforeDiscount - discount).toFixed(2);

  // ALT + C -> CLEAR INVOICE
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault();

        // reset everything
        setSelectedItems([]);
        setSelectAll(false);
        setDiscount(0);

        toast.success("Invoice cleared");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);









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
        <AddDiscount onApplyDiscount={(value) => setDiscount(value)} />

        {/* Bill Details */}
        <InvoiceOverview
          subTotal={subTotal}
          taxAmount={taxAmount}
          discount={discount}
          totalAmount={totalAmount}
        />


        {/* Save Buttons */}
        <div className="mt-5 flex gap-2">
          <button className="flex-1 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-100 cursor-pointer py-2 text-sm">
            Save Bill [SHIFT + S]
          </button>
          <button className="flex-1 bg-[#554de9] text-white cursor-pointer py-2 text-sm">
            Save & Print [ENTER]
          </button>
        </div>
      </div>


    </div>
  );
}


