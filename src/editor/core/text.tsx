import React from "react";
import { EditorCoreProps } from "..";

/**
 * Core - `Text`
 * Extensão para formatar o texto com tamanho específico
 */
export const Text = ({ editor, active }: EditorCoreProps & { active: boolean }) => {

    return active && (
        <>
            <a className={"editor-menu-item" + (editor.isActive("heading", { level: 1 }) ? " active" : "")}
                href="#"
                style={{ fontSize: ".975em" }}
                onClick={event => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}><i className="bi bi-type-h1"/></a>
            <a className={"editor-menu-item" + (editor.isActive("heading", { level: 2 }) ? " active" : "")}
                href="#"
                style={{ fontSize: ".975em" }}
                onClick={event => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}><i className="bi bi-type-h2"/></a>
            <a className={"editor-menu-item" + (editor.isActive("heading", { level: 3 }) ? " active" : "")}
                href="#"
                style={{ fontSize: ".975em" }}
                onClick={event => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}><i className="bi bi-type-h3"/></a>
        </>
    );
};