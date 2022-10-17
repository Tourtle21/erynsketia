
enemyTypes = {
    blob: {
        damage: 5,
        health: 5,
        speed: 0.25,
        r: 25,
        knockBack: 50,
        powerSpeed: 100,
        activePowerTime: 20,
        attackDistance: 500,
        background: "../images/enemies/slime.png",
        jumpDx: 0,
        jumpDy: 0,
    },
    thief: {
        damage: 3,
        health: 5,
        speed: 6,
        knockBack: 20,
        r: 25,
        powerSpeed: 100,
        activePowerTime: 20,
        background: "../images/enemies/theif.png",
        attackDistance: 1000
    }
}

function moveEnemies() {
    if (movedSquares && Math.floor(Math.random() * 10) < 9 && currentMap.element.id == 'outside') spawnThief();
    moveActiveEnemies();
    moveReturningEnemies();
}

function moveReturningEnemies() {
    for (let i = 0; i < returningEnemies.length; i++) {
        let cEnemy = returningEnemies[i];
        let difY = cEnemy.y + cEnemy.r - (cEnemy.startingY + cEnemy.r);
        let difX = cEnemy.x + cEnemy.r - (cEnemy.startingX + cEnemy.r);
        let xDirection =  Math.cos(Math.atan(difY/difX));
        let yDirection = Math.sin(Math.atan(difY/difX));
        if (difX > 0) {
            xDirection *= -1;
            yDirection *= -1;
        }
        if (currentMap.element.id != cEnemy.map) {cEnemy.x += xDirection * 10;cEnemy.y += yDirection * 10;}
        cEnemy.x += xDirection * cEnemy.speed;
        cEnemy.y += yDirection * cEnemy.speed;
        let degrees = Math.atan(yDirection/xDirection) * (180/Math.PI) + 90;
        if (xDirection < 0) degrees += 180;
        cEnemy.enemy.style.transform = `rotate(${degrees}deg)`
        cEnemy.enemy.style.left = cEnemy.x + 'px';
        cEnemy.enemy.style.top = cEnemy.y + 'px';
        if (Math.abs(cEnemy.x - cEnemy.startingX) < cEnemy.speed && Math.abs(cEnemy.y - cEnemy.startingY) < cEnemy.speed) {
            if (cEnemy.type == "thief") maps.outside.element.removeChild(cEnemy.enemy);
            else maps[cEnemy.map].enemies[Math.floor(cEnemy.x / 2000) + " " + Math.floor(cEnemy.y / 2000)].push(cEnemy);
            cEnemy.health = enemyTypes[cEnemy.type].health;
            returningEnemies.splice(i, 1);
            i--;
        }
        else if (circleCollision(player.x, player.y, player.radius, cEnemy.x, cEnemy.y, cEnemy.r, cEnemy.attackDistance - (player.stealth * 10))) {
            activeEnemies.push(cEnemy);
            returningEnemies.splice(i, 1);
            i--;
        }
    }
}

function moveActiveEnemies() {
    for (let i = 0; i < activeEnemies.length; i++) {
        let cEnemy = activeEnemies[i];
        cEnemy.hitTimer++;
        let difY = cEnemy.y + cEnemy.r - (player.y + player.radius);
        let difX = cEnemy.x + cEnemy.r - (player.x + player.radius);
        let xDirection = Math.cos(Math.atan(difY/difX));
        let yDirection = Math.sin(Math.atan(difY/difX));
        if (cEnemy.activePower == 0) cEnemy.loadPower ++;
        else cEnemy.activePower ++;
        if (cEnemy.activePower > cEnemy.activePowerTime) {
            cEnemy.activePower = 0;
            if (cEnemy.type == 'blob') cEnemy.speed /= 40;
        }
        if (cEnemy.loadPower > cEnemy.powerSpeed) {
            cEnemy.loadPower = 0;
            cEnemy.activePower += 1;
            if (cEnemy.type == 'blob') cEnemy.speed *= 40;
        }
        if (difX > 0) {
            xDirection *= -1;
            yDirection *= -1;
        }
        if (cEnemy.type == 'blob' && cEnemy.activePower == 0) {
            cEnemy.jumpDx = xDirection;
            cEnemy.jumpDy = yDirection;
        }
        if (cEnemy.type == 'blob') {
            xDirection = cEnemy.jumpDx;
            yDirection = cEnemy.jumpDy;
        }
        if (maps[cEnemy.map].collision[Math.floor(cEnemy.x / 2000) + " " + Math.floor(cEnemy.y / 2000)]) {
        for (const item of maps[cEnemy.map].collision[Math.floor(cEnemy.x / 2000) + " " + Math.floor(cEnemy.y / 2000)]) {
            let itemX = item[0] + (Math.floor(cEnemy.x / 2000) * 2000);
            let itemY = item[1] + (Math.floor(cEnemy.y / 2000) * 2000);
            let itemWidth = item[2];
            if (cEnemy.x + xDirection * cEnemy.speed < itemX + itemWidth && cEnemy.x + cEnemy.r*2 + xDirection * cEnemy.speed> itemX && cEnemy.y < itemY + item[3] && cEnemy.y + cEnemy.r*2 > itemY){
                if (xDirection > 0) {
                    cEnemy.x = itemX - cEnemy.r*2;
                } else if (xDirection < 0) {
                    cEnemy.x = itemX + itemWidth;
                }
                if (yDirection > 0) yDirection += Math.abs(xDirection);
                else yDirection += -Math.abs(xDirection);
                xDirection = 0;
            } else if (cEnemy.x < itemX + itemWidth && cEnemy.x + cEnemy.r*2 > itemX && cEnemy.y + yDirection * cEnemy.speed < itemY + item[3] && cEnemy.y + yDirection * cEnemy.speed + cEnemy.r*2 > itemY) {
                if (yDirection > 0) {
                    cEnemy.y = itemY - cEnemy.r*2;
                } else if (yDirection < 0) {
                    cEnemy.y = itemY + item[3];
                }
                if (xDirection > 0) xDirection += Math.abs(yDirection);
                else xDirection += -Math.abs(yDirection);
                yDirection = 0;
            }
        }
        }
        cEnemy.x += xDirection * cEnemy.speed;
        cEnemy.y += yDirection * cEnemy.speed;
        cEnemy.xDirection = xDirection;
        cEnemy.yDirection = yDirection;
        
        if (circleCollision(player.x, player.y, player.radius, cEnemy.x, cEnemy.y, cEnemy.r)) {
            player.x += xDirection * cEnemy.knockBack;
            player.y += yDirection * cEnemy.knockBack;
            currentMap.x -= xDirection * cEnemy.knockBack;
            currentMap.y -= yDirection * cEnemy.knockBack;
            loseHealth(cEnemy.damage);
        }
        cEnemy.enemy.style.left = cEnemy.x + 'px';
        cEnemy.enemy.style.top = cEnemy.y + 'px';
        let degrees = Math.atan(yDirection/xDirection) * (180/Math.PI) + 90;
        if (xDirection < 0) degrees += 180;
        cEnemy.enemy.style.transform = `rotate(${degrees}deg)`
        if (!circleCollision(player.x, player.y, player.radius, cEnemy.x, cEnemy.y, cEnemy.r, cEnemy.attackDistance)) {
            returningEnemies.push(cEnemy);
            activeEnemies.splice(i, 1);
            i--;
        }
    }
}

