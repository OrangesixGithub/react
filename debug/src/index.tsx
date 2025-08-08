import React from "react";
import { Box } from "@orangesix-dev/box";
import { Tooltip } from "@orangesix-dev/tooltip";

const Root = () => {
    return (
        <Box className="bg-light gap-3"
             size="100">
            <Tooltip content="Realizando teste">
                <a href="#">Teste</a>
            </Tooltip>
        </Box>
    );
};
export default Root;