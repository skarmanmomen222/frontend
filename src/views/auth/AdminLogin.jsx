import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { admin_login, clearMsg } from '../../store/reducers/authReducers'
import { HashLoader } from "react-spinners"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loader, error, success } = useSelector(state => state.auth)
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
    dispatch(admin_login(state))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearMsg())
    }
    if (success) {
      toast.success(success)
      navigate("/")
      dispatch(clearMsg())
    }
  }, [error, success])


  const btnCss = {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto"
  }
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center
    '>
      <div className='w-[360px]   rounded-xl p-4 py-8 drop-shadow-md '>

        <div className='flex mb-2'>
          <h1 className='text-2xl font-bold text-gray-600'>shopp.<span className='text-orange-900'>my</span></h1>
        </div>

        <form onSubmit={submit}>

          <div className=' flex flex-col w-[300px] gap-2'>
            <label htmlFor="email" className='text-md font-semibold'> </label>
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
            <label htmlFor="password" className='text-md font-semibold'> </label>
            <input type="password" name='password' id='password' className='rounded-full text-md   border-b  border-b-slate-400  outline-none px-5 py-2 mb-3 ' placeholder='Enter your password'
              onChange={handelinput} value={state.password}
            />
          </div>

          <button className='w-[300px]  rounded-full   px-4  py-2   mt-3   text-md border-slate-400 font-bold  text-gray-700 border-b  mb-5
          '
            disabled={loader ? true : false}>
            {
              loader ?
                <HashLoader color="gray" cssOverride={btnCss} size={17} /> :
                "Login"
            }
          </button>



        </form>
      </div>
    </div>
  )
}

export default AdminLogin
