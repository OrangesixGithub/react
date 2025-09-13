import React, { useState } from "react";
import { Box } from "@orangesix-dev/box";
import { Table } from "@orangesix-dev/table";

const Root = () => {
    const [dto, setDto] = useState<any>([
        {
            id: 1,
            descricao: "Nº EMPENHO",
            tipo: "Texto",
            required: true,
            obrigatorio: "S",
            order: 1
        },
        {
            id: 2,
            descricao: "DESCRIÇÃO UNIDADE ORÇAMENTÁRIA",
            tipo: "Texto",
            required: true,
            obrigatorio: "N",
            order: 2
        },
        {
            id: 3,
            descricao: "DESCRIÇÃO UNIDADE",
            tipo: "Texto",
            required: true,
            obrigatorio: "N",
            order: 3
        },
    ]);

    return (
        <Box className="bg-light gap-3 p-3"
             size="100">
            <Table styleStriped
                   column={[
                       {
                           id: "descricao",
                           header: "Descrição",
                       },
                       {
                           id: "tipo",
                           header: "Tipo",
                           style: { width: "100px" },
                           align: "center",
                       },
                       {
                           id: "obrigatorio",
                           header: "Obrigatório",
                           style: { width: "100px" },
                           align: "center",
                       }]}
                   data={dto}
                   reorder="rows"
                   styleSize="small"
                   onReorder={setDto}/>
        </Box>
    );
};
export default Root;