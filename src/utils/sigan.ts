import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

// 주의 시작을 월요일로 봐야하기 때문에 extend
dayjs.extend(isoWeek);

export type SiganConfigType = number | string | Date | Sigan | null | undefined;

export type DayOfTheWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export function sigan(date?: SiganConfigType): Sigan;
export function sigan(year: number, monthIndex: number, day?: number, hours?: number, minutes?: number, seconds?: number): Sigan;
export function sigan(dateOrYear: SiganConfigType, monthIndex?: number, day?: number, hours?: number, minutes?: number, seconds?: number): Sigan {
  if (typeof dateOrYear === "number" && typeof monthIndex === "number") {
    return new Sigan(new Date(dateOrYear, monthIndex, day, hours, minutes, seconds));
  }

  if (dateOrYear instanceof Sigan) {
    return dateOrYear.clone();
  }
  return new Sigan(dateOrYear);
}

const dayjsToSigan = (d: dayjs.Dayjs) => new Sigan(d.toDate());
const siganConfigToDayjsCompatible = (s: SiganConfigType) => (s instanceof Sigan ? s.toDate() : s);
export class Sigan {
  private $d;
  constructor(date?: Exclude<SiganConfigType, Sigan>) {
    this.$d = dayjs(date);
  }
  /**
   * 새로운 Sigan를 반환합니다.
   */
  clone(): Sigan {
    return new Sigan(this.$d.toDate());
  }

