import { Box } from "../box";
import React, { forwardRef } from "react";
import { translation } from "./lang/pt-br";
import { handleToolbarOptions } from "./function/handle";
import { TablePivotProps, TablePivotRefProps } from "./types";
import * as WebDataRocksReact from "@webdatarocks/react-webdatarocks";

/**
 * Componente - `TablePivot`
 *
 * Um componente versátil que pode ser utilizado para criar tabela com estilo de pivot de dados.
 */
export const TablePivot = forwardRef<TablePivotRefProps, TablePivotProps>(
    ({ toolbar = true, id = "pivotTable", ...props }, ref) => {

        /*
        |------------------------------------------
        | render() - Renderização do componente
        |------------------------------------------
        */
        return (
            <Box className={"pivot-table " + (props.className ?? "")}
                 id={id}
                 size={props.size}>
                <WebDataRocksReact.Pivot
                    customizeCell={(b: any, d: any) => {
                        if (props.pivotCustomizeCell !== undefined) {
                            props.pivotCustomizeCell(b, d);
                        }
                    }}
                    report={{
                        dataSource: {
                            data: props.pivotDataSource ?? []
                        },
                        options: props.pivotOptions,
                        slice: props.pivotSlice,
                        localization: translation,
                    }}
                    beforetoolbarcreated={(toolbar: any) => handleToolbarOptions(toolbar, props.toolbarOptions ?? {})}
                    container={id}
                    height={props.height}
                    ref={ref}
                    toolbar={toolbar}
                    width="100%"/>
            </Box>
        );
    });

TablePivot.displayName = "TablePivot";