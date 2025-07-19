import React from "react";
import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

interface TextareaBaseProps extends ApiComponentProps, ApiFieldComponentProps {

    /**
     * A propriedade `ref` retorna a referência do componente
     */
    ref?: React.Ref<HTMLTextAreaElement>

    /**
     * Define se textarea vai ser auto ajustado
     */
    autoResize?: boolean;
}

export type TextareaProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? TextareaBaseProps & ApiFieldControlledProps
    : TextareaBaseProps & ApiFieldHookFormProps;