  /**
   * JS native Date 타입으로 반환합니다
   */
  toDate(): Date {
    return this.$d.toDate();
  }
  /**
   * 날짜를 입력한 template에 맞게 string으로 반환합니다.
   * default template은 YYYY-MM-DD 형태입니다
   *
   * 자세한 사용법은 https://day.js.org/docs/en/display/format을 참고하세요
   */
  format(template = "YYYY-MM-DD"): string {
    return this.$d.format(template);
  }
  /**
   * 유효한 날짜인지 여부를 나타내는 boolean 값을 반환합니다.
   * ```
   * sigan().isValid()// => boolean
   * ```
   * Docs: https://day.js.org/docs/en/parse/is-valid
   */
  isValid(): boolean {
    return this.$d.isValid();
  }
  /**
   * unit에 해당하는 가장 첫번째 날로 새로운 Sigan 객체를 반환합니다
   * ```
   * sigan().startOf('year')// => Sigan
   * ```
   * Docs: https://day.js.org/docs/en/manipulate/start-of
   */
  startOf(unit: dayjs.OpUnitType | "isoWeek"): Sigan {
    return dayjsToSigan(this.$d.startOf(unit));
  }
  /**
   * unit에 해당하는 가장 마지막 날로 새로운 Sigan 객체를 반환합니다
   * ```
   * sigan().startOf('year')// => Sigan
   * ```
   * Docs: https://day.js.org/docs/en/manipulate/start-of
   */
  endOf(unit: dayjs.OpUnitType | "isoWeek"): Sigan {
    return dayjsToSigan(this.$d.endOf(unit));
  }
  /**
   * 제공한 Date와 비교하여 같은 날짜인지 boolean 값으로 반환합니다.
   * ```
   * sigan().isSame(sigan('2011-01-01')) // default milliseconds
   * ```
   * ms 비교가 아닌 다른 기준으로 비교하고 싶다면 두번째 인자에 unit값을 넣어주세요.
   * ```
   * sigan().isSame('2011-01-01', 'year')// => boolean
   * ```
   * Docs: https://day.js.org/docs/en/query/is-same
   */
  isSame(date?: SiganConfigType, unit?: dayjs.OpUnitType | "isoWeek"): boolean {
    return this.$d.isSame(siganConfigToDayjsCompatible(date), unit);
  }
  /**
   * 제공한 Date와 비교하여 이후의 날짜인지 boolean 값으로 반환합니다
   * ```
   * sigan().isAfter(sigan('2011-01-01')) // default milliseconds
   * ```
   * ms 비교가 아닌 다른 기준으로 비교하고 싶다면 두번째 인자에 unit값을 넣어주세요.
   * ```
   * sigan().isAfter('2011-01-01', 'year')// => boolean
   * ```
   *
   * Docs: https://day.js.org/docs/en/query/is-after
   */
  isAfter(date?: SiganConfigType, unit?: dayjs.OpUnitType | "isoWeek"): boolean {
    return this.$d.isAfter(siganConfigToDayjsCompatible(date), unit);
  }
  /**
   * 제공한 Date와 비교하여 이전의 날짜인지 boolean 값으로 반환합니다
   * ```
   * sigan().isBefore(sigan('2011-01-01')) // default milliseconds
   * ```
   * ms 비교가 아닌 다른 기준으로 비교하고 싶다면 두번째 인자에 unit값을 넣어주세요.
   * ```
   * sigan().isBefore('2011-01-01', 'year')// => boolean
   * ```
   *
   * Docs: https://day.js.org/docs/en/query/is-before
   */
  isBefore(date?: SiganConfigType, unit?: dayjs.OpUnitType | "isoWeek"): boolean {
    return this.$d.isBefore(siganConfigToDayjsCompatible(date), unit);
  }
  /**
   * Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.
   *
   * In general:
   * ```
   * sigan().set(unit, value) === sigan()[unit](value)
   * ```
   * Units are case insensitive, and support plural and short forms.
   * ```
   * sigan().set('date', 1)
   * sigan().set('month', 3) // April
   * sigan().set('second', 30)
   * ```
   * Docs: https://day.js.org/docs/en/get-set/set
   */
  set(unit: dayjs.UnitType, value: number): Sigan {
    return dayjsToSigan(this.$d.set(unit, value));
  }
  /**
   * String getter, returns the corresponding information getting from Day.js object.
   *
   * In general:
   * ```
   * sigan().get(unit) === sigan()[unit]()
   * ```
   * Units are case insensitive, and support plural and short forms.
   * ```
   * sigan().get('year')
   * sigan().get('month') // start 0
   * sigan().get('date')
   * ```
   * Docs: https://day.js.org/docs/en/get-set/get
   */
  get(unit: dayjs.UnitType): number {
    return this.$d.get(unit);
  }
  /**
   * Returns a cloned Day.js object with a specified amount of time added.
   * ```
   * sigan().add(7, 'day')// => Sigan
   * ```
   * Units are case insensitive, and support plural and short forms.
   *
   * Docs: https://day.js.org/docs/en/manipulate/add
   */
  add(value: number, unit?: dayjs.ManipulateType): Sigan {
    return dayjsToSigan(this.$d.add(value, unit));
  }
  /**
   * Returns a cloned Day.js object with a specified amount of time subtracted.
   * ```
   * sigan().subtract(7, 'year')// => Sigan
   * ```
   * Units are case insensitive, and support plural and short forms.
   *
   * Docs: https://day.js.org/docs/en/manipulate/subtract
   */
  subtract(value: number, unit?: dayjs.ManipulateType): Sigan {
    return dayjsToSigan(this.$d.subtract(value, unit));
  }
  /**
   * This indicates the difference between two date-time in the specified unit.
   *
   * To get the difference in milliseconds, use `pareDate#diff`
   * ```
   * const date1 = pareDate('2019-01-25')
   * const date2 = pareDate('2018-06-05')
   * date1.diff(date2) // 20214000000 default milliseconds
   * date1.diff() // milliseconds to current time
   * ```
   *
   * To get the difference in another unit of measurement, pass that measurement as the second argument.
   * ```
   * const date1 = pareDate('2019-01-25')
   * date1.diff('2018-06-05', 'month') // 7
   * ```
   * Units are case insensitive, and support plural and short forms.
   *
   * Docs: https://day.js.org/docs/en/display/difference
   */
  diff(date?: SiganConfigType, unit?: dayjs.QUnitType | dayjs.OpUnitType, float?: boolean): number {
    return this.$d.diff(siganConfigToDayjsCompatible(date), unit, float);
  }
  /**
   * 해당 달에 속한 총 날의 개수를 반환합니다
   * ```
   * sigan('2019-01-25').daysInMonth() // 31
   * ```
   * Docs: https://day.js.org/docs/en/display/days-in-month
   */
  daysInMonth(): number {
    return this.$d.daysInMonth();
  }
  /**
   * 날짜를 한글 string으로 변환합니다.
   * ```
   * dateStyle: "full" // '2022년 3월 8일 화요일'
   * dateStyle: "long" // '2022년 3월 8일'
   * dateStyle: "medium" // '2022. 3. 8.'
   * dateStyle: "short" // '22. 3. 8.'
   * ```
   */
  toKRFormat(dateStyle: "long" | "full" | "medium" | "short" = "long"): string {
    return new Intl.DateTimeFormat("ko", { dateStyle }).format(this.$d.toDate());
  }
  /**
   * 요일을 반환합니다.
   * ```
   * sigan('2023-08-08').getDayOfTheWeek() // tuesday
   * ```
   */
  getDayOfTheWeek(): DayOfTheWeek {
    switch (this.$d.day()) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      case 6:
        return "saturday";
    }
    return "sunday";
  }
}
