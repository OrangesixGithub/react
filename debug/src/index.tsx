import React from "react";
import { Box } from "@orangesix-dev/box";
import { useForm } from "react-hook-form";
import { MultiSelect } from "@orangesix-dev/multiselect";

const Root = () => {
    const { control } = useForm({});

    return (
        <Box className="bg-light gap-3 p-3"
             size="100">
            <MultiSelect required
                         options={[
                             { label: "Australia", value: "AU" },
                             { label: "Brazil", value: "BR" },
                         ]}
                         control={control}
                         icon="gear"
                         label="Dados"
                         mode="HookForm"
                         name="teste"
                         size="25"/>
        </Box>
    );
};
export default Root;