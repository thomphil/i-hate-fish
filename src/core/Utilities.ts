const formatNumberWithCommas = (number: number): string => {
    return new Intl.NumberFormat('en-US').format(Math.floor(number));
  };

export { formatNumberWithCommas };