import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Underline`
 * Extensão para renderizar texto em underline text
 */
export const Underline = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("underline") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleUnderline().run();
           }}><i className="bi bi-type-underline"/></a>
    );
};