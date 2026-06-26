import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useRef } from "react";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, setUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      toast.info("Uploading image...");

      const url = await uploadToCloudinary(file);

      await updateDoc(doc(db, "users", user.uid), {
        photoURL: url,
      });

      setUser((prev) => ({
        ...prev,
        photoURL: url,
      }));

      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    await handleUpload(file);
  };

  const logoutNavigateSignIn = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <>
      <section className="section-padding grid grid-cols-2  gap-2">
        <div className="bg-white border rounded-2xl w-[80%]  shadow p-2 justify-center items-center">
          <div className="relative">
            <div className="bg-purple-800 h-40 rounded-2xl"></div>

            <div className="absolute top-22 left-5">
              <div className="relative w-30 h-30">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  className="w-full h-full rounded-full border-4 border-white object-cover"
                />

                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
                >
                  <Pencil size={16} className="text-purple-800" />
                </button>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-4">
              {isEditing ? (
                <input type="text" />
              ) : (
                <h1 className="text-2xl font-medium text-gray-900">
                  {user?.firstname} {user?.lastname}
                </h1>
              )}
              <p className="font-medium text-purple-800">{user.job}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-medium">Bio</h1>
              <p>{user.bio || "No bio added yet"}</p>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="border-2 border-gray-800 rounded-full p-2">
                <FaFacebook className="text-purple-800" size={25} />
              </div>
              <div className="border-2 border-gray-800 rounded-full p-2">
                <FaInstagram className="text-purple-800" size={25} />
              </div>
              <div className="border-2 border-gray-800 rounded-full p-2">
                <FaLinkedin className="text-purple-800" size={25} />
              </div>
              <div className="border-2 border-gray-800 rounded-full p-2">
                <MdEmail className="text-purple-800" size={25} />
              </div>
            </div>
            {/* <p>{user.phone}</p>
            <p>{user.email}</p> */}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-purple-800 text-white px-4 py-2 rounded-lg"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>

              <button
                onClick={logoutNavigateSignIn}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>

    // <div>
    //   {user.firstname}

    //   <button className="bg-red-500" onClick={logoutNavigateSignIn}>
    //     Logout
    //   </button>
    // </div>
  );
};

export default Profile;
