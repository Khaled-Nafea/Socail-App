import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { ProfileContext } from "../../Context/ProfileContext/ProfileContext";
import logo from "../../assets/route.png";
import userImage from "../../assets/default-profile.png";
import { NavLink } from "react-router-dom";



export default function NavBar() {

const {setToken} = useContext(AuthContext);
const {userProfile} = useContext(ProfileContext);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
  }

  return (
    <>
         <Navbar className="border-b-2 border-blue-400">
      <NavbarBrand className="flex items-center gap-3">
        <img src={logo} alt="Route Posts" className="h-9 w-9 rounded-xl" />
        <p className="font-bold text-xl hidden md:block text-black">Route Posts</p>
      </NavbarBrand>

      <nav className="flex items-center min-w-0 gap-1 overflow-x-auto rounded-2xl border border-blue-400  py-1 sm:px-1.5" justify="center">
          <NavLink color="foreground" to="/" className={({ isActive }) => ` gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold sm:gap-2 sm:px-3.5 hover:bg-blue-200 text-blue-500  ${isActive ? "text-[#00BAF6] font-semibold" : "text-gray-500"}`}>
            <i className="fa-solid fa-house"></i> <span className="hidden md:inline">Home</span>
          </NavLink>
          <NavLink className={({ isActive }) => ` gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold sm:gap-2 sm:px-3.5 hover:bg-blue-200 text-blue-500  ${isActive ? "text-[#00BAF6] font-semibold" : "text-gray-500"}`} to="/profile">
            <i className="fa-solid fa-user"></i> <span className="hidden md:inline">Profile</span>
          </NavLink>
          <NavLink color="foreground" to="/notifications" className={({ isActive }) => ` gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold sm:gap-2 sm:px-3.5 hover:bg-blue-200 text-blue-500  ${isActive ? "text-[#00BAF6] font-semibold" : "text-gray-500"}`}>
            <i className="fa-solid fa-message"></i> <span className="hidden md:inline">Notifications</span>
          </NavLink>
        </nav>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end" className="">
          <DropdownTrigger className="cursor-pointer ">
            <div className="flex items-center gap-2 rounded-full border border-blue-500 py-2 px-2">
            <img src={userProfile?.photo||userImage} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
            <span className="hidden md:inline text-sm font-semibold text-gray-600">{userProfile?.name || "User"}</span>
            <i className="fa-solid fa-bars text-gray-600"></i>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem  key="profile" className="text-gray-600">
             
                <NavLink to="/profile" className="block">
                  <i className="fa-solid fa-user"></i> Profile
                </NavLink>
            </DropdownItem>
            <DropdownItem key="settings" className="text-gray-600">
            <NavLink to="/settings" className="block">
              <i className="fa-solid fa-gear"></i> My Settings
            </NavLink>
            </DropdownItem>
            <DropdownItem onClick={() => handleLogout()} key="logout" color="danger">
              <NavLink to="/login">
              <span className="text-red-500"><i className="fa-solid fa-right-from-bracket"></i> Log Out</span>
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </>
  )
}
