import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useRef } from "react";
import { Pencil, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../utils/allJobs_http";
import JobCard from "../components/JobCard";
import Spinner from "../components/Spinner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, setUser, handleLogout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        bio: formData.bio,
        phone: formData.phone,
      });

      setUser((prev) => ({
        ...prev,
        ...formData,
      }));

      const updatedFields = [];

      if (
        user.firstname !== formData.firstname ||
        user.lastname !== formData.lastname
      ) {
        updatedFields.push("Name");
      }

      if ((user.bio || "") !== formData.bio) {
        updatedFields.push("Bio");
      }

      if ((user.phone || "") !== formData.phone) {
        updatedFields.push("Phone number");
      }

      toast.success(`${updatedFields.join(", ")} updated successfully!`);

      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

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

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const savedJobs =
    jobs?.filter((job) => user?.savedJobs?.includes(job.id)) || [];

  return (
    <>
      <section className="section-padding grid grid-cols-1 md:grid-cols-2  gap-2">
        <div className="bg-white border-2 border-gray-200 rounded-2xl lg:w-[80%] p-2 flex flex-col">
          <div className="relative">
            <div className="bg-purple-800 flex items-center justify-center h-40 rounded-2xl">
              <p className="font-medium text-7xl text-purple-300">{user.job}</p>
            </div>

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

          <div className="mt-12">
            <div className="flex items-center gap-1">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                    placeholder="First name"
                  />
                  <input
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                    placeholder="Last name"
                  />
                </div>
              ) : (
                <h1 className="text-2xl font-medium text-gray-900">
                  {user.firstname} {user.lastname}
                </h1>
              )}
              {isEditing ? (
                ""
              ) : (
                <BadgeCheck size={15} className="text-green-600" />
              )}
            </div>

            <div className="mt-5">
              <h1 className="font-medium">Bio</h1>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  placeholder="Write your bio..."
                />
              ) : (
                <p>{user.bio || "No bio added yet."}</p>
              )}
            </div>

            <div className="mt-5 flex items-center gap-4">
              {isEditing ? (
                <input
                  name="firstname"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                  placeholder="phone"
                />
              ) : (
                <div className="border-2 border-gray-800 rounded-full p-2 flex items-center gap-2">
                  <Phone className="text-purple-800" size={25} />
                  <p>{user.phone}</p>
                </div>
              )}

              <div className="border-2 border-gray-800 rounded-full p-2 flex items-center gap-2">
                <MdEmail className="text-purple-800" size={25} />
                <p>{user.email}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-purple-200 text-sm text-purple-800 font-medium px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:scale-98 duration-200"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setFormData({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        bio: user.bio || "",
                        phone: user.phone || "",
                      });

                      setIsEditing(false);
                    }}
                    className="border border-gray-300 text-red-600 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={15} />
                  </button>
                </>
              ) : (
                <div className="py-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-200 text-purple-800 font-medium px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer hover:scale-98 duration-200"
                  >
                    <Pencil size={15} />
                    <span className="text-sm">Edit Profile</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Spinner />
          ) : savedJobs.length > 0 ? (
            <JobCard jobs={savedJobs} />
          ) : (
            <p className="text-center text-gray-500">
              You haven't saved any jobs yet.
            </p>
          )}
        </div>
      </section>
      <button
        onClick={logoutNavigateSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </>
  );
};

export default Profile;
