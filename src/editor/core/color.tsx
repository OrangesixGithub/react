import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Color`
 * Extensão para formatar o texto com cor especifica
 */
export const Color = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <input
            style={{
                width: "22px",
                height: "20px",
                borderRadius: "5px",
                margin: "auto 2.5px",
                border: "2px solid var(--editor-border-color)",
            }}
            type="color"
            value={editor.getAttributes("textStyle").color ?? "#000000"}
            onChange={event => editor.chain().focus().setColor(event.target.value).run()}/>
    );
};