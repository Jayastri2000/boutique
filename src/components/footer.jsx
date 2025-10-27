import React from 'react'
import './footer.css';

import { Link } from 'react-router-dom'
import {FaInstagram,FaYoutube} from 'react-icons/fa';
const footer = () => {
  return (
		<div>
			<div className="footer-grid">
				<div className='grid1'>
					<h3>Rishi Boutique</h3>
					<ul>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/shipping'>shipping policy</Link></li>
					<li><Link to='/policy '>return policy</Link></li>
					<li><Link to='/privacy '>privacy policy</Link></li>
					<li><Link to='/terms'>terms of service</Link></li>
					</ul>
					
				</div>
				<div className='grid2'>
					<h3>contact details</h3>
					<ul>
						<li>Whatsapp Chat:</li>
						<li >Email:<span style={{ textTransform: "lowercase" }}> rishicouture@gmail.com</span></li>
						<li>For New Arrivals please visit our Insta and Youtube</li>
					</ul>
				</div>
    		</div>
			<div className='icons'>
				<a href="https://instagram.com" target="_blank" rel="noreferrer">
					<FaInstagram /></a>
				<a href="https://youtube.com" target="_blank" rel="noreferrer">
				<FaYoutube /></a>
			</div>
			<div className='copyright'>
				<p>© 2025, Rishi Boutique Powered by Shopify - <Link to='/shipping'>shipping policy</Link> - <Link to='/policy '>return policy</Link> - <Link to='/privacy '>privacy policy</Link> - <Link to='/terms'>terms of service</Link></p>
			</div>
		</div>
  )
}

export default footer