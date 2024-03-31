import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { NavbarAfter } from "../components/NavbarAfter";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { FaArrowRight, FaCalendar, FaSearch, FaThumbsUp, FaYoutube } from "react-icons/fa";
import { Video } from "../../domain/models/yt-video-model";
// import { env } from "../../main/config";
import { AlertUtils, DateUtils } from "../../utils";
import { formatSeguidores } from "../../utils/format-seguidores";
import { calculatePopularityScore } from "../../utils/popularidade-utils";
import { Spinner } from "../components/spinner";
import { FaMessage } from "react-icons/fa6";
import logo from '../../assets/Images/logo-new-2.png'
import { env } from "../../main/config";

export const DashMonitoring = () => {
    const account = useSelector(useAuth());
    const { user } = account;
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${env.apiUrl}yt?query=${query}`);
            setVideos(response.data);
            console.log(videos)
        } catch (error: any) {
            AlertUtils.error(error?.message);
            // console.error("Erro ao buscar vídeos:", error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    function getBackgroundClass(sentimento: string) {
        switch (sentimento) {
            case 'Positivo':
                return 'bg-green-300 font-semibold text-green-700'; // Define o background verde para sentimentos positivos
            case 'Negativo':
                return 'bg-red-300 font-semibold text-red-700'; // Define o background vermelho para sentimentos negativos
            case 'Neutro':
                return 'bg-gray-300 font-semibold text-gray-600'; // Define o background cinza para sentimentos neutros
            default:
                return ''; // Retorna uma string vazia se o sentimento não for reconhecido
        }
    }

    const highlightSearchTerm = (text: string, query: string) => {
        // Cria uma expressão regular com a palavra pesquisada, ignorando maiúsculas e minúsculas
        const regex = new RegExp(`(${query})`, 'gi');

        // Substitui todas as ocorrências da palavra pesquisada pelo mesmo texto envolto em tags <strong>
        return text.replace(regex, '<strong>$1</strong>');
    };


    return (
        <div className="h-full bg-slate-100">
            <NavbarAfter />
            <div className="w-full flex gap-6 absolute shadow-lg top-[4rem] bg-white py-4 px-8 ">
                <div className="input w-6/12 focus-within:border-orange-600 transition-all bg-slate-50 border rounded-full px-3 flex gap-4">
                    <FaSearch className="my-auto text-orange-600" />
                    <input
                        type="text"
                        className="my-auto bg-transparent w-full outline-none py-2 px-1"
                        placeholder={`Olá ${user.name} "Pesquise por menções, tags, etc...`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button
                    className="search text-white gap-3 hover:bg-orange-600 transition-all flex bg-orange-500 px-3 py-2 rounded-3xl"
                    onClick={handleSearch}
                    disabled={!query || loading}
                >
                    <FaSearch className="my-auto" /> <span className="pe-2">Buscar</span>
                </button>
            </div>
            <Box bg="orange.100" className="mt-[8rem] px-[3rem] pt-[3rem]">
                {loading ? (
                    <Flex justify="center" align="center" h="100%">
                        <Spinner className="animate text-6xl text-orange-600 mb-[14rem] animate-spin" />
                    </Flex>
                ) : (
                    <>
                        <div className="flex">
                            <div className="w-6/12">

                                {videos.map((video) => (
                                    <div key={video.link} className="my-[2rem]">
                                        <div className="bg-white p-3 shadow-md rounded-lg">
                                            <div className="flex gap-3">
                                                <img src={video.fotoPerfilAutor} className="w-[3em] h-[3em] border border-orange-500 rounded-full" alt="" />
                                                <div>

                                                    <div className="flex justify-between">

                                                        <a target="__blank" href={video.link} className="flex gap-3 font-bold text-sm hover:underline"> <FaYoutube className="text-red-600 text-2xl my-auto" /><span className="my-auto"> {video.autor}</span> </a>
                                                        <span className={` h-[1.5em] px-2 text-xs rounded-full  ${getBackgroundClass(video.sentimento)}`}>
                                                            {video.sentimento}
                                                        </span>
                                                    </div>

                                                    <div className="flex text-xs gap-2 text-slate-400 font-semibold">
                                                        <span>youtube.com</span>
                                                        <span className="font-bold">&middot;</span>
                                                        <span>{formatSeguidores(video.seguidores)} inscritos</span>
                                                        <span className="font-bold">&middot;</span>
                                                        score {calculatePopularityScore(video.visualizacoes, video.likes)}
                                                        <span className="font-bold">&middot;</span>
                                                        <span className="flex gap-2">
                                                            <FaCalendar />
                                                            {DateUtils.getDateTimePt(video.dataPublicacao)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-gray-500 text-xs">
                                                {highlightSearchTerm(video.descricao, query)}
                                            </p>
                                            <div className="flex my-4 text-xs gap-4 text-slate-400">
                                                <span className="flex gap-1"><FaMessage className="my-auto" /> <span className="my-auto">{video.comentarios}</span></span>
                                                <span className="flex gap-1"><FaThumbsUp className="my-auto" /> <span className="my-auto">{video.likes}</span></span>
                                            </div>

                                            <div className="py-2"> <hr /></div>
                                            <div className="flex  justify-between text-xs">
                                                <a href={video.link} className="bg-orange-200/50 flex gap-2 px-3 py-1 font-semibold">Visitar <FaArrowRight className="my-auto text-[6px" /></a>
                                                <span>
                                                    <img className="w-[4em] my-auto " src={logo} alt="" />
                                                </span>
                                            </div>


                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </Box>

        </div>
    );
};
