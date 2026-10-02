import { Box } from "../box";
import { tabviewVariants } from "./variants";
import type { TabViewProps } from "./@types";
import type { TabPanelHeaderTemplateOptions, TabPanelPassThroughMethodOptions, TabViewPassThroughOptions } from "primereact/tabview";
import { TabView as PrimeTabView, TabPanel as PrimeTabPanel } from "primereact/tabview";

/**
 * Componente - `Tabview`
 *
 * Um componente versátil que pode ser utilizado para agrupar conteúdo com guias.
 */
export function Tabview(props: TabViewProps) {
    const styles = tabviewVariants();
    // O PrimeReact 10.9.9 lê o pass through das abas na chave `tabpanel`, que os tipos não declaram.
    const pt = {
        root: { className: styles.root() },
        navContainer: { className: styles.navContainer() },
        navContent: { className: styles.navContent() },
        nav: { className: styles.nav() },
        inkbar: { className: styles.inkbar() },
        panelContainer: { className: styles.panelContainer() },
        tabpanel: {
            header: { className: styles.header() },
            headerAction: { className: styles.headerAction() },
            headerTitle: { className: styles.headerTitle() },
            closeIcon: { className: styles.closeIcon() },
            content: (options: TabPanelPassThroughMethodOptions) => {
                const context = options.context as unknown as { index: number, active: boolean };
                const selected = props.onChange ? context.index === (props.tabIndex ?? 0) : context.active;
                return { className: styles.content({ hidden: !selected }) };
            },
        },
    } as TabViewPassThroughOptions;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            css={props.css}
            size={props.size ?? "100"}>
            <PrimeTabView
                activeIndex={props.tabIndex ?? 0}
                className={props.className}
                id={props.id}
                pt={pt}
                renderActiveOnly={props.tabActiveRender ?? true}
                onTabChange={props.onChange}
                onTabClose={props.onClosed}>
                {props.tabs.map((item, index) => {
                    const icon = item.icon ? `${item.iconPrefix ?? "bi bi-"}${item.icon}` : undefined;
                    const headerTemplate = item.headerTemplate;

                    return (
                        <PrimeTabPanel
                            headerTemplate={headerTemplate && ((options: TabPanelHeaderTemplateOptions) => headerTemplate({
                                ...options,
                                className: styles.headerAction(),
                                titleClassName: styles.headerTitle(),
                            }))}
                            className={"p-tabview-response-" + item.id}
                            closable={item.closed}
                            disabled={item.disabled}
                            header={item.tab}
                            key={index}
                            leftIcon={item.iconPosition !== "right" ? icon : undefined}
                            rightIcon={item.iconPosition === "right" ? icon : undefined}
                            visible={item.visible}>
                            {item.content}
                        </PrimeTabPanel>
                    );
                })}
            </PrimeTabView>
        </Box>
    );
}

Tabview.displayName = "Tabview";
