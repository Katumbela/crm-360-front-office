import {
    Box,
    CircularProgress,
    Flex,
} from "@chakra-ui/react";
import { NavbarAfter } from "../components/NavbarAfter";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { FaSearch, FaYoutube } from "react-icons/fa";
import { Video } from "../../domain/models/yt-video-model";
// import { env } from "../../main/config";
import { AlertUtils } from "../../utils";

export const DashMonitoring = () => {
    const account = useSelector(useAuth());
    const { user } = account;
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3030/yt?query=${query}`);
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


    return (
        <div className="h-screen bg-slate-100">
            <NavbarAfter />
            <div className="w-full flex gap-6 absolute shadow-lg top-[4rem] bg-white py-4 px-8 ">
                <div className="input w-6/12 focus-within:border-orange-600 transition-all bg-slate-50 border rounded-full px-3 flex gap-4">
                    <FaSearch className="my-auto text-orange-600" />
                    <input
                        type="text"
                        className="my-auto bg-transparent w-full outline-none py-2 px-1"
                        placeholder="Pesquise por menções, tags, etc..."
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
                        <CircularProgress isIndeterminate color="orange.500" />
                    </Flex>
                ) : (
                    <>
                        {videos.map((video) => (
                            <div key={video.link} className="my-[2rem]">
                                <div className="bg-white p-3 shadow-md rounded-lg">
                                    <div className="flex gap-3">
                                        <img src={video.fotoPerfilAutor} className="w-[3em] border border-orange-500 rounded-full" alt="" />
                                        <div>
                                            <a target="__blank" href="" className="flex gap-3 font-bold text-sm hover:underline"> <FaYoutube className="text-red-600 text-2xl my-auto"/><span className="my-auto"> {video.autor}</span> </a>
                                            <div className="flex text-xs text-slate-400 font-bold">
                                                <span>youtube.com</span>
                                                <span>&middot;</span>
                                                {}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </>
                )}
            </Box>

        </div>
    );
};
