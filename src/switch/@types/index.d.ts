import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

interface SwitchBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /**
     * Define a legenda do campo
     */
    legend?: string

    /**
     * Define o valor quando switch for true
     */
    valueTrue?: string

    /**
     * Define o valor quando switch for False
     */
    valueFalse?: string
}

export type SwitchProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? SwitchBaseProps & ApiFieldControlledProps
    : SwitchBaseProps & ApiFieldHookFormProps;
