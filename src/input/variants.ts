import { tv } from "tailwind-variants";
import type { InputNumberProps } from "./@types";

const field = tv({
    base: "w-full min-h-10 rounded-lg border px-3 py-2 " +
        "border-input-border bg-input-background text-input-text placeholder:text-input-placeholder outline-none " +
        "transition-colors focus:border-input-focus-border focus:ring-3 focus:ring-input-focus-ring " +
        "read-only:bg-input-readonly-background disabled:cursor-not-allowed disabled:bg-input-disabled-background disabled:text-input-disabled-text",
    variants: {
        invalid: {
            true: "border-input-invalid-border focus:border-input-invalid-border focus:ring-input-invalid-ring",
        },
        size: {
            small: "min-h-8 py-1 text-sm",
            large: "min-h-11 py-2.5 text-lg",
        },
    },
});

const number = tv({
    slots: {
        root: "inline-flex w-full min-w-0",
        input: "min-w-0 flex-1 relative focus:z-10",
        buttonGroup: "flex shrink-0 flex-col w-10",
        incrementButton: "inline-flex shrink-0 cursor-pointer items-center justify-center border-0 p-0 " +
            "text-input-number-button-text transition-colors focus-visible:z-20 focus-visible:outline-none " +
            "focus-visible:ring-3 focus-visible:ring-input-number-button-focus-ring disabled:cursor-not-allowed " +
            "disabled:opacity-50",
        decrementButton: "inline-flex shrink-0 cursor-pointer items-center justify-center border-0 p-0 " +
            "text-input-number-button-text transition-colors focus-visible:z-20 focus-visible:outline-none " +
            "focus-visible:ring-3 focus-visible:ring-input-number-button-focus-ring disabled:cursor-not-allowed " +
            "disabled:opacity-50",
        icon: "h-4 w-4",
    },
    variants: {
        layout: {
            stacked: {
                input: "rounded-r-none",
                incrementButton: "w-full flex-1 rounded-tr-lg bg-input-number-stacked enabled:hover:bg-input-number-stacked-hover",
                decrementButton: "w-full flex-1 rounded-br-lg bg-input-number-stacked enabled:hover:bg-input-number-stacked-hover",
                icon: "h-3 w-3",
            },
            horizontal: {
                input: "order-2 rounded-none",
                incrementButton: "order-3 w-10 rounded-r-lg bg-input-number-horizontal-increment enabled:hover:bg-input-number-horizontal-increment-hover",
                decrementButton: "order-1 w-10 rounded-l-lg bg-input-number-horizontal-decrement enabled:hover:bg-input-number-horizontal-decrement-hover",
            },
            vertical: {
                root: "w-14 max-w-full flex-col",
                input: "order-2 rounded-none px-0 text-center",
                incrementButton: "order-1 h-10 w-full rounded-t-lg bg-input-number-vertical enabled:hover:bg-input-number-vertical-hover",
                decrementButton: "order-3 h-10 w-full rounded-b-lg bg-input-number-vertical enabled:hover:bg-input-number-vertical-hover",
            },
        },
        size: {
            small: {
                buttonGroup: "w-8",
            },
            large: {
                buttonGroup: "w-11",
            },
        },
    },
    compoundVariants: [
        {
            layout: "horizontal",
            size: "small",
            class: { incrementButton: "w-8", decrementButton: "w-8" }
        },
        {
            layout: "horizontal",
            size: "large",
            class: { incrementButton: "w-11", decrementButton: "w-11" }
        },
        {
            layout: "vertical",
            size: "small",
            class: { incrementButton: "h-8", decrementButton: "h-8" }
        },
        {
            layout: "vertical",
            size: "large",
            class: { incrementButton: "h-11", decrementButton: "h-11" }
        },
    ],
});

/** Classes Tailwind do elemento de entrada. */
export function inputVariants(invalid?: boolean, size?: "small" | "large") {
    return field({ invalid, size });
}

/** Classes do campo numérico e dos botões conforme o layout e o tamanho. */
export function inputNumberVariants(props: InputNumberProps & { invalid?: boolean; sizes?: "small" | "large" }) {
    const styles = number({
        layout: props.numberButton ? props.numberButtonLayout ?? "stacked" : undefined,
        size: props.sizes
    });

    return {
        root: styles.root(),
        input: field({ invalid: props.invalid, size: props.sizes, class: styles.input() }),
        buttonGroup: styles.buttonGroup(),
        incrementButton: styles.incrementButton(),
        decrementButton: styles.decrementButton(),
        icon: styles.icon(),
    };
}
