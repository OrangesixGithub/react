import { tv } from "tailwind-variants";

const field = tv({
    base: "w-full min-h-10 rounded-lg border px-3 py-2 " +
        "border-neutral-300 text-neutral-700 placeholder:text-neutral-300 outline-none transition-colors focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 read-only:bg-neutral-50 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 " +
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500/35 dark:read-only:bg-neutral-800 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-200",
    variants: {
        invalid: {
            true: "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400/25",
        },
        size: {
            small: "min-h-8 py-1 text-sm",
            large: "min-h-11 py-2.5 text-lg",
        },
    },
});

/** Classes Tailwind do elemento de entrada. */
export function inputVariants(invalid?: boolean, size?: "small" | "large") {
    return field({ invalid, size });
}
