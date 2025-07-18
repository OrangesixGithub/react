import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Bulletlist`
 * Extensão para renderizar texto em lista
 */
export const Bulletlist = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("bulletList") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleBulletList().run();
           }}><i className="bi bi-list-task"/></a>
    );
};