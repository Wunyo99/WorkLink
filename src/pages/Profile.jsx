import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutNavigateSignIn = () => {
    handleLogout();
    // toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div>
      {user.firstname}

      <button className="bg-red-500" onClick={logoutNavigateSignIn}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
