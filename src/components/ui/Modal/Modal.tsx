'use client';

import { useModal } from "@/hooks";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "../Button/Button";

const MODAL_CONFIG = {
    success: {
        icon: FaCheckCircle,
        title: "Success!",
        buttonText: "OKAY",
        color: "bg-green-500 hover:bg-green-600",
        iconColor: "text-green-500",
    },
    error: {
        icon: IoMdCloseCircle,
        title: "Sorry :(",
        buttonText: "Try Again",
        color: "bg-red-500 hover:bg-red-600",
        iconColor: "text-red-500",
    },
} as const;


interface ModalProps {
    type?: "add" | "edit" | "delete";
    status: "success" | "error";
    message: string;
    clearOperationResult: () => void;
}

export function Modal({ status, message, clearOperationResult }: ModalProps) {

    const { backdropRef, modalRef, closeModal } = useModal({
        onClose: clearOperationResult,
        autoCloseDelay: 5000,
    });

    const config = MODAL_CONFIG[status];
    const Icon = config.icon;

    return (
        <>
            {/* Backdrop */}
            <div
                className="w-full h-screen fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
                onClick={closeModal}
                ref={backdropRef}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="w-full max-w-[320px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                ref={modalRef}
            >
                <div className="w-full flex flex-col gap-5 p-8 rounded-2xl bg-white text-center">
                    <div className={`text-7xl mx-auto ${config.iconColor}`}>
                        <Icon />
                    </div>
                    <h2
                        id="modal-title"
                        className={`text-2xl font-semibold ${config.iconColor}`}
                    >
                        {config.title}
                    </h2>
                    <p id="modal-description" className="text-gray-600">
                        {message}
                    </p>
                    <Button
                        onClick={closeModal}
                        buttonStyle="primary"
                        className={`${config.color}`}
                    >
                        {config.buttonText}
                    </Button>
                </div>
            </div>
        </>
    );
}
