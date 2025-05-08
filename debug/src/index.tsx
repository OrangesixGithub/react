import React from "react";
import { Message } from "../../src/message";

const Root = () => {

    return (
        <Message message="nando"
                 visible={true}
                 onVisible={console.log}/>
    );
};
export default Root;