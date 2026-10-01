import { tv } from "tailwind-variants";
import type { CalendarPassThroughOptions } from "primereact/calendar";

const button = tv({
    base: "os-button font-normal rounded-lg p-2 text-input-text hover:bg-input-readonly-background os-button-focus"
});

const cell = tv({
    base: "os-button font-normal rounded-lg p-2 text-xs outline-none hover:bg-input-readonly-background " +
        "os-button-focus",
    variants: {
        selected: { true: "bg-primary-500 text-white hover:bg-primary-600" },
        today: { true: "ring-1 ring-primary-500" },
        muted: { true: "text-input-disabled-text" },
        disabled: { true: "pointer-events-none opacity-40" },
    },
});

export const calendarInputVariants = tv({
    base: "os-field os-input w-full min-w-0",
    variants: {
        invalid: { true: "os-field-invalid" }
    },
});

export const calendarPassThrough: CalendarPassThroughOptions = {
    panel: { className: "os-panel os-calendar-panel absolute z-50 max-w-[calc(100vw-2rem)] overflow-auto scrollbar-themed rounded-xl" },
    groupContainer: { className: "flex flex-wrap" },
    group: { className: "min-w-65 flex-1" },
    header: { className: "os-panel-header mb-2 justify-between" },
    title: { className: "flex items-center gap-1 font-semibold" },
    previousButton: { className: button() },
    nextButton: { className: button() },
    previousIcon: { className: "size-4" },
    nextIcon: { className: "size-4" },
    monthTitle: { className: button() },
    yearTitle: { className: button() },
    table: { className: "os-calendar-table" },
    tableHeaderCell: { className: "p-1 text-xs font-medium text-input-placeholder" },
    day: { className: "p-0.5" },
    dayLabel: (options) => ({
        className: cell({
            selected: options?.context.selected,
            today: options?.context.today,
            muted: options?.context.otherMonth,
            disabled: options?.context.disabled,
            class: "size-9"
        })
    }),
    monthPicker: { className: "grid grid-cols-3 gap-2 p-3" },
    yearPicker: { className: "grid grid-cols-3 gap-2 p-3" },
    month: (options) => ({ className: cell({ selected: options?.context.selected, disabled: options?.context.disabled }) }),
    year: (options) => ({ className: cell({ selected: options?.context.selected, disabled: options?.context.disabled }) }),
    buttonbar: { className: "flex justify-between border-t border-input-border px-3 pt-1 pb-1" },
};

export const calendarFooterButtonClassName = button({
    className: "text-sm bg-calendar-header-background hover:bg-calendar-header-background/50 p-1 px-2 text-primary-600 dark:text-primary-400",
});