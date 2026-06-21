import { MutatingDots } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MutatingDots
        height={100}
        width={100}
        color="#622a8e"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#1e2939"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
export default Spinner;
