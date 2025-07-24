import { Box } from "../box";
import { PDFProps } from ".";
import * as ReactPDF from "react-pdf";
import React, { useState, useRef, useEffect } from "react";

ReactPDF.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ReactPDF.pdfjs.version}/build/pdf.worker.min.mjs`;

const ReactPDFOptions = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${ReactPDF.pdfjs.version}/cmaps/`,
    wasmUrl: `https://unpkg.com/pdfjs-dist@${ReactPDF.pdfjs.version}/wasm/`,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${ReactPDF.pdfjs.version}/standard_fonts/`,
};

/**
 * Componente - `PDF`
 *
 * Um componente versátil que é utilizado para exibir PDFs no seu aplicativo React como se fossem imagens.
 */
export function PDF(props: PDFProps) {
    const pdfContainerRef = useRef<null | HTMLDivElement>(null);

    const [width, setWidth] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        setWidth((pdfContainerRef.current?.clientWidth ?? 500) - 50);
    });

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={"pdf " + (props.className ?? "")}
             css={props.css}
             id={props.id}
             size={props.size ?? "100"}>
            <div className="pdf-container"
                 ref={pdfContainerRef}>
                <ReactPDF.Document
                    file={props.file}
                    options={ReactPDFOptions}
                    onLoadSuccess={({ numPages }) => setPage(numPages)}
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}>
                    {props.mode === undefined || props.mode === "total"
                        ? Array.from(new Array(page), (_el, index) => (
                            <ReactPDF.Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={width}/>
                        ))
                        : <ReactPDF.Page
                            pageNumber={currentPage}
                            width={width}/>}
                </ReactPDF.Document>
                {props.mode === "pagination"
                    && <div className={`pdf-pagination ${active ? "active" : ""}`}
                            onMouseEnter={event => {
                                event.preventDefault();
                                setActive(true);
                            }}>
                        <button className="pdf-page"
                                disabled={currentPage === 1}
                                onClick={event => {
                                    event.preventDefault();
                                    if (currentPage > 0) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}><i className="bi bi-chevron-double-left"/></button>
                        <span>{currentPage} de {page}</span>
                        <button className="pdf-page"
                                disabled={currentPage === page}
                                onClick={event => {
                                    event.preventDefault();
                                    if (currentPage < page) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}><i className="bi bi-chevron-double-right"/></button>
                    </div>}
            </div>
        </Box>
    );
}