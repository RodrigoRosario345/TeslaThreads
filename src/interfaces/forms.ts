import { Control, FieldValues, Path } from "react-hook-form";

export interface SelectOption<T = string | number> {
    id: string | number;
    value: T;
    label: string;
}

export interface BaseControllerProps<T extends FieldValues, TT> {
    name: Path<T>;
    label: string;
    control: Control<T, any, TT>;
    disabled?: boolean;
    helperText?: string;
    required?: boolean;
}
