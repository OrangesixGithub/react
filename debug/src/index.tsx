import React from "react";
import { Box } from "@orangesix-dev/box";
import { Tooltip } from "@orangesix-dev/tooltip";

const Root = () => {
    return (
        <Box className="bg-light"
            size="100">
            <Tooltip content="teste">
                <p>nando</p>
            </Tooltip>
        </Box>
    );
};
export default Root;