import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Login from './Mycomponent/Login';
import Layout from './Mycomponent/Layout';
import Index from './Mycomponent/index'
import Register from './Mycomponent/Register';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import Account from './Mycomponent/Account';
import Booking from './Mycomponent/Booking';
import Information from './Mycomponent/Information';



axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Account />} />
            <Route path='/booking/:place_name' element={<Booking />} />
            <Route path='/Information/:placeId' element={<Information/>}/>
            
          </Route>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login/>}/>
          <Route/>
        </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
