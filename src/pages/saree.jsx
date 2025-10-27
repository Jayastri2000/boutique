import React from "react";
// import { useCart } from "./cartprovider";
import { Link } from "react-router-dom";

const Saree = ({ products = [], category }) => {

  const filtered = products.filter(item => item.Category?.toLowerCase() === category.toLowerCase());

  if (!filtered.length) return <p>No products found.</p>;

  return (
    <div>
      <h2 style={{textAlign:"center", color:"green"}}>{category}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filtered.map(item => (
          <div key={item.id} style={{ width: "200px", textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          <Link to={`/product/${item.id}`} style={{ marginRight: "5px" }}><button className="view-details">View Details</button></Link>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saree;
