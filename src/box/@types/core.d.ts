import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { AlignItemsProps, ApiComponentProps, JustifyContentProps } from "../../api";

/** Larguras percentuais aceitas pelo `Box`. */
export type BoxSize = NonNullable<ApiComponentProps["size"]>;

/** Larguras aplicadas a partir dos breakpoints padrão do Tailwind. */
export type BoxResponsiveSize = Partial<Record<"base" | "sm" | "md" | "lg" | "xl" | "2xl", BoxSize>>;

/** Propriedades públicas do componente `Box`. */
export type BoxProps<T extends keyof HTMLElementTagNameMap = "div"> = Omit<ApiComponentProps, "size"> & {
    /** Elemento HTML renderizado. Padrão: `div`. */
    as?: T

    /** Largura percentual fixa ou por breakpoint. Padrão: `100`. */
    size?: BoxSize | BoxResponsiveSize

    /** Define a direção dos elementos dentro da caixa. Padrão: `row`. */
    direction?: "row" | "column"

    /** Classes Tailwind de alinhamento, inclusive em pontos de quebra responsivos. */
    align?: AlignItemsProps | AlignItemsProps[]

    /** Classes Tailwind de distribuição, inclusive em pontos de quebra responsivos. */
    justify?: JustifyContentProps | JustifyContentProps[]

    /** Conteúdo renderizado dentro da caixa. */
    children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "align" | "as" | "children" | "className" | "direction" | "size" | "style">;
