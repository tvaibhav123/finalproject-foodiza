import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import store from "./Store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import NotFound from "./Components/404/NotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Welcome from "./Components/Welcome/Welcome";
import Cart from "./Components/Cart/Cart";
import OrderHistory from "./Components/Orders/OrderHistory";



function App() {
   const isUserLoggedIn = useSelector(state => state.Auth.isLoggedIn);
   return (
      <div>
         <BrowserRouter>
            <Header/>
            <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/welcome" element={isUserLoggedIn ? <Welcome/> : <Navigate to="/login"/>}/>
               <Route path="/cart" element={isUserLoggedIn ? <Cart/> : <Navigate to="/login"/>}/>
               <Route path="/orders" element={isUserLoggedIn ? <OrderHistory/> : <Navigate to="/login"/>}/>
               <Route path="*" element={<NotFound/>}></Route>
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
