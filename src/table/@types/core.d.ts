import type { TableSortProps } from "./sort";
import type { TableSortMeta } from "./sort";
import type { TableEditProps } from "./edit";
import type { TableStyleProps } from "./style";
import type { TableClickProps } from "./click";
import type { TableGroupProps } from "./group";
import type { TableExpandProps } from "./expand";
import type { TableColumnProps } from "./column";
import type { TableReorderProps } from "./reorder";
import type { ApiComponentProps } from "../../api";
import type { TableTemplateProps } from "./template";
import type { SortOrder } from "primereact/datatable";
import type { TableSelectionProps } from "./selection";
import type { TablePaginationProps } from "./pagination";

export type TableLazyProps = {
    /** Campo ordenado pelo servidor. */
    sortField?: string;
    /** Direção da ordenação do servidor. */
    sortOrder?: SortOrder;
    /** Critérios de ordenação do servidor, em ordem de prioridade no modo multiple. */
    multiSortMeta?: TableSortMeta[];
    /** Página atual, começando em 1. */
    paginationPage?: number;
    /** Total de registros no servidor, antes da paginação. */
    paginationTotal?: number;
};

export interface TableProps<T = any> extends ApiComponentProps,
    TableSortProps, TableEditProps, TableStyleProps, TableClickProps,
    TableGroupProps, TableExpandProps<T>, TableReorderProps, TableTemplateProps,
    TableSelectionProps, TablePaginationProps {
    /** Colunas exibidas, na ordem informada. */
    column: Array<TableColumnProps>;
    /** Registros; no modo lazy, somente os registros da página atual. */
    data: Array<T>;
    /** Texto exibido quando não há registros. */
    emptyMessage?: string;
    /** Ativa paginação e ordenação controladas pelo consumidor. */
    lazy?: TableLazyProps;
    /** Ativa a memoização das células do PrimeReact; preserva a prop da 2.x. */
    cellRender?: boolean;
    /** Campo que identifica cada registro. Padrão: id. Aceita caminhos como cliente.id. */
    dataKey?: string;
    /** Prefixo dos ícones. Padrão: bi bi-. */
    iconPrefix?: "bi bi-" | "pi pi-";
}
