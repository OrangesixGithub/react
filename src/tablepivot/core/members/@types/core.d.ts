/**
 * Props internas do filtro de membros do TablePivot.
 */
export interface TablePivotMembersProps {
    field: string
    label: string
    members?: Array<string | number>
    loadMembers: (field: string) => Promise<string[]>
    onApply: (members: string[]) => void
    onClose: () => void
}

