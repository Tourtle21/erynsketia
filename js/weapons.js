let attacking = false;
let mousedown = false;
// let detector = document.createElement('div');
//                 detector.style.height = '5px';
//                 detector.style.width = '5px';
//                 detector.style.background = 'white';
//                 detector.style.borderRadius = '50%';
//                 detector.style.position = 'absolute';
//                 detector.style.zIndex = '5';
//                detector.style.top = player.y + player.radius + multiplier * Math.sin((player.degrees-rot) * (Math.PI / 180)) - 2.5 + 'px';
//detector.style.left = player.x + player.radius + multiplier * Math.cos((player.degrees-rot) * (Math.PI / 180)) - 2.5 + 'px';
//currentMap.element.appendChild(detector);
document.addEventListener('mousedown', function() {
    mousedown = true;
    if (!attacking) {
        if (player.rightWeapon === "spear") useSpear();
        if (player.rightWeapon === "staff" && player.mana > 20) useStaff();
        if (player.rightWeapon === "bow") useBow();
        if (player.rightWeapon === 'sword') useSword();
        if (player.rightWeapon === 'dagger') useDagger();
    }
})
document.addEventListener('mouseup', function() {
    mousedown = false;
})

function getRandomWeapon() {
    let num = Math.floor(Math.random() * 5);
    if (num == 0) return 'staff';
    if (num == 1) return 'dagger';
    if (num == 2) return 'bow';
    if (num == 3) return 'sword';
    if (num == 4) return 'spear';
}
function useDagger () {
    attacking = true;
    let position = 0;
    let amount = 1;
    let daggerDegrees = 45;
    let speed = 15;
    let stab = setInterval(function() {
        let rightHand = document.getElementById('rightHand');
        position += 0.1 * amount;
        rightHand.style.top = position + 'px';
        if (!mousedown) {
            clearInterval(stab);
            let arrowDx = Math.cos((player.degrees - 90) * (Math.PI / 180));
            let arrowDy = Math.sin((player.degrees - 90) * (Math.PI / 180));
            let arrowX =  player.x + player.radius + 30 * Math.cos((player.degrees- 45) * (Math.PI / 180)) - 2.5;
            let arrowY = player.y + player.radius + 30 * Math.sin((player.degrees - 45) * (Math.PI / 180)) - 2.5;
            let getStabbed = setInterval(function() {
                position -= (4 + (player.agility / 4)) * amount;
                rightHand.style.top = position + 'px';
                if (position < -30) amount = -1;
                if (position > 0) {
                    amount = 0;
                    attacking = false;
                    clearInterval(getStabbed);
                }
                if (amount > 0) {
                    arrowX += arrowDx * 5;
                    arrowY += arrowDy * 5;
                    for (let i = 0; i < activeEnemies.length; i++) {
                        cEnemy = activeEnemies[i];
                        if (circleCollision(arrowX, arrowY, 2.5, cEnemy.x, cEnemy.y, cEnemy.r) && cEnemy.hitTimer > 20) {
                            cEnemy.hitTimer = 0;
                            cEnemy.x += -cEnemy.xDirection * 30;
                            cEnemy.y += -cEnemy.yDirection * 30;
                            cEnemy.enemy.style.left = cEnemy.x + 'px';
                            cEnemy.enemy.style.top = cEnemy.y + 'px';
                            speed = 0;
                            cEnemy.health -= (player.damage) + (player.strength/4);
                            if (cEnemy.health <= 0) {
                                activeEnemies.splice(i, 1);
                                deadEnemies.push(cEnemy);
                                player.experience += 1;
                                maps.outside.element.removeChild(cEnemy.enemy);
                                if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                                i--;
                            }
                        }
                    }
                }
                
            }, 20);
        }
        if (position > 5) {
            amount = 0;
            rightHand.style.transform = `rotate(${daggerDegrees}deg)`;
            if (!mousedown) {
                attacking = false;
                rightHand.style.background = 'none';
                player.rightWeapon = null;
                let newArrow = document.createElement('div');
            newArrow.style.height = '40px';
            newArrow.style.width = '22px';
            newArrow.style.background = 'url(../images/weapons/dagger.png)';
            newArrow.style.backgroundSize = 'contain';
            newArrow.style.backgroundRepeat = 'no-repeat';
            newArrow.style.position = 'absolute';
            newArrow.style.zIndex = '5';
            newArrow.style.transform = `rotate(${player.degrees}deg)`
            daggerDegrees = player.degrees+45;
            let arrowY = player.y + player.radius + 20 * Math.sin((player.degrees) * (Math.PI / 180)) - 20;
            let arrowX = player.x + player.radius + 20 * Math.cos((player.degrees) * (Math.PI / 180))
            let arrowDx = Math.cos((player.degrees - 90) * (Math.PI / 180));
            let arrowDy = Math.sin((player.degrees - 90) * (Math.PI / 180));
            newArrow.style.top = arrowY + 'px';
            newArrow.style.left = arrowX + 'px';
            currentMap.element.appendChild(newArrow);
                clearInterval(stab);
                let throwDagger = setInterval(function() {
                    console.log(arrowX + arrowDx * speed)
                    if (speed != 0){
                        if (arrowX + arrowDx * speed >= currentMap.width-20) {speed = 0; arrowX = currentMap.width-20;};
                        if (arrowX + arrowDx * speed <= 0) {speed = 0; arrowX = 0;};
                        if (arrowY + arrowDy * speed >= currentMap.height-20) {speed = 0; arrowY = currentMap.width-20;};
                        if (arrowY + arrowDy * speed <= -10) {speed = 0; arrowY = -10;};
                        if (currentMap.collision[Math.floor(arrowX / 2000) + " " + Math.floor(arrowY / 2000)]) {
                        for (const item of currentMap.collision[Math.floor(arrowX / 2000) + " " + Math.floor(arrowY / 2000)]) {
                            let itemX = item[0] + (Math.floor(arrowX / 2000) * 2000);
                            let itemY = item[1] + (Math.floor(arrowY / 2000) * 2000);
                            let itemWidth = item[2];
                            if (arrowX + arrowDx * speed < itemX + itemWidth && arrowX + 20 + arrowDx * speed> itemX && arrowY < itemY + item[3] && arrowY > itemY){
                                if (arrowDx > 0) {
                                    arrowX = itemX - 20;
                                } else if (arrowDx < 0) {
                                    arrowX = itemX + itemWidth;
                                }
                                speed = 0;
                            } else if (arrowX < itemX + itemWidth && arrowX + 20 > itemX && arrowY + arrowDy * speed < itemY + item[3] && arrowY + arrowDy * speed + 20 > itemY) {
                                if (arrowDy > 0) {
                                    arrowY = itemY - 20;
                                } else if (arrowDy < 0) {
                                    arrowY = itemY + item[3];
                                }
                                speed = 0;
                            }
                        }
                    }
                }
                    arrowX += arrowDx * speed;
                    arrowY += arrowDy * speed;
                    speed /= 1.05;
                    daggerDegrees+= 5 * speed;
                    newArrow.style.top = arrowY + 'px';
                    newArrow.style.left = arrowX +  'px';
                    newArrow.style.transform = `rotate(${daggerDegrees}deg)`
                    if (speed < 1) speed=0;
                // detector.style.top = arrowY +20 -15+ 'px';
                // detector.style.left = arrowX + 11 -15+ 'px';
                let watchTimer = 0;
                if (speed != 0) {
                        for (let i = 0; i < activeEnemies.length; i++) {
                            cEnemy = activeEnemies[i];
                            if (circleCollision(arrowX + 11 - 15, arrowY + 20 - 15, 15, cEnemy.x, cEnemy.y, cEnemy.r)) {
                                cEnemy.x += -cEnemy.xDirection * speed * 20;
                                cEnemy.y += -cEnemy.yDirection * speed * 20;
                                cEnemy.enemy.style.left = cEnemy.x + 'px';
                                cEnemy.enemy.style.top = cEnemy.y + 'px';
                                speed = 0;
                                cEnemy.health -= (player.damage) + (player.strength/4);
                                if (cEnemy.health <= 0) {
                                    activeEnemies.splice(i, 1);
                                    deadEnemies.push(cEnemy);
                                    maps.outside.element.removeChild(cEnemy.enemy);
                                    player.experience += 1;
                                    if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                                    i--;
                                }
                            }
                        }
                    } else if (circleCollision(arrowX + 11 - 15, arrowY + 20 - 15, 15, player.x, player.y, player.radius) && !player.rightWeapon) {
                        equipWeapon('dagger');
                        currentMap.element.removeChild(newArrow);
                        clearInterval(throwDagger);
                    } else {
                        watchTimer ++;
                        if (watchTimer > 2000){
                            currentMap.element.removeChild(newArrow);
                            clearInterval(throwDagger);
                        }
                    }
                }, 20)
            }
        }
    }, 20)
}

