import React, { useEffect, useState } from "react";
import { loginUser } from "../services/User";

export const LoginContext = React.createContext();

const LoginContextProvider = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")

        if(userToken){
            setUser(JSON.parse(userToken).user)
        }

    }, [])

    const login = async (username) => {
        try{
            const {user} = await loginUser(username)
            localStorage.setItem("user_token", JSON.stringify({user}))
            setUser(user)
            return
        }catch (err){
            return "Usuário incorreto ou não cadastrado"
        }
    }

    const verifyTime = () => {
        if(!(new Date().toLocaleTimeString() > '09:00:00' && new Date().toLocaleTimeString() < '11:50:00')){
            return false
        }

        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }

    return (
        <LoginContext.Provider value={{user, signed: !!user, login, logout, verifyTime}}>

            {props.children}
        
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;