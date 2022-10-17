function switchMap(mapName, positionX, positionY) {
    for (let i = 0; i < deadEnemies.length; i++) {
        let cEnemy = deadEnemies[i];
        cEnemy.x = cEnemy.startingX;
        cEnemy.y = cEnemy.startingY;
        cEnemy.speed = enemyTypes[cEnemy.type].speed;
        cEnemy.enemy.style.left = cEnemy.x + 'px';
        cEnemy.enemy.style.top = cEnemy.y + 'px';
        if (cEnemy.type != 'thief') {
             maps[cEnemy.map].enemies[Math.floor(cEnemy.x / 2000) + " " + Math.floor(cEnemy.y / 2000)].push(cEnemy)
             maps[cEnemy.map].element.appendChild(cEnemy.enemy);
        }
        deadEnemies.splice(i, 1);
        i--;
    }
    if (currentMap) {
        currentMap.element.style.display = "none";
        currentMap.element.removeChild(player.player);
        maps[mapName].element.appendChild(player.player);
    }
    currentMap = maps[mapName];
    document.body.style.background = currentMap.background;
    currentMap.element.style.display = "flex";
    currentMap.x = window.innerWidth/2 - currentMap.width/2 + (currentMap.width/2  - positionX);
    currentMap.y = window.innerHeight/2 - currentMap.height/2 + (currentMap.height/2  - positionY);
    player.x = positionX - player.size;
    player.y = positionY - player.size;
    currentMap.element.style.left = currentMap.x + 'px';
    currentMap.element.style.top = currentMap.y + 'px';
    player.player.style.left = player.x + 'px';
    player.player.style.top = player.y + 'px';
}