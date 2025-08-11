import { Box } from "@orangesix-dev/box";
import { Input } from "@orangesix-dev/input";
import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

const Root = () => {
    const { control, watch } = useForm();
    const inputDocumentoRef = useRef<any>(null);
    const lenDocumento = watch("documento")?.replace(/\D/g, "")?.length ?? 0;

    useEffect(() => {
        if (lenDocumento > 0) {
            if (lenDocumento == 12) {
                inputDocumentoRef.current?.getElement()?.setSelectionRange(16, 16);
            }
        }
    }, [lenDocumento]);

    return (
        <Box className="bg-light gap-3"
             size="100">
            <Input required
                   control={control}
                   icon="person"
                   label="Usuário"
                   mask={lenDocumento <= 11 ? "999.999.999-99?9" : "99.999.999/9999-99"}
                   mode="HookForm"
                   name="documento"
                   placeholder="Digite o CNPJ ou CPF"
                   ref={inputDocumentoRef}/>
        </Box>
    );
};
export default Root;