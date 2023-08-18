import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai"
import { BiCategory, BiLoaderCircle } from "react-icons/bi"
import { BsCurrencyDollar } from "react-icons/bs"
import { CiChat1 } from "react-icons/ci"
import { FaUsers } from "react-icons/fa"
export const allNavs = [
    {
        id: 1, 
        title: "Dashboard",
        icon: <AiFillDashboard/>,
        role: "admin",
        path: "/admin/dashboard"
    },
    {
        id: 2, 
        title: "Orders",
        icon: <AiOutlineShoppingCart/>,
        role: "admin",
        path: "/admin/dashboard/orders"
    },
    {
        id: 3, 
        title: "Category",
        icon: <BiCategory/>,
        role: "admin",
        path: "/admin/dashboard/category"
    },
    {
        id: 4, 
        title: "Sellers",
        icon: <FaUsers/>,
        role: "admin",
        path: "/admin/dashboard/sellers"
    },
    {
        id: 5, 
        title: "Payment request",
        icon: <BsCurrencyDollar/>,
        role: "admin",
        path: "/admin/dashboard/payment-request"
    },
    {
        id: 6, 
        title: "Deactive Sellers",
        icon: <FaUsers/>,
        role: "admin",
        path: "/admin/dashboard/deactive-sellers"
    },
    {
        id: 7, 
        title: "Sellers request",
        icon: <BiLoaderCircle/>,
        role: "admin",
        path: "/admin/dashboard/sellers-request"
    },
    {
        id: 8, 
        title: "Chat Seller",
        icon: <CiChat1/>,
        role: "admin",
        path: "/admin/dashboard/chat-seller"
    },
  
    
    
]