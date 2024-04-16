import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState("");

    const storeTokeninLS = (serverToken) => {
        setToken(serverToken);
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

    const getServices = async(req, res) => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method : "GET",
            })

            if(response.ok){
                const data = await response.json();
                console.log(data);
                setServices(data.response);
            }
        } catch (error) {
            console.log("Services frontend error");
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ storeTokeninLS, isLoggedIn, LogoutUser, user, services }}>
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