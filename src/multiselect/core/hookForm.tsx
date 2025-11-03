import React from "react";
import { MultiSelectProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import * as MultiSelectPrimeReact from "primereact/multiselect";

type Props = {
    filter: any
};

/**
 * Core - `MultiSelectControlled`
 * Define o componente controlled
 */
export function MultiSelectHookForm({ ...props }: MultiSelectProps<"HookForm"> & Props) {
    let core = props as any;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return (
                <>
                    <MultiSelectPrimeReact.MultiSelect {...core}
                                                       className="w-100 multiselect-field"
                                                       emptyMessage="Nenhum dado encontrado."
                                                       invalid={!!errors[props.name]}
                                                       panelClassName="multiselect-panel"
                                                       required={props.required}
                                                       value={field.value ?? ""}
                                                       onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                    <InputFeedback {...props}
                                   errors={errors}/>
                </>
            );
        }}
                    control={props.control}
                    name={props.name}
                    rules={{ required: !props.required ? false : "Campo obrigatório" }}/>
    );
}