import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    stock: "",
    tags: ""
  });

  /* 🔹 Fetch existing product */
  useEffect(() => {
    axios.get(`http://192.168.3.147:8000/store/products/${id}`)
      .then((res) => {
        setFormData({
          productName: res.data.title,
          productDescription: res.data.description,
          price: res.data.price,
          stock: res.data.stock || "",
          tags: res.data.tags?.join(",") || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product", err);
        setLoading(false);
      });
  }, [id]);

  /* 🔹 Handle change */
  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* 🔹 Submit update */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.patch(`http://192.168.3.147:8000/store/products/${id}/update/`, {
        title: formData.productName,
        description: formData.productDescription,
        price: Number(formData.price),
        stock: Number(formData.stock),
        tags: formData.tags.split(",")
      });

      alert("Product updated successfully!");
      navigate("/products-page");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
  <div className="update-product-page">
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Update Product</h2>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={onFormChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={onFormChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onFormChange}
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={onFormChange}
        />
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={onFormChange}
        />
      </div>

      <button type="submit" className="submit-btn update-btn">
        Update Product
      </button>
    </form>
  </div>
);
};

export default UpdateProductPage;
