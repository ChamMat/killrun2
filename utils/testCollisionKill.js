const testCollisionKill = (left, right, y, cibleLeft, cibleRight, cibleY) => {

    const correction = 10

    if ((left + correction > cibleLeft && left - correction < cibleRight) || (right + correction > cibleLeft && right - correction < cibleRight)){
        if (y > cibleY && y < cibleY + 20){
            return true
        }
    }
  
    return false;
}

export default testCollisionKill;