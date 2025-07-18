import { EditorCoreProps } from "..";
import React, { useEffect, useState } from "react";

/**
 * Core - `Link`
 * Extensão para formatar adicionar link no documento
 */
export const Link = ({ editor, active }: EditorCoreProps & { active: boolean }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    useEffect(() => {
        setLink("");
    }, [open]);

    function handleLink() {
        if (link === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run();
        }
        setOpen(false);
    }

    return active && (
        <>
            <a className={"editor-menu-item" + (editor.isActive("link") ? " active" : "")}
               href="#"
               onClick={event => {
                   event.preventDefault();
                   if (!editor.isActive("link")) {
                       setOpen(!open);
                   } else {
                       editor.chain().focus().unsetLink().run();
                   }
               }}><i className="bi bi-link"/></a>
            {open && <div className="editor-link">
                <input className="form-control form-control-sm"
                       placeholder="https://example.com.br"
                       style={{ fontSize: ".8em", flex: 1 }}
                       type="text"
                       value={link}
                       onChange={event => setLink(event.target.value)}/>
                <a className="text-primary ms-2"
                   href="#"
                   style={{ fontSize: ".8em" }}
                   onClick={event => {
                       event.preventDefault();
                       handleLink();
                   }}><i className="bi bi-save me-1"/>Save</a>
            </div>}
        </>
    );
};