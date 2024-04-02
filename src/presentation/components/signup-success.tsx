// import { useNavigate } from "react-router-dom";
//import { authContext } from "../context/AuthContext";
// import { UserModel } from "@/domain/models";

import success from "../../assets/Images/success.png";


export const SignupSuccess = () => {
    // const navigate = useNavigate();
    // const { name, company_name } = user;

    //   const [loading, setLoading] = useState(false);


    return (

        <div className="h-screen grid items-center bg-orange-200/20">
            <center>
                <img src={success} className="w-[20rem]" alt="" />
                <h1 className="text-3xl text-orange-500 font-new-rocker font-bold tracking-widest">Viva !</h1>

                <p className="text-sm w-8/12">
                    Terminamos de criar sua conta , o painel da sua empresa , está preparado
                </p>
                <br />
                <br />
                <a className="border-2 py-3 rounded-md font-semibold px-6 text-orange-700 mt-9 border-primary" href="/">
                    Acesse o Dashboard agora
                </a>
            </center>
        </div>
    );
};
