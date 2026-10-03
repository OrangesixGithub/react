import { Box } from "../box";
import type { PDFProps } from "./@types";
import { pdfVariants } from "./variants";
import { PDFDocument } from "./core/document";

/**
 * Componente - `PDF`
 *
 * Exibe PDFs completos ou paginados, com largura adaptada ao contêiner.
 */
export function PDF(props: PDFProps) {
    const styles = pdfVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={styles.root({ className: props.className })}
            css={props.css}
            id={props.id}
            size={props.size ?? "100"}>
            <PDFDocument
                appendTo={props.appendTo}
                file={props.file}
                key={props.file}
                mode={props.mode}/>
        </Box>
    );
}

PDF.displayName = "PDF";
