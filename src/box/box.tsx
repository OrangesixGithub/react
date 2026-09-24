import clsx from "clsx";
import { createElement } from "react";
import type { CSSProperties } from "react";
import type { BoxProps, BoxResponsiveSize } from "./@types";

const breakpoints = ["sm", "md", "lg", "xl", "2xl"] as const;

/**
 * Componente - `Box`
 *
 * Organiza conteúdo em uma caixa flexível com largura percentual configurável.
 */
export function Box<T extends keyof HTMLElementTagNameMap = "div">({
    size = "100",
    direction = "row",
    ...props
}: BoxProps<T>) {
    const { as, align, justify, className, css, children, ...htmlProps } = props;
    
    const sizes: BoxResponsiveSize = typeof size === "string" ? { base: size } : size;
    const width: Record<string, string> = {
        "--box-width": `${(sizes.base ?? "100").replace("-", ".")}%`
    };
    breakpoints.forEach(breakpoint => {
        if (sizes[breakpoint]) {
            width[`--box-width-${breakpoint}`] = `${sizes[breakpoint].replace("-", ".")}%`;
        }
    });

    const classes = clsx(
        "flex",
        "w-[var(--box-width)]",
        sizes.sm && "sm:w-[var(--box-width-sm)]",
        sizes.md && "md:w-[var(--box-width-md)]",
        sizes.lg && "lg:w-[var(--box-width-lg)]",
        sizes.xl && "xl:w-[var(--box-width-xl)]",
        sizes["2xl"] && "2xl:w-[var(--box-width-2xl)]",
        direction === "column" ? "flex-col" : "flex-row",
        align,
        justify,
        className,
    );

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return createElement(as ?? "div", {
        ...htmlProps,
        className: classes,
        style: { ...width, ...css } as CSSProperties,
    }, children);
}

Box.displayName = "Box";
