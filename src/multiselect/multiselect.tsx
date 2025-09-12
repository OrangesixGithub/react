import React from "react";
import { Box } from "../box";
import { InputLabel } from "../api";
import { MultiSelectProps } from ".";
import { ApiFieldModeProps } from "../api";
import { MultiSelectHookForm } from "./core/hookForm";
import { MultiSelectControlled } from "./core/controlled";
import * as MultiSelectPrimeReact from "primereact/multiselect";
import { MultiSelectFilterEvent } from "primereact/multiselect";

/**
 * Componente - `MultiSelect`
 *
 * Um componente versátil utilizado seleção de vários dados.
 */
export function MultiSelect<T extends ApiFieldModeProps = "Controlled">(props: MultiSelectProps<T> & { mode?: T }) {
    let core = props as any;
    let options: MultiSelectPrimeReact.MultiSelectProps = {
        display: props.display ?? "chip",
        optionLabel: props.optionLabel ?? "label",
        optionValue: props.optionValue ?? "value",
        maxSelectedLabels: 3,
        itemTemplate: props.template?.item,
        panelHeaderTemplate: props.template?.header,
        panelFooterTemplate: props.template?.footer,
    };
    let filter: MultiSelectPrimeReact.MultiSelectProps = {
        filter: props.filter !== undefined,
        emptyFilterMessage: "Nenhum resultado encontrado.",
        filterPlaceholder: props.filter?.placeholder,
        filterInputAutoFocus: props.filter?.autoFocus ?? false,
        filterMatchMode: props.filter?.modeFilter ?? "contains",
        filterDelay: props.filter?.delay,
        resetFilterOnHide: props.filter?.reset,
        onFilter(event: MultiSelectFilterEvent) {
            if (props.filter?.onFilter) {
                props.filter.onFilter(event.filter);
            }
        }
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={`multiselect ${props.className ?? ""}`}
             css={props.css}
             size={props.size ?? "100"}>
            <InputLabel {...props}/>
            {!props.mode || props.mode === "Controlled"
                ? <MultiSelectControlled {...core}
                                         {...filter}
                                         {...options}/>
                : <MultiSelectHookForm {...core}
                                       {...filter}
                                       {...options}/>}
        </Box>
    );
}

MultiSelect.displayName = "MultiSelect";