import { NavLink, Outlet } from "react-router-dom";
import { FaUser , FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const AdminLayout = () => {

  const {user, isLoading} = useAuth();
  if(isLoading){
    return <h1>Loading....</h1>;
  }

  if(!user.isAdmin){
    // toast.error("User is not a admin");
    return <NavLink to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
            <nav>
                <ul>
                    <li><NavLink to="/admin/users"><FaUser />users</NavLink></li>
                    <li><NavLink to="/admin/contacts"><FaMessage />contacts</NavLink></li>
                    <li><NavLink to="/service"><FaRegListAlt />services</NavLink></li>
                    <li><NavLink to="/"><FaHome />home</NavLink></li>
                </ul>
            </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
