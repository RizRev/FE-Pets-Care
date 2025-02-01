/**
 * Formats a number into Indonesian Rupiah currency format
 * @param number - The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)
}

/**
 * Formats a number into a simple currency format without currency symbol
 * @param number - The number to format
 * @returns Formatted number string with thousand separators
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('id-ID').format(number)
}
