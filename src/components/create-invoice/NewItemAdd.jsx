import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";


export default function NewItemAdd() {

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        // allowed MIME types
        const allowed = ["image/png", "image/webp", "image/jpeg", "image/avif"];

        // prefer MIME type but fallback to extension if missing
        const fileType = file.type;
        const ext = file.name.split(".").pop()?.toLowerCase();

        const isAllowedByMime = allowed.includes(fileType);
        const isAllowedByExt = ["png", "webp", "jpg", "jpeg", "avif"].includes(ext);

        if (!isAllowedByMime && !isAllowedByExt) {
            toast.error("Only PNG, JPG, WebP or AVIF files are allowed.");
            // clear the input value so user can re-select same file if needed
            e.target.value = "";
            return;
        }
        if (imagePreview) {
            try { URL.revokeObjectURL(imagePreview); } catch (err) { /* ignore */ }
        }

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
        e.target.value = "";
    };


    const removeImage = () => {
        setImagePreview(null);
    };
    const ShortcutBtn = ({ label, keyLabel, danger, onClick }) => (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-xs border cursor-pointer rounded bg-white ${danger ? "text-red-500" : "text-blue-500"
                }`}
        >
            {label} <span className="text-gray-400">[{keyLabel}]</span>
        </button>
    );
    const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
    const resetBtnRef = useRef(null);
    useEffect(() => {

        const handleKeyDown = (e) => {
            // CTRL + I → Open Modal
            if (e.ctrlKey && e.key.toLowerCase() === "i") {
                e.preventDefault();
                setIsNewItemModalOpen(true);
            }

            if (!isNewItemModalOpen) return;

            // ESC → Click reset button
            if (e.key === "Escape") {
                resetBtnRef.current?.click();
            }

            // ENTER → Save
            if (e.key === "Enter") {
                e.preventDefault();
                toast.success("New product added!");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [isNewItemModalOpen]);

    return (
        <div className="flex gap-2 mb-3">
            <ShortcutBtn label="+ New Item" keyLabel="CTRL + I" onClick={() => setIsNewItemModalOpen(true)} />
            {/* ---------------- NEW ITEM MODAL ---------------- */}
            {isNewItemModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-[99] flex items-center justify-center p-4">
                    <form className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 relative">

                        {/* Close Button */}
                        <button
                            className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => setIsNewItemModalOpen(false)}
                        >
                            <i className="ri-close-line text-3xl text-red-600"></i>
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

                        {/* FORM GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Product Name */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2
                            focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    placeholder="Enter product name" autoFocus
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-2">Category</label>
                                <div className="relative">
                                    <select className="w-full rounded-lg border border-slate-300 px-4 py-2 bg-white
                                    focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                        <option>Select category</option>
                                        <option>Food</option>
                                        <option>Grocery</option>
                                        <option>Medicine</option>
                                    </select>
                                    <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-2">Price</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2
                            focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    placeholder="Enter price"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                            </div>

                            {/* GST */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-2">GST (%)</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2
                            focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    placeholder="Enter GST percentage"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                            </div>
                        </div>

                        {/* IMAGE UPLOAD SECTION */}
                        <div className="mt-6">
                            <label className="text-sm text-gray-600 block mb-2">Upload Image</label>
                            <div
                                className={`relative w-full h-52 border border-dashed rounded-xl bg-white transition
                            ${imagePreview ? "border-slate-500" : "border-slate-500 hover:border-blue-500 cursor-pointer"}`}
                            >

                                {/* NO IMAGE */}
                                {!imagePreview && (
                                    <div className="flex flex-col items-center justify-center h-full pointer-events-none">
                                        <div className="w-12 h-12 rounded-full border border-slate-300 
                                        flex items-center justify-center mb-3">
                                            <i className="ri-upload-2-line text-xl text-slate-500"></i>
                                        </div>

                                        <p className="text-slate-700 text-sm">
                                            <span className="font-semibold text-blue-600">Click to upload</span> or drag & drop
                                        </p>

                                        <p className="text-xs text-slate-400 mt-1">
                                            PNG, JPG, WebP, Avif (MAX. 800×400px & Ratio - 4/3)
                                        </p>
                                    </div>
                                )}

                                {/* IMAGE PREVIEW */}
                                {imagePreview && (
                                    <div className="relative w-full h-full flex items-center justify-center">

                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-contain p-3 pointer-events-none"
                                        />

                                        {/* DELETE BUTTON */}
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 bg-red-50 shadow py-1.5 px-2
                                              rounded-full hover:bg-red-100 z-20 cursor-pointer"
                                        >
                                            <i className="ri-delete-bin-line text-red-500 text-xl"></i>
                                        </button>
                                    </div>
                                )}

                                {/* Hidden upload input → ONLY active if no preview */}
                                {!imagePreview && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                )}
                            </div>
                        </div>

                        {/* FOOTER BUTTONS */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button

                                className="px-4 py-2 cursor-pointer rounded border border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => setImagePreview(null)}
                                type="reset"
                                ref={resetBtnRef}
                            >
                                Reset [ESC]
                            </button>

                            <button className="px-4 py-2 cursor-pointer rounded bg-purple-600 text-white hover:bg-purple-700" onClick={() => toast.success("New product added!")} type="submit">Save Product [Enter]
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <ShortcutBtn label="Delete Item" keyLabel="DEL" danger />
        </div>
    )
}








