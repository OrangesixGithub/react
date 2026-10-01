import { useEffect } from "react";
import { EditorMenu } from "./core";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { editorVariants } from "./variants";
import StarterKit from "@tiptap/starter-kit";
import type { EditorProps } from "./@types";
import { Color } from "@tiptap/extension-color";
import { editorBasic, editorFull } from "./const";
import { TableKit } from "@tiptap/extension-table";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";

/** Componente - `EditorField`: gerencia a área editável, a sincronização do HTML e os estilos. */
export function EditorField({ options = "basic", ...props }: EditorProps) {
    const styles = editorVariants({ invalid: Boolean(props.error), disabled: props.disabled, readonly: props.readonly });
    const id = props.id ?? props.name;
    const editable = !props.disabled && !props.readonly;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: false, underline: false }),
            Underline,
            Highlight,
            Color,
            TextStyle,
            TableKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({
                openOnClick: false,
                protocols: ["http", "https"],
                isAllowedUri: (url, context) => /^https?:\/\//i.test(url) && Boolean(context.defaultValidate(url)),
            }),
            Image.configure({ allowBase64: true }),
        ],
        content: props.value ?? "",
        editable,
        shouldRerenderOnTransaction: true,
        editorProps: {
            attributes: {
                class: styles.editable(),
                role: "textbox",
                "aria-multiline": "true",
                "aria-label": props.label ?? props.placeholder ?? props.name ?? "Editor de texto",
                "aria-invalid": String(Boolean(props.error)),
                "aria-required": String(Boolean(props.required)),
                "aria-disabled": String(Boolean(props.disabled)),
                "aria-readonly": String(Boolean(props.readonly)),
                ...(id ? { id, "aria-describedby": id + "-feedback" } : {}),
                style: "min-height: " + Math.max(0, props.height ?? 100) + "px",
            },
        },
        onUpdate: ({ editor: instance }) => {
            if (editable) {
                props.onChange?.(instance.isEmpty ? null : instance.getHTML());
            }
        },
        onBlur: ({ editor: instance }) => props.onBlur?.(instance.isEmpty ? null : instance.getHTML()),
    });

    useEffect(() => {
        if (editor && (editor.isEmpty ? null : editor.getHTML()) !== (props.value || null)) {
            editor.commands.setContent(props.value ?? "", { emitUpdate: false });
        }
    }, [editor, props.value]);

    useEffect(() => {
        editor?.setEditable(editable, false);
    }, [editor, editable]);

    useEffect(() => {
        const node = editor?.view.dom as HTMLDivElement | undefined;
        if (typeof props.ref === "function") {
            props.ref(node ?? null);
        } else if (props.ref) {
            props.ref.current = node ?? null;
        }
        return () => {
            if (typeof props.ref === "function") {
                props.ref(null);
            } else if (props.ref) {
                props.ref.current = null;
            }
        };
    }, [editor, props.ref]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.root()}>
            {editor && editable
                && <EditorMenu
                    editor={editor}
                    iconPrefix={props.iconPrefix}
                    options={options === "basic" ? editorBasic : options === "full" ? editorFull : options}/>}
            <EditorContent
                className={styles.content()}
                editor={editor}/>
        </div>
    );
}

EditorField.displayName = "EditorField";
