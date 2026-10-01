import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Highlight`: destaque no conteúdo selecionado. */
export function Highlight(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="highlighter"
            label="Destaque"
            primeIcon="pencil"
            selected={props.editor.isActive("highlight")}
            onClick={() => props.editor.chain().focus().toggleHighlight().run()}/>
    );
}

Highlight.displayName = "Highlight";
