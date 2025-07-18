import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Orderlist`
 * Extensão para renderizar texto em lista ordenada
 */
export const Orderlist = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    return active && (
        <a className={"editor-menu-item" + (editor.isActive("orderedList") ? " active" : "")}
           href="#"
           onClick={event => {
               event.preventDefault();
               editor.chain().focus().toggleOrderedList().run();
           }}><i className="bi bi-list-ol"/></a>
    );
};