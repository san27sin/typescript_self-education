interface Point2D {
	x: number;
	y: number;
}
interface Point3D {
	x: number;
	y: number;
	z: number;
}
var point2D: Point2D = { x: 0, y: 10 };
var point3D: Point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point: Point2D) {
	/* сделать что-нибудь */
}

iTakePoint2D(point2D); // полное совпадение - ок
iTakePoint2D(point3D); // дополнительная информация - okay
iTakePoint2D({ x: 0 }); // Ошибка: не хватает `y`
