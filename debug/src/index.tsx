import React, { useState } from "react";
import { Message } from "../../src/message";
import { Button } from "../../src/button";

const Root = () => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Button label="message"
                    onClick={() => setVisible(!visible)}/>
            <Message message="teste"
                     visible={visible}
                     onVisible={value => setVisible(value)}/>
        </>
    );
};
export default Root;