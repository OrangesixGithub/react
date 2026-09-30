import type { HTMLAttributes } from "react";
import { multiselectVariants } from "../variants";
import { checkboxVariants } from "../../checkbox/variants";
import type { MultiSelectFieldProps } from "../@types/core";
import { MultiSelect as PrimeMultiSelect } from "primereact/multiselect";
import type { CheckboxPassThroughMethodOptions } from "primereact/checkbox";

/**
 * Core - `MultiSelectField`
 * Compartilha opções, filtro, templates e estilos entre os modos.
 */
export function MultiSelectField(props: MultiSelectFieldProps) {
    const value: unknown[] = Array.isArray(props.value) ? props.value : [];
    const id = props.id ?? props.name;
    const prefix = props.iconPrefix ?? "bi bi-";
    const styles = multiselectVariants({
        size: props.sizes,
        disabled: props.disabled || props.loading,
        readonly: props.readonly,
        invalid: props.invalid
    });
    const checkbox = {
        root: { className: styles.checkboxRoot() },
        input: ({ context }: CheckboxPassThroughMethodOptions) => ({
            className: checkboxVariants({ checked: context.checked, disabled: context.disabled }).input(),
        }),
        box: { className: styles.checkboxBox() },
    };
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <PrimeMultiSelect
            unstyled
            closeIcon={<i
                aria-hidden="true"
                className={`${prefix}${prefix === "pi pi-" ? "times" : "x-lg"}`}/>}
            dropdownIcon={<i
                aria-hidden="true"
                className={`${prefix}chevron-down`}/>}
            loadingIcon={<i
                aria-hidden="true"
                className={`${prefix}${prefix === "pi pi-" ? "spinner" : "arrow-repeat"} animate-spin`}/>}
            pt={{
                root: { className: styles.root() },
                hiddenInputWrapper: { className: styles.hiddenInput() },
                input: {
                    "aria-invalid": props.invalid || undefined,
                    "aria-readonly": props.readonly || undefined,
                    "aria-required": props.required || undefined
                },
                labelContainer: { className: styles.labelContainer() },
                label: { className: value.length ? styles.label() : styles.placeholder() },
                token: { className: styles.token() },
                tokenLabel: { className: styles.tokenLabel() },
                removeTokenIcon: { className: styles.removeTokenIcon() },
                trigger: { className: styles.trigger() },
                triggerIcon: { className: styles.triggerIcon() },
                panel: { className: styles.panel() },
                header: { className: styles.header() },
                headerCheckbox: checkbox,
                headerCheckboxContainer: { className: styles.headerCheckboxContainer() },
                headerSelectAllLabel: { className: styles.headerSelectAllLabel() },
                filterContainer: { className: styles.filterContainer() },
                filterInput: { root: { className: styles.filterInput() } },
                filterIcon: { className: styles.filterIcon() },
                closeButton: { className: styles.closeButton() },
                closeIcon: { className: styles.triggerIcon() },
                wrapper: { className: styles.wrapper() },
                list: { className: styles.list() },
                item: { className: styles.item() },
                checkboxContainer: { className: styles.checkboxContainer() },
                checkbox,
                emptyMessage: { className: styles.emptyMessage() },
            }}
            ref={instance => {
                const input = instance?.getInput() ?? null;
                if (typeof props.focusInputRef === "function") {
                    props.focusInputRef(input);
                } else if (props.focusInputRef) {
                    props.focusInputRef.current = input;
                }
            }}
            removeIcon={options => <i
                {...options.iconProps as HTMLAttributes<HTMLElement>}
                className={`${options.iconProps.className ?? ""} ${prefix}${prefix === "pi pi-" ? "times-circle" : "x-circle"}`}/>}
            appendTo={props.appendTo === undefined ? "self" : typeof props.appendTo === "function" ? props.appendTo() : props.appendTo}
            aria-describedby={id ? `${id}-feedback` : undefined}
            aria-label={props.label ?? props.placeholder ?? props.name ?? "Selecionar opções"}
            disabled={props.disabled || props.readonly || props.loading}
            display={props.display ?? "chip"}
            emptyFilterMessage="Nenhum resultado encontrado."
            emptyMessage="Nenhum dado encontrado."
            filter={props.filter !== undefined}
            filterDelay={props.filter?.delay}
            filterInputAutoFocus={props.filter?.autoFocus ?? false}
            filterMatchMode={props.filter?.modeFilter ?? "contains"}
            filterPlaceholder={props.filter?.placeholder}
            inputId={id}
            invalid={props.invalid}
            itemTemplate={props.template?.item}
            loading={props.loading}
            maxSelectedLabels={3}
            name={props.name}
            optionDisabled="disabled"
            optionLabel={props.optionLabel ?? "label"}
            options={props.options}
            optionValue={props.optionValue ?? "value"}
            panelFooterTemplate={props.template?.footer}
            panelHeaderTemplate={props.template?.header}
            placeholder={props.placeholder}
            resetFilterOnHide={props.filter?.reset}
            scrollHeight={props.scrollHeight ?? "200px"}
            selectAllLabel="Selecionar todos"
            selectedItemsLabel="{0} itens selecionados"
            selectionLimit={props.selectionLimit}
            value={value}
            onChange={event => {
                if (!props.disabled && !props.readonly && !props.loading) {
                    props.onValueChange(event.value ?? []);
                }
            }}
            onBlur={() => props.onFieldBlur(value)}
            onFilter={event => props.filter?.onFilter?.(event.filter)}
            onHide={props.onHide}
            onShow={props.onShow}/>
    );
}

MultiSelectField.displayName = "MultiSelectField";
