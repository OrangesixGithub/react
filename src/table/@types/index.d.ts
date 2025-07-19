import { TableSortProps } from "./sort";
import { TableEditProps } from "./edit";
import { TableStyleProps } from "./style";
import { TableClickProps } from "./click";
import { TableGroupProps } from "./group";
import { TableColumnProps } from "./column";
import { TableReorderProps } from "./reorder";
import { ApiComponentProps } from "../../api";
import { TableTemplateProps } from "./template";
import { SortOrder } from "primereact/datatable";
import { TableSelectionProps } from "./selection";
import { TablePaginationProps } from "./pagination";

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
    TableEditProps,
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

    /**
     * Define se componente `Column` vai ser renderizado todas as vezes que mudar state do selection
     */
    cellRender?: boolean
}