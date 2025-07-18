import React from "react";
import { Text } from "./text";
import { Link } from "./link";
import { Bold } from "./bold";
import { Code } from "./code";
import { Color } from "./color";
import { Image } from "./image";
import { Italic } from "./italic";
import { Strike } from "./strike";
import { Orderlist } from "./orderlist";
import { Underline } from "./underline";
import { Highlight } from "./highlight";
import { Bulletlist } from "./bulletlist";
import { EditorCoreProps, EditorOptionsProps } from "..";

/**
 * Core - `Menu`
 * Componente que renderiza todas as opções de menu do componente
 */
export const EditorMenu = ({ editor, options }: EditorCoreProps & { options: EditorOptionsProps }) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className="editor-menu">
            <div className="editor-menu-group">
                <Text active={options.text}
                      editor={editor}/>
                <Bold active={options.bold}
                      editor={editor}/>
                <Italic active={options.italic}
                        editor={editor}/>
                <Color active={options.color}
                       editor={editor}/>
                <Strike active={options.strike}
                        editor={editor}/>
                <Underline active={options.underline}
                           editor={editor}/>
                <Code active={options.code}
                      editor={editor}/>
                <Highlight active={options.highlight}
                           editor={editor}/>
            </div>
            <div className="editor-menu-group">
                <Bulletlist active={options.bulletlist}
                            editor={editor}/>
                <Orderlist active={options.orderlist}
                           editor={editor}/>
                <Link active={options.link}
                      editor={editor}/>
                <Image active={options.image}
                       editor={editor}/>
            </div>
        </div>
    );
};