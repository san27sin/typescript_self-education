// 035 5.3 Рекурсивный парсинг

export {}

// symbol by symbol parsing
type Split<T,> = T extends `${infer FirstSymbol}${infer Rest}`
    ? [FirstSymbol, ...Split<Rest>]
    : []

type R81 = Split<"abcde">
// ^? type R81 = ['a', 'b', 'c', 'd', 'e']

// не забываем про хвостовую рекурсию
// @ts-expect-error
type R82 = Split<'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'>
// ограничение хвостовой рекурсии на 50 символов

// обход этого ограничения
type Split2<
    T,
    Acc extends unknown[] = [],
> = T extends `${infer FirstSymbol}${infer Rest}`
    ? Split2<Rest, [...Acc, FirstSymbol]>
    : Acc

type R83 = Split2<'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'>

// pattern recursive parsing

type SplitByDot<T> =
    T extends `${infer FirstPart}.${infer Rest}`
        ? [FirstPart, ...SplitByDot<Rest>]
        : [T]

// тут хвостовая не обязательна, так как переполнение стека маловероятно
type R84 = SplitByDot<'user.create.many'>

// написать как делать динамически