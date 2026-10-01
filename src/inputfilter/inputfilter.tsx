import clsx from "clsx";
import { Box } from "../box";
import { TextField } from "./core/text";
import { DateField } from "./core/date";
import { NumberField } from "./core/number";
import { inputfilterVariants } from "./variants";
import { InputFeedback, InputLabel } from "../api";
import { optionsDefault, optionsLabel } from "./const";
import { useInputFilter } from "./hooks/useInputFilter";
import { AutocompleteField } from "./core/autocomplete";
import type { InputFilterOptionsMap, InputFilterProps } from "./@types";

/**
 * Componente - `InputFilter`
 *
 * Um componente utilizado para montar o objeto de pesquisa de dados.
 * Permite alterar o seu tipo através do type: `text`, `date`, `number`, `autocomplete`.
 */
export function InputFilter<T extends keyof InputFilterOptionsMap = "text">({ ...props }: InputFilterProps<T>) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
    const options: any[] = [...(props.options ?? optionsDefault)].sort((a, b) => a.length - b.length);
    const selectOptions = optionsLabel.filter(item => options?.includes(item.options as any));

    const [select, setSelect] = useInputFilter<T>(props, options);
    const id = props.id ?? "input-filter";
    const fieldIds = {
        text: id + "-text",
        number: id + "-number",
        date: id + "-0",
        autocomplete: id + "-autocomplete-input"
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={clsx(styles.container(), props.className)}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel
                {...props}
                id={fieldIds[props.type ?? "text"]}/>
            <div
                className={styles.content()}
                id={id}>
                <div className={styles.selectWrapper()}>
                    <select
                        aria-invalid={Boolean(props.error) || undefined}
                        className={styles.select()}
                        disabled={props.disabled || props.readonly}
                        id={id + "-select"}
                        name={(props.name ?? "input-filter") + "-select"}
                        value={select}
                        onChange={event => setSelect(event.target.value)}>
                        {selectOptions?.map(item => (
                            <option
                                className={styles.selectOption()}
                                key={item.options}
                                value={item.options}>{item.label}</option>
                        ))}
                    </select>
                    <i
                        aria-hidden="true"
                        className={`${props.iconPrefix ?? "bi bi-"}chevron-down ${styles.selectIcon()}`}/>
                </div>
                {(!props.type || props.type === "text")
                    && <TextField<"text">
                        {...props as InputFilterProps<"text">}
                        options={options}
                        select={select}/>}
                {props.type === "date"
                    && <DateField<"date">
                        {...props as InputFilterProps<"date">}
                        options={options}
                        select={select}/>}
                {props.type === "autocomplete"
                    && <AutocompleteField
                        {...props as InputFilterProps<"autocomplete">}
                        options={options}
                        select={select}/>}
                {props.type === "number"
                    && <NumberField<"number">
                        {...props as InputFilterProps<"number">}
                        options={options}
                        select={select}/>}
            </div>
            <InputFeedback {...props}/>
        </Box>
    );
}

InputFilter.displayName = "InputFilter";
