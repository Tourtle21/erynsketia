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

function loseHealth(damage) {
    if (player.hitTime > 30) {
        player.health -= damage; 
        player.hitTime = 0;
        let time = 100;
            let showRed = setInterval(function() {
                time-= 3;
                document.getElementById('overlay').style.opacity = time + '%';
                if (time <= 0) {
                    clearInterval(showRed);
                }
            }, 10)
        document.getElementById("innerHealth").style.top = 100 - (player.health / player.maxHealth) * 100 + 'px';
        if (player.health <= 0) {
            player.health = player.maxHealth;
            document.getElementById("innerHealth").style.top = 100 - (player.health / player.maxHealth) * 100 + 'px';
            switchMap("house", 200, 200);
        }
    }
}

function movePlayer() {
    if (player.mana < 100) player.mana+= 0.1;
    if (player.experience >= player.levelUp) {
        player.skillPoints += 1;
        player.levelUp *= 1.5;
        player.experience = player.experience - player.levelUp;
        for (let j = 0; j < skillButtons.length; j++) {
            skillButtons[j].style.display = 'block';
        }
    }
    document.getElementById("innerMana").style.top = 100 - player.mana + 'px';
    player.hitTime++;
    let speedX = 0;
    let speedY = 0;
    if (keys.w) speedY -= 1;
    if (keys.s) speedY += 1;
    if (keys.d) speedX += 1;
    if (keys.a) speedX -= 1;

    checkEnemies(speedX, speedY);

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

let equipWeapon = (type) => {
    player.rightWeapon = type;
    let hand = document.getElementById('rightHand');
    if (type == "staff") {
        hand.style.height = "66px";
        hand.style.width = "60px";
        hand.style.position = 'relative';
        hand.style.left = "25px";
        hand.style.transform = "rotate(-45deg)"
    }
    if (type == "dagger") {
        hand.style.height = "40px";
        hand.style.width = "22px";
        hand.style.position = 'relative';
        hand.style.left = "40px";
        hand.style.transform = "rotate(0deg)"
    }
    if (type == "sword") {
        hand.style.height = "60px";
        hand.style.width = "60px";
        hand.style.position = 'relative';
        hand.style.left = "25px";
        hand.style.top = "-30px";
        hand.style.transform = "rotate(0deg)"
    }
    if (type == "spear") {
        hand.style.height = "70px";
        hand.style.width = "60px";
        hand.style.position = 'relative';
        hand.style.left = "40px";
        hand.style.top = "-10px";
        hand.style.transform = "rotate(0deg)"
    }
    if (type == "bow") {
        hand.style.height = "50px";
        hand.style.width = "70px";
        hand.style.position = 'relative';
        hand.style.left = "-10px";
        hand.style.top = "-20px";
        hand.style.transform = "rotate(0deg)"
    }
    hand.style.background = `url(./images/weapons/${type.toLowerCase()}.png) 0% 0% / contain no-repeat`;
}

function spawnItem(x, y, type) {
    let weapon = document.createElement('div');
    if (type == "staff") {
        weapon.style.height = "66px";
        weapon.style.width = "60px";
        weapon.style.position = 'absolute';
        weapon.style.left = "25px";
        weapon.style.transform = "rotate(-45deg)"
    }
    if (type == "dagger") {
        weapon.style.height = "40px";
        weapon.style.width = "22px";
        weapon.style.position = 'absolute';
        weapon.style.left = "40px";
        weapon.style.transform = "rotate(0deg)"
    }
    if (type == "sword") {
        weapon.style.height = "60px";
        weapon.style.width = "60px";
        weapon.style.position = 'absolute';
        weapon.style.left = "25px";
        weapon.style.top = "-30px";
        weapon.style.transform = "rotate(0deg)"
    }
    if (type == "spear") {
        weapon.style.height = "70px";
        weapon.style.width = "60px";
        weapon.style.position = 'absolute';
        weapon.style.left = "40px";
        weapon.style.top = "-10px";
        weapon.style.transform = "rotate(0deg)"
    }
    if (type == "bow") {
        weapon.style.height = "50px";
        weapon.style.width = "70px";
        weapon.style.position = 'absolute';
        weapon.style.left = "-10px";
        weapon.style.top = "-20px";
        weapon.style.transform = "rotate(0deg)"
    }
    weapon.style.left = x + 'px';
    weapon.style.top = y + 'px';
    weapon.style.background = `url(./images/weapons/${type}.png) 0% 0% / contain no-repeat`;
    currentMap.element.appendChild(weapon);
    if (type === 'dagger') {x += 11 - 15; y += 20 - 15, r = 15};
    if (type === 'sword') {x += 30 - 25; y += 30 - 20, r = 25};
    if (type === 'staff') {x +=30 - 25; y += 33 - 20, r = 25};
    if (type === 'bow') {x += 35 - 30; y += 25 - 30, r = 30}
    if (type === 'spear') {x += 35 - 25; y += 30 - 25; r = 25};
    let watchTimer = 0;
    let watchWeapon = setInterval(function() {
        if (watchTimer >= 2000) {
            currentMap.element.removeChild(weapon);
            clearInterval(watchWeapon);
        }
        if (circleCollision(x, y, r, player.x, player.y, player.radius) && player.rightWeapon == null) {
            equipWeapon(type);
            currentMap.element.removeChild(weapon);
            clearInterval(watchWeapon);
        }
    }, 20);
}

document.addEventListener('mousemove', function(e) {
    let xDif = (window.innerWidth / 2) - e.screenX - 25;
    let yDif = (window.innerHeight / 2) - e.screenY + 50;
    let degrees = Math.atan(yDif/xDif) * (180/Math.PI) - 90;
    if (xDif < 0) degrees += 180;
    player.degrees = degrees;
    player.player.style.transform = `rotate(${player.degrees + player.extraRotation}deg)`
})