import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";

export const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async (req, res) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setUsers(data);
      }else{
        toast.error(data.extradetails ? data.extradetails : data.message);
      }
    } catch (error) {
      console.error("Admin users error");
    }
  };

  const deleteUser = async(id) => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log(`data after deletion ${data}`)
      if(response.ok){
        toast.success("User deleted successfully");
        getAllUsersData();
      }
    } catch (error) {
      console.log("delete user error");
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div>
        <table>
          <tbody>
            {users.map((currUser, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    display: "flex",
                    width: "500px",
                    height: "100px",
                    border: "1px solid red",
                    padding: "10px",
                    marginLeft: "50px",
                  }}
                >
                  <td>{currUser.username}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phone}</td>
                  <td><NavLink to={`/admin/users/${currUser._id}/edit`}>Edit</NavLink> </td>
                  <td><button onClick={() => deleteUser(currUser._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
