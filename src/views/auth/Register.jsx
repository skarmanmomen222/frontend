import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [state, setState]= useState({
    name: "",
    email: "",
    password: ""
  })

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault()
    console.log(state);
  }
  return (
    <>
      <div className='min-w-screen min-h-screen flex justify-center items-center
    '>
        <div className='w-[360px]   rounded-xl p-4 py-8 drop-shadow-md '>
          <div className='flex flex-col gap-2 mb-4'>
            <h1 className='text-xl text-gray-700 font-bold italic'>Register</h1>
            <h2 className='text-md text-gray-400'>Welcome to ecommerce</h2>
          </div>

          <form onSubmit={submit}>
            <div className='  flex flex-col w-[300px] gap-2 border-none'>
              <label htmlFor="name" className='text-md font-semibold  italic'>Name*</label>
              <input onChange={inputHandel} value={state.name} required type="text" name='name' id='name' className='rounded-full text-md  borde border-b  border-b-slate-400 outline-none px-5 py-2 mb-3 ' placeholder='Enter your name' />
            </div>
            <div className='  flex flex-col w-[300px] gap-2'>
              <label htmlFor="email" className='text-md font-semibold italic'>Email*</label>
              <input  onChange={inputHandel} value={state.email}  required type="email" name='email' id='email' className='rounded-full text-md  borde border-b  border-b-slate-400 outline-none px-5 py-2 mb-3 ' placeholder='Enter your email' />
            </div>
            <div className='  flex flex-col w-[300px] gap-2'>
              <label htmlFor="password" className='text-md font-semibold italic'>Password*</label>
              <input   onChange={inputHandel} value={state.password} required type="password" name='password' id='password' className='rounded-full text-md   border-b  border-b-slate-400  outline-none px-5 py-2 mb-3 ' placeholder='Enter your password' />
            </div>
            <button className='w-[300px] rounded-full  px-4 py-2  mt-3   border text-md border-slate-400 font-bold text-gray-700 hover:bg-slate-600 hover:text-white mb-5'>
              Sign Up
            </button>

            <div >
              <p className='text-gray-700 flex gap-2'>Already have an account?
                <span className='text-blue-500 font-bold  '>
                  <Link to="/login">Sign in
                  </Link>
                </span>  </p>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Register
