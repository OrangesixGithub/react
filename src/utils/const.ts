import { getMetaContentDocument } from "./core/document";

// Lidos uma vez, no import. Fora do navegador (SSR, testes sem DOM) ficam null.
export const USER: string | null = getMetaContentDocument("auth");
export const BASE: string | null = getMetaContentDocument("react-base");
export const TOKEN: string | null = getMetaContentDocument("csrf-token");

export const MES: Array<{ id: number, name: string }> = [
    { id: 1, name: "Janeiro" },
    { id: 2, name: "Fevereiro" },
    { id: 3, name: "Março" },
    { id: 4, name: "Abril" },
    { id: 5, name: "Maio" },
    { id: 6, name: "Junho" },
    { id: 7, name: "Julho" },
    { id: 8, name: "Agosto" },
    { id: 9, name: "Setembro" },
    { id: 10, name: "Outubro" },
    { id: 11, name: "Novembro" },
    { id: 12, name: "Dezembro" },
];

export const ESTADOS: Array<{ id: string, name: string }> = [
    { name: "Acre", id: "AC" },
    { name: "Alagoas", id: "AL" },
    { name: "Amapá", id: "AP" },
    { name: "Amazonas", id: "AM" },
    { name: "Bahia", id: "BA" },
    { name: "Ceará", id: "CE" },
    { name: "Distrito Federal", id: "DF" },
    { name: "Espírito Santo", id: "ES" },
    { name: "Goiás", id: "GO" },
    { name: "Maranhão", id: "MA" },
    { name: "Mato Grosso", id: "MT" },
    { name: "Mato Grosso do Sul", id: "MS" },
    { name: "Minas Gerais", id: "MG" },
    { name: "Pará", id: "PA" },
    { name: "Paraíba", id: "PB" },
    { name: "Paraná", id: "PR" },
    { name: "Pernambuco", id: "PE" },
    { name: "Piauí", id: "PI" },
    { name: "Rio de Janeiro", id: "RJ" },
    { name: "Rio Grande do Norte", id: "RN" },
    { name: "Rio Grande do Sul", id: "RS" },
    { name: "Rondônia", id: "RO" },
    { name: "Roraima", id: "RR" },
    { name: "Santa Catarina", id: "SC" },
    { name: "São Paulo", id: "SP" },
    { name: "Sergipe", id: "SE" },
    { name: "Tocantins", id: "TO" }
];