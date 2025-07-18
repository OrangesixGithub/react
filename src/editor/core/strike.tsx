import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Strike`
 * Extensão para renderizar texto em strike text
 */
export const Strike = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("strike") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleStrike().run();
           }}><i className="bi bi-type-strikethrough"/></a>
    );
};