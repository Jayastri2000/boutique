import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useCart } from "./cartprovider";
// import "../components/navbar";
import "../components/singleproduct.css";

const SingleProduct = ({ products }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = products.find((i) => i.id === parseInt(id));
    setProduct(p);
  }, [id, products]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async () => {
    await addToCart(product);
    navigate("/cartpage");
  };

  return (
    <div className="single-product">
          <div className="product-one">
			<img src={product.image} alt={product.title} style={{ width: 200, height: 250 }} />
			</div>
		<div className="button-one">
			<h2>{product.title}</h2>
			<p>${product.price}</p>
			<button className="button-ones" onClick={handleAddToCart}>Add to Cart</button>
		</div>
    </div>
  
  );
};

export default SingleProduct;
