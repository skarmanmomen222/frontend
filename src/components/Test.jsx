import React, { useState } from 'react'

const Test = () => {
    const [show, setShow] = useState()
    return (

        <div className='w-full h-screen bg-slate-100 absolute'>
            <div className='w-[380px] h-[480px] overflow-hidden relative my-20 mx-auto bg-white p-5'>
                <div className='w-[220px] my-5 mx-auto relative shadow-lg box-border rounded-full   font-bold'>
                    <div className={

                        `  text-center ${show ? "left-[110px]" : "left-0"}
                        absolute top-0 left-0 w-[110px] bg-orange-500 h-[100%] rounded-full transition-all text-gray-700
                        `
                    }>
                    </div>
                    <button className={`
                    ${show ? " " : ""}
                    py-2
                    px-10 outline-none cursor-pointer relative`} type='button'
                        onClick={() => setShow(!show)}
                    >Login</button>
                    <button className={` relative px-2  text-white `}
                        onClick={() => setShow(!show)}
                        type='button'>register</button>
                </div>

                <form action="" className={`  
                ${show ? "-left-[400px]" : "left-[50px]"}
                top-[180px] absolute w-[280px]
                 left-14 transition-all`}>
                    <input className='w-full border px-2 py-2' type="name" placeholder='name' />
                    <input className='w-full  border px-2 py-2' type="email" placeholder='email' />
                    <input className='w-full  border px-2 py-2' type="password" placeholder='password' />
                    <button className='w-full px-4 py-2 bg-orange-500' type='submit'>submit</button>
                </form>

                <form action="" className={`
                   ${show ? "left-[45px]" : " "}
                top-[180px]
                left-96
                absolute w-[280px] transition-all 
                `}>
                    <input className='w-full border px-2 py-2' type="name" placeholder='name' />

                    <input className='w-full  border px-2 py-2' type="email" placeholder='email' />
                    <input className='w-full  border px-2 py-2' type="password" placeholder='password' />
                    <button className='w-full px-4 py-2 bg-orange-500' type='submit'>
                        register</button>
                </form>
            </div>
        </div>
    )
}

export default Test
