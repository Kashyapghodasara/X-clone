import React from 'react';
import Avatar from 'react-avatar';
import { Link, useParams } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useGetProfile } from '../hooks/useGetProfile.jsx'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast';
import { USER_API_ENDPOINT } from '../utils/constant.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Leftsidebar = () => {

  const { user, profile } = useSelector(store => store.user)     // This is initialState
  const navigate = useNavigate()
  /* const {id} = useParams()
  useGetProfile(id) */   // Call custom Hooks

  const islogOut = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
      toast.success(res.data.message, {
        style: {
          border: '1px solid #2E8B57', // A soothing green for logout success
          padding: '16px',
          color: '#2E8B57',
          backgroundColor: '#F0FFF0', // Light green background for a calm effect
        },
        iconTheme: {
          primary: '#2E8B57',
          secondary: '#FFFFFF',
        },
      });
      navigate("/login")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-[26%] sticky top-0 h-screen overflow-y-auto ">
      <div>
        <Link to="/">
          <img
            className="w-[50px] cursor-pointer"
            src="https://cdn.worldvectorlogo.com/logos/twitter-logo-2.svg"
            alt="X-logo"
          />
        </Link>
      </div>
      <div className="flex flex-col py-2 mt-[-5px] my-5">
        <Link to="/">
          <div>
            <div className="flex item-center px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
              <IoHome className="text-[26px]" />
              <h1 className="text-[18.5px] ml-2">Home</h1>
            </div>
          </div>
        </Link>
        <div>
          <div className="flex item-center px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
            <IoSearch className="text-[26px]" />
            <h1 className="text-[18.5px] ml-2">Explore</h1>
          </div>
        </div>
        <div>
          <div className="flex item-center px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
            <IoNotificationsSharp className="text-[26px]" />
            <h1 className="text-[18.5px] ml-2">Notification</h1>
          </div>
        </div>
        <div>
          <div className="flex item-center px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
            <LuMessageSquareText className="text-[26px]" />
            <h1 className="text-[18.5px] ml-2">Message</h1>
          </div>
        </div>
        <Link to={`/profile/${user?._id}`}>
          <div>
            <div className="flex item-center px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
              <RiAccountCircleFill className="text-[26px]" />
              <h1 className="text-[18.5px] ml-2">Profile</h1>
            </div>
          </div>
        </Link>
        <div>
          <div onClick={() => islogOut()} className="flex item-center mb-1 px-4 py-[15px] hover:bg-full hover:rounded-full hover:cursor-pointer hover:bg-zinc-700">
            <MdLogout className="text-[26px]" />
            <h1 className="text-[18.5px] ml-2">Logout</h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <button className="bg-white mt-1 text-xl font-bold py-[10px] px-[80px] border rounded-full hover:bg-gray-300 text-slate-950">
          Post
        </button>
      </div>
      <Link to={`/profile/${user?._id}`}>
        <div>
          <div className="flex items-center mt-12  hover:bg-zinc-900 rounded-full px-4 py-3 text-white cursor-pointer transition-all ease-in-out w-fit space-x-3">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s"
              size="45"
              round={true}
            />
            <div>
              <div className="font-semibold">{profile?.name}</div>
              <div className="text-sm text-gray-400">{`@${profile?.username}`}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Leftsidebar;
