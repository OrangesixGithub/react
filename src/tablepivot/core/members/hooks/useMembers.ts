import { useEffect, useMemo, useState } from "react";
import type { TablePivotMembersProps } from "../@types";

/**
 * Hook - `useMembers`
 * Controla o carregamento, a busca e a seleção dos valores do filtro de membros.
 */
export function useMembers(props: TablePivotMembersProps) {
    // Guarda o texto da busca de valores
    const [search, setSearch] = useState("");
    // Guarda os valores selecionados no filtro
    const [selected, setSelected] = useState<Set<string>>(new Set());
    // Guarda os valores do campo; null indica carregamento
    const [members, setMembers] = useState<string[] | null>(null);

    // Indica se todos os valores do campo estão selecionados
    const all = members !== null && selected.size === members.length;

    // Filtra os valores pelo texto da busca, sem diferenciar maiúsculas e minúsculas
    const visible = useMemo(() => {
        const term = search.trim().toLowerCase();
        return (members ?? []).filter(member => member.toLowerCase().includes(term));
    }, [members, search]);

    // Alterna a seleção de um valor
    function toggle(member: string) {
        const next = new Set(selected);
        if (next.has(member)) {
            next.delete(member);
        } else {
            next.add(member);
        }
        setSelected(next);
    }

    // Marca ou desmarca todos os valores encontrados pela busca
    function toggleVisible() {
        const next = new Set(selected);
        const every = visible.every(member => next.has(member));
        visible.forEach(member => every ? next.delete(member) : next.add(member));
        setSelected(next);
    }

    // Aplica os valores selecionados; lista vazia significa que não há restrição
    function apply() {
        props.onApply(!members || all ? [] : members.filter(member => selected.has(member)));
    }

    // Carrega os valores e aplica a seleção inicial ao trocar o campo
    useEffect(() => {
        let cancelled = false;

        props.loadMembers(props.field).then(values => {
            if (cancelled) {
                return;
            }
            const chosen = new Set((props.members ?? []).map(String));
            setMembers(values);
            setSelected(new Set(chosen.size === 0 ? values : values.filter(value => chosen.has(value))));
        }).catch(() => !cancelled && setMembers([]));

        return () => {
            cancelled = true;
        };
    }, [props.field]);

    return { members, selected, search, setSearch, visible, toggle, toggleVisible, apply };
}
