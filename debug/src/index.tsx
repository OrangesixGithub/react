import React from "react";
import { Box } from "../../src/box";
import { Table } from "../../src/table";

const Root = () => {
    return (
        <Box className="bg-light rounded"
             size="100">
            <Table column={[
                { id: "id", header: "Cód" },
                { id: "name", header: "Nome" },
            ]}
                   data={[
                       { id: 1, name: "Luiz" },
                       { id: 2, name: "Dayana" },
                   ]}
                   onDoubleClick={console.log}/>
        </Box>
    );
};
export default Root;