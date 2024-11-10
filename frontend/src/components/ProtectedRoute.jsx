import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN ,USER} from "../constants";
import { useState, useEffect } from "react";
import ReactLoading from 'react-loading';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            // If there is a code, exchange it for tokens
            exchangeCodeForTokens(code);
        } else {
            // If no code, proceed with normal authorization check
            auth().catch(() => setIsAuthorized(false));
        }
    }, [location]);


    const exchangeCodeForTokens = async (code) => {
        try {
            const response = await fetch("http://localhost:1337/api/auth/google/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the access and refresh tokens in localStorage
                localStorage.setItem(ACCESS_TOKEN, data.access);
                localStorage.setItem(REFRESH_TOKEN, data.refresh);
                localStorage.setItem(USER, JSON.stringify(data.user));
                console.log("hi saif")
                console.log(data)
                setIsAuthorized(true)
                
                // Clear the URL params after the token exchange
                window.history.replaceState({}, document.title, "/");
                Navigate("/")

            } else {
                console.error("Failed to exchange code for tokens");
                console.log("ho bro");
                setIsAuthorized(true)
                // setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error during token exchange:", error);
            setIsAuthorized(true);
        }
    };


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
    
            console.log(error)
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div style={{display:"flex",justifyContent:"center",alignItems:"center" , height:"90vh"}}> <ReactLoading type="bubbles" color="blue" height={180} width={200} /></div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
