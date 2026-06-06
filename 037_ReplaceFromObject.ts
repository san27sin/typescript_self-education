export {}

type ReplaceAll<Str, Pattern, NewValue> = Str extends `${infer Left}${Pattern & string}${infer Right}`
  ? `${Left}${NewValue & string}${ReplaceAll<Right, Pattern, NewValue>}`
  : Str;

type TRA = ReplaceAll<`a.b.c.d`, "a", "c">;

type ReplaceObj = Record<string, string | number | boolean>

// @ts-ignore
type ReplaceObjectValues<Str, Obj extends ReplaceObj, KeysTuple = TuplifyUnion<keyof Obj>> =
  KeysTuple extends [infer Key, ...unknown[]]
    ? ReplaceObjectValues<ReplaceAll<Str, Key, `${Obj[Key & keyof Obj]}`>, Omit<Obj, Key & keyof Obj>>
    : Str

type TROV = ReplaceObjectValues<
  //    ^? type TROV = "(true && false) || (true && (f…
  `(isUser && userCreated) || (userUpdated && (userViewed || true))`,
  { isUser: true; userCreated: false; userUpdated: true; userViewed: false }
>;

type BooleanAlgebra<T, P> = T;
