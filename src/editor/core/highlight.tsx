import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Highlight`
 * Extensão para marcar texto no formato de marca texto
 */
export const Highlight = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("highlight") ? " active" : "")}
           href="#"
           style={{ fontSize: ".975em" }}
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleHighlight().run();
           }}><i className="bi bi-highlighter"/></a>
    );
};