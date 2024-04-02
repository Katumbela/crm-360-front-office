import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Signup_1 } from "../components/Signup_1";
import { Signup_2 } from "../components/Signup_2";
import { Signup_4 } from "../components/Signup_4";
import Signup_3 from "../components/Signup_3";
import { UserModel } from "@/domain/models";
// import { SignupSuccess } from "../components/signup-success";

const userDetails: UserModel = {
  email: "",
  password: "",
  company_name: "",
  website: "",
  address: "",
  city: "",
  phone: 0,
  country: "",
  team: "",
  contacts: "",
  online_selling: "no", // Inicializado com um valor padrão
  plan: "Free",
  id: "",
  name: "",
};


export function Signup() {
  const [part, setPart] = useState(1);
  const [user, setUser] = useState(userDetails);

  const handlePartPrev = () => {
    setPart((prev) => prev - 1);
  };

  const handlePartNext = () => {
    setPart((prev) => prev + 1);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Atualiza o estado user com os novos valores
    setUser({ ...user, [name]: value });

    // Os valores do estado user podem não estar atualizados imediatamente
    // Use a função de retorno do useState para garantir o acesso aos valores atualizados
    console.log(user);
  };

  return (
    <Box>
      {part === 1 ? (
        <Signup_1
          user={user}
          handleChange={handleChange}
          handlePartNext={handlePartNext}
          handlePartPrev={handlePartPrev}
        />
      ) : part === 2 ? (
        <Signup_2
          user={user}
          handleChange={handleChange}
          handlePartNext={handlePartNext}
          handlePartPrev={handlePartPrev}
        />
      ) : part === 3 ? (
        <Signup_3
          user={user}
          handleChange={handleChange}
          handlePartNext={handlePartNext}
          handlePartPrev={handlePartPrev}
        />
      )  : (
        <Signup_4 user={user}
          handlePartPrev={handlePartPrev} handleChange={handleChange} />
      )}
    </Box>
  );
}
