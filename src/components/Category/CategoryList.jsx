import React from 'react'
import { Link } from 'react-router-dom'

const CategoryList = ({setCategory }) => {

    const categor2 = [
        {
            name: "Home",
            path: "/"
        
        },
        {
            name: "Shop",
            path: "/shop"
        },
        {
            name: "ALL categories",
            path: "/categories"
        },
        {
            name: " Blog",
            path: "/blog"
        },
       
    ]
    return (
        <>
        <div>
            <div className=" w-full h-10  ">
                <ul className='flex w-[100%] whitespace-nowrap mx-auto  justify-start ml-2 gap-x-5 items-center'>
                 {
                    categor2 && categor2.map((c) => (
                        <Link to={c?.path}
                        // onClick={() => setCategory(c.name)}
                        className={`border-b border-b-slate-50   font-mono py2 hover:border-b-yellow-300`}>
                        <li>{c.name}</li>
                        </Link>
                    ))
                 }
                </ul>
            </div>
        </div>
        </>
       
    )
}

export default CategoryList
