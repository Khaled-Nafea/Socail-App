import { Link, NavLink } from 'react-router'
import avatar from "../../../src/assets/150.jpg"
import {Button} from "@heroui/react";

const navLinks = [
  { tag: "#ReactJS", icon: "fa-solid fa-hashtag" , count: "12.5K posts" },
  { tag: "#WebDevelopment", icon: "fa-solid fa-hashtag" , count: "8.2K posts" },
  { tag: "#JavaScript", icon: "fa-solid fa-hashtag" , count: "12.5K posts" },
  { tag: "#TailwindCSS", icon: "fa-solid fa-hashtag" , count: "8.2K posts" },
  { tag: "#Programming", icon: "fa-solid fa-hashtag" , count: "12.5K posts" },
]
const ulLinks = [
  { name: "John Doe", username: "johndoe" },
  { name: "Jane Smith", username: "janesmith" },
  { name: "Bob Johnson", username: "bobjohnson" },
  { name: "Bob Johnson", username: "bobjohnson" },
  { name: "Bob Johnson", username: "bobjohnson" },
]

export default function RightSide() {
  return (
    <div className="sticky top-16 hidden lg:block ">
         {/* <nav className=" bg-[#181A1B] rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-fire text-orange-500 "></i> <h3 className="text-lg font-bold text-[#BDB7AE]">Trending Now</h3>
         </div>
         {navLinks.map((link, index) => (
                <NavLink key={index} className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-[#17221E]">
                   <div className="size-10 flex items-center justify-center bg-linear-to-r from-blue-600 to-cyan-400 rounded-xl"><i className="fa-solid fa-hashtag"></i></div>
                   <div className="flex flex-col">
                    <p className="text-gray-200 mb-1 font-semibold">{link.tag}</p>
                    <p className="text-gray-400 text-sm">{link.count}</p>
                   </div>
                </NavLink>
            ))}
            </nav> */}
            
            <div className="rounded-2xl shadow-lg p-5 mb-5 flex flex-col gap-2 border border-blue-400">
               <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-user-plus text-blue-500"></i>
                <h3 className="text-lg font-bold text-blue-500"> Who To Follow</h3>
              </div>
            <ul className="space-y-6">
            {ulLinks.map((link, index) => (
              <li key={index}>
              <div className="flex items-center justify-between mb-4 ">
                <div className="flex items-center gap-2">
                  <img src={avatar} alt="avatar" className="size-12 rounded-full border-2 border-gray-100 shadow-lg object-cover" />
                  <div>
                    <p className="text-gray-600 font-semibold">{link.name}</p>
                    <span className="text-gray-400 text-sm">@{link.username}</span>
                  </div>
                </div>
                 <Button color="primary" variant="ghost" className="rounded-full"> Follow</Button>
              </div>
            </li>
            ))}
            </ul>
                <button className="w-full mt-4 text-center text-blue-500 hover:underline font-medium"> Show more</button>
            </div>

            {/* <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Link to="/" className="text-gray-400 hover:underline text-xs">
                  Terms of Service 
                </Link>
                <span className="text-gray-400 text-xs">.</span>
                <Link to="/" className="text-gray-400 hover:underline text-xs">
                  Privacy Policy
                </Link>
                <span className="text-gray-400 text-xs">.</span>
                <Link to="/" className="text-gray-400 hover:underline text-xs">
                  Cookies 
                </Link>
              </div>
              <div>
                <p className="text-gray-400 text-xs">© 2024 SocialHub. All rights reserved.</p>
              </div>
            </div> */}
    </div>
  )
}
