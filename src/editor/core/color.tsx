import { editorVariants } from "../variants";
import type { EditorCoreProps } from "../@types";

/** Core - `Color`: seletor da cor do texto. */
export function Color(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <input
            aria-label="Cor do texto"
            className={editorVariants().color()}
            disabled={!props.editor.isEditable}
            title="Cor do texto"
            type="color"
            value={props.editor.getAttributes("textStyle").color ?? "#000000"}
            onChange={event => props.editor.chain().focus().setColor(event.target.value).run()}/>
    );
}

Color.displayName = "Color";
