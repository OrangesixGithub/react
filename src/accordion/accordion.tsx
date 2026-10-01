import { Box } from "../box";
import { accordionVariants } from "./variants";
import type { AccordionProps } from "./@types";
import { Accordion as PrimeAccordion, AccordionTab as PrimeAccordionTab } from "primereact/accordion";

/**
 * Componente - `Accordion`
 *
 * Um componente versátil que pode ser utilizado para agrupar conteúdo em lista.
 */
export function Accordion(props: AccordionProps) {
    const styles = accordionVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={props.className}
            css={props.css}
            size={props.size ?? "100"}>
            <PrimeAccordion
                pt={{
                    root: { className: styles.root() },
                    accordiontab: {
                        root: { className: styles.tab() },
                        header: { className: styles.header() },
                        headerAction: { className: styles.headerAction() },
                        headerIcon: { className: styles.headerIcon() },
                        headerTitle: { className: styles.headerTitle() },
                        toggleableContent: { className: styles.toggleableContent() },
                        content: { className: styles.content() },
                        transition: { classNames: "os-accordion-content", timeout: 200 },
                    },
                }}
                activeIndex={props.activeIndex}
                collapseIcon={props.iconExpand}
                expandIcon={props.iconCollapse}
                id={props.id}
                multiple={props.multiple}
                onTabChange={props.onChange}>
                {props.tabs.map((item, index) => (
                    <PrimeAccordionTab
                        className={item.className}
                        disabled={item.disabled}
                        header={item.header}
                        key={index}>
                        <div className={styles.contentBody()}>{item.content}</div>
                    </PrimeAccordionTab>
                ))}
            </PrimeAccordion>
        </Box>
    );
}

Accordion.displayName = "Accordion";
