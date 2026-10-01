import { inputfilterVariants } from "../variants";
import type { InputFilterCoreProps, InputFilterOptionsMap } from "../@types";
import { handleGetValueDate, handleSetValueDate } from "../function/handle";

/**
 * Core - `Date`
 * Campo do filtro tipo data
 */
export function Date<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
    const date = handleGetValueDate(props.value, props.options, props.select);

    function handleChangeValue(value: string) {
        if (props.select === "{}" && value === "0/0/0{}0/0/0") {
            props.onChange(null);
        } else {
            if ((date[0] == 0 || isNaN(date[0] as number)) &&
                (date[1] == 0 || isNaN(date[1] as number)) &&
                (date[2] == 0 || isNaN(date[2] as number))) {
                props.onChange(null);
            } else {
                props.onChange(value);
            }
        }
    }

    /** Renderiza os campos de dia, mês e ano do índice `start` até `end`. */
    function handleFields(start: number, end: number) {
        return date.slice(start, end + 1).map((item, offset) => {
            const index = start + offset;
            const year = index === end;
            return (
                <input
                    aria-invalid={Boolean(props.error) || undefined}
                    className={styles.dateField({ className: year ? "flex-[2]" : undefined })}
                    disabled={props.disabled}
                    id={(props.id ?? "input-filter") + "-" + index}
                    inputMode="numeric"
                    key={index}
                    name={(props.name ?? "input-filter") + "-" + index}
                    placeholder={props.placeholder}
                    readOnly={props.readonly}
                    value={item === 0 ? "" : item}
                    onChange={event => handleChangeValue(handleSetValueDate(event.target.value, index, date))}/>
            );
        });
    }

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.dates()}>
            <div className={styles.dateRow()}>
                {handleFields(0, 2)}
            </div>
            {props.select === "{}" && date.length > 4
                && <div className={styles.dateRow()}>
                    {handleFields(4, 6)}
                </div>}
        </div>
    );
}

Date.displayName = "Date";
