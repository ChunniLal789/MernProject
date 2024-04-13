import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    const storeTokeninLS = (serverToken) => {
        return localStorage.setItem('token', serverToken);
    }

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const isLoggedIn = !!token;
    console.log(isLoggedIn);

    const userAuthentication = async(req, res) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            })

            if(response.ok){
                const data = await response.json();
                console.log(data);
                setUser(data.userData);
            }
        } catch (error) {
            console.error("User Authentication error");
        }
    }

    useEffect(() => {
        userAuthentication()
    }, []);

    return (
        <AuthContext.Provider value={{ storeTokeninLS, isLoggedIn, LogoutUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside Provider");
    }
    return authContextValue;
}