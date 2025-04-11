import React from "react";
import { TabViewProps } from "./types";
import { TabView, TabPanel } from "primereact/tabview";

/**
 * Componente - `TabView`
 *
 * Um componente versátil que pode ser utilizado para agrupar conteúdo com guias.
 */
export const Tabview = ({ ...props }: TabViewProps) => {

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <TabView activeIndex={props.tabIndex}
                 className={props.className + " w-100"}
                 id={props.id}
                 renderActiveOnly={props.tabActiveRender ?? true}
                 onTabChange={props.onChange}
                 onTabClose={props.onClosed}>
            {props.tabs.map((item, index) => {
                let positionIcon = item.iconPosition === undefined || item.iconPosition === "left"
                    ? { leftIcon: `${(item.iconPrefix === undefined ? "bi bi-" : "pi pi-")}${item.icon} me-1` }
                    : { rightIcon: `${(item.iconPrefix === undefined ? "bi bi-" : "pi pi-")}${item.icon} ms-1` };

                return (
                    <TabPanel closable={item.closed}
                              disabled={item.disabled}
                              header={item.tab}
                              headerTemplate={item.headerTemplate}
                              key={index}
                              {...positionIcon}>
                        {item.content}
                    </TabPanel>
                );
            })}
        </TabView>
    );
};