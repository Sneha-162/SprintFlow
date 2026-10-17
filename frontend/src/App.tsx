import { BrowserRouter, Routes, Route } from "react-router";

import AppLayout from "./layout/AppLayout";

import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Calendar from "./pages/Calendar";
import UserProfiles from "./pages/UserProfiles";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import Logout from "./pages/AuthPages/Logout";

import BlankSlateWorkspace from "./pages/System/BlankSlateWorkspace";
import NotFound from "./pages/OtherPage/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* Main authenticated application */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/form-elements"
            element={<FormElements />}
          />

          <Route
            path="/basic-tables"
            element={<BasicTables />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/profile"
            element={<UserProfiles />}
          />

          <Route
            path="/system/blank-slate-workspace"
            element={<BlankSlateWorkspace />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}