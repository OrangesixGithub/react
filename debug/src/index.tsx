import React, { useEffect } from "react";
import { Box } from "@orangesix/box";
import { Input } from "@orangesix/input";
import { messageField } from "@orangesix-dev/utils";

const Root = () => {

    useEffect(() => {
        setTimeout(() => {
            messageField({
                "password": [
                    "A senha informada está incorreta."
                ]
            }, "manager");
        }, 300);
    }, []);

    return (
        <Box className="bg-light p-0 m-0"
             size="100">
            <form id="manager">
                <Input required
                       icon="gear"
                       label="Login"
                       name="input"
                       value=""
                       onChange={console.log}/>
                <Input passwordShow
                       required
                       icon="gear"
                       label="Senha"
                       name="password"
                       type="password"
                       value=""
                       onChange={console.log}/>
            </form>
        </Box>
    );
};
export default Root;