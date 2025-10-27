import React, { useState, } from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

    const navLinks = [
			'Saree',
			'Western',
			'Bridal',
			'Lehanga',
			'Bangles',
			'Salwar'
			
];

function Logo({setSearchTerm,handleCategory}){
		const [localSearch,setLocalSearch]=useState("");
		const [activeCategory,setActiveCategory]=useState("Saree");
		// const filteredLinks=navLinks.filter((link)=>link.toLowerCase().includes(localSearch.toLowerCase()));

		const handleClick=(link)=>{
			setActiveCategory(link);
			handleCategory(link);
		}


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // log out from Firebase
	  alert(' logout successfully');
      navigate("/");       // redirect to home page
    } catch (error) {
      console.error(error);
    }
  };


  return(
    <div>
        <nav className='nav'>
            	<Link to="/"><h2 className='rishi'>Rishi Boutique</h2></Link>
			<form  className='forms' action="get" onSubmit={(e)=>e.preventDefault()}>
				<input type="text" placeholder= "Select catergories.." className="input1" value={localSearch} onChange={(e)=>{setLocalSearch(e.target.value);setSearchTerm(e.target.value)}} /><span className="material-icons" id="material">search</span>
			</form>
            <ul>
				<li><Link to="/contact"><span className="material-icons" id= "materialss" >person</span></Link></li>
                <li><Link to="/cartpage"><span className="material-icons" id="materialss">shopping_bag</span></Link></li>
                 <button onClick={handleLogout} className="logout-btn">
              <span className="material-icons">logout</span>
            </button>
			</ul>
        </nav>
			<div className="header">
				<ul className="nav-links">
					{navLinks.map((link,i) => (
						<li key={i}>
						
						 <Link
      to={`/${link.toLowerCase()}`} // e.g., "/saree"
      onClick={() => handleClick(link)}
      className={`category-btn ${activeCategory === link ? "active" : ""}`}
    >
      {link}
    </Link>
						</li>
					))}
				</ul>
			</div>
    </div>
  )
}

export default Logo