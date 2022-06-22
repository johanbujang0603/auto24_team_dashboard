import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";

//VIN
import CreateVin from "../pages/Vin/CreateVin";
import VinList from "../pages/Vin/VinList";

//Sourcing
import CreateSourcing from "../pages/Sourcing/CreateSourcing";
import SourcingList from "../pages/Sourcing/SourcingList";

//Inspection
import CreateInspection from "../pages/Inspection/CreateInspection";
import InspectionList from "../pages/Inspection/InspectionList";

//Argus
import ArgusQuoting from "../pages/Argus";

//Users
import Users from "../pages/Users";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/vin-create", component: CreateVin },
  { path: "/vin-list", component: VinList },
  { path: "/sourcing-create", component: CreateSourcing },
  { path: "/sourcing-list", component: SourcingList },
  { path: "/inspection-create", component: CreateInspection },
  { path: "/inspection-list", component: InspectionList },
  { path: "/argus-quoting", component: ArgusQuoting },

  { path: "/users", component: Users },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };