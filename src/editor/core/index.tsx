import { Text } from "./text";
import { Link } from "./link";
import { Bold } from "./bold";
import { Code } from "./code";
import { Table } from "./table";
import { Align } from "./align";
import { Color } from "./color";
import { Image } from "./image";
import { Italic } from "./italic";
import { Strike } from "./strike";
import { Orderlist } from "./orderlist";
import { Underline } from "./underline";
import { Highlight } from "./highlight";
import { Bulletlist } from "./bulletlist";
import { editorVariants } from "../variants";
import type { EditorCoreProps, EditorOptionsProps } from "../@types";

/**
 * Core - `Menu`
 * Componente que renderiza todas as opções de menu do componente
 */
export function EditorMenu({ iconPrefix = "bi bi-", ...props }: EditorCoreProps & { options: EditorOptionsProps }) {
    const styles = editorVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            aria-label="Formatação de texto"
            className={styles.toolbar()}
            role="toolbar">
            <div className={styles.group()}>
                <Text
                    active={props.options.text}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Bold
                    active={props.options.bold}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Italic
                    active={props.options.italic}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Color
                    active={props.options.color}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Strike
                    active={props.options.strike}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Underline
                    active={props.options.underline}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Code
                    active={props.options.code}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Highlight
                    active={props.options.highlight}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
            </div>
            <div className={styles.group()}>
                <Bulletlist
                    active={props.options.bulletlist}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Orderlist
                    active={props.options.orderlist}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Link
                    active={props.options.link}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Image
                    active={props.options.image}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Align
                    active={Boolean(props.options.align)}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
                <Table
                    active={Boolean(props.options.table)}
                    editor={props.editor}
                    iconPrefix={iconPrefix}/>
            </div>
        </div>
    );
}

EditorMenu.displayName = "EditorMenu";
