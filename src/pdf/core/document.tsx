import type { PDFProps } from "../@types";
import { pdfVariants } from "../variants";
import { PDFPagination } from "./pagination";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const documentOptions = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

/**
 * Core - `PDFDocument`
 *
 * Renderiza o arquivo e reinicia a navegação quando sua origem muda.
 */
export function PDFDocument({ mode = "total", ...props }: PDFProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const styles = pdfVariants();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const measure = () => setWidth(Math.max(0, Math.floor(container.getBoundingClientRect().width)));
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            className={styles.container()}
            ref={rootRef}>
            <div
                className={styles.viewport()}
                ref={containerRef}>
                <Document
                    error={<p className={styles.message()}
                        role="alert">Não foi possível carregar o PDF.</p>}
                    className={styles.document()}
                    file={props.file}
                    loading={<p className={styles.message()}>Carregando PDF...</p>}
                    noData={<p className={styles.message()}>Nenhum PDF informado.</p>}
                    options={documentOptions}
                    suspense={false}
                    onLoadSuccess={({ numPages }) => {
                        setPages(numPages);
                        setCurrentPage(1);
                    }}>
                    {width > 0
                        && Array.from({ length: mode === "total" ? pages : pages > 0 ? 1 : 0 }, (_, index) => (
                            <Page
                                error={<p className={styles.message()}
                                    role="alert">Não foi possível carregar a página.</p>}
                                loading={<p className={styles.message()}
                                    role="status">Carregando página...</p>}
                                className={styles.page()}
                                key={mode === "total" ? index + 1 : currentPage}
                                pageNumber={mode === "total" ? index + 1 : currentPage}
                                suspense={false}
                                width={width}/>
                        ))}
                </Document>
            </div>
            {mode === "pagination"
                && pages > 0 && (
                <PDFPagination
                    appendTo={props.appendTo}
                    containerRef={rootRef}
                    currentPage={currentPage}
                    pages={pages}
                    onPageChange={setCurrentPage}/>
            )}
        </div>
    );
}

PDFDocument.displayName = "PDFDocument";
