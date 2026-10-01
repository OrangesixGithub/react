import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Bulletlist`: lista não ordenada no conteúdo selecionado. */
export function Bulletlist(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="list-task"
            label="Lista não ordenada"
            primeIcon="list"
            selected={props.editor.isActive("bulletList")}
            onClick={() => props.editor.chain().focus().toggleBulletList().run()}/>
    );
}

Bulletlist.displayName = "Bulletlist";
