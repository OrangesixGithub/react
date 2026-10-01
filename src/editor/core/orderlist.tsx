import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Orderlist`: lista ordenada no conteúdo selecionado. */
export function Orderlist(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="list-ol"
            label="Lista ordenada"
            primeIcon="sort-numeric-down"
            selected={props.editor.isActive("orderedList")}
            onClick={() => props.editor.chain().focus().toggleOrderedList().run()}/>
    );
}

Orderlist.displayName = "Orderlist";
