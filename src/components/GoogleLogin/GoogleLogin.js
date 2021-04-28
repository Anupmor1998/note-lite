import React from "react";
import { Button } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "./GoogleLogin.css";
import google from "../../images/google.svg";
import { useToast } from "@chakra-ui/react";

function GoogleLogin() {
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) =>
        toast({
          title: `Hi ${res.user.displayName}`,
          description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
      )
      .catch((error) =>
        toast({
          title: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
      );
  };
  return (
    <div className="google-btn">
      <Button outline onClick={handleSubmit}>
        <img src={google} alt="Login With Google" width="40px" height="40px" />
      </Button>
    </div>
  );
}

export default GoogleLogin;
