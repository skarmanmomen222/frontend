import React, { useRef } from 'react'

const Slider = () => {
    const contentRef = useRef < HTMLDivElement > ("")
    const scrollLeft = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft -= 200
        }
    }

    const scrollRight = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft += 200
        }
    }


    // const setLeft = () => {
    //     document.getElementById("slider").scrollLeft -= 800
    // }

    // const setRight = () => {
    //     document.getElementById("slider").scrollLeft += 800
    // }


    return (
        <div className='w-3/4 mx-auto flex justify-center items-center'>
            <div className='w-[10%]' onClick={scrollLeft}>
                <button className='px-2 py-2 bg-slate-500 rounded-full text-white'>next</button>
            </div>

            <div ref={contentRef} className="flex gap-x-7   scrollbar-hide overflow-x-scroll scroll-smooth     h-[30vh]">
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='w-full h-[20vh] border'>
                    <ul className="flex w-full border border-red-500">
                        <li className='w-96 p-5'>
                            <div className='border '>
                                <img className='object-cover' src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                                <h2>some big heading</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, reprehenderit perferendis quam officiis aperiam blanditiis totam similique dolorem assumenda eum.</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div onClick={scrollRight} className='w-[10%]'>
                <button className='px-2 py-2 bg-slate-500 rounded-full text-white'>next</button>
            </div>
        </div>
    )
}

export default Slider
