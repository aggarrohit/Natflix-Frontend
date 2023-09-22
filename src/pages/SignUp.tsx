// Node modules
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import ListInput from "components/ListInput";
import Fields from "data/fields-sign-up.json";
import { useUser } from "state/UserContext";
import iUser from "types/iUser";

export default function Login() {
  // Global state
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Local state
  const [form, setForm] = useState({});

  // Properties
  const endPoint = "register/";

  // Methods
  function onSubmit(event: FormEvent): void {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}${endPoint}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((response: any) => {
        response.json().then((resp: any) => onSuccess(resp));
      })
      .catch((error) => onFailure(error));
  }

  function onSuccess(newUser: iUser) {
    alert("Welcome to Natflix!");
    setUser(newUser);
    navigate("/");
  }

  function onFailure(error: string) {
    console.error(Error);
    alert(`Can't create an account because of ${error}`);
  }

  return (
    <div id="sign-up" className="auth">
      <div className="container">
        <h1>Set up your account</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <ListInput fields={Fields} state={[form, setForm]} />
          <button>Sign up</button>
        </form>
        <footer>
          <p>
            Already have an account? <Link to="/login">Sign in instead</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
