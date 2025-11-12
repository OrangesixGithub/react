import React from "react";
import { Box } from "@orangesix-dev/box";
import { useForm } from "react-hook-form";
import { Calendar } from "@orangesix-dev/calendar";

const Root = () => {
    const { control } = useForm({ defaultValues: { data: undefined } });

    return (
        <Box className="bg-light"
            size="100">
            <Calendar
                required
                control={control}
                icon="calendar-week"
                label="Data"
                mode="HookForm"
                name="data"
                placeholder="Data"
                size="10"/>
        </Box>
    );
};
export default Root;