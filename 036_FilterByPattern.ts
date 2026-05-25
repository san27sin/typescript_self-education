// 036 5.4 Практика FilterByPattern
type NotEmptyString<S> = S extends `` ? false : true

type MatchSegment<PathSegment, PatternSegment> =
    PatternSegment extends '*'
        ? NotEmptyString<PathSegment>
        : PathSegment extends PatternSegment ? true : false

type And<A, B> = A extends true
    ? B extends true
        ? true
        : false
    : false

type MatchPattern<Path, Pattern> =
    Pattern extends `${infer PatternHead}.${infer PatternRest}`
        ? Path extends `${infer PathHead}.${infer PathRest}`
            ? And<
                MatchSegment<PathHead, PatternHead>,
                MatchPattern<PathRest, PatternRest>
            >
            : false
        : MatchSegment<Path, Pattern>

type R2 = MatchSegment<'user.deleted.' | 'book.deleted' | 'user.created' | 'user' | 'user.created.hello', 'user.*.*'>
//   ^? type R2 = "user.deleted." | "book.deleted" …
type R3 = MatchSegment<'user.deleted' | 'book.deleted' | 'user.created' | 'user' | 'user.created.hello.def', 'user.**'>
//   ^? type R3 = "user.**"
type R4 = MatchSegment<'user.deleted' | 'book.deleted' | 'user.created' | 'user' | 'user.created.hello.def', 'user.deleted'>
//   ^? type R4 = "user.deleted"

// задание 7

type FilterMatch<Path, Pattern> = Path | Pattern

type F1 = FilterMatch<'/hello', '/:id'> // hello
type F2 = FilterMatch<'/posts/1' | '/posts/2' | '/posts/3/create', '/posts/:id'> // '/posts/1' | '/posts/2'
type F3 = FilterMatch<'/user/1', '/posts/:id'> // never

type ParseUrlParams<T> = T

type P1 = ParseUrlParams<':id'> // id
type P2 = ParseUrlParams<'posts/:id'> // id
type P3 = ParseUrlParams<'posts/:id/:user'> // id | user

export {}