function useSword () {
    attacking = true;
    swordDegrees = 0;
    amount = 1;
    let swingSword = setInterval(function() {
        swordDegrees -= (10 + (player.agility / 4)) * amount;
        if (swordDegrees < -125) amount = -1;
        if (swordDegrees >= 0) {clearInterval(swingSword); attacking = false}
        if (amount > 0) {
            let swordX = player.x + player.radius + 50 * Math.cos((player.degrees- 45 +swordDegrees) * (Math.PI / 180)) - 20;
            let swordY = player.y + player.radius + 50 * Math.sin((player.degrees-45 +swordDegrees) * (Math.PI / 180)) - 20;
            for (let i = 0; i < activeEnemies.length; i++) {
                cEnemy = activeEnemies[i];
            if (circleCollision(swordX, swordY, 20, cEnemy.x, cEnemy.y, cEnemy.r) && cEnemy.hitTimer > 20) {
                cEnemy.hitTimer = 0;
                cEnemy.x += -cEnemy.xDirection * 20;
                        cEnemy.y += -cEnemy.yDirection * 20;
                        cEnemy.enemy.style.left = cEnemy.x + 'px';
                        cEnemy.enemy.style.top = cEnemy.y + 'px';
                    cEnemy.health -= (player.damage + (player.strength/4));
                    if (cEnemy.health <= 0) {
                        activeEnemies.splice(i, 1);
                        deadEnemies.push(cEnemy);
                        maps.outside.element.removeChild(cEnemy.enemy);
                        player.experience += 1;
                        if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                        i--;
                    }
            }
        }
        }
        player.extraRotation = swordDegrees;
        player.player.style.transform = `rotate(${player.degrees + player.extraRotation}deg)`
    },20)
}

