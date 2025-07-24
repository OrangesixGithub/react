import React from "react";
import { Box } from "@orangesix/box";
import { PDF } from "@orangesix-dev/pdf";

import "@orangesix-dev/pdf/style/pdf.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

const Root = () => {
    return (
        <Box className="bg-light p-0 m-0"
             size="100">
            <PDF file="./pdf/sample.pdf"
                 size="50"/>
        </Box>
    );
};
export default Root;