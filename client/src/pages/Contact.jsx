import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const defaultForm = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultForm);

  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let val = e.target.value;
    setContact({
      ...contact,
      [name]: val,
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Message sent successfully");
        setContact({ message: "" });
      }
    } catch (error) {
      console.error("Contact", error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.jpg"
                  alt=""
                  width="400"
                  height="200"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading"></h1>
                <br />
                <form onSubmit={handleForm}>
                  <div>
                    <label htmlFor="username">Username : </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={contact.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="message">Message : </label>
                    <textarea
                      name="message"
                      cols="30"
                      rows="1"
                      placeholder="message"
                      id="message"
                      required
                      value={contact.message}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