function useBow () {
    player.speed /=2;
    attacking = true;
    let distance = 0;
    let arrow = document.createElement('div');
    arrow.style.height = '40px';
    arrow.style.width = '5px';
    arrow.style.background = 'saddlebrown';
    arrow.style.position = 'relative';
    arrow.style.zIndex = '5';

    let arrowY = -100;
    arrow.style.top = '-100px';
    arrow.style.left = '22px';
    player.player.appendChild(arrow);
    let pullBack = setInterval(() => {
        if (mousedown && distance < 70) {
            distance += 1 + (player.agility / 10);
            arrowY += 0.5;
            arrow.style.top = arrowY + 'px';
        } else if (!mousedown) {
            attacking = false;
            player.speed *= 2;
            player.player.removeChild(arrow);
            clearInterval(pullBack);
            let newArrow = document.createElement('div');
            newArrow.style.height = '40px';
            newArrow.style.width = '5px';
            newArrow.style.background = 'saddlebrown';
            newArrow.style.position = 'absolute';
            newArrow.style.zIndex = '5';
            newArrow.style.transform = `rotate(${player.degrees}deg)`
            let arrowY = player.y + player.radius + 50 * Math.sin((player.degrees - 90) * (Math.PI / 180)) - 20;
            let arrowX = player.x + player.radius + 50 * Math.cos((player.degrees - 90) * (Math.PI / 180))
            let arrowDx = Math.cos((player.degrees - 90) * (Math.PI / 180));
            let arrowDy = Math.sin((player.degrees - 90) * (Math.PI / 180));
            arrowX -= arrowDx * distance/2;
            arrowY -= arrowDy * distance/2;
            newArrow.style.top = arrowY + 'px';
            newArrow.style.left = arrowX + 'px';
            currentMap.element.appendChild(newArrow);
            
            let speed = 1;
            let shootArrow = setInterval(function() {
                arrowX += arrowDx * distance/6 * speed;
                arrowY += arrowDy * distance/6 * speed;
                speed -= 0.02;
                newArrow.style.top = arrowY + 'px';
                newArrow.style.left = arrowX + 'px';
                if (speed <= 0) {
                    currentMap.element.removeChild(newArrow);
                    clearInterval(shootArrow);
                }

                for (let i = 0; i < activeEnemies.length; i++) {
                    cEnemy = activeEnemies[i];
                if (circleCollision(arrowX + arrowDx *20, arrowY + 17 + arrowDy*20, 2.5, cEnemy.x, cEnemy.y, cEnemy.r)) {
                    currentMap.element.removeChild(newArrow);
                    cEnemy.x += -cEnemy.xDirection * distance;
                        cEnemy.y += -cEnemy.yDirection * distance;
                        cEnemy.enemy.style.left = cEnemy.x + 'px';
                        cEnemy.enemy.style.top = cEnemy.y + 'px';
                    cEnemy.health -= (player.damage + (player.strength/4)) * (distance/20);
                    if (cEnemy.health <= 0) {
                        activeEnemies.splice(i, 1);
                        deadEnemies.push(cEnemy);
                        maps.outside.element.removeChild(cEnemy.enemy);
                        player.experience += 1;
                        if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                        i--;
                    }
                    clearInterval(shootArrow);
                }
            }
            }, 20)
        
        }
    }, 20)
}

