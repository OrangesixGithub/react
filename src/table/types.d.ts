import { TableSortProps } from "./@types/sort";
import { TableGroupProps } from "./@types/group";
import { SortOrder } from "primereact/datatable";
import { ApiComponentProps } from "../api/types";
import { TableStyleProps } from "./@types/style";
import { TableColumnProps } from "./@types/column";
import { TableTemplateProps } from "./@types/template";
import { TableSelectionProps } from "./@types/selection";
import { TablePaginationProps } from "./@types/pagination";
import { TableReorderProps } from "./@types/reorder";
import { TableClickProps } from "./@types/click";

export type TableLazyProps = {

    /**
     * Define qual campo vem com a ordernação padrão do back-end
     */
    sortField?: string

    /**
     * Define qual é o tipo de ordenação padrão do back-end
     */
    sortOrder?: SortOrder

    /**
     * Define qual é paginação inicial
     */
    paginationPage?: number

    /**
     * Define o número total de registro da tabela
     */
    paginationTotal?: number
};

export interface TableProps<T> extends ApiComponentProps,
    TableSortProps,
    TableStyleProps,
    TableClickProps,
    TableGroupProps,
    TableReorderProps,
    TableTemplateProps,
    TableSelectionProps,
    TablePaginationProps {

    /**
     * Uma matriz de objeto que renderiza o cabeçalho
     */
    column: Array<TableColumnProps>

    /**
     * Uma matriz de objetos a serem exibidos.
     */
    data: Array<T>

    /**
     * Texto a ser exibido quando não há dados.
     */
    emptyMessage?: string

    /**
     * Define se a gerenciamento da tabela vai ser manual ou dinamica
     */
    lazy?: TableLazyProps
}