import React, { useRef, useState } from 'react';
import { IconButton, Input, InputGroup, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, Search2Icon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { CollaboratorModel } from '../../../domain/models/colaborator-model';
import { UserModel } from '../../../domain/models';
import { AlertUtils } from '../../../utils';
import { Spinner } from '../spinner';
import type { IColaborator } from '@/services/getColaborators';


interface RenderCollaboratorsTableProps {
    collaborators: IColaborator[];
    handleDeleteConfirm: (id: string) => void;
    isDeleteConfirmationOpen: boolean;
    loadingRender: boolean;
    loadingIcon: boolean;
    isEditing: boolean;
    editCollaborator: IColaborator | null; // Alterado para apenas um colaborador, não um array
    setEditCollaborator: React.Dispatch<React.SetStateAction<IColaborator | null>>; // Alterado para apenas um colaborador, não um array
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleteConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSaveEdit: (editCollaborator: IColaborator) => Promise<void>;
    user: UserModel; // Substitua 'any' pelo tipo correto de 'user' se possível
}

const RenderCollaboratorsTable: React.FC<RenderCollaboratorsTableProps> = ({ isEditing, editCollaborator, setEditCollaborator, setIsEditing, collaborators, user, onSaveEdit, isDeleteConfirmationOpen, setIsDeleteConfirmationOpen, loadingIcon, loadingRender, handleDeleteConfirm }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCollaborator, setSelectedCollaborator] = useState<IColaborator | null>(null);

    const leastDestructiveRef = useRef<HTMLButtonElement>(null); // Crie a referência aqui

    const filteredCollaborators = Object.values(collaborators).filter(collaborator =>
        collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEditClick = (collaborator: IColaborator) => {
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

    const handleDeleteClick = (collaborator: IColaborator) => {
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
            <div className="flex px-4 py-1 transition-all border rounded-full bg-slate-100/70 focus-within:border-orange-500">
                <InputGroup size="sm">
                    <Input
                        placeholder={`${user.name.split(' ')[0]}, Pesquise por nome ou email`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='w-full px-2 py-1 bg-transparent outline-none'
                    />
                    <Search2Icon className='my-auto text-slate-600' />
                </InputGroup>
            </div>


            <table className='mt-[1rem] table-auto w-full text-start'>
                <thead className='bg-slate-300 px-4 py-[3rem]'>
                    <tr className='px-4 my-2'>
                        <th className='py-1 text-start ps-2'>Nome</th>
                        <th className='text-start'>Sobrenome</th>
                        <th className='text-start'>Email</th>
                        <th className='text-start'>Telefone</th>
                        <th className='text-end pe-2'>Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-100/30">
                    {filteredCollaborators.map((collaborator, index) => (
                        <tr key={index} className='transition-all cursor-pointer hover:bg-orange-300/20'>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.name}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, nome: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.name
                                )}</div>
                            </td>
                            <td>
                                <div className="py-2 border-t">{isEditing && selectedCollaborator?.email === collaborator.email ? (
                                    <Input
                                        value={editCollaborator?.name}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, sobrenome: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.name
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
                                        value={editCollaborator?.email}
                                        onChange={(e) => setEditCollaborator(prevState => ({ ...prevState!, telefone: e.target.value }))}
                                    />
                                ) : (
                                    collaborator.email
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
                            <p className='mx-auto mt-6 text-sm text-slate-600'>Nenhum colaborador encontrado.</p>
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
                        <AlertDialogContent className='p-4 bg-white border border-red-600 rounded-lg shadow-3xl' mx={'auto'} w={'18rem'} mt={"20%"}>
                            <AlertDialogHeader className='text-xl text-orange-600' fontWeight="bold">
                                Confirmar Exclusão
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <p className="py-5 text-sm">
                                    Tem certeza de que deseja excluir o colaborador <b>{selectedCollaborator.name}</b>?
                                </p>
                            </AlertDialogBody>
                            <AlertDialogFooter className='flex gap-3'>
                                <button ref={leastDestructiveRef} disabled={loadingRender} className='px-3 py-1 font-semibold text-red-700 transition-all border-2 border-red-600 rounded-lg disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-700 hover:bg-red-400/40' onClick={() => confirmDelete(selectedCollaborator?.id ? selectedCollaborator?.id : '')}>
                                    {
                                        loadingRender ?
                                            <span className='flex gap-2 px-3 my-1'> <Spinner className='my-auto' /></span>
                                            :
                                            <span> Excluir</span>
                                    }
                                </button>
                                <Button ml={3} className='px-3 py-1 font-semibold text-white bg-red-600 border-2 border-red-600 rounded-lg' onClick={handleDeleteCancel}>
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
