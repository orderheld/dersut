/** Geschmacksgruppe aus der Intensität (1–5): für den Filter im Shop */
export type Strength = 'mild' | 'medium' | 'strong';
export const strengthOf = (intensity: number): Strength => (intensity <= 3 ? 'mild' : intensity >= 5 ? 'strong' : 'medium');
