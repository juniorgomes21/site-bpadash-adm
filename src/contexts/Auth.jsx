import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import isValidToken from "../isValidToken/isValidToken";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AuthContext = createContext({});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AuthProvider({ children }) {

    const datesL = JSON.parse(localStorage.getItem("@Dates")) || [];

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [dates, setDates] = useState(datesL);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [msgError, setMsgError] = useState("Ops, algo deu errado!");
    const [state, setState] = useState({ openSnackBar: false, vertical: 'top', horizontal: 'center' });

    useEffect(() => {
        isInvalid();
    }, []);

    async function isInvalid() {
        const response =  await isValidToken();
        if (response) {
            setDates(datesL);
        } else {
            if(localStorage.getItem("@TokenAuthentication")) {
                handleLogout();
            }
        }
    }

    async function handleLogin(email, password) {
        setLoadingLogin(true);
        try {
            const response = await api.post('/adm/auth', { "email": email, "password": password });

            localStorage.setItem("@TokenTemp", response.data);

            window.location.href = "/confirm/code";

        } catch (e) {
            const response = e.response.data;
            
            switch (response) {
                case "BAD CREDENTIALS": {
                    setMsgError("Email ou senha inválida!");
                    break;
                }
            }
            
            setErrorLogin(true);
        }
        setLoadingLogin(false);
    }

    async function handleCode(code) {
        setLoadingLogin(true);
        try {
            const response = await api.post('/adm/verify/code', { "code": code }, { headers: {'Authorization' : `Bearer ${localStorage.getItem("@TokenTemp")}`}} );

            localStorage.setItem("@TokenAuthentication", response.data.token);

            window.location.href = "/dashboard";

        } catch (e) {
            console.log(e);
            const response = e.response.data;
            
            switch (response) {
                case "INVALID CODE": {
                    setMsgError("Código inválido ou já usado!");
                    break;
                } case "EXPIRED CODE": {
                    setMsgError("Código expirado!");
                    break;
                } default: {
                    setMsgError("Ops, algo deu errado!");
                }
            }
            
            setErrorCode(true);
        }
        setLoadingLogin(false);
    }

    async function handleLogout() {
        try {
            localStorage.removeItem("@TokenAuthentication");
    
            if(!window.location.href.includes("login")) window.location.href = "/login";

        } catch(e) {
            localStorage.removeItem("@TokenAuthentication");

            window.location.href = "/login";
        }
    }

    return (
        <AuthContext.Provider value={{ dates, loadingLogin, errorCode, errorLogin, msgError, handleLogin, handleCode, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
