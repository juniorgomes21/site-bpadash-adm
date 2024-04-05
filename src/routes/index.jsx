import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Messages from "../pages/Messages/Messages";
import Dashboard from "../pages/Dashboard/index";
import ManagerUser from "../pages/ManagerUser/ManagerUser";
import CreateUser from "../pages/CreateUser/CreateUser";


const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/messages/user", component: Messages },
    { path: "/create/user", component: CreateUser },
    { path: "/manager/user", component: ManagerUser },
  
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  ];

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
];

export { authProtectedRoutes, publicRoutes };
