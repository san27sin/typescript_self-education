export {}

type Or<Left, Right> = Left extends false ? Right extends false ? false : true : true
type And<Left, Right> = Left extends true ? Right extends true ? true : false : false
type Not<Left> = Left extends false ? true : false

type BooleanAlgebraStr<Str> =
	Str extends `${infer Left}||${infer Right}` ? Or<BooleanAlgebraStr<Left>, BooleanAlgebraStr<Right>>
		: Str extends `${infer Left}&&${infer Right}` ? And<BooleanAlgebraStr<Left>, BooleanAlgebraStr<Right>>
			: Str extends `!${infer V}` ? Not<BooleanAlgebraStr<V>>
				: Str extends `${infer V extends boolean}` ? V
					: never

type TBAS = BooleanAlgebraStr<"!false&&false">
//   ^? type TBAS = false
type TBAS2 = BooleanAlgebraStr<"false">
//   ^? type TBAS2 = false
type TBAS3 = BooleanAlgebraStr<"!true">
//   ^? type TBAS3 = false