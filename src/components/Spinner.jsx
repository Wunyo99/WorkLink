import { ThreeDots } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDots
        height={100}
        width={100}
        color="#622a8e"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
export default Spinner;
