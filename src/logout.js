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
    <Card>

      <div>Logga ut från appen</div>
      <Button onClick={logOut}>Logga ut</Button>
     {localStorage.length === 0 ? <h4>Du är nu utloggad! Vi ses en annan gång!</h4> : null}

      </Card>
  );
}

export default Admin;
