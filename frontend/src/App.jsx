import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateAssignment from "./pages/CreateAssignment";
import MyAssignments from "./pages/MyAssignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import PublicLayout from "./layout/PublicLayout";
import ClassNotes from "./pages/services-page/ClassNotes";
import FormattingCleanUp from "./pages/services-page/Formatting&CleanUp";
import ProjectReports from "./pages/services-page/Project&Reports";
import OfficialDocuments from "./pages/services-page/OfficialDocuments";
function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* DASHBOARD ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="create-assignment" element={<CreateAssignment />} />
        <Route path="my-assignments" element={<MyAssignments />} />
        <Route path="assignments/:id" element={<AssignmentDetails />} />
        <Route path="notes/class" element={<ClassNotes />} />
        <Route path="formatting/Document-Formatting" element={<FormattingCleanUp />} />
        <Route path="projects/project-report-printing" element={<ProjectReports />} />
        <Route path="official/official-documents" element={<OfficialDocuments />} />
      </Route>
    </Routes>
  );
}

export default App;
