import React from "react";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig/firebaseConfig";
import Login from "./components/Login/Login";
import { Image } from "@chakra-ui/image";
import loader from "./images/loading.svg";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Image className="loader" src={loader} />;
  return (
    <ChakraProvider>
      {user ? <MainLayout user={user} /> : <Login />}
    </ChakraProvider>
  );
};

export default App;
