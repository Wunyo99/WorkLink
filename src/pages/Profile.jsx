import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Phone, User } from "lucide-react";
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
import { getLogoUrl } from "../utils/getLogo";

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

  const appliedJobs = user?.appliedJobs || [];

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
      <section className="section-padding ">
        <h4 className="text-2xl md:text-4xl font-medium mb-5 text-center md:text-start">
          Welcome back,{" "}
          <span className="text-purple-800">{user.firstname}</span>{" "}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-7">
          <div className="bg-white border-2 border-gray-200 rounded-2xl lg:w-[85%] p-2 flex flex-col">
            <div className="relative">
              <div className="bg-purple-800 flex justify-center h-40 rounded-2xl">
                <p className="font-medium text-3xl text-center mt-5 text-purple-300">
                  {user.job}
                </p>
              </div>

              <div className="absolute top-22 left-5">
                <div className="relative w-30 h-30">
                  <div className="w-full h-full rounded-full border-4 flex items-center justify-center border-white bg-white">
                    {user.photoURL ? (
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user?.photoURL}
                      />
                    ) : (
                      <User
                        className="bg-purple-800 p-2 rounded-full"
                        size={55}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => fileRef.current.click()}
                    className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    <Pencil
                      size={16}
                      className="text-purple-800 cursor-pointer"
                    />
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
                  <BadgeCheck size={18} className="text-green-600" />
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
                  <p className="text-gray-500">
                    {user.bio || "No bio added yet."}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap md:flex-row items-center gap-4">
                {isEditing ? (
                  <input
                    name="firstname"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
                    placeholder="phone"
                  />
                ) : (
                  <div className="rounded-full p-2 flex items-center gap-2">
                    <Phone className="text-purple-800" size={25} />
                    <p>{user.phone}</p>
                  </div>
                )}

                <div className="rounded-full p-2 flex items-center gap-2">
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

          <div className=" ">
            <div className="mb-2">
              <div className="flex items-center gap-4">
                {" "}
                <h1 className="text-2xl md:text-3xl font-medium">
                  Applied Jobs
                </h1>
                <div className="w-5 h-5 flex items-center justify-center text-center bg-purple-200 rounded-full">
                  <p className=" text-purple-800 font-medium">
                    {appliedJobs.length}
                  </p>
                </div>
              </div>
              <div className="h-1 w-10 bg-purple-800" />
            </div>
            {appliedJobs.length === 0 ? (
              <p className="text-gray-500 mt-2">No applications yet.</p>
            ) : (
              <div className="border-2 border-gray-200 flex flex-col gap-4 p-5 rounded-2xl overflow-y-scroll h-80">
                {appliedJobs.map((app) => (
                  <Link to={`/jobs/${app.jobId}`}>
                    <div
                      key={app.jobId}
                      className="border-2 border-gray-200 relative p-2 rounded-lg flex justify-between items-center hover:shadow-xl hover:border-purple-800 duration-300"
                    >
                      <div className="">
                        <div className="flex gap-6 items-center">
                          <div className="">
                            <img
                              src={getLogoUrl(`${app.company}.com`)}
                              className="w-15 h-15 rounded-lg"
                            />{" "}
                          </div>

                          <div>
                            <h5 className="font-medium text-xl">
                              {app.jobTitle}
                            </h5>
                            <div className="flex items-center gap-2 text-gray-500">
                              <p className="capitalize text-sm font-medium">
                                {app.company}
                              </p>
                              •
                              <p className="font-medium text-sm">
                                {app.location}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 inset-e-0 bg-green-200 py-1 px-2 rounded-tr-md">
                          <p className="text-sm text-green-500 font-medium">
                            {app.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col py-10">
          <div className="mb-2">
            <div className="flex items-center gap-4">
              {" "}
              <h1 className="text-2xl md:text-3xl font-medium">
                Your Saved Jobs
              </h1>
              <div className="w-5 h-5 flex items-center justify-center text-center bg-purple-200 rounded-full">
                <p className=" text-purple-800 font-medium">
                  {savedJobs.length}
                </p>
              </div>
            </div>
            <div className="h-1 w-15 bg-purple-800" />
          </div>
          <div>
            {isLoading ? (
              <Spinner />
            ) : savedJobs.length > 0 ? (
              <div className="border- border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl">
                <JobCard jobs={savedJobs} />
              </div>
            ) : (
              <p className="text-cente mt-4 text-gray-500">
                You haven't saved any jobs yet.
              </p>
            )}
          </div>
          <button
            onClick={logoutNavigateSignIn}
            className="bg-red-200 text-red-600 font-medium px-4 py-3 rounded-lg mt-7 w-80 mx-auto cursor-pointer hover:scale-98 duration-200"
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
