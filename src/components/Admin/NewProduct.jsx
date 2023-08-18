import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearError, createProduct } from '../../store/reducers/adminProductlist';

const NewProduct = () => {
    const navigate = useNavigate()

    const { loader, success, error, } = useSelector(state => state.productList)
    const alert = useAlert()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        {
            name: "Curtain & Drapes"
        },
        {
            name: "Curtain Fabrics"
        },
        {
            name: "Curtain Accessories"
        },
        {
            name: "Home decoration & Appliance"
        },
        {
            name: "KIds & toy"
        },
        {
            name: "Jewelry & watches"
        },
        {
            name: "CellPhones & Tabs"
        },
        {
            name: "Beauty, Health & Hair"
        }
    ]


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            alert.success("Product Created Successfully");
            dispatch(clearError());
            // navigate("/admin/dashboard");

        }
    }, [dispatch, alert, error, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", Stock);

        images.forEach((image) => {
            console.log(image)
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };



    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };


            reader.readAsDataURL(file);
        });
    };

    return (
        <div className=' w-full   bg-white   mt-16 px-2 '>
            <div className='w-full items-center justify-center  bg-white flex flex-col '>
                <div className='w-[90%]  flex-col md:flex-row  flex  justify-between  gap-x-16  md:gap-x-0  gap-y-5     mb-24   '>


                    <div className='   '>
                        <Sidebar />
                    </div>


                    {/* {loader ? <Loader /> : */}
                    <div className='flex-1 flex justify-center items-center mx-auto '>
                        <div className=' h-[75vh] w-80 sm:w-[600px]   pb-10'>
                            <form onSubmit={createProductSubmitHandler} encType="multipart/form-data">
                                <div className='    mx-auto  flex flex-col pb-10    '>
                                    <div className='  w-full border-b border-b-yellow-300 mb-5'>
                                        <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Create Product</h1>

                                    </div>

                                    <div className='flex flex-col gap-y-5'>
                                        <div className='flex flex-col md:flex-row   justify-between gap-x-6 gap-y-2'>

                                            <div className='flex-1'>
                                                <input
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    value={name} className='w-full border px-5  py-2 sm:py-3 text-sm font-mono  rounded-md border-gray-300 ' placeholder='Name ' name='name' type="text" />
                                            </div>

                                            <div>
                                                <input type="number"
                                                    placeholder="Price"
                                                    required

                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md' />
                                            </div>
                                        </div>
                                        {/* <div className='flex flex-col gap-y-2'>

                                            <div>
                                                <input type="number"
                                                    placeholder="Price"
                                                    required

                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md' />
                                            </div>
                                        </div> */}
                                        <div className='flex flex-col gap-y-2'>

                                            <div>
                                                <textarea placeholder="Product Description"
                                                    required

                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    cols="30"
                                                    rows="5" className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-2'>

                                            <div>
                                                <select className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md'
                                                    required
                                                    onChange={(e) => setCategory(e.target.value)}>
                                                    <option value="">Choose Category</option>
                                                    {categories && categories.map((cate) => (
                                                        <option key={cate.name} value={cate.name}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-2'>

                                            <div>
                                                <input type="number"
                                                    placeholder="stock"
                                                    required

                                                    value={Stock}
                                                    onChange={(e) => setStock(e.target.value)} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-2'>
                                            <div id='registerImage'>
                                                <input
                                                    required

                                                    className='w-full border  text-sm font-mono  border-gray-300 rounded-md'
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={createProductImagesChange}
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-2   '>
                                            <div className='overflow-x-auto flex gap-x-3 rounded-md'>
                                                {imagesPreview.map((image, index) => (
                                                    <img key={index} src={image} alt="Product Preview" className='w-[3vmax] h-[3vmax]' />
                                                ))}
                                            </div>
                                        </div>


                                        <button disabled={loader ? true : false} type='submit' className='w-full rounded-md transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono    bg-yellow-300'>
                                            {loader ? <span className='cursive'>Loading...</span> : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* } */}
                </div>
            </div>
        </div>
    )
}

export default NewProduct


