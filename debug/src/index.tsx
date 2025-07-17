import React from "react";
import { Box } from "@orangesix/box";
import { Accordion } from "@orangesix-dev/accordion";

const Root = () => {
    return (
        <Box className="bg-light rounded">
            <Accordion tabs={[
                { header: "Luiz Fernando", content: <></> }
            ]}/>
        </Box>
    );
};
export default Root;