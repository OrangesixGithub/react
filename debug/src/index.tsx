import React from "react";
import { Message } from "../../src/message";
import { Switch } from "../../src/switch";

const Root = () => {

    return (
        <>
            <Message message="nando"
                 visible={false}
                 onVisible={console.log}/>
            <Switch value
                    mode="Controlled"
                    onChange={() => {}}/>
        </>
    );
};
export default Root;