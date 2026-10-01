import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Bold`: negrito no conteúdo selecionado. */
export function Bold(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="type-bold"
            label="Negrito"
            primeIcon="bold"
            selected={props.editor.isActive("bold")}
            onClick={() => props.editor.chain().focus().toggleBold().run()}/>
    );
}

Bold.displayName = "Bold";
