/** Larguras percentuais aceitas pelos componentes. O hífen representa a casa decimal. */
export type SizeValueProps = "5" | "10" | "12-5" | "15" | "17-5" | "20" | "22-5" | "25" | "30" | "33" | "35" | "40" | "45" | "50" | "55" | "60" | "65" | "70" | "75" | "80" | "85" | "90" | "95" | "100";

/** Larguras aplicadas a partir dos breakpoints padrão do Tailwind. */
export type ResponsiveSizeProps = Partial<Record<"base" | "sm" | "md" | "lg" | "xl" | "2xl", SizeValueProps>>;

/** Largura percentual fixa ou por breakpoint. A largura base padrão é `100`. */
export type SizeProps = SizeValueProps | ResponsiveSizeProps;
