import React, { useState } from "react";
import { Table } from "../../src/table";

const Root = () => {
    const [select, setSelect] = useState<any>(null);

    return (
        <>
            <Table column={[
                { id: "id", header: "Código" },
                { id: "name", header: "Nome" },
                {
                    id: "option",
                    header: "Opções",
                    body: data => {
                        return data?.id === select?.id ? <p>Nando</p> : "-";
                    }
                },
            ]}
                   data={[
                       { id: 1, name: "Luiz Fernando" },
                       { id: 2, name: "Dayana" },
                       { id: 3, name: "Lara" },
                   ]}
                   selection={select}
                   onSelection={setSelect}/>
        </>
    );
};
export default Root;