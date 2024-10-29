import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./logIn.css"
import Navbar from '../Navbar/Navbar'
import { toast } from 'react-toastify'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [failed, setFailed] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3002/home")
            .then(result => {
                console.log(result)
                if (result.data !== "Successful") {
                    // toast.success(result.data)
                    navigate("/login")
                } else {
                    navigate("/home")
                }

            })
            .catch(err => console.log(err))
    }, [])



    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3002/login', { email, password })
            .then(result => {
                console.log(result.data)
                if (result.data === "Login Successful!") {
                    toast.success(result.data)
                    navigate("/home")
                } else {
                    toast.error(result.data)
                    navigate("/login")
                }
                // else {
                //     console.log("Enter Valid Details")
                // }

            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Navbar />
            <div className='bg-container-login d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className='bg-secondary p-4 text-white rounded-4 login-card' style={{ opacity: "0.9" }}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            {/* <img src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1724411202/free-images_klxje8.jpg" className="w-100" /> */}
                            <input type='text'
                                placeholder='Enter login address'
                                autoComplete='off'
                                name='email'
                                required
                                className='rounded-0 form-control login-user-input'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input type='password'
                                placeholder='Enter Password'
                                autoComplete='off'
                                required
                                name='password'
                                className='rounded-0 form-control login-user-input'
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <button type='submit' className='btn btn-primary bg-primary w-100 rounded-0' style={{ fontWeight: "600" }}>
                            Login
                        </button>
                    </form>
                    {/* <p>{failed}</p> */}
                    <p>Don't have an account?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-warning rounded-0 text-decoration-none' style={{ fontWeight: "600" }}>
                        Register
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Login
