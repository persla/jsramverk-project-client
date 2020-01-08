import React from "react";
import { Card, Button } from "./context/AuthForms";
import { useAuth } from "./context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  console.log(useAuth())

  function logOut() {
    setAuthTokens();
    console.log(setAuthTokens())
    localStorage.removeItem('currentuser');
    localStorage.clear();
  }

  return (

    <div className='form-wrapper'>

    <h2>Utloggning</h2>
      <Button onClick={logOut}>Logga ut</Button>
     {localStorage.length === 0 ? <h4>Du är nu utloggad! Vi ses en annan gång!</h4> : null}

      </div>
  );
}

export default Admin;
