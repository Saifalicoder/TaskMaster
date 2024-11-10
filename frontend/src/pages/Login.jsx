import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import GoogleButton from 'react-google-button';
import Navbar from "../components/Navbarr";
import "../styles/Login.css"
function Login() {
    const googleClientId = "client_id"; // Replace with your Google Client ID
    const redirectUri = "http://localhost:1337"; // Replace with your redirect URI

    const [isExchangingCode, setIsExchangingCode] = useState(false);

    function handlegooglelogin() {
        // Redirect user to Google's OAuth 2.0 authorization endpoint
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline`;

        window.location.href = googleAuthUrl;
    }

    // Function to exchange code for access and refresh tokens
    async  function exchangeCodeForTokens(code) {
        setIsExchangingCode(true);  // Flag to indicate we're handling the token exchange
  
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

                alert("Google Login Successful!");

                // Clear the URL query params after successful exchange
                window.history.replaceState({}, document.title, "/");
                console.log("token fetched")
                // Redirect to the home page or another page now that the user is authenticated
                window.location.href = "/";
            } else {
                alert("Failed to exchange code for tokens");
                console.log("failed to acess token")
            }
        } catch (error) {
            console.log("this is catch")
            console.error("Error during token exchange:", error);
            alert("Error occurred during Google login");
        } finally {
            setIsExchangingCode(false);
        }
    }

    // When the page loads, check for the `code` in the URL (after Google redirects back)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log("getting code")
        if (code) {
            exchangeCodeForTokens(code);
        }
    }, []);

    // If we're in the process of exchanging the code, prevent the page from showing the login form
    if (isExchangingCode) {
        return <p>Exchanging code, please wait...</p>;
    }

    return (
        <>
          <Navbar></Navbar>
            <Form route="/api/auth/login/" method="login" />
            <div className="col" style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <button  onClick={handlegooglelogin} className="login-with-google-btn" style={{ width: "200px" }}>
                    Google Login
                </button>
            </div>
        </>
    );
}

export default Login;
