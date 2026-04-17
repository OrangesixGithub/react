import React from "react";
import { Box } from "@orangesix-dev/box";
import { Input } from "@orangesix-dev/input";

const Root = () => {
    return (
        <Box
            className="bg-light"
            size="100">
            <Input
                readonly
                label="Teste"
                readonlyType="label"
                value="Teste"/>
        </Box>
    );
};
export default Root;