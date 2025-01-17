import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);  // Menambahkan state untuk error

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts(); // Memanggil kembali getProducts setelah menghapus produk
    } catch (error) {
      setError("Failed to delete product.");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">
        Add New
      </Link>

      {error && <p className="has-text-danger">{error}</p>} {/* Menampilkan pesan error */}

      <div className="columns is-multiline mt-2">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="column is-one-quarter" key={product.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.url} alt={product.name} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.name}</p>
                    </div>
                  </div>
                </div>

                <footer className="card-footer">
                  <Link to={`edit/${product.id}`} className="card-footer-item">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="card-footer-item"
                  >
                    Delete
                  </button>
                </footer>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
