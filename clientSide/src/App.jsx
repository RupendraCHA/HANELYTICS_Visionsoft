// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './components/SignIn/signUp.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import InitialPage from './components/InitialPage/InitialPage.jsx'
import DataModels from './components/dataModels/dataModels.jsx'
import DataModeling from './components/DataModelingPage/DataModeling.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Footer from "./Footer/Footer.jsx"

function App() {
  return (<>
        <ToastContainer />
        <Routes>
          <Route exact path='/' element={<InitialPage />}></Route>
          <Route exact path='/register' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          {/* <Route exact path='/dataModels' element={<DataModels />}></Route> */}
          <Route exact path='/dataModeling' element={<DataModeling />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
  )
}

export default App
