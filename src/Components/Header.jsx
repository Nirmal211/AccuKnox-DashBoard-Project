import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="w-full h-[8vh] p-5 shadow-2xl selection:text-white selection:bg-black">
        <div className="list-none flex space-x-3">
          <Link to={"/"}>
            <li className="cursor-pointer">Home</li>
          </Link>
          <li>{">"}</li>
          <Link to={"/dashboard"}>
            <li className="cursor-pointer font-bold">AccuKnox Dashboard</li>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
