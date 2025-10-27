import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../components/contact.css';
import app from "../firebase";



const  Contact=()=>{

const auth = getAuth(app);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin,setIsLogin]=useState(true);
	const navigate=useNavigate();
	const loginUser = (e) => {

	  e.preventDefault();
		console.log("Email entered:", email);
		console.log("Password entered:", password);

		if (!email || !password) {
			alert("Please enter both email and password");
			return;
		}

		if(isLogin){
			// stop page refresh
			signInWithEmailAndPassword(auth, email, password)
			.then((userCredential)=>{
				console.log("User logged in:", userCredential.user);
				alert("Login successful!");
				navigate('/');
			})
	
			.catch((error) =>{
				console.error("Error:", error.message);
				alert("Login failed: " + error.message);
			});
  		}
		
		else{
			createUserWithEmailAndPassword(auth,email,password)
			.then((userCredential)=>{
				console.log("user registered",userCredential.user);
				alert("signup successful! you can now login");
				setIsLogin(true);
			})

	.catch((error)=>{
		console.error("Signup error",error.message);
	alert("Signup failed:"+error.message);
  });
	}
	}

	

  return (
    <div className="sign-in">
		<div>
			<form action="get" onSubmit={loginUser}>
				<h1 style={{textAlign:"center",marginBottom:"50px"}}>Rishi Boutique</h1>
				<h3 className="space">{isLogin?"Login":"Signup"}</h3>
				<label name="e-mail">E-mail</label><br/>
				<input type="e-mail" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required/><br/>
				<label name="password" >Password</label><br/>
				<input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /><br/>
				<button type="submit" className='login'>{isLogin ? "Login" : "Signup"}</button>
				<ul className='sign-page'>
				<li><Link to="/privacy">Privacy Policy</Link></li>
				<li><Link to="/terms">Terms of Service</Link></li>
	  		</ul>
			</form>
			<p>
				{isLogin?"Don't have an account" : "Already have an account"} 
				 <button type="button" onClick={()=>setIsLogin(!isLogin)} style={{background:"none",color:"blue",border:"none",cursor:"pointer"}}>{isLogin ? "Signup " : "Login " }</button> {isLogin?"here":"here"}
			</p>
		</div>
    </div>
  );
}

export default Contact