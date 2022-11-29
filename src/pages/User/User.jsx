import React, {useState} from "react"
import UserForm from "./../../components/UserForm"
import {useNavigate} from 'react-router-dom'
import { createUser } from "../../services/User"

const User = (props) => {
  const navigate = useNavigate()
  
  const [error, setError] = useState();

  const goBack = () => {
    navigate('/login')
  }

  const getUser = async (user) =>{
    //CADASTRO
    try{
      await createUser(user)
      
      navigate("/login")
    }catch(err){
      setError("Erro ao cadastrar")
    }
  }
  
  return(
    <UserForm secondary="Cancelar" secondaryFunction={()=>{goBack()}} primary="Salvar" primaryFunction="" getUser={user=>{getUser(user)}} error={error}/> 
  )
}

export default User