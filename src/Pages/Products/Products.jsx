// import React from 'react';

import { useContext } from "react";
import useProduct from "../../Hook/useProduct";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Products = () => {
  const { user } = useContext(AuthContext);

  const { products, error, isLoading, refetch } = useProduct();
  console.log(products);

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
    console.log(id);
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
              Swal.fire(
                "Deleted!",
                "Deleted.",
                "success"
              );
            }
          });
      }
    });
  }



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
                className="w-full h-64
                        object-cover rounded-t-lg"
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
                    <button onClick={() => handleDelete(product._id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
