import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from "../components/UpdateModal";
import { useSelector } from "react-redux";


const RootLayout = () => {

  const { modalState } = useSelector((state) => state.task);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <ToastContainer autoClose={1500} position="top-center" />
      {modalState && <UpdateModal />}
    </>
  );
};
export default RootLayout;
