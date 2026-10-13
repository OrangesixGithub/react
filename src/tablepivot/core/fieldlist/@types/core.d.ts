import type { TablePivotLayout } from "../../../@types";
import type { PivotSchema } from "../../../@types/perspective";

/**
 * Props internas da lista de campos do TablePivot.
 */
export interface TablePivotFieldListProps {
    layout: TablePivotLayout
    schema: PivotSchema
    labels?: Record<string, string>
    loadMembers: (field: string) => Promise<string[]>
    onApply: (layout: TablePivotLayout) => void
    onClose: () => void
}

