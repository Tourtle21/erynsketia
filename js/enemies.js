
enemyTypes = {
    blob: {
        damage: 5,
        health: 5,
        r: 25
    },
    thief: {
        damage: 3,
        health: 5,
        speed: 6,
        r: 25
    }
}

function moveEnemies() {
    if (movedSquares && Math.floor(Math.random() * 10) == 9) spawnThief();
}

function createEnemies() {
    for (key of Object.keys(outsideEnemies)) {
        for (enemyStats of outsideEnemies[key]) {
            let outside = document.getElementById('outside');
            let enemy = document.createElement('div');
            enemy.style.position = 'absolute';
            enemy.style.left = enemyStats.x + 'px';
            enemy.style.top = enemyStats.y + 'px';
            enemy.style.background = 'red';
            enemy.style.width = enemyStats.r * 2 + 'px';
            enemy.style.height = enemyStats.r * 2 + 'px';
            enemy.style.borderRadius = "50%";
            outside.appendChild(enemy);
        }
    }
}

function spawnThief() {
    let newTheif = {...enemyTypes.thief};
}

function Enemy(coord, name, x, y) {
    const xMult = parseInt(coord.substring(0, coord.indexOf(' ')))
    const yMult = parseInt(coord.substring(coord.indexOf(' ') + 1));
    let newEnemy = {...enemyTypes[name]};
    newEnemy.x = xMult * 2000 + x;
    newEnemy.y = yMult * 2000 + y;
    return newEnemy;
}