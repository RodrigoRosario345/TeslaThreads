import { useState } from "react";

interface UseConfirmDeleteModalReturn {
    showConfirmDelete: boolean;
    handleShowConfirmDelete: () => void;
    handleCloseConfirmDelete: () => void;
}


export function useConfirmDeleteModal(): UseConfirmDeleteModalReturn {
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    const handleShowConfirmDelete = () => {
        setShowConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        setShowConfirmDelete(false);
    };

    return {
        showConfirmDelete,
        handleShowConfirmDelete,
        handleCloseConfirmDelete
    };
}
