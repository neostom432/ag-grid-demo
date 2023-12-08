export const itmToLabel = <T extends { itmCd: string; itmNm: string }>({ itmCd, itmNm }: T) => `${itmCd}: ${itmNm}`;
