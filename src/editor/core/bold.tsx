import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Bold`
 * Extensão para renderizar texto em negrito
 */
export const Bold = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("bold") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleBold().run();
           }}><i className="bi bi-type-bold"/></a>
    );
};