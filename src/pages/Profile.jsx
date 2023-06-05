import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { server } from "../constants/constants";

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/users/profile`, {
        withCredentials: true,
      });
      //console.log(data)
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <div className="bg-indigo-100 fixed inset-0 z-[-50]"></div>
      <div className="task-container">
        <div className="max-w-[400px] mx-auto bg-white px-4 py-5 rounded-md mt-16">
          {/* heading */}
          <div>
            <h1 className="text-center text-3xl font-bold uppercase font-poppins">
              Profile:
            </h1>
          </div>
          {/* username  */}
          <div className="my-5">
            <span className="text-xl font-poppins tracking-widest">
              Username:
            </span>
            <span className="ml-2 text-xl font-poppins font-medium">
              {user?.name}
            </span>
          </div>
          {/* email  */}
          <div className="my-5">
            <span className="text-xl font-poppins tracking-widest">Email:</span>
            <span className="ml-2 text-xl font-poppins font-medium">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
