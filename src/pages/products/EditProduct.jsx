import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Images
import img1 from "../../assets/product-img/1.jpg";
import img2 from "../../assets/product-img/2.jpg";
import img3 from "../../assets/product-img/3.jpg";
import img4 from "../../assets/product-img/4.jpg";
import img5 from "../../assets/product-img/5.jpg";
import img6 from "../../assets/product-img/6.jpg";

export default function EditProduct() {

    const { id } = useParams();

    // Example product list (replace with context or API later)
    const products = [
        { id: "1", name: "Chicken Biryani", price: "180.00", category: "Non veg", image: img1, gst: 5 },
        { id: "2", name: "Veg Fried Rice", price: "120.00", category: "Veg", image: img2, gst: 5 },
        { id: "3", name: "Mutton Curry", price: "260.00", category: "Non veg", image: img3, gst: 12 },
        { id: "4", name: "Paneer Butter Masala", price: "220.00", category: "Veg", image: img4, gst: 12 },
        { id: "5", name: "Chicken Lollipop", price: "150.00", category: "Non veg", image: img5, gst: 5 },
        { id: "6", name: "Veg Manchurian", price: "140.00", category: "Veg", image: img6, gst: 5 },
    ];

    const [product, setProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const found = products.find((p) => p.id === id);
        setProduct(found);
        setImagePreview(found?.image || null);
    }, [id]);

    if (!product) return <p>Loading product...</p>;

    // -------------------- IMAGE UPLOAD --------------------
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowed = ["image/png", "image/webp", "image/jpeg", "image/avif"];
        if (!allowed.includes(file.type)) {
            toast.error("PNG, JPG, WebP, Avif only");
            return;
        }

        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImagePreview(null);
    };

    // -------------------- SAVE CHANGES --------------------
    const saveChanges = () => {
        toast.success("Product updated successfully!");
        // later: push changes to context/backend
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Edit Product</h1>
                    <p className="text-sm text-slate-500">Update your product details below.</p>
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

                    {/* GRID INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Product Name */}
                        <div className="space-y-2">
                            <label htmlFor="productName" className="text-sm font-medium text-slate-700 mb-2 inline-block">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                defaultValue={product.name}
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
                                    defaultValue={product.category}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-white
                focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                >
                                    <option value="">Select category</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non veg">Non-Veg</option>
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
                                defaultValue={product.price}
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
                                defaultValue={product.gst}
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


                    {/* IMAGE UPLOAD */}
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700 mb-2 inline-block">
                            Product Image
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
                                        className="w-full h-full object-contain p-3"
                                    />

                                    {/* Remove Image Button */}
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

                            {/* Upload Input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>


                    {/* BUTTONS */}
                    <div className="flex justify-center gap-4">

                        {/* SAVE BUTTON */}
                        <button
                            type="button"
                            onClick={saveChanges}
                            className="px-6 py-3 bg-[#554de9] text-white rounded-lg flex items-center gap-2
                            hover:bg-blue-600 transition-all cursor-pointer"
                        >
                            <i className="ri-save-line text-lg"></i>
                            Save Changes
                        </button>

                        {/* RESET BUTTON */}
                        <button
                            type="reset"
                            onClick={() => setImagePreview(product.image)}
                            className="px-6 py-3 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center gap-2
                            hover:bg-red-500 hover:text-white cursor-pointer"
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
