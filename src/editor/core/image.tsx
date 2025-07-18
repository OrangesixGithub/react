import { EditorCoreProps } from "..";
import React, { useEffect, useState } from "react";

/**
 * Core - `Image`
 * Extensão para adicionar imagem no documento
 */
export const Image = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    const [file, setFile] = useState<any>(null);

    const handlePaste = (event: any) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    editor.chain().focus().setImage({ src: event?.target?.result as string }).run();
                };
                reader.readAsDataURL(file);
            }
        }
    };

    useEffect(() => {
        if (editor.view.dom.parentNode !== null && active) {
            editor.view.dom.parentNode.addEventListener("paste", handlePaste);
        }
        return () => {
            editor.view.dom.parentNode?.removeEventListener("paste", handlePaste);
        };
    }, []);

    useEffect(() => {
        if (file?.name !== undefined) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                editor.chain().focus().setImage({ src: reader.result as string }).run();
            };
        }
    }, [file]);

    return active && (
        <div className="editor-image">
            <input accept="image/png, image/jpeg"
                   name="editor-image"
                   type="file"
                   onChange={event => setFile(event.target.files?.[0])}/>
            <a className={"editor-menu-item" + (editor.isActive("link") ? " active" : "")}
               href="#"
               style={{ fontSize: ".975em" }}
               onClick={event => {
                   event.preventDefault();
               }}><i className="bi bi-image"/></a>
        </div>
    );
};