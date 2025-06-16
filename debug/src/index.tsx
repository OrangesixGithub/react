import React from "react";
import { Input } from "../../src/input";
import { useForm } from "react-hook-form";

const Root = () => {
    const { control } = useForm();
    return (
        <>
            <Input required
                   control={control}
                   label="Nando"
                   mode="HookForm"
                   name="nando"/>
        </>
    );
};
export default Root;