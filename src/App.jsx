import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Spinner from "./components/Spinner";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact/Contact";
const App = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoutes>
                <JobDetails />
              </ProtectedRoutes>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
