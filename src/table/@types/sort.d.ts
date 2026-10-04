import type { SortOrder } from "primereact/datatable";
import type { DataTableSortMeta } from "primereact/datatable";

/** Campo e direção de um critério; a posição na lista define sua prioridade. */
export type TableSortMeta = DataTableSortMeta;

export interface TableSortProps {

    /** Modo de ordenação. Multiple permite adicionar colunas com Ctrl/⌘ + clique. Padrão: single. */
    sortMode?: "single" | "multiple"

    /** Critérios iniciais da ordenação local, ou critérios controlados junto com onMultiSort. */
    multiSortMeta?: TableSortMeta[]

    /** Recebe os critérios em ordem de prioridade. Atualize multiSortMeta ou lazy.multiSortMeta. */
    onMultiSort?(meta: TableSortMeta[]): void
    
    /**
     * Método para realizar ordenação manual de uma coluna no modo remoto.
     */
    onSort?(field: string, order: SortOrder): void
}
