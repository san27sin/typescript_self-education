var point2D = { x: 0, y: 10 };
var point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point) {
    /* сделать что-нибудь */
}
iTakePoint2D(point2D); // полное совпадение - ок
iTakePoint2D(point3D); // дополнительная информация - okay
iTakePoint2D({ x: 0 }); // Ошибка: не хватает `y`
