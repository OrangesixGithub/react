/**
 * Gera a hash como identificado unico do tooltip
 */
export function tooltipHash(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash = "";
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        hash += chars.charAt(randomIndex);
    }
    return hash;
}