export const formatStrPrice = (price: string | number = 0) => {
  const priceNum = Number(priceToNumber(price));

  if (Number.isNaN(priceNum)) {
    return "NaN";
  }

  return new Intl.NumberFormat("ko", { currency: "KRW" }).format(priceNum);
};

export const priceToNumber = (price: string | number, strict = false) => {
  const res = Number(typeof price === "string" ? price.replaceAll(",", "") : price);
  if (Number.isNaN(res)) {
    if (strict) {
      return NaN;
    }
    return 0;
  }
  return Number(res);
};

export const roundsFormatPrice = (price: number, std: number) => {
  const val = Math.pow(10, std);
  const roundsPrice = Math.round(price / val) * val;
  const len = (roundsPrice + "").length;

  const formatPrice = (roundsPrice + "").substring(0, len - std);
  if (formatPrice === "") return 0;
  return Number(formatPrice);
};
