import { useContext, useState } from "react";
import useProduct from "../../Hook/useProduct";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Products = () => {
    const { user } = useContext(AuthContext);
    const { products, error, isLoading, refetch } = useProduct();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (products.length === 0) {
        return <div>No products available</div>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to remove this Course!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        refetch();
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Deleted.", "success");
                        }
                    });
            }
        });
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        console.log("Updating product:", selectedProduct); // Debugging
        fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedProduct),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update product");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Response from server:", data); // Debugging
                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Product updated successfully.", "success");
                    refetch();
                    setIsModalOpen(false);
                } else {
                    Swal.fire("Error!", "No changes were made.", "error");
                }
            })
            .catch((error) => {
                console.error("Error updating product:", error); // Debugging
                Swal.fire("Error!", "Failed to update product.", "error");
            });
    };
    

    return (
        <div className="mt-20">
            <h1 className="text-6xl text-center">Products</h1>
            <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-lg font-semibold">${product.price}</p>
                                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    Add to Cart
                                </button>
                                {user && (
                                    <div className="flex justify-center gap-3 mt-4">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={selectedProduct.name}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                value={selectedProduct.description}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                value={selectedProduct.price}
                                onChange={(e) =>
                                    setSelectedProduct({ ...selectedProduct, price: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
