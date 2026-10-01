import type { Ref } from "react";
import type { EditorOptionsProps } from "./toolbar";
import type { ApiComponentProps, ApiFieldComponentProps, ApiFieldControlledProps } from "../../api";

/** Propriedades compartilhadas do editor de texto HTML. */
export interface EditorBaseProps extends ApiComponentProps, Omit<ApiFieldComponentProps, "mode"> {
    /** Modo do editor; somente Controlled é suportado. */
    mode?: "Controlled";
    /** Configuração da barra de ferramentas; utiliza basic quando omitida. */
    options?: EditorOptionsProps | "basic" | "full";
    /** Altura mínima da área de edição em pixels; padrão 100. */
    height?: number;
    /** Referência à área HTML editável. */
    ref?: Ref<HTMLDivElement>;
}

/** Props do editor controlado, preservando value e onChange da API 2.x. */
export type EditorProps = EditorBaseProps & Omit<ApiFieldControlledProps, "value" | "onChange" | "onBlur"> & {
    /** Conteúdo HTML atual do editor; null representa conteúdo vazio. */
    value: string | null;
    /** Recebe o HTML ao sair do campo, ou null quando o editor está vazio. */
    onBlur?: (value: string | null) => void;
} & ({
    /** Exibe o conteúdo sem permitir edição. */
    readonly: true;
    /** Recebe o HTML atualizado ou null quando vazio; opcional na visualização somente leitura. */
    onChange?: (value: string | null) => void;
} | {
    /** Permite editar o conteúdo. */
    readonly?: false;
    /** Recebe o HTML atualizado após a edição, ou null quando o editor está vazio. */
    onChange(value: string | null): void;
});
