import { useEffect, useState } from "react";

const ThCell = ({ children, className = "" }) => (
  <th className={`border border-slate-400 px-2 py-2 text-sm ${className}`}>{children}</th>
);

const TdCell = ({ children, className = "" }) => (
  <td className={`border border-slate-400 px-2 py-2 text-sm ${className}`}>{children}</td>
);

export default function ItemTable({ rows, setRows }) {
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    setRows(rows.map((r) => ({ ...r, checked })));
  };

  const toggleRow = (index) => {
    const updated = [...rows];
    updated[index].checked = !updated[index].checked;
    setRows(updated);
    setSelectAll(updated.every((r) => r.checked));
  };

  // Delete selected rows
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Delete") {
        let remaining = rows.filter((r) => !r.checked);

        remaining = remaining.map((r, i) => ({ ...r, no: i + 1 }));

        setRows(remaining);
        setSelectAll(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rows]);

  // ALT + C → Clear all items
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setRows([]);
        setSelectAll(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Update qty
  const updateQty = (index, value) => {
    let qty = Number(value);
    if (!qty || qty < 1) qty = 1;

    const updated = [...rows];
    updated[index].qty = qty;
    updated[index].amount = qty * updated[index].price;
    setRows(updated);
  };

  return (
    <div>
      <div className="border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <ThCell className="text-center w-10">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </ThCell>

              <ThCell className="text-center w-10">SL NO</ThCell>
              <ThCell className="text-start w-[45%]">ITEMS</ThCell>
              <ThCell className="text-end w-24">PRICE (₹)</ThCell>
              <ThCell className="text-end w-24">QUANTITY</ThCell>
              <ThCell className="text-end w-24">AMOUNT (₹)</ThCell>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => (
              <tr
                key={index}
                className={`${item.checked ? "bg-amber-100 font-semibold" : ""}`}
              >
                <TdCell className="text-center w-10">
                  <input
                    type="checkbox"
                    checked={item.checked || false}
                    onChange={() => toggleRow(index)}
                  />
                </TdCell>

                <TdCell className="text-center">{item.no}</TdCell>
                <TdCell className="text-start">{item.name}</TdCell>
                <TdCell className="text-end">₹ {item.price}</TdCell>

                <TdCell className="text-end">
                  <input
                    type="text"
                    value={item.qty}
                    onChange={(e) => updateQty(index, e.target.value)}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="w-16 rounded border border-slate-300 py-1 px-2 text-end
                               focus:ring-1 outline-none focus:ring-blue-500"
                  />
                </TdCell>

                <TdCell className="text-end">₹ {item.amount}</TdCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm mt-4">
        <p>Total Items: <b>{rows.length}</b></p>

        <button
          className="px-3 py-2 bg-red-100 text-red-600 text-xs rounded"
          onClick={() => {
            setRows([]);
            setSelectAll(false);
          }}
        >
          Clear All Items <span className="text-gray-400">[ALT + C]</span>
        </button>
      </div>
    </div>
  );
}
