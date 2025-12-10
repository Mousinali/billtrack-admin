import { useEffect, useRef, useState } from "react";

export default function ItemSearch({ addItemToTable, rows }) {
  const items = [
    { name: "Chicken Biryani", price: 250 },
    { name: "Veg Roll", price: 50 },
    { name: "Egg Curry", price: 90 },
    { name: "Fried Rice", price: 120 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef(null);

  // F1 → focus
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "F1") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Filter + remove already added items
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setFiltered([]);
      return;
    }

    const added = rows.map((r) => r.name.toLowerCase());

    const result = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !added.includes(item.name.toLowerCase())
    );

    setFiltered(result);
    setHighlightIndex(result.length > 0 ? 0 : -1);
  }, [searchTerm, rows]);

  // Key navigation
  useEffect(() => {
    const handler = (e) => {
      if (filtered.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const selected = filtered[highlightIndex];
        if (selected) {
          addItemToTable(selected);
          setSearchTerm("");
          setFiltered([]);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, highlightIndex]);

  return (
    <div className="relative w-full mb-3">
      <input
        type="text"
        placeholder="Search by Item Name"
        className="w-full px-3 py-2 border border-slate-400 outline-none focus:ring-1 focus:ring-purple-500 text-sm bg-white"
        ref={searchRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-slate-300 rounded shadow mt-1 z-50 max-h-60 overflow-y-auto">
          {filtered.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-2 flex justify-between text-sm cursor-pointer
                ${highlightIndex === index ? "bg-amber-100" : "hover:bg-amber-50"}`}
              onClick={() => {
                addItemToTable(item);
                setSearchTerm("");
                setFiltered([]);
              }}
            >
              <span>{item.name}</span>
              <span className="text-slate-700 font-medium">₹{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
