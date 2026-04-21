import {Input} from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import {Button} from "@heroui/react";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../lib/RegisterSchema";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";  
import { useState } from "react";
import { registerUser } from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Img from "../../../assets/signup-bg-DGRfriy9.png";

export default function Register() {
  document.title = "Register | Social App";
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  let {register,handleSubmit,formState:{errors, isSubmitting}} = useForm({
    mode:"onChange",
    resolver: zodResolver(registerSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""
    }
  });

  async function onSubmit(data) {
    try {
      let result = await registerUser(data);
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-100/50 backdrop-blur-sm rounded-2xl shadow-2xl">
      <header className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-4">Create account</h2>
         <p className="text-center mt-4">Already have an account? <NavLink to="/login" className="text-primary">Sign In</NavLink></p> 
      </header>
       <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-3 border border-gray-600 hover:border-gray-500 px-4 py-3 rounded-lg bg-gray-200/30 hover:bg-gray-300/50 transition-all text-gray-700 cursor-pointer">
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
        <Input isInvalid={errors.name} errorMessage={errors.name?.message} {...register("name")} label="Name" type="text" variant="faded" color="primary" className="pb-4" />
        <Input isInvalid={errors.email?.message} errorMessage={errors.email?.message} {...register("email")} label="Email" type="email" variant="faded" color="primary" className="pb-4" />
        <Input isInvalid={errors.password?.message} errorMessage={errors.password?.message} {...register("password")} label="Password" type={showPassword ? "text" : "password"} variant="faded" color="primary" className="pb-4" endContent={ showPassword ? <FaEye className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowPassword(!showPassword)}/> : <FaEyeSlash className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowPassword(!showPassword)}/>}/>
        <Input isInvalid={errors.rePassword?.message} errorMessage={errors.rePassword?.message} {...register("rePassword")} label="Confirm Password" type={showRePassword ? "text" : "password"} variant="faded" color="primary" className="pb-4" endContent={ showRePassword ? <FaEye className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowRePassword(!showRePassword)}/> : <FaEyeSlash className="text-gray-600 cursor-pointer my-1 text-2xl" onClick={() => setShowRePassword(!showRePassword)}/>}/>
        <div className="flex md:flex-row flex-col md:gap-4 gap-0 sm:mb-4 md:mb-0">
          <Input type="date" isInvalid={errors.dateOfBirth?.message} errorMessage={errors.dateOfBirth?.message} {...register("dateOfBirth")} label="Birth date" variant="faded" color="primary" className="pb-4" />
          <Select {...register("gender")} label="Select an Gender" isInvalid={errors.gender?.message} errorMessage={errors.gender?.message} color="primary">
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
          </Select>
        </div>
        <Button isLoading={isSubmitting} color="primary" variant="ghost" className="w-full" type="submit">
          Register
        </Button>
      </form>
    </div>
    </div>
    
    </>
  )
}
