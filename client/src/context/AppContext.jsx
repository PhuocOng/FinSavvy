// Manage login status, store userData (when login)

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext()

const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    const backendUrl =import.meta.env.VITE_BACKEND_URL
    
    const [isLoggedin, setIsLoggedin] = useState(false) // initially this user will be logged out
    const [userData, setUserData] = useState(false)

    // call /is-auth -> check if user is already authenticated 
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true });
            if (data.success) {
                const userInfo = await getUserData();
                if (userInfo) {
                    setIsLoggedin(true);
                } else {
                    setIsLoggedin(false);
                }
            } else {
                setIsLoggedin(false);
            }
        } 
        catch (error) {
            console.log("Auth state error:", error.response?.data?.message || error.message);
            setIsLoggedin(false);
        };}


    // Fetch user info from backend (/api/user/data)
    const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data', { withCredentials: true });
    if (data.success) {
      setUserData(data.userData);
      console.log("User data loaded:", data.userData);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    const token = localStorage.getItem("token");
    const message = error?.response?.data?.message;
    if (token && message === "User not found") {
      toast.error("User not found");
    } else {
      console.log("getUserData error:", message);
    }
    return false;
  }
};

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        backendUrl, 
        isLoggedin, setIsLoggedin,
        userData, setUserData, getUserData 
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}

        </AppContent.Provider>
    )
}

//export { AppContent, AppContextProvider };
export { AppContent };   
export default AppContextProvider;