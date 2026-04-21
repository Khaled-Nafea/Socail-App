import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/RegisterSchema";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";  
import { useState } from "react";
import { loginUser } from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

export default function Login() {
  document.title = "Login | Social App";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {token, setToken} = useContext(AuthContext);

  let {register,handleSubmit,formState:{errors, isSubmitting}} = useForm({
    mode:"onChange",
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  });

  async function onSubmit(data) {
    try {
      let result = await loginUser(data);
      toast.success(result.data.message);
      navigate("/");
      localStorage.setItem("userToken", result.data.data.token);
      setToken(result.data.data.token);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        toast.error("Invalid email or password");
      }
      else {
        toast.error("Something went wrong");
      }
    }
  }


  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md mx-auto p-8 bg-gray-100/50 backdrop-blur-sm rounded-2xl shadow-2xl">
      <header className="text-center mb-5">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="text-center">Don't have an account? <NavLink to="/register" className="text-primary">Sign Up</NavLink></p> 
      </header>
          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center  gap-3 border border-gray-600 hover:border-gray-500 px-4 py-3 rounded-lg bg-gray-200/30 hover:bg-gray-300/50 transition-all text-gray-700 cursor-pointer">
              <i className="fa-brands fa-google text-red-500"></i> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-all text-white cursor-pointer">
              <i className="fa-brands fa-facebook"></i> Facebook
            </button>
          </div>
        <div className="relative text-center my-6">
          <span className="relative inline-block px-4 text-gray-400 text-sm before:content-[''] before:absolute before:top-1/2 before:right-full before:w-[100px] before:h-px before:bg-gray-600 before:mr-4 after:content-[''] after:absolute after:top-1/2 after:left-full after:w-[100px] after:h-px after:bg-gray-600 after:ml-4">
            or continue with email
          </span>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <Input isInvalid={errors.email?.message} errorMessage={errors.email?.message} {...register("email")} label="Email" type="email" variant="faded" color="primary" className="pb-4" />
        <Input isInvalid={errors.password?.message} errorMessage={errors.password?.message} {...register("password")} label="Password" type={showPassword ? "text" : "password"} variant="faded" color="primary" className="pb-4" endContent={ showPassword ? <FaEye className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowPassword(!showPassword)}/> : <FaEyeSlash className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowPassword(!showPassword)}/>}/>
        <Button isLoading={isSubmitting} color="primary" variant="ghost" className="w-full" type="submit">
          Sign In <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </form>
    </div>
    </div>
    </>
  )
}

