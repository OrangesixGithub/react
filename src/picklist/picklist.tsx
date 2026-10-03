import { Box } from "../box";
import { useEffect, useState } from "react";
import { PickListItem } from "./core/core";
import { picklistVariants } from "./variants";
import { PickList as PrimePickList } from "primereact/picklist";
import type { PickListDataProps, PickListProps } from "./@types";

/**
 * Componente - `PickList`
 *
 * Um componente versátil que é utilizado para reordenar itens entre listas diferentes.
 */
export function PickList(props: PickListProps) {
    const [source, setSource] = useState<PickListDataProps[]>([]);
    const [target, setTarget] = useState<PickListDataProps[]>([]);
    const [sourceSelection, setSourceSelection] = useState<PickListDataProps[]>([]);
    const [targetSelection, setTargetSelection] = useState<PickListDataProps[]>([]);

    const dataKey = props.dataKey ?? "id";
    const prefix = props.iconPrefix ?? "bi bi-";
    const styles = picklistVariants({ disabled: props.disabled, responsive: props.responsive });

    useEffect(() => {
        setSource(props.data.filter(item => !item.active));
        setTarget(props.data.filter(item => item.active));
        setSourceSelection([]);
        setTargetSelection([]);
    }, [props.data]);

    const key = (item: PickListDataProps) => (item as unknown as Record<string, unknown>)[dataKey];
    const isSelected = (item: PickListDataProps) => [...sourceSelection, ...targetSelection]
        .some(selected => key(selected) === key(item));
    const icon = (bi: string, pi: string) => <i
        aria-hidden="true"
        className={`${styles.buttonIcon()} ${prefix}${prefix === "pi pi-" ? pi : bi}`}/>;
    const button = {
        root: { className: styles.button() },
        label: { className: styles.buttonLabel() },
    };
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={props.className}
            css={props.css}
            size={props.size ?? "100"}>
            <PrimePickList
                unstyled
                itemTemplate={(item: PickListDataProps) => <PickListItem
                    item={item}
                    selected={isSelected(item)}/>}
                pt={{
                    root: {
                        "aria-disabled": props.disabled || undefined,
                        className: styles.root()
                    },
                    listWrapper: { className: styles.listWrapper() },
                    header: { className: styles.header() },
                    filterContainer: { className: styles.filterContainer() },
                    filter: { className: styles.filter() },
                    filterInput: { className: styles.filterInput() },
                    filterIcon: { className: styles.filterIcon() },
                    list: { className: styles.list() },
                    item: { className: styles.item() },
                    buttons: { className: styles.buttons() },
                    moveToTargetButton: button,
                    moveAllToTargetButton: button,
                    moveToSourceButton: button,
                    moveAllToSourceButton: button,
                }}
                breakpoint={props.responsive ? "767px" : "0px"}
                dataKey={dataKey}
                filter={props.filter}
                filterBy={props.filter ? (props.filterBy ?? "label") : undefined}
                id={props.id}
                moveAllToSourceIcon={icon("chevron-double-left", "angle-double-left")}
                moveAllToTargetIcon={icon("chevron-double-right", "angle-double-right")}
                moveToSourceIcon={icon("chevron-left", "angle-left")}
                moveToTargetIcon={icon("chevron-right", "angle-right")}
                showSourceControls={false}
                showTargetControls={false}
                source={source}
                sourceFilterIcon={`${prefix}search`}
                sourceFilterPlaceholder="Pesquisa pelo nome"
                sourceHeader={props.sourceHeader}
                sourceSelection={sourceSelection}
                tabIndex={props.disabled ? -1 : 0}
                target={target}
                targetFilterIcon={`${prefix}search`}
                targetFilterPlaceholder="Pesquisa pelo nome"
                targetHeader={props.targetHeader}
                targetSelection={targetSelection}
                onChange={event => {
                    if (props.disabled) {
                        return;
                    }
                    const nextSource = (event.source as PickListDataProps[]).map(item => ({ ...item, active: false }));
                    const nextTarget = (event.target as PickListDataProps[]).map(item => ({ ...item, active: true }));
                    setSource(nextSource);
                    setTarget(nextTarget);
                    setSourceSelection([]);
                    setTargetSelection([]);
                    props.onChange([...nextSource, ...nextTarget]);
                }}
                onSourceSelectionChange={event => setSourceSelection(event.value ?? [])}
                onTargetSelectionChange={event => setTargetSelection(event.value ?? [])}/>
        </Box>
    );
}

PickList.displayName = "PickList";
