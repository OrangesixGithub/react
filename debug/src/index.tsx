import React, { useState } from "react";

import { Box } from "@orangesix/box";
import { Input } from "@orangesix/input";
import { Editor } from "@orangesix/editor";

const Root = () => {
    const [value, setValue] = useState<any>("");

    return (
        <Box className="bg-light rounded">
            <Editor required
                    icon="pen"
                    label="Editor"
                    options="full"
                    value={value}
                    onChange={setValue}/>
            <Input required
                   icon="gear"
                   label="Field"
                   value={value}
                   onChange={setValue}/>
        </Box>
    );
};
export default Root;