export {}

type Todo = {
  id: number,
  text: string,
  completed: boolean
}

type TodoList = [
  {
    id: 1,
    text: 'первый',
    completed: false
  },
  {
    id: 2,
      text: 'второй',
    completed: true
  },
  {
    id: 3,
    text: 'третий',
    completed: false
  }
]

type AddItem<TL extends unknown[], Id extends number, Text extends string> = [...TL, { id: Id, text: Text, completed: false }]

type AddItem2 = AddItem<TodoList, 2, 'привет'>

type RemoveItem<TL extends Todo[] | Todo, Id extends number> = TL extends [infer First, ...infer Rest]
  ? First extends Todo
    ? First['id'] extends Id
      ? RemoveItem<Rest, Id>
      : [First, ...RemoveItem<Rest, Id>]
    : never
  : TL extends [] ? [] : never

type RemoveItem2 = RemoveItem<TodoList, 2>

type UpdateText<TL extends Todo[], Id extends number, Text extends string> = TL extends [infer First, ...infer Rest]
  ? First extends Todo
    ? First['id'] extends Id
      ? [{
        [K in keyof First]: K extends 'text' ? Text : First[K]
      }, ...UpdateText<Rest, Id, Text>]
      : [First, ...UpdateText<Rest, Id, Text>]
    : never
  : [] // базовый случай - пустой кортеж

type UpdateText2 = UpdateText<TodoList, 3, 'changed'>

type ToggleText<TL extends Todo[], Id extends number> = TL extends [infer First, ...infer Rest]
    ? First extends Todo
        ? First['id'] extends Id
            ? [{
              [K in keyof First]: K extends 'completed'
                  ? First['completed'] extends true ? false : true
                  : First[K]
            }, ...ToggleText<Rest, Id>]
            : [First, ...ToggleText<Rest, Id>]
        : never
    : []

type ToggleText2 = ToggleText<TodoList, 3>

type FindById<TL extends Todo[], Id extends number> = TL extends [infer First, ...infer Rest]
    ? First extends Todo
        ? First['id'] extends Id
            ? First
            : FindById<Rest, Id>
        : never
    : never

type FindById2 = FindById<TodoList, 3>

type FilterBy<TL extends Todo[], Key extends keyof Todo, Value extends number | string | boolean> = TL extends [infer First, ...infer Rest]
    ? First extends Todo
        ? First[Key] extends Value
            ? [First, ...FilterBy<Rest, Key, Value>]
            : [...FilterBy<Rest, Key, Value>]
        : []
    : []

type FilterBy2 = FilterBy<TodoList, 'completed', false>
