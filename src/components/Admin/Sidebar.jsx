import React from 'react'
import { Link } from "react-router-dom";


import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TreeView from '@mui/lab/TreeView';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
const Sidebar = () => {
  return (
    <div className='w-[20%] pb-10   flex items-center justify-center mx-auto md:mx-0  ' >
      <div className="  flex gap-x-10 flex-col justify-center   gap-y-8 ">
        <Link to="/">
          {/* <img src={logo} alt="Ecommerce" /> */}
        </Link>
        <Link to="/admin/dashboard">
          <p className='flex items-center flex-col'>
            <DashboardIcon className='text-gray-600' /> <span>Dashboard</span>
          </p>
        </Link>
        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon className='text-gray-600' />} />
              </Link>

              <Link to="/admin/new/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon className='text-gray-600' />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p className='flex items-center flex-col'>
            <ListAltIcon className='text-gray-600' />
            <span>Orders</span>
          </p>
        </Link>
        <Link to="/admin/users">
          <p className='flex items-center flex-col'>
            <PeopleIcon className='text-gray-600' /> <span>Users</span>
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p p className='flex items-center flex-col'>
            <RateReviewIcon className='text-gray-600' />
            <span>Reviews</span>
          </p>
        </Link>
      </div>

    </div>
  )
}

export default Sidebar
