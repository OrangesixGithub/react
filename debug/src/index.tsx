import React, { useState } from "react";
import { Box } from "@orangesix-dev/box";
import { Modal } from "@orangesix-dev/modal";
import { Calendar } from "@orangesix-dev/calendar";

const Root = () => {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <Box className="bg-light"
            size="100">
            <Modal
                header="Calendário"
                sizes="large"
                visible={true}
                onVisible={console.log}>
                <Calendar
                    required
                    icon="calendar-week"
                    label="Data"
                    name="data"
                    placeholder="Data"
                    size="25"
                    value={value}
                    onChange={setValue}/>
            </Modal>
        </Box>
    );
};
export default Root;