import React from 'react'
import { Link } from 'react-router-dom'
import  Search   from '../components/Search'

const Nav = () => {
    return (
        <nav className=' '>
            <div className=" w-full   px-[5%] flex justify-between items-center py-5">
                <div>
                    <h1 className='text-2xl font-bold text-orange-500'>Curtfashion</h1>
                </div>
                <div>
                    <ul className='flex  gap-5 text-md font-bold text-gray-700'>
                        <Link to="/" className="border-b border-b-orange-500"> <li>Home</li></Link>
                        <Link to="/products"><li>Product</li></Link>
                       
                        <Link to="/contact"><li>Contact</li></Link>
                        <Link to="/acount"><li>About</li></Link>
                         
                    </ul>
                </div>
                <div id='/search'>
                  <Search/>
                </div>
                <div className='flex gap-7 text-gray-500 text-xl'>
                   
                    <span><i class="fa-solid fa-cart-arrow-down  cursor-pointer"></i></span>
                   <Link to="/acount"> <span><i class="fa-solid fa-user  cursor-pointer"></i></span></Link>
                </div>
            </div>
        </nav>

    )
}

export default Nav
