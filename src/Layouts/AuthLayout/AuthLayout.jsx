import "../../index.css";
import { Outlet } from "react-router-dom";
import Img from "../../assets/signup-bg-DGRfriy9.png";
import { Link } from "react-router-dom";
import Img2 from "../../assets/alex-avatar-BLDJqiDr.png";

export default function AuthLayout() {
  return (
    <div className="flex lg:flex-row flex-col font-cairo">
      <div className="lg:w-1/2 w-full bg-center bg-cover" style={{backgroundImage: `url(${Img})`}}>
        <div className="relative top-0 left-0 w-full h-full p-10">
           <div className="absolute inset-0 bg-[#143DBE] opacity-70"></div>
           <div className="relative flex flex-col gap-10">
          <Link to="/login" className="flex items-center gap-2 text-white">
          <span className="text-[18px] font-bold w-12 h-12 glass-effect flex items-center justify-center rounded-xl">S</span>
          <span className="text-[24px] font-bold">SocialHub</span>
          </Link>
          <div className="title mb-6">
            <h2 className="text-5xl font-bold pb-4">Welcome Back <br /><span className="bg-linear-to-r from-main-100 via-main-300 to-main-400 bg-clip-text text-transparent">to SocialHub App</span></h2>
            <p>Signin to connect people all over the world</p>
          </div>
          <ul className="grid md:grid-cols-2 grid-cols-1 gap-4 transition-all ease-in-out">
            <li className="flex items-center gap-2 py-2 px-4 glass-effect rounded-xl hover:scale-105 transition-all ease-in-out duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#134F9D] text-[#74EFA4]">
                <i className="fa-solid fa-message"></i>
              </div>
              <div>
                <h4>Real-time Chat</h4>
                <span>Instant messaging</span>
              </div>
            </li>
            <li className="flex items-center gap-2 py-2 px-4 glass-effect rounded-xl hover:scale-105 transition-all ease-in-out duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#234EB2] text-white">
                <i className="fa-solid fa-image"></i>
              </div>
              <div>
                <h4>Share Media</h4>
                <span>Photos & videos</span>
              </div>
            </li>
             <li className="flex items-center gap-2 py-2 px-4 glass-effect rounded-xl hover:scale-105 transition-all ease-in-out duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#403998] text-[#F7C1E0]">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div>
                <h4>Smart Alerts</h4>
                <span>Stay updated</span>
              </div>
            </li>
             <li className="flex items-center gap-2 py-2 px-4 glass-effect rounded-xl hover:scale-105 transition-all ease-in-out duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#134F9D] text-[#74EFA4]">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <h4>Communities</h4>
                <span>Find your tribe</span>
              </div>
            </li>
          </ul>
          <ul className="flex items-center gap-5">
            <li>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-users"></i>
                <span className="text-[24px] font-bold">2M+</span>
              </div>
              <p className="text-[16px] font-bold mb-0">Active Users</p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-heart"></i>
                <span className="text-[24px] font-bold">10M+</span>
              </div>
              <p className="text-[16px] font-bold mb-0">Posts Shared</p>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-message"></i>
                <span className="text-[24px] font-bold">50M+</span>
              </div>
              <p className="text-[16px] font-bold mb-0">Messages Sent</p>
            </li>
          </ul>
          <figure className="flex flex-col gap-2 p-4 glass-effect rounded-xl hover:scale-105 transition-all  duration-300">
          <div className="rating mb-4">
            <i className="fa-solid fa-star text-[#FFD700]"></i>
            <i className="fa-solid fa-star text-[#FFD700]"></i>
            <i className="fa-solid fa-star text-[#FFD700]"></i>
            <i className="fa-solid fa-star text-[#FFD700]"></i>
            <i className="fa-solid fa-star text-[#FFD700]"></i>
          </div>
          <cite className="mb-4 text-[18px]">
            "SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!"
          </cite>
          <figcaption className="flex items-center gap-2 ">
            <img src={Img2} alt="alex-avatar" className="w-12 h-12 rounded-full"/>
            <div>
              <div className="flex flex-col">
                <cite>Alex Johnson</cite>
                <span>Product Designer</span>
              </div>
            </div>
          </figcaption>
          </figure>
           </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full">
         <Outlet />
      </div>
    </div>
  );
}
