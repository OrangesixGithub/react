import React from "react";
import { Box } from "@orangesix-dev/box";
import { Message } from "@orangesix-dev/message";

const Root = () => {
    return (
        <Box className="bg-light gap-3"
             size="100">
            <p>teste</p>
            <Message message="teste"
                     modalZIndex={5000}
                     visible={true}
                     onVisible={console.log}/>
        </Box>
    );
};
export default Root;