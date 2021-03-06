import React, { useRef } from "react";
import { auth } from "../../firebaseConfig/firebaseConfig";

import "./Login.css";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,
  Container,
} from "reactstrap";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { Box, Divider, Heading, Link } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";

function Login() {
  const toast = useToast();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    await auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((res) =>
        toast({
          title: `Hi ${res.user.email}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        })
      )
      .catch((error) =>
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        })
      );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    await auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((res) =>
        toast({
          title: `Hi ${res.user.email}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        })
      )
      .catch((error) =>
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        })
      );
  };

  const handlePassword = async () => {
    await auth
      .sendPasswordResetEmail(emailRef.current.value)
      .then((res) =>
        toast({
          title: `Password Reset mail is sent to you`,
          //   description: res.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
      )
      .catch((err) =>
        toast({
          title: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
      );
  };

  const handleGuest = async (e) => {
    e.preventDefault();

    await auth
      .signInWithEmailAndPassword("abc@gmail.com", "123456")
      .then((res) =>
        toast({
          title: `Hi ${res.user.email}`,
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
        })
      );
  };

  return (
    <Box className="login">
      <Heading padding="1rem 0 0 1rem" size="2xl" color="#fff">
        Note Lite
      </Heading>
      <Container
        className="d-flex align-items-center justify-content-center "
        style={{
          minHeight: "90vh",

          borderRadius: "5px",
          flexDirection: "column",
        }}
      >
        <Card className="w-100 login-card" style={{ maxWidth: "400px" }}>
          <CardBody>
            <CardTitle tag="h2" className="text-center mb-4">
              Log In
            </CardTitle>
            <Form>
              <FormGroup>
                <Label id="email">Email</Label>
                <Input type="email" innerRef={emailRef} required />
              </FormGroup>
              <FormGroup>
                <Label id="password">Password</Label>
                <Input type="password" innerRef={passwordRef} required />
              </FormGroup>
              <Box d="flex" justifyContent="space-evenly">
                <Button onClick={handleLogin} type="submit">
                  Log In
                </Button>

                <Button onClick={handleSignUp} type="submit">
                  Sign Up
                </Button>
              </Box>
              <Box d="flex">
                <Divider
                  marginTop="1rem"
                  orientation="horizontal"
                  borderColor="#495057"
                />

                <Text textAlign="center" padding="0 1rem">
                  Or
                </Text>
                <Divider
                  marginTop="1rem"
                  orientation="horizontal"
                  borderColor="#495057"
                />
              </Box>

              <Box className="btn-section">
                <GoogleLogin />
                <Button className="guest" onClick={handleGuest}>
                  Guest Login
                </Button>
              </Box>
            </Form>
            <Text marginTop="1rem" textAlign="center">
              Forgot your password?{" "}
              <Link color="teal.500" onClick={handlePassword}>
                Click here
              </Link>
            </Text>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
