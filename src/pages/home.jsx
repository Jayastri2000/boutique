import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../components/homepage.css';

const Home = ({products=[]}) => {

useEffect(() => {
  console.log("Loaded products:", products);
}, [products]);


const saree = products.filter(item => item.Category?.toLowerCase() === "saree");
  const western = products.filter(item => item.Category?.toLowerCase() === "western");
	const bridal=products.filter(item=>item.Category?.toLowerCase() === "bridal");
	const lehanga=products.filter(item=>item.Category?.toLowerCase()==="lehanga");
	const bangles=products.filter(item=>item.Category?.toLowerCase() === "bangles");
const salwar = products.filter(item => item.Category?.toLowerCase() === "salwar");

  const PreviewSection = ({  items, linkTo }) => (
    <div style={{ marginBottom: "30px" }} className="products">
      
      <div className='card'>
        {items.slice(0, 1).map(item => (
          <div key={item.id} >
            <Link to={linkTo}>
              <img
                src={item.image} // must be full API URL
                alt={item.title}
              />
            </Link>
            <p>{item.Category}</p>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div className='homepage'>
      <img src='https://rishiboutique.in/cdn/shop/files/file_00000000030861f7b0b0f5e2f4274c0a.png?v=1756322834&width=1100'  width="100%"/>

	 <div className="products">
        {/* {products.length === 0 ?(<p>No products available</p>): (
          products.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}  //  use backticks, not quotes
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <img src={item.image} alt={item.title} width="500" />
                <h3>{item.title}</h3>
                <p>Rs: {item.price}</p>
              </div>
            </Link>
          ))
        )} */}

		<div >
			
			<PreviewSection title="Saree" items={saree} linkTo="/saree" />  
		
		</div>
		<div >
	    	<PreviewSection title="Western" items={western} linkTo="/western" /> 
		</div>
		<div >
			<PreviewSection title="bridal" items={bridal} linkTo="/bridal"/>
		</div> 
		<div >
			<PreviewSection title="lehanga" items={lehanga} linkTo="/lehanga"/>
		</div>
		<div >
			<PreviewSection title="bangles" items={bangles} linkTo="/bangles"/>
		</div>
		 <div >
			<PreviewSection title="salwar" items={salwar} linkTo="/salwar"/>
		</div>
       
      </div>
    </div>
    
  );

  
}

export default Home