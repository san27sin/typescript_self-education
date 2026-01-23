// 012 3.5 template literal

// Мы можем создавать не только конкретные литералы строк,
// Но еще и строковые шаблоны
type Greeting = `Hello, ${string}`

const greeting: Greeting = 'Hello, World!'
const greeting2: Greeting = 'Hello, World!!!'

// Удобно использовать, что бы ограничивать строки определенными паттернами

function absoluteUrl(str: `${`http` | `https`}://${string}`){}

absoluteUrl('https://hello-world')
absoluteUrl('http://hello-world')
// @ts-expect-error
absoluteUrl('wss://hello-world')

// В шаблон мы можем передавать не только `string` но и union литералов
type EventType = 'click' | 'hover' | 'scroll'
type EventHandlerName = `on-${EventType}`

// В результате получим union литералов
const onClick: EventHandlerName = 'on-click'
const onHover: EventHandlerName = 'on-hover'

// Если union будет несколько, то в результате будет union из всех вариантов
type Action = 'create' | 'update' | 'delete'
type Resource = 'user' | 'post' | 'comment'
type ApiEndpoint = `api/${Action}/${Resource}`

const createUserEndpoint: ApiEndpoint = '/api/create/user'
const createPostEndpoint: ApiEndpoint = '/api/update/post'

// Так же typescript предоставляет несколько встроенных хелперов

type U = Uppercase<`Hello world`>
type C = Capitalize<`hello world`>
type L = Lowercase<`Hello world`>
type UC = Uncapitalize<`Hello world`>

// В сочетании с ними можно делать удобные преобразования
type EventHandlerName2 = `on${Capitalize<EventType>}`

// В результате получим union литералов
const onClick2: EventHandlerName2 = 'onClick'
const onHover2: EventHandlerName2 = 'onHover'

// Ограничение типа!
type G<T extends string> = `on${T}`
type G2<T> = `on${T & string}`

// Домашнее задание
type Getter<T extends string> = `on${Capitalize<T>}`

type R = Getter<'create'> // onCreate