import React, { useRef, useState } from 'react';
import { IconButton, Input, InputGroup, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, Search2Icon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { CollaboratorModel } from '../../../domain/models/colaborator-model';
import { UserModel } from '../../../domain/models';
import { AlertUtils } from '../../../utils';
import { Spinner } from '../spinner';
interface RenderCollaboratorsTableProps {
    collaborators: CollaboratorModel[];
    handleDeleteConfirm: (id: string) => void;
    isDeleteConfirmationOpen: boolean;
    loadingRender: boolean;
    loadingIcon: boolean;
    isEditing: boolean;
    editCollaborator: CollaboratorModel | null; // Alterado para apenas um colaborador, não um array
    setEditCollaborator: React.Dispatch<React.SetStateAction<CollaboratorModel | null>>; // Alterado para apenas um colaborador, não um array
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSaveEdit: (editCollaborator: CollaboratorModel) => Promise<void>;
    user: UserModel; // Substitua 'any' pelo tipo correto de 'user' se possível
}

const RenderCollaboratorsTable: React.FC<RenderCollaboratorsTableProps> = ({ isEditing, editCollaborator, setEditCollaborator, setIsEditing, collaborators, user, onSaveEdit, isDeleteConfirmationOpen, setIsDeleteConfirmationOpen, loadingIcon, loadingRender, handleDeleteConfirm }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorModel | null>(null);

    const leastDestructiveRef = useRef<HTMLButtonElement>(null); // Crie a referência aqui

    const filteredCollaborators = Object.values(collaborators).filter(collaborator =>
        collaborator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEditClick = (collaborator: CollaboratorModel) => {
        setEditCollaborator(collaborator);
        setSelectedCollaborator(collaborator); // Seleciona o colaborador para edição
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {

        try {
            if (!editCollaborator) return; // Verifica se há um colaborador para edição

            await onSaveEdit(editCollaborator);
            setIsEditing(false);
            AlertUtils.success('Colaborador atualizado com sucesso!');
            setEditCollaborator(null); // Limpa o colaborador em edição
        } catch (error) {
            console.error("Erro ao atualizar o colaborador:", error);
            // Lógica para lidar com erros
        }
    };

    const handleDeleteClick = (collaborator: CollaboratorModel) => {
        setSelectedCollaborator(collaborator);
        setIsDeleteConfirmationOpen(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteConfirmationOpen(false);
    };

    const confirmDelete = (id: string) => {
        handleDeleteConfirm(id)
    };



    return (
        <>
            <div className="flex bg-slate-100/70 focus-within:border-orange-500 transition-all rounded-full px-4 py-1 border">
                <InputGroup size="sm">
                    <Input
                        placeholder={`${user.name.split(' ')[0]}, Pesquise por nome ou email`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='py-1 px-2 outline-none bg-transparent w-full'
                    />
                    <Search2Icon className='my-auto text-slate-600' />
                </InputGroup>
            </div>


            <table className='mt-[1rem] table-auto w-full text-start'>
                <thead className='bg-slate-300 px-4 py-[3rem]'>
                    <tr className='my-2 px-4'>
                        <th className='text-start ps-2 py-1'>Nome</th>
                        <th className='text-start'>Sobrenome</th>
                        <th className='text-start'>Email</th>
                        <th className='text-start'>Telefone</th>
                        <th className='text-end pe-2'>Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-100/30">
                    {filteredCollaborators.map((collaborator, index) => (
                        <tr key={index} className='hover:bg-orange-300/20 cursor-pointer transition-all'>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.nome}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, nome: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.nome
                                )}</div>
                            </td>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.sobrenome}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, sobrenome: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.sobrenome
                                )}</div>
                            </td>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.email}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, email: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.email
                                )}</div>
                            </td>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.telefone}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, telefone: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.telefone
                                )}</div>
                            </td>
                            <td>
                                {(isEditing && selectedCollaborator?.email === collaborator.email) ? (
                                    <div className='flex justify-end gap-2'>
                                        <div onClick={handleSaveEdit} className='bg-slate-100 text-sm py-[.8px] px-1 text-slate-500 text-center hover:bg-green-300 transition-all hover:text-green-700 border rounded-md '>
                                            {
                                                loadingIcon ?
                                                    <Spinner className='m-1' />
                                                    :
                                                    <IconButton aria-label="Salvar Edição" icon={<CheckIcon />} mr={2} />
                                            }
                                        </div>
                                        <div onClick={() => setIsEditing(false)} className='bg-slate-100 text-xs py-[.8px] px-1.5 text-slate-500 text-center hover:bg-red-300 transition-all hover:text-red-700 border rounded-md '>
                                            <IconButton aria-label="Cancelar Edição" icon={<CloseIcon />} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-end gap-2'>
                                        <div onClick={() => handleEditClick(collaborator)} className='bg-orange-100 text-md grid place-content-center items-center py-[5px] px-1.5 text-slate-500 text-center hover:bg-orange-300 transition-all hover:text-orange-700 border rounded-md '>
                                            <IconButton aria-label="Editar" icon={<EditIcon />} mr={2} />

                                        </div>
                                        <div onClick={() => handleDeleteClick(collaborator)} className='bg-red-100 grid place-content-center items-center text-md py-[.8px] px-1.5 text-red-600 text-center hover:bg-red-300 transition-all hover:text-red-700 border rounded-md '>
                                            <IconButton aria-label="Excluir" icon={<DeleteIcon />} />

                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>

                    ))}
                </tbody>
                <tfoot>
                    <tr>

                        {filteredCollaborators.length === 0 ? (
                            <p className='mt-6 mx-auto text-slate-600 text-sm'>Nenhum colaborador encontrado.</p>
                        ) : null}
                    </tr>
                </tfoot>
            </table>

            {selectedCollaborator && (
                <AlertDialog
                    isCentered
                    leastDestructiveRef={leastDestructiveRef}
                    isOpen={isDeleteConfirmationOpen}
                    onClose={handleDeleteCancel}
                >
                    <AlertDialogOverlay className='bg-black/40'>
                        <AlertDialogContent className='bg-white p-4 rounded-lg shadow-3xl border border-red-600' mx={'auto'} w={'18rem'} mt={"20%"}>
                            <AlertDialogHeader className='text-xl text-orange-600' fontWeight="bold">
                                Confirmar Exclusão
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <p className="text-sm py-5">
                                    Tem certeza de que deseja excluir o colaborador <b>{selectedCollaborator.nome}</b>?
                                </p>
                            </AlertDialogBody>
                            <AlertDialogFooter className='flex gap-3'>
                                <button ref={leastDestructiveRef} disabled={loadingRender} className='border-2 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-700 hover:bg-red-400/40 transition-all border-red-600 px-3 py-1 rounded-lg text-red-700 font-semibold' onClick={() => confirmDelete(selectedCollaborator.id)}>
                                    {
                                        loadingRender ?
                                            <span className='flex gap-2 my-1 px-3'> <Spinner className='my-auto' /></span>
                                            :
                                            <span> Excluir</span>
                                    }
                                </button>
                                <Button ml={3} className='bg-red-600 text-white  font-semibold py-1 px-3  rounded-lg border-2 border-red-600' onClick={handleDeleteCancel}>
                                    Cancelar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
};

export default RenderCollaboratorsTable;
