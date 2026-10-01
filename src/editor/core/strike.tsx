import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Strike`: riscado no conteúdo selecionado. */
export function Strike(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <EditorButton
            {...props}
            icon="type-strikethrough"
            label="Riscado"
            primeIcon="strikethrough"
            selected={props.editor.isActive("strikethrough")}
            onClick={() => props.editor.chain().focus().toggleStrike().run()}/>
    );
}

Strike.displayName = "Strike";
