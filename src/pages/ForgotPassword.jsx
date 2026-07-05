import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const { handlePasswordReset } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setSending(true);

      await handlePasswordReset(email);

      toast.success("Password reset email sent. Check your inbox.");

      setEmail("");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with that email.");
          break;

        case "auth/invalid-email":
          toast.error("Please enter a valid email.");
          break;

        default:
          toast.error("Something went wrong.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-5">
          <p className="text-5xl text-gray-800 font-bold">Reset Password</p>
          <div className="w-14 h-1 bg-purple-800"></div>
        </div>
        <p className="text-gray-500 text-center mb-6">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-800 font-medium">Email</label>
            <input
              className="py-3 px-5 w-full bg-gray-200 border-0 focus:outline-purple-500 rounded-lg"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={`w-full justify-center px-10 py-2 text-white bg-purple-800 font-semibold text-lg rounded-lg mt-5  hover:scale-99 duration-300 ${sending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {sending ? (
              <span className="flex items-center justify-center gap-2">
                {" "}
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending
              </span>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="block text-center text-purple-800 font-medium mt-6 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </section>
  );
};

export default ForgotPassword;
