import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth.jsx";
import { toast } from 'react-toastify';

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokeninLS} = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let val = e.target.value;
    setUser({
      ...user,
      [name]: val,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      // console.log("Res from server", res_data);

      if(response.ok){
        toast.success("Login successful");
        storeTokeninLS(res_data.token);

        setUser({email : "", password : ""});
        navigate("/");
      }else{
        toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
      }
    } catch (error) {
      console.log("Login", error);
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
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
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
