import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Code`: código no conteúdo selecionado. */
export function Code(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="code-slash"
            label="Código"
            primeIcon="code"
            selected={props.editor.isActive("code")}
            onClick={() => props.editor.chain().focus().toggleCode().run()}/>
    );
}

Code.displayName = "Code";
