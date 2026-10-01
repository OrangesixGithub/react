import { EditorButton } from "./button";
import type { EditorCoreProps } from "../@types";

const alignments = [
    { value: "left", label: "Alinhar à esquerda", icon: "text-left", primeIcon: "align-left" },
    { value: "center", label: "Centralizar", icon: "text-center", primeIcon: "align-center" },
    { value: "right", label: "Alinhar à direita", icon: "text-right", primeIcon: "align-right" },
    { value: "justify", label: "Justificar", icon: "justify", primeIcon: "align-justify" },
];

/** Core - `Align`: alinhamento dos parágrafos e títulos selecionados. */
export function Align(props: EditorCoreProps & { active: boolean }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <>
            {alignments.map(alignment => <EditorButton
                {...props}
                icon={alignment.icon}
                key={alignment.value}
                label={alignment.label}
                primeIcon={alignment.primeIcon}
                selected={props.editor.isActive({ textAlign: alignment.value })}
                onClick={() => props.editor.chain().focus().setTextAlign(alignment.value).run()}/>)}
        </>
    );
}

Align.displayName = "Align";
