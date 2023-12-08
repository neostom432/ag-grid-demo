import * as A from "fp-ts/lib/Array";
import * as Ord from "fp-ts/lib/Ord";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/function";
import * as N from "fp-ts/lib/number";

export const sortOrd = pipe(
  N.Ord,
  Ord.contramap((data: { sort: number }) => data.sort)
);

export const colorRankOrd = pipe(
  N.Ord,
  Ord.contramap((data: { colorRank: number }) => data.colorRank)
);
export const sizRankOrd = pipe(
  N.Ord,
  Ord.contramap((data: { sizRank: number }) => data.sizRank)
);

export const sortNumRecord = <K extends string>(obj: Record<K, number>, numOrd?: Ord.Ord<number>): Record<K, number> => {
  const ordTuple = Ord.contramap(([, value]: [K, number]) => value)(numOrd || Ord.reverse(N.Ord));
  return pipe(
    R.toArray(obj),
    A.sort(ordTuple),
    A.reduceWithIndex({} as Record<K, number>, (index, acc, [key]) => ({ ...acc, [key]: index + 1 }))
  );
};

export const sortNumTuple = <K extends string>(tuples: [K, number][], numOrd?: Ord.Ord<number>): [K, number][] => {
  const ordTuple = Ord.contramap(([, value]: [K, number]) => value)(numOrd || Ord.reverse(N.Ord));
  return pipe(
    tuples,
    A.sort(ordTuple),
    A.mapWithIndex((index, [key]) => [key, index + 1])
  );
};
