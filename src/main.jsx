import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import { StackBarProvider } from "./contexts/managerService";
import { AuthProvider } from "./contexts/Auth";
import "./indextail.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <Provider store={store}>
            <BrowserRouter>
                <StackBarProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </StackBarProvider>
            </BrowserRouter>
        </Provider>
    </React.Fragment>
);

serviceWorker.unregister();
