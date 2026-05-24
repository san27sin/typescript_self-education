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
// ^? type R84 = ['user', 'create', 'many']

type SplitBy<T, Pattern extends string = ''> =
    T extends `${infer FirstPart}${Pattern}${infer Rest}`
        ? [FirstPart, ...SplitBy<Rest, Pattern>]
        : [T]

type R85 = SplitBy<'user.create.many', '.'>
// ^?type R85 = ['user', 'create', 'many']

// === String modification ===

// Сначала парсим потом склеиваем через операции со строкой
type StringReverse<T> = T extends `${infer FirstLetter}${infer Rest}`
    ? `${StringReverse<Rest>}${FirstLetter}`
    : T

type R101 = StringReverse<'Value'>
// ^?type R101 = 'eulaV

// Пример snake-case

type SnakeCase<S extends string> = S extends `${infer FirstLetter}${infer Rest}` ?
    Rest extends Uncapitalize<Rest>
        ? `${Lowercase<FirstLetter>}${SnakeCase<Rest>}`
        : `${Lowercase<FirstLetter>}_${SnakeCase<Rest>}`
    : S

type R9 = SnakeCase<`helloWorld`>
// ^?type R9 = 'hello_world'

// задание 1
type Trim<T> = T extends `${infer FirstLetter}${infer Rest}`
    ? FirstLetter extends ' ' ? Trim<Rest> : `${FirstLetter}${Trim<Rest>}`
    : T

type TrimR = Trim<'   Hello world!   '> // "Hello world!"

// решение было по бокам реукрсивно откусывать

type Trim2<T extends string> = T extends ` ${infer Rest}`
    ? Trim2<Rest>
    : T extends `${infer Rest} `
        ? Trim2<Rest>
        : T

type TrimR2 = Trim2<'   Hello world!   '> // "Hello world!"

// задание 2

type ReplaceAll<
    S extends string,
    From extends string,
    To extends string,
> = T

type R = ReplaceAll<'hello world my hello freand', 'hello', 'dear'>
// "dear world my dear freand"

// задание 4 посимвольный обход

type KebabCase<T> = T

type FooBarBaz = KebabCase<"FooBarBaz"> // foo-bar-baz
type DoNothing = KebabCase<"do-nothing"> // do-nothing

// задание 5 обход паттерна

type CamelCase<T> = T

type camelCase1 = CamelCase<'hello_world_with_types'> // helloWorldWithTypes
type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // helloWorldWithTypes
