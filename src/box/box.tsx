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
        "box-border mx-[calc(var(--spacing-box,0px)/2)]",
        "w-[calc(var(--box-width)-var(--spacing-box,0px))]",
        sizes.sm && "sm:w-[calc(var(--box-width-sm)-var(--spacing-box,0px))]",
        sizes.md && "md:w-[calc(var(--box-width-md)-var(--spacing-box,0px))]",
        sizes.lg && "lg:w-[calc(var(--box-width-lg)-var(--spacing-box,0px))]",
        sizes.xl && "xl:w-[calc(var(--box-width-xl)-var(--spacing-box,0px))]",
        sizes["2xl"] && "2xl:w-[calc(var(--box-width-2xl)-var(--spacing-box,0px))]",
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
