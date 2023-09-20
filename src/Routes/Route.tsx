import { Routes, Route, useNavigate } from "react-router-dom";
import Game from "../pages/Game";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Button, Center, Text } from "@chakra-ui/react";
import Account from "../pages/Account";

export const AllRoute = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path={"/"} element={<Game />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Register />} />
      <Route path={"/account"} element={<Account />} />
      <Route
        path={"*"}
        element={
          <Center
            h={"container.md"}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
          >
            <Text fontFamily={"mono"} fontWeight={"bold"} fontSize={"4xl"}>
              You are in wrong Route!
            </Text>
            <Button
              colorScheme={"blue"}
              variant={"outline"}
              onClick={() => navigate("/")}
            >
              <Text>Go to Home</Text>
            </Button>
          </Center>
        }
      />
    </Routes>
  );
};
