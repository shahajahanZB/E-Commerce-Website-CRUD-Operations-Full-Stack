import React, { useState } from "react";
import axios from "axios";

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    stock: "",
    tags: ""
  });

  const onFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.3.147:8000/store/products/",
        {
          name: formData.productName,
          description: formData.productDescription,
          price: Number(formData.price),
          stock: Number(formData.stock),
          tags: formData.tags.split(",")
        }
      );

      console.log("Product created:", response.data);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
  <div className="create-product-page">
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Create Product</h2>

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
        <label>Product Description</label>
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

      <button type="submit" className="submit-btn">
        Create Product
      </button>
    </form>
  </div>
);
};
export default CreateProductPage;