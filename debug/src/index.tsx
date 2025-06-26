import React from "react";
import { Input } from "../../src/input";
import { useForm } from "react-hook-form";

const Root = () => {
    const { control } = useForm({
        defaultValues: { nando: 10 }
    });
    return (
        <>
            <Input required
                   control={control}
                   label="Nando"
                   mode="HookForm"
                   name="nando"
                   type="number"/>
        </>
    );
};
export default Root;