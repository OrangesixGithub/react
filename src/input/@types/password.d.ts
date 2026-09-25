import type { ReactNode } from "react";

/** Dados disponíveis nos templates legados da senha. */
export interface InputPasswordTemplateProps {
    value?: string;
}

/** Configuração da entrada de senha. */
export interface InputPasswordProps {
    /** Exibe o botão para alternar a visibilidade da senha. */
    passwordShow?: boolean;

    /** Exibe uma indicação simples da força da senha. */
    passwordFeedback?: boolean;

    /** Conteúdo mostrado antes da indicação de força. */
    passwordHeaderTemplate?: (props: InputPasswordTemplateProps) => ReactNode;

    /** Conteúdo mostrado depois da indicação de força. */
    passwordFooterTemplate?: (props: InputPasswordTemplateProps) => ReactNode;

    /** Conteúdo personalizado da indicação de força. */
    passwordTemplate?: (props: InputPasswordTemplateProps) => ReactNode;
}
