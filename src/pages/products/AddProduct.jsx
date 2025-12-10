import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {

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

        // optional: revoke previous object URL to avoid memory leak
        if (imagePreview) {
            try { URL.revokeObjectURL(imagePreview); } catch (err) { /* ignore */ }
        }

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        // clear input value (so re-uploading same file later triggers change)
        e.target.value = "";
    };


    const removeImage = () => {
        setImagePreview(null);
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Add New Product</h1>
                    <p className="text-sm text-slate-500">Add new product details below.</p>
                </div>

                <Link to="/products/product-list" className="Btn">
                    <div className="text">
                        Product List <i className="ri-list-indefinite font-normal"></i>
                    </div>
                </Link>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-200
                shadow-[0_8px_30px_rgb(0,0,0,0.06)] 
                hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] 
                transition-all duration-500">

                <form className="space-y-8">

                    {/* INPUT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label htmlFor="productName" className="text-sm font-medium text-slate-700 mb-2 inline-block">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3
                                focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 mb-2 inline-block">Category</label>
                            <div className="relative">
                                <select
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-white
                                    focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                >
                                    <option value="">Select category</option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-Veg</option>
                                </select>
                                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 mb-2 inline-block">Price</label>
                            <input
                                type="text"
                                id="price"
                                inputMode="numeric"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3
                            focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter price"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </div>



                        {/* GST */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 mb-2 inline-block">GST (%)</label>
                            <input
                                type="text"
                                id="gst"
                                inputMode="numeric"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3
                            focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter GST percentage"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </div>


                    </div>

                    {/* UPLOAD BOX WITH WORKING PREVIEW + DELETE */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 mb-2 inline-block">
                            Upload Product Image
                        </label>

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

                    {/* BUTTONS */}
                    <div className="flex items-center justify-center gap-3 pt-5">

                        {/* SAVE BUTTON */}
                        <button
                            className="flex items-center gap-2 px-6 py-3 rounded-lg
                            bg-[#554de9] text-white font-medium
                            hover:bg-green-600 cursor-pointer active:scale-[0.97]
                            transition-all duration-200 border border-transparent
                            focus:outline-none focus:ring-4 focus:ring-blue-200 "
                        >
                            <i className="ri-save-line text-lg"></i>
                            Save Product
                        </button>

                        {/* RESET BUTTON */}
                        <button
                            type="reset"
                            onClick={() => setImagePreview(null)}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg
                            bg-red-100 text-red-700 font-medium border border-red-300
                            hover:bg-red-500 hover:text-white active:scale-[0.97]
                            transition-all duration-200 
                            focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer"
                        >
                            <i className="ri-refresh-line text-lg"></i>
                            Reset
                        </button>

                    </div>


                </form>
            </div>

        </div>
    );
}