function createEnemies() {
    for (key of Object.keys(outsideEnemies)) {
        for (enemyStats of outsideEnemies[key]) {
            let outside = document.getElementById('outside');
            createEnemy(outside, enemyStats)
        }
    }
}

function createEnemy(mapEl, enemyStats) {
    let enemy = document.createElement('div');
    enemy.style.position = 'absolute';
    enemy.style.left = enemyStats.x + 'px';
    enemy.style.top = enemyStats.y + 'px';
    enemy.style.background = 'red';
    enemy.style.width = enemyStats.r * 2 + 'px';
    enemy.style.height = enemyStats.r * 2 + 'px';
    enemy.style.background = `url(${enemyStats.background})`;
    enemy.style.backgroundSize = "cover";
    enemyStats.map = 'outside';
    enemyStats.enemy = enemy;
    mapEl.appendChild(enemy);
    return enemyStats;
}

function checkEnemies(speedX, speedY) {
    let currentEnemies = currentMap.enemies[player.mapX + " " + player.mapY];
    if (currentEnemies) {
        pushActiveEnemy(currentEnemies);
    }
    if (speedX != 0 && currentMap.enemies[player.mapX + speedX + " " + player.mapY]) {
        pushActiveEnemy(currentMap.enemies[player.mapX + speedX + " " + player.mapY]);
    }
    if (speedY != 0 && currentMap.enemies[player.mapX + " " + player.mapY + speedY]) {
        pushActiveEnemy(currentMap.enemies[player.mapX + " " + player.mapY + speedY])
    }
}

function pushActiveEnemy(currentEnemies) {
    for (let i = 0; i < currentEnemies.length; i++) {
        cEnemy = currentEnemies[i];
        a = player.radius + cEnemy.r + cEnemy.attackDistance;
        x = player.x + player.radius - (cEnemy.x + cEnemy.r);
        y = player.y + player.radius - (cEnemy.y + cEnemy.r);
        if (a > Math.sqrt((x * x) + (y * y))) {
            activeEnemies.push(cEnemy);
            currentEnemies.splice(i, 1);
            i--;
        }
    }
}

function circleCollision(x1, y1, r1, x2, y2, r2, extra=0) {
    a = r1 + r2 + extra;
    x = x1 + r1 - (x2 + r2);
    y = y1 + r1 - (y2 + r2);
    return a > Math.sqrt((x * x) + (y * y));
}

function spawnThief() {
    let time = 0;
    let newThief = Enemy(player.mapX + " " + player.mapY, 'thief', Math.random() * 2000, Math.random() * 2000);
    newThief = createEnemy(currentMap.element, newThief);
    let spawnTimer = setInterval(function() {
        time += 0.25;
        newThief.enemy.style.opacity = time + '%';
        if (time >= 100) {
            activeEnemies.push(newThief);
            clearInterval(spawnTimer);
        }
    })
}


function Enemy(coord, name, x, y) {
    const xMult = parseInt(coord.substring(0, coord.indexOf(' ')))
    const yMult = parseInt(coord.substring(coord.indexOf(' ') + 1));
    let newEnemy = {...enemyTypes[name]};
    newEnemy.x = xMult * 2000 + x;
    newEnemy.y = yMult * 2000 + y;
    newEnemy.startingX = newEnemy.x;
    newEnemy.startingY = newEnemy.y;
    newEnemy.xDirection = 0;
    newEnemy.yDirection = 0;
    newEnemy.loadPower = 0;
    newEnemy.activePower = 0;
    newEnemy.type = name;
    newEnemy.hitTimer = 0;
    return newEnemy;
}