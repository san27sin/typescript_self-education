// 008 3.1 Операции над типами

export {}

// Generic Type Alias
// Примеры:

type Id = string | number

type Ref<T> = { current: T }

// внутренне это представляется как функция

type Reff = Ref<number>

// С помощью extends мы можем ограничивать параметр типа
// T должен быть assignable { type: string }

type GetEventByType<T extends { type: string }, K extends string> = T & {
  type: K
}

type Events = { type: 'create'; data: 1 } | { type: 'delete', data: 2 }

type R = GetEventByType<Events, 'create'>

// Так же мы можем использовать предыдущие параметры для ограничения следующих

type GetEventByType2<T extends { type: string }, K extends T['type']> = T & {
  type: K
}

type R2 = GetEventByType2<Events, 'delete'>

// Так же мы можем указывать дефолтные значения у параметров

type EventType<K = string, D = unknown> = {
  type: K
  data: D
}

type GetEventByType3<T extends EventType, K extends T['type']> = T & {
  type: K
}

type R3 = GetEventByType3<
  EventType<'create', 1> | EventType<'delete', 2>,
  'create'
>