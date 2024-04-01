import { Box, Flex } from "@chakra-ui/react";
import { NavbarAfter } from "../components/NavbarAfter";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  FaArrowRight,
  FaCalendar,
  FaSearch,
  FaThumbsUp,
  FaYoutube,
} from "react-icons/fa";
import { Video } from "../../domain/models/yt-video-model";
// import { env } from "../../main/config";
import { AlertUtils, DateUtils } from "../../utils";
import { formatSeguidores } from "../../utils/format-seguidores";
import { calculatePopularityScore } from "../../utils/popularidade-utils";
import { Spinner } from "../components/spinner";
import { FaMessage } from "react-icons/fa6";
import logo from "../../assets/Images/logo-new-2.png";
import Highlighter from "react-highlight-words";

export const DashMonitoring = () => {
  const account = useSelector(useAuth());
  const { user } = account;
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://crm-360-api.vercel.app/yt?query='${query}'`
      );
      setVideos(response.data);
      console.log(videos);
    } catch (error: any) {
      AlertUtils.error(error?.message);

      console.error("Erro ao buscar vídeos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  function getBackgroundClass(sentimento: string) {
    switch (sentimento) {
      case "Positivo":
        return "bg-green-300 font-semibold text-green-700"; // Define o background verde para sentimentos positivos
      case "Negativo":
        return "bg-red-300 font-semibold text-red-700"; // Define o background vermelho para sentimentos negativos
      case "Neutro":
        return "bg-gray-300 font-semibold text-gray-600"; // Define o background cinza para sentimentos neutros
      default:
        return ""; // Retorna uma string vazia se o sentimento não for reconhecido
    }
  }

  return (
    <div className="h-full bg-slate-100">
      <NavbarAfter />
      <div className="w-full flex gap-6 absolute shadow-lg top-[4rem] bg-white py-4 px-8 ">
        <div className="flex w-6/12 gap-4 px-3 transition-all border rounded-full input focus-within:border-orange-600 bg-slate-50">
          <FaSearch className="my-auto text-orange-600" />
          <input
            type="text"
            className="w-full px-1 py-2 my-auto bg-transparent outline-none"
            placeholder={`Olá ${user.name} "Pesquise por menções, tags, etc...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="flex gap-3 px-3 py-2 text-white transition-all bg-orange-500 search hover:bg-orange-600 rounded-3xl"
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
                    <div className="p-3 bg-white rounded-lg shadow-md">
                      <div className="flex gap-3">
                        <img
                          src={video.fotoPerfilAutor}
                          className="w-[3em] h-[3em] border border-orange-500 rounded-full"
                          alt=""
                        />
                        <div className="w-full">
                          <div className="flex justify-between w-full">
                            <a
                              target="__blank"
                              href={video.link}
                              className="flex gap-3 text-sm font-bold hover:underline"
                            >
                              {" "}
                              <FaYoutube className="my-auto text-2xl text-red-600" />
                              <span className="my-auto"> {video.autor}</span>{" "}
                            </a>
                            <span
                              className={` h-[1.5em] px-2 text-xs rounded-full  ${getBackgroundClass(
                                video.sentimento
                              )}`}
                            >
                              {video.sentimento}
                            </span>
                          </div>

                          <div className="flex gap-2 text-xs font-semibold text-slate-400">
                            <span>youtube.com</span>
                            <span className="font-bold">&middot;</span>
                            <span>
                              {formatSeguidores(video.seguidores)} inscritos
                            </span>
                            <span className="font-bold">&middot;</span>
                            score{" "}
                            {calculatePopularityScore(
                              video.visualizacoes,
                              video.likes
                            )}
                            <span className="font-bold">&middot;</span>
                            <span className="flex gap-2">
                              <FaCalendar />
                              {DateUtils.getDateTimePt(video.dataPublicacao)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        <Highlighter
                          highlightClassName="bg-orange-400 font-bold px-1 py-[.5px] "
                          searchWords={[query]}
                          autoEscape={true}
                          textToHighlight={video.descricao}
                        />
                      </p>
                      <div className="flex gap-4 my-4 text-xs text-slate-400">
                        <span className="flex gap-1">
                          <FaMessage className="my-auto" />{" "}
                          <span className="my-auto">{video.comentarios}</span>
                        </span>
                        <span className="flex gap-1">
                          <FaThumbsUp className="my-auto" />{" "}
                          <span className="my-auto">{video.likes}</span>
                        </span>
                      </div>

                      <div className="py-2">
                        {" "}
                        <hr />
                      </div>
                      <div className="flex justify-between text-xs">
                        <a
                          href={video.link}
                          className="flex gap-2 px-3 py-1 font-semibold bg-orange-200/50"
                        >
                          Visitar <FaArrowRight className="my-auto text-[6px" />
                        </a>
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
