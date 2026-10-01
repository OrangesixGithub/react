import { useState } from "react";
import { EditorButton } from "./button";
import { editorVariants } from "../variants";
import type { EditorCoreProps } from "../@types";

/** Core - `Link`: insere e remove links HTTP e HTTPS. */
export function Link(props: EditorCoreProps & { active: boolean }) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const styles = editorVariants();
    function saveLink() {
        if (!props.editor.isEditable) {
            return;
        }
        const href = link.trim();
        if (href && !/^https?:\/\//i.test(href)) {
            return;
        }
        if (href) {
            props.editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
        } else {
            props.editor.chain().focus().extendMarkRange("link").unsetLink().run();
        }
        setOpen(false);
    }
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <>
            <EditorButton
                {...props}
                icon="link"
                label="Inserir ou remover link"
                primeIcon="link"
                selected={props.editor.isActive("link")}
                onClick={() => {
                    if (props.editor.isActive("link")) {
                        props.editor.chain().focus().unsetLink().run();
                    } else {
                        setLink("");
                        setOpen(!open);
                    }
                }}/>
            {open && <div className={styles.link()}>
                <input
                    aria-label="Endereço do link"
                    className={styles.linkInput()}
                    placeholder="https://example.com.br"
                    type="url"
                    value={link}
                    onKeyDown={event => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            saveLink();
                        }
                        if (event.key === "Escape") {
                            setOpen(false);
                        }
                    }}
                    onChange={event => setLink(event.target.value)}/>
                <button
                    className={styles.button()}
                    type="button"
                    onClick={saveLink}>Salvar</button>
            </div>}
        </>
    );
}

Link.displayName = "Link";
