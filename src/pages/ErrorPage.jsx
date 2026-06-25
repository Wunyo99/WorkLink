import { LucideFileExclamationPoint } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex flex-col gap-5 justify-center h-90 items-center">
      <div className="text-yellow-500">
        <LucideFileExclamationPoint size={35} />
      </div>
      <div className="text-center space-y-">
        <h1 className="text-6xl font-bold mb-4 italic">404 Not Found</h1>
        <p className="text-xl italic mb-6">This page does not exist</p>
        <Link className="bg-purple-200 p-3 text-purple-800 font-medium rounded-xl hover:bg-purple-800 hover:text-white duration-200" to="/">Back to Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
