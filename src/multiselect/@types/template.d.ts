import type { ReactNode } from "react";

/** Templates públicos do MultiSelect, compatíveis com a API 2.x. */
export interface MultiSelectTemplateProps {
    /** Renderiza o conteúdo de uma opção. */
    item?: (option: any) => ReactNode;
    /** Renderiza o cabeçalho com as informações e controles fornecidos pelo PrimeReact. */
    header?: (option: any) => ReactNode;
    /** Renderiza o rodapé com as propriedades fornecidas pelo PrimeReact. */
    footer?: (option: any) => ReactNode;
}
