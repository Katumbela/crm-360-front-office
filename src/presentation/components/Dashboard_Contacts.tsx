import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    Heading,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";

import { EmailIcon } from "@chakra-ui/icons";
import { BiSave } from "react-icons/bi";
import { BsPersonCircle, BsTelephone } from "react-icons/bs";
import { firestore } from "../../firebase";
import { useCallback, useEffect, useState } from "react";
import { AlertUtils } from "../../utils";
import { useAuth } from "../../main/hooks";
import { useSelector } from "react-redux";
import { Spinner } from "./spinner";
import { CollaboratorModel } from "../../domain/models/colaborator-model";
import { fetchCollaborators } from "../../services/getColaborators";
import { v4 as uuidv4 } from 'uuid';

import RenderCollaboratorsTable from './renderColaboratorsTable/renderColaboratorTable'

export const Dashboard_Contact = () => {

    const account = useSelector(useAuth())
    const { user } = account

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [editCollaborator, setEditCollaborator] = useState<CollaboratorModel | null>(null);
    const [collaborators, setCollaborators] = useState<CollaboratorModel[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [loadingCollaborators, setLoadingCollaborators] = useState(true);
    const [loadingRender, setLoadingRender] = useState(false)
    const [loadingIcon, setLoadingIcon] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [contact, setContact] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
    });


    const fetchData = useCallback(async () => {
        try {
            const fetchedCollaborators = await fetchCollaborators(user);
            setCollaborators(fetchedCollaborators || []);

            setLoadingCollaborators(false);
        } catch (error) {
            console.error("Erro ao buscar colaboradores:", error);

            setLoadingCollaborators(false);
        } finally {
            setLoading(false);
            setLoadingCollaborators(false);
        }
    }, [user]);

    const handleSaveContact = async () => {
        setLoading(true);
        try {
            // Referência para o documento na coleção "business" com o ID "FZer_Gokside"
            const businessDocRef = firestore.collection("business").doc(`${user.id.substring(0, 4)}_${user.company_name}`);

            // Obtém os dados atuais do documento
            const businessDocSnapshot = await businessDocRef.get();
            const businessData = businessDocSnapshot.data();

            // Inicializa a lista de colaboradores se ainda não existir
            const collaborators = businessData?.collaborators || {};

            // Gera um ID único para o novo contato
            const newContactId = uuidv4(); // Usando a função uuidv4 para gerar um UUID único

            // Cria um novo contato com um ID único
            const newContact = { id: newContactId, ...contact };

            // Atualiza o campo "collaborators" do documento "FZer_Gokside" com os dados atualizados
            await businessDocRef.set({ collaborators: { ...collaborators, [newContactId]: newContact } }, { merge: true });

            AlertUtils.success("Contato salvo com sucesso!");
            console.log("Contato salvo com sucesso!");

            onClose();
            setLoading(false);

            // Limpa o estado após salvar o contato
            setContact({
                nome: "",
                sobrenome: "",
                email: "",
                telefone: "",
            });

            // Atualiza a tabela de colaboradores após salvar o contato
            fetchData();
        } catch (error) {
            setLoading(false);
            console.error("Erro ao salvar o contato:", error);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setContact((prevContact: any) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleDeleteConfirm = async (collaboratorToDeleteId: string) => {
        try {
            setLoadingRender(true);

            const businessDocRef = firestore.collection("business").doc(`${user.id.substring(0, 4)}_${user.company_name}`);

            const businessDocSnapshot = await businessDocRef.get();
            const businessData = businessDocSnapshot.data();

            if (!businessData || !businessData.collaborators) {
                throw new Error("Dados de colaboradores não encontrados.");
            }

            // Faz uma cópia da lista de colaboradores
            const updatedCollaborators = { ...businessData.collaborators };

            // Remove o colaborador com o ID especificado da lista
            delete updatedCollaborators[collaboratorToDeleteId];

            // Atualiza o campo "collaborators" do documento com a lista atualizada
            await businessDocRef.update({ collaborators: updatedCollaborators });

            AlertUtils.success("Contato removido com sucesso!");
            console.log("Contato removido com sucesso!");

            setLoadingRender(false);
            setIsDeleteConfirmationOpen(false);

            // Atualiza a tabela de colaboradores após a exclusão
            fetchData();
        } catch (error) {
            setLoadingRender(false);
            setIsDeleteConfirmationOpen(false);
            console.error("Erro ao remover o contato:", error);
        }
    };




    const handleSaveEdit = async (editCollaborator: CollaboratorModel) => {
        const contactId = editCollaborator.id
        const datas = {
            nome: editCollaborator.nome,
            sobrenome: editCollaborator.sobrenome,
            email: editCollaborator.email,
            telefone: editCollaborator.telefone
        }

        setLoadingIcon(true);
        try {
            // Referência para o documento na coleção "business" com o ID "FZer_Gokside"
            const businessDocRef = firestore.collection("business").doc(`${user.id.substring(0, 4)}_${user.company_name}`);

            // Obtém os dados atuais do documento
            const businessDocSnapshot = await businessDocRef.get();
            const businessData = businessDocSnapshot.data();

            // Verifica se o contato que está sendo atualizado existe na lista de colaboradores
            const collaborators = businessData?.collaborators || {};
            if (!collaborators[contactId]) {
                throw new Error("Contato não encontrado para atualização.");
            }

            // Atualiza os dados do contato existente com os novos dados fornecidos
            collaborators[contactId] = { id: contactId, ...datas };

            // Atualiza o campo "collaborators" do documento "FZer_Gokside" com os dados atualizados
            await businessDocRef.set({ collaborators }, { merge: true });

            // AlertUtils.success("Contato atualizado com sucesso!");
            console.log("Contato atualizado com sucesso!");

            onClose();
            setLoadingIcon(false);

            // Limpa o estado após atualizar o contato
            setContact({
                nome: "",
                sobrenome: "",
                email: "",
                telefone: "",
            });

            // Atualiza a tabela de colaboradores após atualizar o contato
            fetchData();
        } catch (error) {
            setLoadingIcon(false);
            console.error("Erro ao atualizar o contato:", error);
        }
    };






    // useEffect(() => {

    //     fetchData();
    // }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);




    return (
        <Box w="75%" mx="auto">
            <Flex p="4">
                <Spacer />
                <Button className="bg-orange-300/30 -mt-10 hover:bg-orange-500/40 transition-all border-2 border-orange-600 font-semibold text-orange-700 rounded-lg px-3 py-2 " onClick={onOpen}>Adicionar contacto</Button>
            </Flex>
            <br />

            {
                loadingCollaborators ?
                    <Spinner className="text-5xl mx-auto text-orange-500 mt-[3rem]" />
                    :
                    <>

                        {
                            collaborators.length <= 0 ?
                                <Stack
                                    mt="20px"
                                    bg="#F9FAFC"
                                    padding="10"
                                    spacing={10}
                                    border="1px"
                                    borderStyle="dashed"
                                    borderColor="gray.500"
                                    textAlign="center"
                                    w="60%"
                                    mx="auto"
                                    my="20"
                                >
                                    <Heading
                                        fontSize="2xl"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="2"
                                        fontWeight="500"
                                    >
                                        <Icon as={FaTelegramPlane} />
                                        Crie sua primeira lista
                                    </Heading>

                                    <Text color="gray.700">
                                        Crie e edite seus modelos de e-mail (confirmações de pedidos,
                                        confirmações de registro, e-mails de automação etc.).
                                    </Text>

                                    <Center>
                                        <Button borderRadius="50px" maxW="fit-content" colorScheme="red">
                                            Criar meu primeiro modelo
                                        </Button>
                                    </Center>

                                </Stack>

                                :
                                <RenderCollaboratorsTable
                                    editCollaborator={editCollaborator}
                                    setEditCollaborator={setEditCollaborator}
                                    loadingIcon={loadingIcon}
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    loadingRender={loadingRender}
                                    setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen}
                                    isDeleteConfirmationOpen={isDeleteConfirmationOpen}
                                    onSaveEdit={handleSaveEdit}
                                    handleDeleteConfirm={handleDeleteConfirm}
                                    user={user}
                                    collaborators={collaborators}
                                />


                        }

                    </>
            }


            {/* Modals areas */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className="bg-black/40" />
                <ModalContent w={'30rem'} mx={'auto'} className="bg-white w-[20vw] p-8 rounded-xl my-auto mt-[25vh]">
                    <ModalHeader className="text-4xl font-bold">Adicionar contacto</ModalHeader>
                    <ModalCloseButton className="absolute top-4 right-4" />
                    <ModalBody>
                        <div className="flex flex-col my-[2rem] w-full gap-4">
                            <FormControl className="bg-slate-50 font-semibold  text-slate-600 border flex gap-3 px-3 rounded-lg focus-within:border-orange-500 transition-all">
                                <BsPersonCircle className="my-auto" />
                                <Input name="nome"
                                    value={contact.nome}
                                    onChange={handleChange} className=" outline-none w-full  py-2.5 bg-transparent " placeholder='Nome' />
                            </FormControl>

                            <FormControl className="bg-slate-50 font-semibold  text-slate-600 border flex gap-3 px-3 rounded-lg focus-within:border-orange-500 transition-all">
                                <BsPersonCircle className="my-auto" />
                                <Input name="sobrenome"
                                    value={contact.sobrenome}
                                    onChange={handleChange} className=" outline-none w-full  py-2.5 bg-transparent " placeholder='Sobrenome' />
                            </FormControl>

                            <FormControl className="bg-slate-50 font-semibold w-full text-slate-600 border flex gap-3 px-3 rounded-lg focus-within:border-orange-500 transition-all">
                                <EmailIcon className="my-auto" />
                                <Input name="email"
                                    value={contact.email}
                                    onChange={handleChange} className=" outline-none w-full  py-2.5 bg-transparent " placeholder='E-mail' />
                            </FormControl>

                            <FormControl className="bg-slate-50 font-semibold w-full text-slate-600 border flex gap-3 px-3 rounded-lg focus-within:border-orange-500 transition-all">
                                <BsTelephone className="my-auto" />
                                <Input name="telefone"
                                    value={contact.telefone}
                                    onChange={handleChange} className=" outline-none w-full  py-2.5 bg-transparent " placeholder='Telefone' />
                            </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter className="flex gap-3">
                        <Button className="px-3 py-2 bg-red-500 text-white rounded-lg" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <button onClick={handleSaveContact} disabled={loading || contact.email == "" || contact.nome == ""} className="bg-orange-500 disabled:bg-slate-300 disabled:text-slate-700 text-white py-2 px-3 rounded-lg hover:bg-orange-600 transition-all flex gap-2">
                            {
                                loading ?
                                    <Spinner className="animate-spin my-1 mx-4" />
                                    :
                                    <span className="flex gap-3">
                                        Salvar <BiSave className="my-auto" />
                                    </span>
                            }
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
