const formatNumber = (number: number): string => {
  // reduce precision for large numbers
  if (number < 1_000_000) return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number);

  return new Intl.NumberFormat('en-US', {notation: 'scientific', maximumFractionDigits: 2}).format(number);
};

export { formatNumber };