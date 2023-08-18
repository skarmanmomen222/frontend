import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  })
  const handelinput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const submit = (e) => {
    e.preventDefault()
    console.log(state);
  }
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center
    '>
      <div className='w-[360px]   rounded-xl p-4 py-8 drop-shadow-md '>

        <form onSubmit={submit}>

          <div className=' flex flex-col w-[300px] gap-2'>
            <label htmlFor="email" className='text-md font-semibold'>Email*</label>
            <input type="email" name='email' id='email' className='rounded-full 
            text-md  
             border-b 
              border-b-slate-400
               outline-none px-5 
               py-2 mb-6'
              placeholder='Enter your email'
              onChange={handelinput} value={state.emai
              }
            />
          </div>
          <div className='  flex flex-col w-[300px] gap-2'>
            <label htmlFor="password" className='text-md font-semibold'>Password*</label>
            <input type="password" name='password' id='password' className='rounded-full text-md   border-b  border-b-slate-400  outline-none px-5 py-2 mb-3 ' placeholder='Enter your password'
              onChange={handelinput} value={state.password}
            />
          </div>
          <button className='w-[300px] rounded-full  px-4 py-2  mt-3   border text-md border-slate-400 font-bold text-gray-700 hover:bg-slate-600 hover:text-white mb-5'>
            Sign in
          </button>



        </form>
      </div>
    </div>
  )
}

export default Login
