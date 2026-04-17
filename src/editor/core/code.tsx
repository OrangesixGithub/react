import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Code`
 * Extensão para renderizar texto em formato de código
 */
export const Code = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("code") ? " active" : "")}
            href="#"
            style={{ fontSize: ".975em" }}
            onClick={event => {
                event.preventDefault();
                editor.chain().focus().toggleCode().run();
            }}><i className="bi bi-code-slash"/></a>
    );
};