import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Italic`: itálico no conteúdo selecionado. */
export function Italic(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="type-italic"
            label="Itálico"
            primeIcon="italic"
            selected={props.editor.isActive("italic")}
            onClick={() => props.editor.chain().focus().toggleItalic().run()}/>
    );
}

Italic.displayName = "Italic";
