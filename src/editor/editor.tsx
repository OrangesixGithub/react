import { Box } from "../box";
import { EditorProps } from ".";
import { EditorMenu } from "./core";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import { editorBasic, editorFull } from "./const";
import { InputFeedback, InputLabel } from "../api";
import React, { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent as EditorTipTap, useEditor } from "@tiptap/react";

/**
 * Componente - `Editor`
 *
 * Um componente versátil que pode ser utilizado para criar container de edição de texto.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export const Editor = ({ options = "basic", iconPrefix = "bi bi-", ...props }: EditorProps) => {
    const [edition, setEdition] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            Color,
            TextStyle,
            Link.configure({
                validate: (href) => /^https?:\/\//.test(href),
                HTMLAttributes: {
                    rel: ""
                }
            }),
            Image.configure({
                allowBase64: true
            })
        ],
        editable: !props.disabled,
        content: props.value ?? "",
        onFocus: () => setEdition(true),
        onBlur: () => setEdition(false),
        onUpdate: ({ editor }) => {
            props.onChange(editor.getHTML());
        }
    });

    if (!editor) {
        console.error("Não foi possível realizar o carregamento do editor de texto.");
        return null;
    }

    useEffect(() => {
        if (editor && !edition) {
            editor?.commands.setContent(props.value);
        }
    }, [props.value]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
             css={props.css}
             size={props.size ?? "100"}>
            <InputLabel {...props}/>
            <div className="editor-container">
                {!props.disabled
                    && <EditorMenu editor={editor}
                                   options={options === "basic" ? editorBasic : options === "full" ? editorFull : options}/>}
                <EditorTipTap className="editor"
                              disabled={props.disabled}
                              editor={editor}
                              id={props.id}
                              name={props.name}
                              style={{ minHeight: (props.height ?? 100) + "px" }}/>
            </div>
            <InputFeedback {...props}/>
        </Box>
    );
};
Editor.displayName = "Editor";