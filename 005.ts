// 005 2.4 union и intersection

// union
type Events =
  | { type: 'user-created'; data: { name: string } }
  | { type: 'user-deleted'; data: { id: number } }

const e1 = { type: 'user-created' as const, data: { name: 'aasd', additional: 'sdfsdf' } }
const e2 = e1 as Events

function fn1(events: Events) {}

fn1(e1)
fn1(e2)

// intersection
type T1 = { name: string }
type T2 = { value: number }

type Intersection = T1 & T2
const intersection: Intersection = { name: 'Alex', value: 28 }

// что будет если пересечения не сущестует?
type Value = number & string

// будет never
const v: Value = 1 as never

// что если существует поле с несовместимыми типами?
type Obj123 = { value: number } & { value: string }

const v2: Obj123 = {
  // будет never
  value: 1 as never
}