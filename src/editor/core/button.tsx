import { editorVariants } from "../variants";
import type { EditorCoreProps } from "../@types";

/** Core - `EditorButton`: ação acessível da barra de ferramentas. */
export function EditorButton({ iconPrefix = "bi bi-", ...props }: EditorCoreProps & {
    label: string;
    icon: string;
    primeIcon?: string;
    selected?: boolean;
    onClick(): void;
}) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <button
            aria-label={props.label}
            aria-pressed={Boolean(props.selected)}
            className={editorVariants().button()}
            disabled={!props.editor.isEditable}
            title={props.label}
            type="button"
            onClick={props.onClick}
            onMouseDown={event => event.preventDefault()}>
            <i
                aria-hidden="true"
                className={iconPrefix + (iconPrefix === "pi pi-" ? props.primeIcon ?? "pencil" : props.icon)}/>
        </button>
    );
}

EditorButton.displayName = "EditorButton";
