import React from "react";
import { Box } from "../../src/box";
import { Table } from "../../src/table";

const Root = () => {
    return (
        <Box className="bg-light rounded"
             size="100">
            <Table edit
                   column={[
                       { id: "id", header: "Cód" },
                       { id: "name", header: "Nome" },
                   ]}
                   data={[
                       { id: 1, name: "Luiz" },
                       { id: 2, name: "Dayana" },
                   ]}
                   styleSize='small'/>
        </Box>
    );
};
export default Root;