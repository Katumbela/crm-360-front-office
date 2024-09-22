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
import { fetchColData, type IColaborator } from "../../services/getColaborators";
import { v4 as uuidv4 } from 'uuid';

import RenderCollaboratorsTable from './renderColaboratorsTable/renderColaboratorTable'
import { collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

export const Dashboard_Contact = () => {

    const account = useSelector(useAuth())
    const { user } = account

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [editCollaborator, setEditCollaborator] = useState<IColaborator | null>(null);
    const [collaborators, setCollaborators] = useState<IColaborator[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [loadingCollaborators, setLoadingCollaborators] = useState(true);
    const [loadingRender, setLoadingRender] = useState(false)
    const [loadingIcon, setLoadingIcon] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [contact, setContact] = useState<IColaborator>({
        name: "",
        bi: "",
        phone: "",
        city: "",
        email: "",
        password: "", // Se necessário
    });



    const fetchData = useCallback(async () => {
        try {
            const fetchedCollaborators = await fetchColData(user);
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
            const db = getFirestore();
            const businessDocRef = doc(collection(db, "business"), `${user.id.substring(0, 4)}_${user.company_name}`);

            const businessDocSnapshot = await getDoc(businessDocRef);
            const businessData = businessDocSnapshot.data();

            const collaborators = businessData?.collaborators || {};
            const newContactId = uuidv4();

            const newContact = { id: newContactId, ...contact };

            await setDoc(businessDocRef, { collaborators: { ...collaborators, [newContactId]: newContact } }, { merge: true });

            AlertUtils.success("Contato salvo com sucesso!");
            onClose();
            setLoading(false);

            setContact({
                name: "",
                bi: "",
                phone: "",
                city: "",
                email: "",
                password: ""
            });

            fetchData();
        } catch (error) {
            setLoading(false);
            console.error("Erro ao salvar o contato:", error);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };


    const handleDeleteConfirm = async (collaboratorToDeleteId: string) => {
        try {
            setLoadingRender(true);
            const db = getFirestore();
            const businessDocRef = doc(collection(db, "business"), `${user.id.substring(0, 4)}_${user.company_name}`);

            const businessDocSnapshot = await getDoc(businessDocRef);
            const businessData = businessDocSnapshot.data();

            if (!businessData || !businessData.collaborators) {
                throw new Error("Dados de colaboradores não encontrados.");
            }

            const updatedCollaborators = { ...businessData.collaborators };
            delete updatedCollaborators[collaboratorToDeleteId];

            await updateDoc(businessDocRef, { collaborators: updatedCollaborators });

            AlertUtils.success("Contato removido com sucesso!");
            setLoadingRender(false);
            setIsDeleteConfirmationOpen(false);

            fetchData();
        } catch (error) {
            setLoadingRender(false);
            setIsDeleteConfirmationOpen(false);
            console.error("Erro ao remover o contato:", error);
        }
    };




    const handleSaveEdit = async (editCollaborator: IColaborator) => {
        const contactId = editCollaborator.id;

        // Verifica se contactId é undefined e lança um erro se for o caso
        if (!contactId) {
            throw new Error("ID do colaborador não encontrado.");
        }

        const datas = {
            name: editCollaborator.name,
            email: editCollaborator.email,
            city: editCollaborator.city,
            phone: editCollaborator.phone,
            bi: editCollaborator.bi
        };

        setLoadingIcon(true);
        try {
            const db = getFirestore();
            const businessDocRef = doc(collection(db, "business"), `${user.id.substring(0, 4)}_${user.company_name}`);

            const businessDocSnapshot = await getDoc(businessDocRef);
            const businessData = businessDocSnapshot.data();

            const collaborators = businessData?.collaborators || {};
            if (!collaborators[contactId]) {
                throw new Error("Contato não encontrado para atualização.");
            }

            collaborators[contactId] = { id: contactId, ...datas };

            await setDoc(businessDocRef, { collaborators }, { merge: true });

            console.log("Contato atualizado com sucesso!");
            onClose();
            setLoadingIcon(false);

            setContact({
                name: "",
                bi: "",
                phone: "",
                city: "",
                email: "",
                password: ""
            });

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
                <Button className="px-3 py-2 -mt-10 font-semibold text-orange-700 transition-all border-2 border-orange-600 rounded-lg bg-orange-300/30 hover:bg-orange-500/40 " onClick={onOpen}>Adicionar contacto</Button>
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
                            <FormControl>
                                <Input name="name" value={contact.name} onChange={handleChange} placeholder='Nome' />
                            </FormControl>
                            <FormControl>
                                <Input name="bi" value={contact.bi} onChange={handleChange} placeholder='BI' />
                            </FormControl>
                            <FormControl>
                                <Input name="phone" value={contact.phone} onChange={handleChange} placeholder='Telefone' />
                            </FormControl>
                            <FormControl>
                                <Input name="city" value={contact.city} onChange={handleChange} placeholder='Cidade' />
                            </FormControl>
                            <FormControl>
                                <Input name="email" value={contact.email} onChange={handleChange} placeholder='E-mail' />
                            </FormControl>

                        </div>
                    </ModalBody>

                    <ModalFooter className="flex gap-3">
                        <Button className="px-3 py-2 text-white bg-red-500 rounded-lg" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <button onClick={handleSaveContact} disabled={loading || !contact.name || !contact.email} // Simplificando a verificação
                            className="flex gap-2 px-3 py-2 text-white transition-all bg-orange-500 rounded-lg disabled:bg-slate-300 disabled:text-slate-700 hover:bg-orange-600">
                            {
                                loading ?
                                    <Spinner className="mx-4 my-1 animate-spin" />
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
