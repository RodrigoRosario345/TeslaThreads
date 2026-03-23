import { useController, type Control, type FieldValues, type Path } from "react-hook-form";


export function useControllerField<T extends FieldValues, TT>(
    name: Path<T>,
    control: Control<T, any, TT>,
) {
    const { field, fieldState: { error } } = useController({
        name,
        control,
    });

    const hasError = !!error;

    return {
        field,
        error,
        hasError
    };
}
