import * as Webdatarocks from "./webdatarocks";
import { ApiComponentProps } from "../../api";

export interface TablePivotProps extends ApiComponentProps {
    /**
     * Define se vai ser exibido o cabeçalho de opções
     */
    toolbar?: boolean

    /**
     * Define as opções que será exibidas no cabeçalho de opções
     */
    toolbarOptions?: {
        connect?: boolean
        open?: boolean
        save?: boolean
        export?: boolean
        format?: boolean
        options?: boolean
        fields?: boolean
        fullscreen?: boolean
    }

    /**
     * Define a altura do componente de pivot table
     */
    height?: string | number

    /**
     * Define a estrutura de dados do pivot table
     */
    pivotDataSource?: object[]

    /**
     * Define o comportamento do pivot table
     */
    pivotOptions?: Webdatarocks.Options

    /**
     * Define o comportamento das linhas e colunas do pivot table
     */
    pivotSlice?: Webdatarocks.Slice

    /**
     * Realiza a personalização visual dos dados do pivot table
     */
    pivotCustomizeCell?: (cellBuilder: any, cellData: any) => void
}

export interface TablePivotRefProps {
    webdatarocks: Webdatarocks.Ref
}