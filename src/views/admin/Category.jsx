import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaEdit, FaTrash } from 'react-icons/fa'
import Pagination from '../Pagination'
import { GrClose } from 'react-icons/gr'
import { BsImage } from 'react-icons/bs'


const Category = () => {
    const [show, setShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)


    const [perPage, setPerPage] = useState(5)
    return (
        <div>
            <div className='px-2 lg:px-7 pt-5'>
                <div className='flex lg:hidden justify-between items-center mb-5 p-4  bg-[#283046] rounded-md'>
                    <h1 className='text-white font-semibold text-lg'>categories</h1>
                    <button onClick={(e) => setShow(true)} className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 text-white px-4 py-2 cursor-pointer rounded-sm text-sm'>Add</button>
                </div>
                <div className='flex flex-wrap w-full'>
                    <div className='w-full lg:w-7/12'>
                        <div className='w-full p-4  bg-[#283046] rounded-md'>

                            <div className='flex justify-between items-center'>
                                <select onChange={(e) => setPerPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                                    <option value="5">5</option>
                                    <option value="5">15</option>
                                    <option value="5">25</option>
                                </select>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                            </div>

                            <div className='relative overflow-x-auto'>
                                <table className='w-full text-sm text-left text-[#d0d2d6]'>
                                    <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                        <tr>
                                            <th scope='col' className='py-3 px-4'>No</th>
                                            <th scope='col' className='py-3 px-4'>Image</th>
                                            <th scope='col' className='py-3 px-4'>Name</th>
                                            <th scope='col' className='py-3 px-4'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [1, 2, 3, 4, 5, 6].map((d, i) => <tr key={i}>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    <img className='w-[45px] h-[45px]' src={d.image} alt="" />
                                                </td>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    <span>{d.name}</span>
                                                </td>
                                                <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                    <div className='flex justify-start items-center gap-4'>
                                                        <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                                        <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* pagination === */}
                            <div className='w-full flex justify-end mt-4 bottom-4 right-7 '>
                                <Pagination
                                    pageNumber={currentPage}
                                    setPageNumber={setCurrentPage}
                                    totalItem={50}
                                    parPage={perPage}
                                    showItem={4}
                                />
                            </div>

                            {/*==== pagination === */}
                        </div>
                    </div>

                    <div className={`w-[320px] lg:w-5/12 translate-x-0  lg:relative lg:right-0 fixed  ${show ? "right-2 md:w-[500px]" : "-right-[340px] "} z-[999] top-0 transition-all duration-500`}>
                        <div className='w-full pl-5 '>
                            <div className="'  bg-[#283046]  h-screen lg:h-auto px-3 py-3 lg:rounded-md text-white  ">

                                <div className='flex justify-between mb-2 items-center'>
                                    <h1 className='font-semibold text-xl mb-4 w-full '>Add Category</h1>
                                    <div className='block lg:hidden ' onClick={(e) => setShow(false)}>
                                        <span className='text-white'><GrClose className='text-white' /></span>
                                    </div>
                                </div>
                                <form action="">
                                    <div className='flex flex-col w-full   gap-1 mb-3'>
                                        <label htmlFor="name">Category name</label>
                                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='category name' id='name' name='category_name' />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-white'>
                                            <span><BsImage /></span>
                                            <span>select image</span>
                                        </label>
                                    </div>
                                    <input type="file" name='image' id='image' className='hidden' />
                                    <div>
                                        <button className='bg-blue-500  w-full hover:shadow-blue-500/50 hover:shadow-lg rounded-md py-2 my-2'>
                                            add category
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Category
