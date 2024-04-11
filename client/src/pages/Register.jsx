import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export const Register = () => {
    const [user, setUser] = useState({
        username : "",
        email : "",
        phone : "",
        password : ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let val = e.target.value
        setUser({
            ...user,
            [name] : val
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log(response);
            if(response.ok){
              alert("Registration successful");
              setUser({ username: "", email: "", phone: "", password: "" });
              navigate('/');
            }
        } catch (error) {
            console.error("Register" , error);
        }
        
    }
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="/images/register.jpg" alt="" width="400" height="200"/>
              </div>
              <div className="registration-form">
                <h1 className="main-heading"></h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username : </label>
                        <input type="text" name="username" placeholder="username"
                        id="username" required autoComplete="off" value={user.username}
                        onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type="text" name="email" placeholder="email"
                        id="email" required autoComplete="off" value={user.email}
                        onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone : </label>
                        <input type="number" name="phone" placeholder="phone"
                        id="phone" required autoComplete="off" value={user.phone}
                        onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password : </label>
                        <input type="password" name="password" placeholder="password"
                        id="password" required autoComplete="off" value={user.password}
                        onChange={handleInput}/>
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
