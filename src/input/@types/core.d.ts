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
export interface InputBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Referência ao elemento HTML de entrada. */
    ref?: Ref<HTMLInputElement>;

    /** Tamanho visual do campo. */
    sizes?: "small" | "large";
}

/** Configuração disponível conforme o tipo do campo. */
type InputOtherType = Extract<HTMLInputTypeAttribute, "date" | "email" | "time">;

type InputTypeProps =
    | ({ type: "number" } & InputNumberProps)
    | ({ type: "password" } & InputPasswordProps)
    | ({ type?: "text" } & InputMaskProps & { [K in keyof InputNumberProps | keyof InputPasswordProps]?: never })
    | { type: InputOtherType };

/** Props do Input conforme o modo Controlled ou HookForm. */
export type InputProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? InputBaseProps & InputTypeProps & ApiFieldControlledProps
    : InputBaseProps & InputTypeProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };
