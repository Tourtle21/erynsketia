function switchMap(mapName, positionX, positionY) {
    if (currentMap) {
        currentMap.element.style.display = "none";
        currentMap.element.removeChild(player.player);
        maps[mapName].element.appendChild(player.player);
    }
    currentMap = maps[mapName];
    document.body.style.background = currentMap.background;
    currentMap.element.style.display = "block";
    currentMap.x = window.innerWidth/2 - currentMap.width/2 + (currentMap.width/2  - positionX);
    currentMap.y = window.innerHeight/2 - currentMap.height/2 + (currentMap.height/2  - positionY);
    player.x = positionX - player.size;
    player.y = positionY - player.size;
    currentMap.element.style.left = currentMap.x + 'px';
    currentMap.element.style.top = currentMap.y + 'px';
    player.player.style.left = player.x + 'px';
    player.player.style.top = player.y + 'px';
}