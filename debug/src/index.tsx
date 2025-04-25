import { Box } from "../../src/box";
import React, { useState } from "react";
import { Message } from "../../src/message";
import { InputFilter } from "../../src/inputfilter";

const Root = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState<any>(undefined);

    return (
        <Box className="bg-light rounded"
             size="100">
            <Message cancelarLabel="Não"
                     confirmLabel="Sim"
                     message="Deseja realmente excluir: ACCESS INFORMATICA CONSULTORIA ASSESSORIA E TREINAMENTO LTDA?"
                     visible={show}
                     onCancel={() => alert("cancelou")}
                     onConfirm={() => alert("confirmou")}
                     onVisible={setShow}/>
            <InputFilter options={["=", ">", "<", "<=", ">="]}
                         type="number"
                         value={value}
                         onChange={value => setValue(value)}/>
        </Box>
    );
};
export default Root;