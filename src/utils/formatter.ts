export const toPercentage = (value = 0, options?: Intl.NumberFormatOptions) =>
  value.toLocaleString(undefined, {
    ...options,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 1,
    style: "percent",
  });
