import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import NotFound from "./Components/404/NotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Welcome from "./Components/Welcome/Welcome";

function App() {
   return (
      <div>
         <Provider store={store}>
            <BrowserRouter>
              <Header/>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/welcome" element={<Welcome/>}/>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>
            </BrowserRouter>
         </Provider>
      </div>
   );
}

export default App;
