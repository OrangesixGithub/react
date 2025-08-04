import React, { useState } from "react";
import { Box } from "@orangesix-dev/box";
import { Editor } from "@orangesix-dev/editor";

const Root = () => {
    const [v, setV] = useState("");

    return (
        <Box className="bg-light p-0 m-0"
             size="100">
            <Editor options="full"
                    value={v}
                    onChange={setV}/>
        </Box>
    );
};
export default Root;