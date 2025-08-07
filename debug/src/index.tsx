import React from "react";
import { Box } from "@orangesix-dev/box";
import { Tabview } from "@orangesix-dev/tabview";

const Root = () => {
    return (
        <Box className="bg-light p-0 m-0"
             size="100">
            <Tabview tabs={[
                { tab: "register", icon: "house", content: <></> }
            ]}/>
        </Box>
    );
};
export default Root;