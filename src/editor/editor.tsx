import { Box } from "../box";
import { EditorField } from "./field";
import type { EditorProps } from "./@types";
import { InputFeedback, InputLabel } from "../api";

/**
 * Componente - `Editor`
 * Editor de texto HTML com barra de ferramentas com valor controlado pelo consumidor.
 */
export function Editor(props: EditorProps) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={props.className}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel {...props}/>
            <EditorField {...props}/>
            <InputFeedback {...props}/>
        </Box>
    );
}

Editor.displayName = "Editor";
