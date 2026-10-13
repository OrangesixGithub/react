import { pivotAggregations } from "../core/const";
import type { TablePivotAggregation, TablePivotLayout } from "../@types";
import type { PivotLayoutProps, PivotSchema, ViewerConfigUpdate } from "../@types/perspective";

/**
 * Verifica se o tipo da coluna é numérico.
 */
export function configIsNumeric(schema: PivotSchema, field: string) {
    return schema[field] === "integer" || schema[field] === "float";
}

/**
 * Operação padrão do campo: `sum` para números e `count` para os demais tipos.
 */
export function configDefaultAggregation(schema: PivotSchema, field: string): TablePivotAggregation {
    return configIsNumeric(schema, field) ? "sum" : "count";
}

/**
 * Monta o layout a partir das props, descartando campos que não existem nos dados.
 * Sem `values`, soma os campos numéricos que não estão em linhas ou colunas.
 */
export function configLayout(props: PivotLayoutProps, schema: PivotSchema): TablePivotLayout {
    const exists = (field: string) => field in schema;
    const rows = (props.rows ?? []).filter(exists);
    const columns = (props.columns ?? []).filter(field => exists(field) && !rows.includes(field));
    const values = props.values
        ? props.values
            .map(value => typeof value === "string" ? { field: value } : value)
            .filter(value => exists(value.field))
            .map(value => ({
                field: value.field,
                aggregation: value.aggregation ?? configDefaultAggregation(schema, value.field)
            }))
        : Object.keys(schema)
            .filter(field => configIsNumeric(schema, field) && !rows.includes(field) && !columns.includes(field))
            .map(field => ({ field, aggregation: "sum" as const }));
    return {
        rows,
        columns,
        values,
        filters: Object.fromEntries(Object.entries(props.filters ?? {}).filter(([field]) => exists(field))),
        sort: props.sort ?? {},
    };
}

/**
 * Verifica se há campo inteiro em linhas ou colunas (ex.: ano), cujos rótulos não devem ter separador de milhar.
 */
export function configHasIntegerHierarchy(layout: TablePivotLayout, schema: PivotSchema) {
    return [...layout.rows, ...layout.columns].some(field => schema[field] === "integer");
}

/**
 * Converte o layout na configuração do `<perspective-viewer>`.
 *
 * Campos com nome em `labels` viram expressões (`"Região": "\"regiao\""`), para que a grade exiba o nome.
 */
export function configPerspective(layout: TablePivotLayout, schema: PivotSchema, labels: Record<string, string> = {}): ViewerConfigUpdate {
    const expressions: Record<string, string> = {};
    const taken = new Set<string>();
    const quote = (field: string) => `"${field.replace(/"/g, "\\\"")}"`;
    const name = (field: string) => {
        const label = labels[field]?.trim();
        if (!label || label === field || label in schema || taken.has(label)) {
            return field;
        }
        taken.add(label);
        expressions[label] = quote(field);
        return label;
    };

    const group_by = layout.rows.map(name);
    const split_by = layout.columns.map(name);
    const sort: NonNullable<ViewerConfigUpdate["sort"]> = [];
    layout.rows.forEach((field, index) => layout.sort[field] === "desc" && sort.push([group_by[index], "desc"]));
    layout.columns.forEach((field, index) => layout.sort[field] === "desc" && sort.push([split_by[index], "col desc"]));

    // Filtros: campos não textuais são comparados pela versão em texto (expressão `string("campo")`).
    const filter: NonNullable<ViewerConfigUpdate["filter"]> = [];
    Object.entries(layout.filters).forEach(([field, members]) => {
        if (members.length === 0) {
            return;
        }
        let column = field;
        if (schema[field] !== "string") {
            column = `${field} · filtro`;
            expressions[column] = `string(${quote(field)})`;
        }
        filter.push([column, "in", members.map(String)]);
    });

    const values = layout.values.map(value => ({ ...value, column: name(value.field) }));
    return {
        plugin: "Datagrid",
        settings: false,
        title: null,
        group_by,
        split_by,
        columns: values.map(value => value.column),
        aggregates: Object.fromEntries(values.map(value => {
            const option = pivotAggregations.find(item => item.id === value.aggregation);
            const usable = option && (!option.numeric || configIsNumeric(schema, value.field));
            return [value.column, usable ? option.perspective : "count"];
        })),
        // Sem cor calculada pelo plugin: as células herdam a cor do tema e acompanham a troca claro/escuro.
        columns_config: Object.fromEntries(values.map(value => [value.column, { fg_mode: "disabled" }])),
        expressions,
        sort,
        filter,
        group_rollup_mode: "rollup",
        split_rollup_mode: "rollup",
    };
}
