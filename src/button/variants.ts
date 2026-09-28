import { tv } from "tailwind-variants";
import type { ColorProps } from "../api";
import type { ButtonProps } from "./@types";

const root = tv({
    base: "inline-flex cursor-pointer items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variants: {
        rounded: {
            true: "rounded-full",
            false: "rounded-md",
        },
        size: {
            small: "min-h-8 px-3 py-1 text-sm",
            normal: "min-h-10 px-4 py-2 text-base",
            large: "min-h-11 px-5 py-2.5 text-lg",
        },
        color: {
            primary: "bg-blue-500 text-white hover:bg-blue-700 focus-visible:ring-blue-300",
            secondary: "bg-slate-500 text-white hover:bg-slate-700 focus-visible:ring-slate-300",
            success: "bg-green-500 text-white hover:bg-green-700 focus-visible:ring-green-300",
            danger: "bg-red-500 text-white hover:bg-red-700 focus-visible:ring-red-300",
            light: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300",
            warning: "bg-amber-500 text-slate-950 hover:bg-amber-600 focus-visible:ring-amber-300",
            gray: "bg-gray-500 text-white hover:bg-gray-600 focus-visible:ring-gray-300",
            info: "bg-cyan-500 text-slate-950 hover:bg-cyan-700 focus-visible:ring-cyan-300",
            dark: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500",
            help: "bg-violet-500 text-white hover:bg-violet-700 focus-visible:ring-violet-300",
            contrast: "bg-black text-white hover:bg-neutral-800 focus-visible:ring-neutral-400",
            white: "bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300",
        } satisfies Record<ColorProps, string>,
        linkColor: {
            primary: "text-blue-600 hover:text-blue-700",
            secondary: "text-slate-600 hover:text-slate-700",
            success: "text-green-600 hover:text-green-700",
            danger: "text-red-600 hover:text-red-700",
            light: "text-slate-100 hover:text-slate-200",
            warning: "text-amber-600 hover:text-amber-700",
            gray: "text-gray-500 hover:text-gray-600",
            info: "text-cyan-600 hover:text-cyan-700",
            dark: "text-slate-900 hover:text-slate-800",
            help: "text-violet-600 hover:text-violet-700",
            contrast: "text-black hover:text-neutral-800",
            white: "text-white hover:text-slate-100",
        } satisfies Record<ColorProps, string>,
        link: {
            true: "bg-transparent px-0! py-0! underline-offset-4 hover:underline",
        },
        iconPos: {
            top: "flex-col",
            bottom: "flex-col",
            left: "",
            right: "",
        },
    },
});

const badge = tv({
    base: "inline-flex min-w-5 items-center justify-center rounded-full bg-black/30 px-1 text-xs",
});

/** Classes do botão conforme aparência, cor, tamanho e posição do ícone. */
export function buttonVariants(props: ButtonProps) {
    const color = props.color ?? "primary";

    return root({
        rounded: props.rounded ?? false,
        size: props.size ?? "normal",
        color: props.isLink ? undefined : color,
        linkColor: props.isLink ? color : undefined,
        link: props.isLink,
        iconPos: props.iconPos ?? "left",
        className: props.className,
    });
}

/** Classes do ícone comum ou do indicador de carregamento. */
export function buttonIconVariants(props: ButtonProps) {
    if (props.isLoading) {
        return "pi pi-spinner pi-spin";
    }
    return props.icon === undefined ? undefined : `${props.iconPrefix ?? "bi bi-"}${props.icon}`;
}

/** Classes do badge, incluindo as classes informadas pelo consumidor. */
export function buttonBadgeVariants(className?: string) {
    return badge({ className });
}
