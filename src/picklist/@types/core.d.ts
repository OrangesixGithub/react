import type { ApiComponentProps } from "../../api";
import type { PickListProps as PrimePickListProps } from "primereact/picklist";

/**
 * Define cada item manipulado pelo `PickList`
 */
export interface PickListDataProps {
    /**
     * Indificador do objeto
     */
    id: any;

    /**
     * Label do objeto
     */
    label: string;

    /**
     * Define se objeto está ativo ou inativo. Itens ativos ficam na lista de destino
     */
    active?: boolean
}

/**
 * Define as propriedades do componente `PickList`
 */
export interface PickListProps extends ApiComponentProps, Pick<PrimePickListProps, "sourceHeader" | "targetHeader" | "filter" | "filterBy"> {
    /**
     * Define o array de objeto que será manipulado pelo componente
     */
    data: PickListDataProps[]

    /**
     * Define a chave de indentificação do objeto de dados. Padrão: `id`
     */
    dataKey?: string

    /**
     * Define se componente está desabilitado
     */
    disabled?: boolean

    /** Permite empilhar as listas em telas menores que 768px. Padrão: `false` (lado a lado). */
    responsive?: boolean

    /**
     * Define o prefixo dos ícones do pacote. O padrão é `bi bi-`, compatível com a 2.x.
     * O consumidor deve importar o CSS do Bootstrap Icons; `pi pi-` permite usar PrimeIcons.
     */
    iconPrefix?: "bi bi-" | "pi pi-"

    /**
     * Callback executado quando o valor do PickList é alterado
     */
    onChange(value: PickListDataProps[]): void;
}

/**
 * Define as propriedades internas de cada item do `PickList`
 */
export interface PickListItemProps {
    /**
     * Item exibido na lista
     */
    item: PickListDataProps

    /**
     * Define se o item está selecionado para movimentação
     */
    selected: boolean
}
