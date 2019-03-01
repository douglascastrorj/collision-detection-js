const lineLine = (x1, y1, x2, y2, x3, y3, x4, y4) => {

    const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    intersectionX = x1 + (uA * (x2 - x1));
    intersectionY = y1 + (uA * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return {
            x: intersectionX,
            y: intersectionY

        };
    }
    return false;
}


const lineRect = (x1, y1, x2, y2, rx, ry, rw, rh) => {

    const left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    const right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    const top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    const bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

    if (left || right || top || bottom) {
        return [left, right, top, bottom];
    }
    return false;
}



// LINE/CIRCLE
const lineCircle = (x1, y1, x2, y2, cx, cy, r) => {

    // is either end INSIDE the circle?
    // if so, return true immediately
    const inside1 = pointCircle(x1, y1, cx, cy, r);
    const inside2 = pointCircle(x2, y2, cx, cy, r);
    if (inside1 || inside2) return true;

    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    const len = sqrt((distX * distX) + (distY * distY));

    // get dot product of the line and circle
    const dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);

    // find the closest point on the line
    const closestX = x1 + (dot * (x2 - x1));
    const closestY = y1 + (dot * (y2 - y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    const onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    const distance = Math.sqrt((distX * distX) + (distY * distY));

    if (distance <= r) {
        return {
            x: closestX,
            y: closestY

        };
    }
    return false;
}

// POINT/CIRCLE
const pointCircle = (px, py, cx, cy, r) => {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    const distX = px - cx;
    const distY = py - cy;
    const distance = sqrt((distX * distX) + (distY * distY));

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}

// LINE/POINT
const linePoint = (x1, y1, x2, y2, px, py) => {

    // get distance from the point to the two ends of the line
    const d1 = dist(px, py, x1, y1);
    const d2 = dist(px, py, x2, y2);

    // get the length of the line
    const lineLen = dist(x1, y1, x2, y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    const buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
        return true;
    }
    return false;
}

const log = console.log;

const collision = lineLine(0,0, 1,1 , 0, 0.5, 1, 0);
log(collision);