import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Calendar from "./pages/Calendar";
import UserProfiles from "./pages/UserProfiles";
import NotFound from "./pages/OtherPage/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Dashboard Home */}
          <Route path="/" element={<Home />} />
          
          {/* Task Management / Kanban Inputs Form */}
          <Route path="/form-elements" element={<FormElements />} />
          
          {/* Project Backlog / Epic Matrix Table */}
          <Route path="/basic-tables" element={<BasicTables />} />
          
          {/* Secondary Views */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<UserProfiles />} />
        </Route>

        {/* Fallback Catch-all Route for 404 handler */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}