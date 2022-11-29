import React, {useContext, useState} from 'react'
import UserForm from './../../components/UserForm'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'

const Login = (props) => {

  const {login} = useContext(LoginContext)
  
  const [error, setError] = useState("");
  const navigate = useNavigate()
  
  const goRegister = () => {
    navigate("/user")
  }

  const getUser = async (user) => {
    const error = await login(user)
    console.log(error);
    if (error) {
      console.log(error);
      setError(error)
    }else{
      navigate("/")
    }
  }

  return(
     <UserForm secondary="Cadastrar" primary="Entrar" secondaryFunction={() => goRegister()} getUser={user=>{getUser(user)}} error={error}/>   
  )
}

export default Login