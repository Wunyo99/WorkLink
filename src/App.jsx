import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Jobs from "./pages/Jobs";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
