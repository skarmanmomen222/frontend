import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState()

    const seacrhSubmitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }

    }
    return (
        <form onSubmit={seacrhSubmitHandler}>
            <div className='rounded-md flex gap-1 items-center'>

                <div>
                    <input
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text" placeholder='search a product....' className='outline-none border px-2 border-orange-600 text-md font-semibold italic text-gray-800 ' />
                </div>


                <input type="submit" value="submit" className='px-5 cursor-pointer  border border-orange-500' />

            </div>
        </form>
    )
}

export default Search
