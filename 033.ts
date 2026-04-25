export {}

// 033 Погружение в шаблонные строки

// !!! String match template !!!

type Match<T, M> = T extends M ? 'match' : 'not match'

type R11 = Match<'', string>

type R12 = Match<'test', string>

// === string in template is any string includes "" ===
type R21 = Match<'a.b', `${string}.${string}`>
type R25 = Match<'', `${string}.${string}`>
type R26 = Match<'.', `${string}.${string}`>

// можно добавить any для указания, что нужно добавить только один символ
type R42 = Match<'', `${any}${string}`>
type R43 = Match<' ', `${any}${string}`>

// но ограничение на точное количество не поставить
type R45 = Match<' ', `${any}${any}`>

// === number string === (внутри строки должен быть тип прописанный)
type R51 = Match<'123', `${number}`>
