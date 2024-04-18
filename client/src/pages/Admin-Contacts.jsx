import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllContactsData = async (req, res) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        toast.error(data.extradetails ? data.extradetails : data.message);
      }
    } catch (error) {
      console.error("Admin contacts frontend error");
    }
  };

  const deleteContact = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      // const data = await response.json();
      // console.log(`data after deletion ${data}`)
      if(response.ok){
        toast.success("Contact deleted successfully");
        getAllContactsData();
      }else{
        toast.error("Not deleted");
      }
    } catch (error) {
      console.log("delete contact error");
    }
  }

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <>
      <h1>Admin contacts page</h1>
      <div>
        <table>
          <tbody>
            {contacts.map((currContact, index) => {
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
                  <td>{currContact.username}</td>
                  <td>{currContact.email}</td>
                  <td>{currContact.message}</td>
                  <td><button onClick={() => deleteContact(currContact._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
