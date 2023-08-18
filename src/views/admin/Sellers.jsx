import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowBarDown, BsEye } from 'react-icons/bs'
import Pagination from '../Pagination'

const Sellers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [show, setShow] = useState(false)
    const [perPage, setPerPage] = useState(5)

    return (
        <div>
            <div className='px-2 lg:px-7 pt-5'>
                <div className="w-full p-4   bg-[#283046] rounded-md ">
                    <div className='flex justify-between items-center'>
                        <select onChange={(e) => setPerPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                            <option value="5">5</option>
                            <option value="5">15</option>
                            <option value="5">25</option>
                        </select>
                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                    </div>

                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white'>
                            <thead className='text-xs text-white uppercase border-b border-slate-700'>
                                <tr>
                                    <th className='py-3 px-4' scope='col'>No </th>
                                    <th className='py-3 px-4' scope='col'>Image</th>
                                    <th className='py-3 px-4' scope='col'>Name  </th>
                                    <th className='py-3 px-4 whitespace-nowrap' scope='col'>shop Name  </th>
                                    <th className='py-3 px-4 whitespace-nowrap' scope='col'>payment status    </th>
                                    <th className='py-3 px-4' scope='col'>Email</th>
                                    <th className='py-3 px-4' scope='col'>division</th>
                                    <th className='py-3 px-4' scope='col'>district</th>
                                    <th className='py-3 px-4' scope='col'>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [1, 2, 3, 4, 5].map((d, i) => <tr key={i}>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{d}</td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <div className='w-[45px] h-[45px] rounded-md'>
                                                <img src={`http://localhost:3000/images/admin.jpg`} alt="" className='w-full' />
                                            </div>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>sk arman</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>curtain fashion</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>pending</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>skaman@gmail.com</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>chittagong</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                            <span>abashik</span>
                                        </td>
                                        <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap '>
                                            <Link to="/admin/dashboard/seller/details/1" className='bg-green-200 ' ><BsEye className='text-green-500 text-lg' /></Link>
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
        </div>
    )
}

export default Sellers
