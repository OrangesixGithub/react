import type { TablePivotView } from "../../../@types";

/** Props internas do painel de visões salvas. */
export interface TablePivotViewsProps {
    views: TablePivotView[]
    labels?: Record<string, string>
    /** Mensagem de erro ao gravar no armazenamento do navegador. */
    error?: string | null
    onSave: (name: string) => void
    onApply: (view: TablePivotView) => void
    onDelete: (name: string) => void
    onReset: () => void
    onClose: () => void
}
