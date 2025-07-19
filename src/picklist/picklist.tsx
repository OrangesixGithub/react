import { Box } from "../box";
import { PickListProps } from ".";
import { pickListCore } from "./core/core";
import React, { useState, useEffect } from "react";
import * as PickListPrimeReact from "primereact/picklist";

/**
 * Componente - `PickList`
 *
 * Um componente versátil que é utilizado para reordenar itens entre listas diferentes.
 */
export function PickList(props: PickListProps) {
    const [source, setSource] = useState<any>([]);
    const [target, setTarget] = useState<any>([]);

    useEffect(() => {
        setSource(props.data.filter(item => item.active === undefined || !item.active));
        setTarget(props.data.filter(item => item.active));
    }, [props.data]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
             css={props.css}
             size={props.size ?? "100"}>
            <PickListPrimeReact.PickList
                className="w-100"
                source={source}
                target={target}
                onChange={event => {
                    let target = event.target.map((item: any) => {
                        delete item.selected;
                        return { ...item, active: true };
                    });
                    let source = event.source.map((item: any) => {
                        delete item.selected;
                        return { ...item, active: false };
                    });
                    setTarget(target);
                    setSource(source);
                    props.onChange([...source, ...target]);
                }}
                onSourceSelectionChange={event => setSource(source.map((item: any) => {
                    return {
                        ...item,
                        selected: event.value?.some((obj: any) => obj.id === item.id)
                    };
                }))}
                onTargetSelectionChange={event => setTarget(target.map((item: any) => {
                    return {
                        ...item,
                        selected: event.value?.some((obj: any) => obj.id === item.id)
                    };
                }))}
                {...pickListCore(props)}/>
        </Box>
    );
}

PickList.displayName = "PickList";