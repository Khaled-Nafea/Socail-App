import { NavLink } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext/AuthContext"
import Imge from "../../assets/default-profile.png"


const navLinks = [
  {name: "Home", icon: "fa-solid fa-house", path: "/"},
  {name: "Profile", icon: "fa-solid fa-user", path: "/profile"},
  {name: "My Posts", icon: "fa-solid fa-wand-magic-sparkles", path: "/myPosts"},
  {name: "Saved Posts", icon: "fa-solid fa-bookmark", path: "/savedPosts"}
]

export default function LeftSide() {
const {setToken} = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
  }

    return (
        <div className="sticky top-16 hidden lg:block">
            
            <nav className=" bg-white border border-blue-400 rounded-2xl shadow-lg p-3 flex flex-col gap-2">
                
                {navLinks.map((link, index) => (
                    <NavLink key={index} className={({ isActive }) => `flex items-center gap-3 py-2 px-3 rounded-xl transition-all hover:bg-blue-200 text-blue-500 ${isActive? "bg-blue-500 text-white": ""}`}to={link.path} end={link.path === "/"}>
                        <i className={link.icon}></i> {link.name}
                    </NavLink>
                ))}

                <button onClick={() => {handleLogout()}} className="flex items-center gap-3 py-2 px-3 mt-4 rounded-xl hover:bg-[#3B0500] text-red-500">
                    <i className="fa-solid fa-right-from-bracket"></i> Log Out
                </button>
            </nav>
            
        </div>
    );
}
