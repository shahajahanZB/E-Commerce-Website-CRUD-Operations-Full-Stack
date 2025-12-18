import { useEffect, useState } from "react";
import ProductDescription from "./product-desc.tsx";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  tags: { id: number; name: string }[];
}

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // UPDATE state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    is_active: true,
  });

  useEffect(() => {
    fetch("http://192.168.3.147:8000/store/products/")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  // =====================
  // DELETE PRODUCT
  // =====================
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(
        `http://192.168.3.147:8000/store/products/${id}/delete/`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  // =====================
  // START EDIT
  // =====================
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      is_active: product.is_active,
    });
  };

  // =====================
  // UPDATE PRODUCT
  // =====================
  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(
        `http://192.168.3.147:8000/store/products/${id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...editForm } : product
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  return (
    <div
      className="product-list"
      style={{
        border: "3px solid",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 className="product-card-title" style={{ paddingLeft: "20px" }}>
        Product List
      </h2>

      <div className="products-container">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${
              !product.is_active ? "inactive" : ""
            }`}
          >
            {editingId === product.id ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: +e.target.value })
                  }
                />

                <input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stock: +e.target.value })
                  }
                />

                <label>
                  Active:
                  <input
                    type="checkbox"
                    checked={editForm.is_active}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        is_active: e.target.checked,
                      })
                    }
                  />
                </label>

                <br />

                <button
                  className="save-btn"
                  onClick={() => handleUpdate(product.id)}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="product-card-title">{product.name}</h3>

                <ProductDescription description={product.description} />

                <p>Price: {product.price}/-</p>
                <p>Quantity: {product.stock}</p>
                <p>Active: {product.is_active ? "Yes" : "No"}</p>

                <div className="tags">
                  <span>Tags: </span>
                  {product.tags.map((tag) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </div>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
