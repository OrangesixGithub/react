import { EditorButton } from "./button";
import { useEffect, useRef } from "react";
import { editorVariants } from "../variants";
import type { EditorCoreProps } from "../@types";

/** Core - `Image`: insere imagens por arquivo ou pela área de transferência. */
export function Image(props: EditorCoreProps & { active: boolean }) {
    const input = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const element = props.editor.view.dom;
        const readers = new Set<FileReader>();
        function insert(file: File) {
            const reader = new FileReader();
            readers.add(reader);
            reader.onload = () => {
                readers.delete(reader);
                if (!props.editor.isDestroyed && props.editor.isEditable && typeof reader.result === "string") {
                    props.editor.chain().focus().setImage({ src: reader.result }).run();
                }
            };
            reader.readAsDataURL(file);
        }
        function paste(event: ClipboardEvent) {
            if (!props.active || !props.editor.isEditable) {
                return;
            }
            const files = Array.from(event.clipboardData?.items ?? [])
                .filter(item => item.type.startsWith("image/"))
                .map(item => item.getAsFile()).filter((file): file is File => file !== null);
            if (!files.length) {
                return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            files.forEach(insert);
        }
        function change() {
            const file = input.current?.files?.[0];
            if (file && props.editor.isEditable) {
                insert(file);
            }
            if (input.current) {
                input.current.value = "";
            }
        }
        const fileInput = input.current;
        element.addEventListener("paste", paste, true);
        fileInput?.addEventListener("change", change);
        return () => {
            element.removeEventListener("paste", paste, true);
            fileInput?.removeEventListener("change", change);
            readers.forEach(reader => reader.abort());
        };
    }, [props.editor, props.active]);
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <div className={editorVariants().image()}>
            <input
                accept="image/png, image/jpeg"
                aria-label="Arquivo de imagem"
                className={editorVariants().file()}
                ref={input}
                tabIndex={-1}
                type="file"/>
            <EditorButton
                {...props}
                icon="image"
                label="Inserir imagem"
                primeIcon="image"
                onClick={() => input.current?.click()}/>
        </div>
    );
}

Image.displayName = "Image";
