import React from "react";
import { Checkbox } from "primereact/checkbox";
import { PickListDataProps, PickListProps } from "..";
import * as PickListPrimeReact from "primereact/picklist";

/**
 * `Template`
 * Define o template padrão dos item do PickList
 */
function pickListItemTemplate(
    item: PickListDataProps & { selected?: boolean }
) {
    return (
        <div className="w-100 d-flex px-2 align-items-center">
            <Checkbox checked={item.selected ?? false}
                      className="me-2"
                      defaultChecked={item.selected}/>
            <p className="m-0">{item.label}</p>
        </div>
    );
}

/**
 * `Core`
 * Define as propriedades base para funcionamento do picklist
 */
export function pickListCore(
    props: PickListProps
): PickListPrimeReact.PickListProps {
    return {
        dataKey: props.dataKey ?? "id",
        showSourceControls: false,
        showTargetControls: false,
        sourceHeader: props.sourceHeader,
        targetHeader: props.targetHeader,
        itemTemplate: pickListItemTemplate,

        filter: props.filter ?? undefined,
        filterBy: props.filter ? (props.filterBy ?? "label") : undefined,
        sourceFilterPlaceholder: "Pesquisa pelo nome",
        targetFilterPlaceholder: "Pesquisa pelo nome",
    };
}