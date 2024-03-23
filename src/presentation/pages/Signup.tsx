import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Signup_1 } from "../components/Signup_1";
import { Signup_2 } from "../components/Signup_2";
import { Signup_4 } from "../components/Signup_4";
import Signup_3 from "../components/Signup_3";
import { UserModel } from "@/domain/models";

const userDetails: UserModel = {
  email: "",
  password: "",
  company_name: "",
  website: "",
  address: "",
  city: "",
  country: "",
  team: "",
  contacts: [],
  online_selling: "no", // Inicializado com um valor padrão
  plan: "",
  id: "",
  name: "",
};


export function Signup () {
  const [part, setPart] = useState(1);
  const [user, setUser] = useState(userDetails);

  const handlePart = () => {
    setPart((prev) => prev + 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  return (
    <Box>
      {part === 1 ? (
        <Signup_1
          user={user}
          handleChange={handleChange}
          handlePart={handlePart}
        />
      ) : part === 2 ? (
        <Signup_2
          user={user}
          handleChange={handleChange}
          handlePart={handlePart}
        />
      ) : part === 3 ? (
        <Signup_3
          user={user}
          handleChange={handleChange}
          handlePart={handlePart}
        />
      ) : (
        <Signup_4 user={user} handleChange={handleChange} />
      )}
    </Box>
  );
}
