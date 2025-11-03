import React from "react";
import { MultiSelectProps } from "..";
import { InputFeedback } from "../../api";
import * as MultiSelectPrimeReact from "primereact/multiselect";

type Props = {
    filter: any
};

/**
 * Core - `MultiSelectControlled`
 * Define o componente controlled
 */
export function MultiSelectControlled({ ...props }: MultiSelectProps<"Controlled"> & Props) {
    let core = props as any;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <MultiSelectPrimeReact.MultiSelect {...core}
                                               className="w-100 multiselect-field"
                                               emptyMessage="Nenhum dado encontrado."
                                               panelClassName="multiselect-panel"
                                               onChange={event => {
                                                   if (props.onChange) {
                                                       props.onChange(event.value);
                                                   }
                                               }}/>
            <InputFeedback {...props}/>
        </>
    );
}