import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearError, createProduct, updateProduct } from '../../store/reducers/adminProductlist';
import { getProductDetails } from '../../store/reducers/productReducers';

const UpdateProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { product, loader: loading } = useSelector(state => state.productReducer)
    const { loader, error, isUpdate } = useSelector(state => state.productList)
    const alert = useAlert()
    const dispatch = useDispatch()


    const [name, setName] = useState("")
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const categories = [
        {
            name: "laptop"
        },
        {
            name: "ballon shade"
        },
        {
            name: "  Blackout Curtains"
        },
        {
            name: "  Curtain Pairs"
        },
        {
            name: "   Curtain Panels"
        },
        {
            name: "  Lace Curtains"
        }
    ]


    useEffect(() => {


        if (product && product._id !== id) {
            dispatch(getProductDetails(id))
        } else {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdate) {
            alert.success("Product Updated Successfully");
            dispatch(clearError());
            navigate("/admin/products");

        }

    }, [dispatch, alert, error, isUpdate, navigate, id, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", Stock);

        images.forEach((image) => {

            myForm.append("images", image);
        });
        dispatch(updateProduct({ myForm, id }));
    };



    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([])

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
        <>
            {loading ? <Loader /> :
                <div className=' w-full  mb-28  bg-white   mt-16 px-2 '>
                    <div className='w-full items-center justify-center  bg-white flex flex-col '>
                        <div className='w-[90%]  flex-col md:flex-row  flex  justify-between  gap-x-16  md:gap-x-0  gap-y-5     mb-24   '>


                            <div className='   '>
                                <Sidebar />
                            </div>

                            {/* {loader ? <Loader /> : */}
                            <div className='flex-1 flex justify-center items-center mx-auto'>
                                <div className=' h-[75vh] w-80 sm:w-[600px]   pb-10'>
                                    <form onSubmit={updateProductSubmitHandler} encType="multipart/form-data">
                                        <div className='  mx-auto  flex flex-col    '>
                                            <div className='  w-full border-b border-b-yellow-300 '>
                                                <h1 className='md:text-xl text-lg font-mono font-semibold  text-gray-700  py-2 '>Update Product</h1>

                                            </div>

                                            <div className='flex flex-col gap-y-5'>
                                                <div className='flex flex-col md:flex-row  justify-between gap-x-6 gap-y-2'>

                                                    <div className='flex-1'>
                                                        <input
                                                            onChange={(e) => setName(e.target.value)}
                                                            required
                                                            value={name} className='w-full  border px-5  py-2 sm:py-3 text-sm font-mono  rounded-md border-gray-300 ' placeholder='Name ' name='name' type="text" />
                                                    </div>

                                                    <div>
                                                        <input type="number"
                                                            placeholder="Price"
                                                            required

                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300 rounded-md' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-y-2'>

                                                    <div>
                                                        <textarea placeholder="Product Description"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            cols="30"
                                                            rows="5" className='w-full rounded-md border px-5  py-2 sm:py-3  text-sm font-mono  border-gray-300' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-y-2 rounded-md'>

                                                    <div>
                                                        <select className='w-full border px-5  rounded-md py-2 sm:py-3  text-sm font-mono  border-gray-300'
                                                            onChange={(e) => setCategory(e.target.value)}>
                                                            <option value="">{category}</option>
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
                                                            onChange={(e) => setStock(e.target.value)} className='w-full border px-5  py-2 sm:py-3  text-sm font-mono  rounded-md border-gray-300' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-y-2'>
                                                    <div id='registerImage'>
                                                        <input
                                                            className='w-full border rounded-md text-sm font-mono  border-gray-300'
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
                                                        {oldImages && oldImages.map((image, index) => (
                                                            <img key={index} src={image.url} alt="old Preview" className='w-[3vmax] h-[3vmax]' />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-y-2   '>
                                                    <div className='overflow-x-auto flex gap-x-3 rounded-md'>
                                                        {imagesPreview && imagesPreview.map((image, index) => (
                                                            <img key={index} src={image} alt="Product Preview" className='w-[3vmax] h-[3vmax]' />
                                                        ))}
                                                    </div>
                                                </div>


                                                <button disabled={loader ? true : false} type='submit' className='w-full transition-all duration-400 hover:bg-transparent hover:border hover:text-yellow-300 hover:border-yellow-300 h-9 sm:h-10 px-5 font-bold font-mono rounded-md bg-yellow-300'>
                                                    {loader ? <span className='cursive'>Loading...</span> : "Update"}
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
            }
        </>
    )
}

export default UpdateProduct


