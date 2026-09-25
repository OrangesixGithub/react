import type { InputMaskProps } from "./mask";
import type { InputNumberProps } from "./number";
import type { InputPasswordProps } from "./password";
import type { Ref, HTMLInputTypeAttribute } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
    ApiFieldHookFormProps,
    ApiFieldModeProps
} from "../../api";

/** Propriedades compartilhadas do componente Input. */
export interface InputBaseProps extends ApiComponentProps, ApiFieldComponentProps, InputMaskProps, InputNumberProps, InputPasswordProps {
    /** Tipo de dado apresentado pelo campo. */
    type?: Extract<HTMLInputTypeAttribute, "text" | "date" | "email" | "time" | "number" | "password">;

    /** Referência ao elemento HTML de entrada. */
    ref?: Ref<HTMLInputElement>;

    /** Tamanho visual do campo. */
    sizes?: "small" | "large";
}

/** Props do Input conforme o modo Controlled ou HookForm. */
export type InputProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? InputBaseProps & ApiFieldControlledProps
    : InputBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };
