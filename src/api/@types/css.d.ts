type ResponsiveClass<T extends string> = T | `${"sm" | "md" | "lg" | "xl" | "2xl"}:${T}`;

/**
 * Classes Tailwind aceitas por `align`.
 */
export type AlignItemsProps = ResponsiveClass<
    "items-start" | "items-end" | "items-center" | "items-baseline" | "items-stretch"
>;

/**
 * Classes Tailwind aceitas por `justify`.
 */
export type JustifyContentProps = ResponsiveClass<
    "justify-start" | "justify-end" | "justify-center" | "justify-between" | "justify-around" | "justify-evenly"
>;

/**
 * Nomes semânticos de cor utilizados pelos componentes.
 */
export type ColorProps =
    "primary" |
    "secondary" |
    "success" |
    "danger" |
    "light" |
    "warning" |
    "gray" |
    "info" |
    "dark" |
    "help" |
    "contrast" |
    "white";
