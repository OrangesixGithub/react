import { Box } from "../../src/box";
import React, { useState } from "react";
import { Message } from "../../src/message";

const Root = () => {
    const [show, setShow] = useState(true);
    return (
        <Box className="bg-light rounded"
             size="100">
            <Message cancelarLabel="Não"
                     confirmLabel="Sim"
                     message="Deseja realmente excluir: ACCESS INFORMATICA CONSULTORIA ASSESSORIA E TREINAMENTO LTDA?"
                     visible={show}
                     onConfirm={() => alert("confirmou")}
                     onVisible={setShow}/>
        </Box>
    );
};
export default Root;