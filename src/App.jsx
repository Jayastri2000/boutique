import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import "./App.css";

import Home from "./pages/home";
import Contact from "./pages/contact";
import Nav from "./components/navbar";
import About from "./pages/about";
import Shipping from "./pages/shipping";
import Privacy from "./pages/privacy";
import Policy from "./pages/policy";
import Terms from "./pages/terms";
import Footer from "./components/footer";

import SareeList from "./pages/saree";
import WesternList from "./pages/western";
import BridalList from "./pages/bridal";
import Lehanga from "./pages/lehanga";
import SalwarList from "./pages/salwar";
import Bangles from "./pages/bangles";

import CartProvider from "./pages/cartprovider";
// import ProductList from "./pages/productlist";
import CartPage from "./pages/cartpage";
import SingleProduct from "./pages/singleproduct";


function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filter,setFilter] = useState('all');
  const [user,setUser]=useState(null);
  const auth=getAuth();



  
  useEffect(() => {
    // This runs whenever the auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User logged in:", currentUser.uid);
        setUser(currentUser); // now you can pass this to CartProvider
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, [auth]);





  // ✅ Load product list from API
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/68bff75b43b1c97be93c2cc2", {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2a$10$Runh2ddM6g6LUCHKRi7ak.CRyO6xRTF/GHYi2ndS5jXxHY/wKRMXi",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.record))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // Filter products by search + category
  const filteredProducts = products.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const cat = item.Category?.toLowerCase() || "";
    const search = searchTerm?.toLowerCase() || "";
    const selectedCat = category?.toLowerCase() || "";
    const selectedFilter =filter?.toLowerCase() ||"";

    // const matchSearch = title.includes(search) || cat.includes(search);
    
  const matchSearch = title.includes(search) || cat.includes(search);

  // ✅ Ignore category when searching
  const matchCategory = search
    ? true
    : selectedCat
    ? cat === selectedCat
    : true;
    // const matchCategory = selectedCat ? cat === selectedCat : true;
    const matchFilter =selectedFilter === "all" || cat === selectedFilter;
    return matchSearch && matchCategory && matchFilter;
  });


  // const filteredProduct = filter === "all"
  // ? products
  // : products.filter(p => p.Category.toLowerCase() === filter.toLowerCase());


  return (
    <BrowserRouter>
      {/* {user ? <p>Welcome, {user.email}</p> : <p>Please log in</p>} */}
      <CartProvider user={user}>
        <Nav setSearchTerm={setSearchTerm} handleCategory={setCategory} />

        <Routes>
          {/* <Route path="/" element={<Home products={filteredProducts} />} /> */}
          <Route
  path="/"
  element={<Home products={filteredProducts} setCategory={setCategory} />}
/>


		  <Route path="/saree" element={<SareeList products={products} category="saree"/>}/>
		  <Route path="/western" element={<WesternList products={products} category="western"/>}/>
		  <Route path="/bridal" element={
		  <BridalList products={products} category="bridal"/>}/>
		  <Route path="/lehanga"element={
		  <Lehanga products={products} category="lehanga"/>}/>
		  <Route path="/salwar" element={
		  <SalwarList products={products} category="salwar"/>}/>
		<Route path="/bangles" element={<Bangles products={products} category="bangles"/>}/>


          <Route path="/products" element={<CartPage products={filteredProducts} />} /> {/*  fixed duplicate path */}
          <Route path="/product/:id" element={<SingleProduct products={products} />} />
          <Route path="/cartpage" element={<CartPage  />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
