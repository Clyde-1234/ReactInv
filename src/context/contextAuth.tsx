/* import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession ] = useState(undefined)


    const signUpNewUser = async () => {
        const {data, error} = supabase.auth.signUp({
            email: email,
            password: password
        });

        if(error){
            console.log("sign-up error using email", error)
            return {success: false, error}
        }
        return {success: true, data}
    }


    return(
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
} */