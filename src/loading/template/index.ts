import { LoadingRing } from "./ring";
import { LoadingDots } from "./dots";
import { LoadingBars } from "./bars";
import { LoadingPulse } from "./pulse";
import { LoadingOrbit } from "./orbit";
import type { ComponentType } from "react";
import type { LoadingProps } from "../@types";

/** Indicadores padrão do Loading, selecionados pela prop `type`. */
export const loadingTemplates: Record<NonNullable<LoadingProps["type"]>, ComponentType> = {
    border: LoadingRing,
    grow: LoadingDots,
    bars: LoadingBars,
    pulse: LoadingPulse,
    orbit: LoadingOrbit,
};
