import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi'
import axios from "axios";
import { server } from "../constants/constants";
import { toast } from "react-toastify";
import { setIsAuthenticated } from "../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const dispatch = useDispatch();

  const logout = async() => {
    try {
      const {data} = await axios.get(`${server}/users/logout`, {withCredentials: true})
      console.log(data)
      toast.success(data.message)
      dispatch(setIsAuthenticated(false))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full h-14 bg-indigo-500">
      <div className="task-container w-full h-full flex items-center justify-between">
        {/* right section  */}
        <div>
          <Link
            to="/"
            className="text-white font-bold text-2xl uppercase font-poppins"
          >
            Tasks App
          </Link>
        </div>

        {/* left section  */}
        <div className="flex items-center gap-8">
          {isAuthenticated ? (
            <>
              {/* profile */}
              <div>
                  <Link to='/profile' className="text-white text-lg font-poppins">Profile</Link>
              </div>

              {/* logout  */}
              <div>
                <button onClick={logout} className="px-5 py-2 rounded-md bg-red-500 text-white">Logout <FiLogOut className="inline ml-3" size={25} /></button>
              </div>
            </>
          ) : (
            <>
              {/* login  */}
              <div>
                <Link to={"/login"} className="text-white text-lg font-poppins">
                  Login
                </Link>
              </div>

              {/* signup  */}
              <div>
                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 rounded-md bg-lime-400 hover:bg-lime-500 active:scale-95 duration-500 hover:shadow-md"
                >
                  Get Started
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
