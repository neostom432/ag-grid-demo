/**
 *
 * @returns 매장 일정 관리에서 일정 유형에 따라 일 선택/기간 선택 체크하여 "date" 혹은 "range" 반환
 */

export default function checkDateType(type: string | undefined) {
  if (type === "A" || type === "B" || type === "C") return "date";
  else return "range";
}
