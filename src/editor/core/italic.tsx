import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Italic`
 * Extensão para renderizar texto em itálico
 */
export const Italic = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("italic") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleItalic().run();
           }}><i className="bi bi-type-italic"/></a>
    );
};