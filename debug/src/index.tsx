import React, { useState } from "react";
import { Accordion } from "../../src/accordion";

const Root = () => {
    const [activeIndex, setActiveIndex] = useState<number[] | number>(0);
    return (
        <>
            <Accordion tabs={[
                { header: "Nando", content: <p>Nando</p> },
                { header: "Dayana", content: <p>Nando</p> },
                { header: "Lara", content: <p>Nando</p> },
            ]}
                       activeIndex={activeIndex}
                       onChange={event => setActiveIndex(event.index)}/>
        </>
    );
};
export default Root;