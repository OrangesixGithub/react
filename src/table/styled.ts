import { TableProps } from ".";
import { classNames } from "primereact/utils";
import { DataTablePassThroughOptions } from "primereact/datatable";

/**
 * Realiza a personalização na TABLE
 */
export function bootstrapTableStyle(props: TableProps<any>): DataTablePassThroughOptions {
    return {
        paginator: {
            root: {
                className: classNames([
                    `justify-content-${props.paginatorAlign ?? "center"}`
                ]),
            }
        }
    };
}