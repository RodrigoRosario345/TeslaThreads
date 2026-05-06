interface Props {
    message?: string;
}

export const ErrorMessage = ({ message }: Props) => {
    if (!message) return null;

    return (
        <p className="text-red-500 text-sm text-center m-0">
            {message}
        </p>
    );
};
