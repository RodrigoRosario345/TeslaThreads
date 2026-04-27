import { FaCircleNotch } from "react-icons/fa6";

interface Props {
    isLoading: boolean;
    text: string;
    loadingText?: string;
}

export const LoadingText = ({ isLoading, text, loadingText }: Props) => {
    return isLoading ? (
        <span className="flex justify-center items-center gap-2">
            <FaCircleNotch className="animate-spin" size={20} />
            {loadingText || `${text}...`}
        </span>
    ) : (
        <span>{text}</span>
    );
};
