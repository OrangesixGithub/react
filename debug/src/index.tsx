import React, { useState } from "react";
import { Box } from "@orangesix-dev/box";
import { Table } from "@orangesix-dev/table";

const Root = () => {
    const data = [
        {
            id: 1,
            arquivo: "ModulosBud.dll",
            descricao: "Planejamento - Módulos",
            requisito: [
                { id: 1, name: "1/2025" },
                { id: 2, name: "2/2025" },
                { id: 3, name: "3/2025" },
            ],
        },
        {
            id: 2,
            arquivo: "ModulosSup.dll",
            descricao: "Suprimentos - Módulos",
            requisito: [
                { id: 4, name: "4/2025" },
                { id: 5, name: "5/2025" },
            ],
        }
    ];
    const [selected, setSelected] = useState<any>([]);
    const [expandedRows, setExpandedRows] = useState<any>(null);

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="w-100">
                <Table column={[
                    { id: "id", header: "cód" },
                    { id: "name", header: "Nome" },
                ]}
                       data={data.requisito}/>
            </div>
        );
    };

    return (
        <Box className="bg-light"
             size="100">
            <Table styleResizable
                   styleStriped
                   column={[
                       { id: "id", header: "Código", style: { width: "70px" }, align: "center" },
                       { id: "arquivo", header: "Arquivo", style: { width: "200px" } },
                       { id: "descricao", header: "Descrição" },
                   ]}
                   css={{ width: "100%" }}
                   data={data}
                   rowExpandable={expandedRows}
                   rowExpandableAttr="requisito"
                   rowExpansionTemplate={rowExpansionTemplate}
                   selection={selected}
                   selectionMode="checkbox"
                   styleSize="small"
                   styleType="bordered"
                   onRowExpandable={event => setExpandedRows(event.data)}
                   onSelection={setSelected}/>
        </Box>
    );
};
export default Root;