function useStaff () {
    player.mana -= 20;
    let radius = 5;
    let fireball = document.createElement('div');
    fireball.style.height = '5px';
    fireball.style.width = '5px';
    fireball.style.background = 'orange';
    fireball.style.borderRadius = '50%';
    fireball.style.position = 'absolute';
    fireball.style.zIndex = '5';
    let fireDy =  Math.sin((player.degrees - 90) * (Math.PI / 180));
    let fireDx = Math.cos((player.degrees - 90) * (Math.PI / 180));
    let fireY = player.y + player.radius + 50 * Math.sin((player.degrees - 90) * (Math.PI / 180)) - 2.5;
    let fireX = player.x + player.radius + 50 * Math.cos((player.degrees - 90) * (Math.PI / 180)) - 2.5
    fireball.style.top = fireY + 'px';
    fireball.style.left = fireX + 'px';
    currentMap.element.appendChild(fireball);
    let shootFireball = setInterval(() => {
        radius ++;
        fireY -= 1/2;
        fireX -= 1/2;
        fireball.style.width = radius + 'px';
        fireball.style.height = radius + 'px';
        fireball.style.left = fireX + 'px';
        fireball.style.top = fireY + 'px';
        for (let i = 0; i < activeEnemies.length; i++) {
            cEnemy = activeEnemies[i];
            if (circleCollision(fireX, fireY, 25, cEnemy.x, cEnemy.y, cEnemy.r)) {
                currentMap.element.removeChild(fireball);
                cEnemy.health -= (player.magic) * (radius / 50);
                if (cEnemy.health <= 0) {
                    activeEnemies.splice(i, 1);
                    deadEnemies.push(cEnemy);
                    player.experience += 1;
                    maps.outside.element.removeChild(cEnemy.enemy);
                    if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                    i--;
                }
                clearInterval(shootFireball);
            }
        }
        if (radius >= 50) {
            clearInterval(shootFireball);
            let moveFireball = setInterval(() => {
                fireX += fireDx * 10;
                fireY += fireDy * 10;
                fireball.style.left = fireX + 'px';
                fireball.style.top = fireY + 'px';
                for (let i = 0; i < activeEnemies.length; i++) {
                    cEnemy = activeEnemies[i];
                    if (circleCollision(fireX, fireY, 25, cEnemy.x, cEnemy.y, cEnemy.r)) {
                        currentMap.element.removeChild(fireball);
                        cEnemy.health -= player.damage + player.magic;
                        if (cEnemy.health <= 0) {
                            activeEnemies.splice(i, 1);
                            deadEnemies.push(cEnemy);
                            player.experience += 1;
                            maps.outside.element.removeChild(cEnemy.enemy);
                            if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                            i--;
                        }
                        clearInterval(moveFireball);
                    }
                }
            }, 20)
        }
    }, 20)
}

function useSpear () {
    attacking = true;
            let position = -10;
            let multiplier = 40;
            let rot = 60;
            let amount = 1;
            let stab = setInterval(() => {
                let rightHand = document.getElementById('rightHand');
                if (amount > 0) {
                rot += 5/12 * (8 + player.agility / 4);
                multiplier += 8 + (player.agility / 4);
                let y = player.y + player.radius + multiplier * Math.sin((player.degrees-rot) * (Math.PI / 180)) - 2.5;
                let x = player.x + player.radius + multiplier * Math.cos((player.degrees-rot) * (Math.PI / 180)) - 2.5;
                for (let i = 0; i < activeEnemies.length; i++) {
                    cEnemy = activeEnemies[i];
                    if (circleCollision(x, y, 2.5, cEnemy.x, cEnemy.y, cEnemy.r) && cEnemy.hitTimer > 5) {
                        cEnemy.hitTimer = 0;
                        amount = -1;
                        cEnemy.x += -cEnemy.xDirection * 40;
                        cEnemy.y += -cEnemy.yDirection * 40;
                        cEnemy.enemy.style.left = cEnemy.x + 'px';
                        cEnemy.enemy.style.top = cEnemy.y + 'px';
                        cEnemy.health -= player.damage + (player.strength/4);
                        if (cEnemy.health <= 0) {
                            activeEnemies.splice(i, 1);
                            deadEnemies.push(cEnemy);
                            player.experience += 1;
                            maps.outside.element.removeChild(cEnemy.enemy);
                            if (Math.random() < 0.25) spawnItem(cEnemy.x, cEnemy.y, getRandomWeapon());
                            i--;
                        }
                    }
                }
                }
                position -= (10 + player.agility / 4) * amount;
                rightHand.style.top = position + 'px';
                if (position < -60) amount *= -1;
                if (position >= -10) {
                    clearInterval(stab);
                    attacking = false;
                }
            }, 20)
}