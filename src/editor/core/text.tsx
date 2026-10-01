import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

/** Core - `Text`: títulos de nível 1, 2 e 3. */
export function Text(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <>
            {([1, 2, 3] as const).map(level => <EditorButton
                {...props}
                icon={"type-h" + level}
                key={level}
                label={"Título " + level}
                primeIcon="align-left"
                selected={props.editor.isActive("heading", { level })}
                onClick={() => props.editor.chain().focus().toggleHeading({ level }).run()}/>)}
        </>
    );
}

Text.displayName = "Text";
