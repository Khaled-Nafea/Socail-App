import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext/AuthContext'

export default function AuthPR({children}) {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  
  return children;
}
