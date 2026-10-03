import { picklistVariants } from "../variants";
import type { PickListItemProps } from "../@types/core";
import { checkboxVariants } from "../../checkbox/variants";

/**
 * Core - `PickListItem`
 * Template padrão dos itens: checkbox de seleção e label.
 */
export function PickListItem(props: PickListItemProps) {
    const styles = picklistVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.itemContent()}>
            <input
                readOnly
                aria-hidden="true"
                checked={props.selected}
                className={checkboxVariants({ checked: props.selected }).input({ className: styles.itemCheckbox() })}
                tabIndex={-1}
                type="checkbox"/>
            <p className={styles.itemLabel()}>{props.item.label}</p>
        </div>
    );
}

PickListItem.displayName = "PickListItem";
