import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Underline`: sublinhado no conteúdo selecionado. */
export function Underline(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="type-underline"
            label="Sublinhado"
            primeIcon="underline"
            selected={props.editor.isActive("underline")}
            onClick={() => props.editor.chain().focus().toggleUnderline().run()}/>
    );
}

Underline.displayName = "Underline";
