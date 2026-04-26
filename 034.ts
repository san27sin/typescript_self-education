export {}

// 034 5.2 Простой парсинг

// !!! String parsing !!!

// Если infer идут последовательно то первые infer забирают по одному символу,
// а последний вест остаток включая пустую строку
// паттерн `${any}${any}`

type FirstLetter<T> = T extends `${infer FirstLetter}${infer Rest}`
  ? [FirstLetter, Rest]
  : 'not match!!!'

type FirstLetter2<T> = T extends `${infer FirstLetter}${infer SecondLetter}${infer Rest}`
  ? [FirstLetter, SecondLetter, Rest]
  : 'not match!!!'

type R51 = FirstLetter<'abccv'>
type R52 = FirstLetter<'a'>
type R53 = FirstLetter<''>


// Если infer разделены символом
// То в первый инфер не жадный, а второй жадный
// Каждый infer может быть пустой строкой
type SplitByDot<T> = T extends `${infer FirstSymbol}.${infer Rest}`
  ? [FirstSymbol, Rest]
  : `NotMatch`

type R61 = SplitByDot<'user.create.may'>
type R62 = SplitByDot<'user.'>
type R63 = SplitByDot<'.'>
type R64 = SplitByDot<''>


// Здесь можно использовать ограничения на не пустую строку
type NotEmptyString = `${any}${string}`

type SplitByDot2<T> = T extends `${infer FirstPart extends NotEmptyString}.${infer Rest}`
  ? [FirstPart, Rest]
  : 'Not match'

type R71 = SplitByDot2<`.`>
type R72 = SplitByDot2<`user.`>