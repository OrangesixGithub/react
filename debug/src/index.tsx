import React, { useState } from "react";

import { Box } from "@orangesix/box";
import { Accordion } from "@orangesix/accordion";
import { Autocomplete, AutocompleteDataProps } from "@orangesix/autocomplete";

const Root = () => {
    const [data, setData] = useState<AutocompleteDataProps[]>([]);
    const [value, setValue] = useState<any>(null);

    console.log(value);
    return (
        <Box className="bg-light rounded">
            <Accordion tabs={[
                { header: "Luiz Fernando", content: <></> },
                { header: "Lara", content: <></> }
            ]}/>
            <Autocomplete required
                          data={data}
                          icon="house"
                          label="Cliente"
                          value={value}
                          onSearch={() => setData([
                              { code: 1, name: "Nando" }
                          ])}
                          onChange={setValue}/>
        </Box>
    );
};
export default Root;