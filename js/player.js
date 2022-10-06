function moveX(distance) {
    player.x += distance;
    currentMap.x -= distance;
    player.player.style.left = player.x + 'px';
    currentMap.element.style.left = currentMap.x + 'px';
}

function moveY(distance) {
    player.y += distance;
    currentMap.y -= distance;
    player.player.style.top = player.y + 'px';
    currentMap.element.style.top = currentMap.y + 'px';
}

function movePlayer() {
    let speedX = 0;
    let speedY = 0;
    if (keys.w) speedY -= 1;
    if (keys.s) speedY += 1;
    if (keys.d) speedX += 1;
    if (keys.a) speedX -= 1;
    if (Math.abs(speedX) + Math.abs(speedY) > 1) {
        speedX *= (Math.sqrt(2) / 2);
        speedY *= (Math.sqrt(2) / 2);
    }
    
    let mapx = player.mapX;
    let mapy = player.mapY;
    player.mapX = Math.floor(player.x / 2000);
    player.mapY = Math.floor(player.y / 2000);
    if (player.mapX != mapx || player.mapY != mapy) movedSquares = true;
    else movedSquares = false;

    activateInteraction()

    if (checkCollisionX(speedX * player.speed)) moveX(speedX * player.speed);
    if (checkCollisionY(speedY * player.speed)) moveY(speedY * player.speed);

    player.player.style.left = player.x + 'px';
    currentMap.element.style.left = currentMap.x + 'px';
    player.player.style.top = player.y + 'px';
    currentMap.element.style.top = currentMap.y + 'px';
}

function checkCollisionX(distance) {
    if (player.x + distance > currentMap.width - player.size){
        currentMap.x += player.x - (currentMap.width - player.size);
        player.x = currentMap.width - player.size;
        return false;
    } else if (player.x + distance < 0) {
        currentMap.x += player.x - 0;
        player.x = 0;
        return false;
    }
    if (currentMap.collision[player.mapX.toString() + " " + player.mapY]) {
    for (const item of currentMap.collision[player.mapX.toString() + " " + player.mapY]) {
        let itemX = item[0] + (player.mapX * 2000);
        let itemY = item[1] + (player.mapY * 2000);
        let itemWidth = item[2];
        if (player.x + distance < itemX + itemWidth && player.x + player.size + distance > itemX && player.y < itemY + item[3] && player.y + player.size > itemY){
            if (distance > 0) {
                currentMap.x += player.x - (itemX - player.size);
                player.x = itemX - player.size;
            } else if (distance < 0) {
                currentMap.x += player.x - (itemX + itemWidth);
                player.x = itemX + itemWidth;
            }
            return false;
        }
    }
}
    return true;
}

function checkCollisionY(distance) {
    if (player.y + distance > currentMap.height - player.size){
        currentMap.y += player.y - (currentMap.height - player.size);
        player.y = currentMap.height - player.size;
        return false;
    } else if (player.y + distance < 0) {
        currentMap.y += player.y - 0;
        player.y = 0;
        return false;
    }
    if (currentMap.collision[player.mapX.toString() + " " + player.mapY]) {
    for (const item of currentMap.collision[player.mapX.toString() + " " + player.mapY]) {
        let itemX = item[0] + (player.mapX * 2000);
        let itemY = item[1] + (player.mapY * 2000);
        let itemWidth = item[2];
        if (player.x < itemX + itemWidth && player.x + player.size > itemX && player.y + distance < itemY + item[3] && player.y + distance + player.size > itemY){
            if (distance > 0) {
                currentMap.y += player.y - (itemY - player.size);
                player.y = itemY - player.size;
            } else if (distance < 0) {
                currentMap.y += player.y - (itemY + item[3]);
                player.y = itemY + item[3];
            }
            return false;
        }
    }
}
    return true;
}

function activateInteraction() {
    for (key in currentMap.interactions) {
        directions = currentMap.interactions[key];
        if  (player.x < directions[0] + directions[2] && player.x + player.size > directions[0] && player.y < directions[1] + directions[3] && player.y + player.size > directions[1]) {
            if (document.getElementsByClassName('active').length > 0) {
                document.getElementsByClassName('active')[0].classList.remove('active');
            }
            document.getElementById(key).classList.add('active');
            interaction = key;
            return;
        }
    }
    if (document.getElementsByClassName('active').length > 0) {
        interaction = null;
        document.getElementsByClassName('active')[0].classList.remove('active');
    }
}