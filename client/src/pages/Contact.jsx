import { useState } from "react";

export const Contact = () => {
    const [contact, setContact] = useState({
        username : "",
        email : "",
        message : ""
    });

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let val = e.target.value
        setContact({
            ...contact,
            [name] : val
        })
    }
    const handleForm = (e) => {
        e.preventDefault();
        console.log(contact);
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
                <form onSubmit={handleForm}>
                    <div>
                        <label htmlFor="username">Username : </label>
                        <input type="text" name="username" placeholder="username"
                        id="username" required autoComplete="off" value={contact.username}
                        onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type="text" name="email" placeholder="email"
                        id="email" required autoComplete="off" value={contact.email}
                        onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="message">Message : </label>
                        <textarea name="message" cols="30" rows="1" placeholder="message"
                        id="message" required value={contact.message}
                        onChange={handleInput}></textarea>
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
