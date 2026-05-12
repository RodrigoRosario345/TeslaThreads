'use client';

import { useModal } from "@/hooks";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button/Button";
import { LoadingText } from "../LoadingText/LoadingText";

export interface ConfirmDeleteModalProps {
    text?: string;
    onDelete: () => void | Promise<void>;
    onClose: () => void;
}

export function ConfirmDeleteModal({ text, onDelete, onClose }: ConfirmDeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { backdropRef, modalRef, closeModal } = useModal({ onClose });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setIsDeleting(false);
            closeModal();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="w-full h-screen fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
                onClick={isDeleting ? undefined : closeModal}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                className="w-full max-w-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
                <div className="relative w-full flex flex-col space-y-5 p-8 rounded-2xl bg-white text-center">

                    <IoClose size={40} className="text-gray-200 hover:text-gray-300 cursor-pointer my-0 ml-auto -mr-3" onClick={closeModal} aria-label="close" />

                    {/* Icon */}
                    <div className="text-6xl sm:text-7xl mx-auto text-red-500">
                        <AiOutlineCloseCircle aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h2
                        id="delete-modal-title"
                        className="text-xl sm:text-2xl font-semibold text-red-500"
                    >
                        Are you sure?
                    </h2>

                    {/* Description */}
                    <p id="delete-modal-description" className="text-gray-600 my-0 text-sm sm:text-base">
                        {text}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        This action cannot be undone.
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-2">
                        <Button
                            onClick={closeModal}
                            disabled={isDeleting}
                            variant="outline"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            variant="destructive"
                            className="w-full"
                        >
                            <LoadingText isLoading={isDeleting} text="Delete" loadingText="Deleting..." />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
