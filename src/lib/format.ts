/**
 * Formats a number as Argentine pesos: $12.345,67
 */
export function formatCurrency(value: number): string {
  const fixed = value.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$${withDots},${decPart}`;
}

/**
 * Short currency without decimals: $12.345
 */
export function formatCurrencyShort(value: number): string {
  const rounded = Math.round(value);
  const withDots = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$${withDots}`;
}
