import {useEffect, useState} from 'react';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  tags: {id: number; name: string;}[];
}
export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() =>{
    fetch('http://192.168.3.147:8000/store/products/')
    .then((res) => res.json())
.then((data:Product[])=>{
    setProducts(data);
    setLoading(false);
});
  },[]);
  if (loading) return <p>Loading products...</p>;
  return (
    <div className="product-list" style={{border: "3px solid", padding: "20px", borderRadius: "8px", backgroundColor: "bluelight", boxShadow: "4 8px 8px rgba(0, 0, 0, 0.5)"}}>
        <h2 className='product-card-title' style={{paddingLeft: "20px"}}>Product List</h2>
        <div className="products-container">
{products.map((product)=>{
    // product.name=product.title;
    // product.is_active=true;
    return (
        <div key={product.id} className={`product-card ${!product.is_active ? 'inactive' : ""} `}>
            {!product.is_active}
            <h3 className="product-card-title">{product.name}</h3>
            <p className='desc'>{product.description}</p>
            <p>Price: {product.price}/-</p>
            <p>Quantity: {product.stock}</p>
            <p>Active: {product.is_active ? "Yes" : "No"}</p>
            <div className="tags">
                {product.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag.name}</span>
                ))}
            </div>

        </div>
    );
})}
        </div>
        </div>
  );
};