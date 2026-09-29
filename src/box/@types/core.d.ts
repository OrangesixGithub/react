import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { AlignItemsProps, ApiComponentProps, JustifyContentProps, ResponsiveSizeProps, SizeValueProps } from "../../api";

/** Larguras percentuais aceitas pelo `Box`. */
export type BoxSize = SizeValueProps;

/** Larguras aplicadas a partir dos breakpoints padrão do Tailwind. */
export type BoxResponsiveSize = ResponsiveSizeProps;

/** Propriedades públicas do componente `Box`. */
export type BoxProps<T extends keyof HTMLElementTagNameMap = "div"> = ApiComponentProps & {
    /** Elemento HTML renderizado. Padrão: `div`. */
    as?: T

    /** Define a direção dos elementos dentro da caixa. Padrão: `row`. */
    direction?: "row" | "column"

    /** Classe Tailwind de alinhamento, inclusive com prefixo responsivo. */
    align?: AlignItemsProps

    /** Classe Tailwind de distribuição, inclusive com prefixo responsivo. */
    justify?: JustifyContentProps

    /** Conteúdo renderizado dentro da caixa. */
    children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "align" | "as" | "children" | "className" | "direction" | "size" | "style">;
