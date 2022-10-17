//============= MAP ============= 
let slot1 = null;
let slot2 = null;
let slot3 = null;
let currentMap = null;
const houseCollision = {'0 0':[[10, 270, 240, 123], [320, 40, 80, 200]]};
const houseInteractions = {frontDoor:[108, 0, 100, 30], selectFirst:[290, 50, 30, 50], selectSecond:[290, 115, 30, 50], selectThird:[290, 180, 30, 50]};
let outsideCollision = {'0 24':[[1200, 1000, 400, 400]]};
const outsideInteractions = {houseDoor:[1325, 48970, 100, 30]}
let outsideEnemies = {'0 24':[Enemy('0 24', 'blob', 300, 200), Enemy('0 24', 'blob', 390, 300), Enemy('0 24', 'blob', 900, 700), Enemy('0 24', 'blob', 800, 600), Enemy('0 24', 'blob',1000, 700)],
                    '0 23': [Enemy('0 23', 'blob', 300, 200), Enemy('0 23', 'blob', 390, 300), Enemy('0 23', 'blob', 900, 700), Enemy('0 23', 'blob', 800, 600), Enemy('0 23', 'blob',1000, 700), Enemy('0 23', 'blob', 1600, 800), Enemy('0 23', 'blob', 1400, 900), Enemy('0 23', 'blob', 1200, 700), Enemy('0 23', 'blob', 1000, 1200), Enemy('0 23', 'blob',1000, 700)],
                    '1 23': [Enemy('1 23', 'blob', 300, 200), Enemy('1 23', 'blob', 390, 300), Enemy('1 23', 'blob', 900, 700), Enemy('1 23', 'blob', 800, 600), Enemy('1 23', 'blob',1000, 700)],
                    '2 23': [Enemy('2 23', 'blob', 300, 200), Enemy('2 23', 'blob', 390, 300), Enemy('2 23', 'blob', 900, 700), Enemy('2 23', 'blob', 800, 600), Enemy('2 23', 'blob',1000, 700)],
                    '0 22': [Enemy('0 22', 'blob', 300, 200), Enemy('0 22', 'blob', 390, 300), Enemy('0 22', 'blob', 900, 700), Enemy('0 22', 'blob', 800, 600), Enemy('0 22', 'blob',1000, 700)],
                    '0 22':[],
                    '2 24':[]
}
for (let i = 0; i < 40; i++) {
    outsideEnemies['0 22'].push(Enemy('0 22', 'blob', 50 * i, 50 * i));
    outsideEnemies['1 23'].push(Enemy('1 23', 'blob', 50 * i, 50 * i));
    outsideEnemies['2 24'].push(Enemy('2 24', 'blob', 50 * i, 50 * i));
}
const maps = {
    house: {
        height: 400,
        width: 400,
        startingX: 200,
        startingY: 200,
        element: document.getElementById('house'),
        collision: houseCollision,
        interactions: houseInteractions,
        indexX: 0,
        indexY: 0,
        background: 'black',
        enemies: {},
    },
    outside: {
        height: 50000,
        width: 50000,
        startingX: 25000,
        startingY: 25000,
        collision: outsideCollision,
        interactions: outsideInteractions,
        element: document.getElementById('outside'),
        indexX: 0,
        indexY: 0,
        background:"#006994",
        enemies: outsideEnemies,
    }
}

//============= PLAYER ============= 
let interaction = null;

let player = {
    x: 0,
    y: 0,
    speed: 5,
    radius: 25,
    size: 50,
    player: document.getElementById('player'),
    mapX: 0,
    mapY: 0,
    maxHealth: 10,
    health: 10,
    damage: 1,
    hitTime:100,
    rightWeapon: null,
    strength: 0,
    agility: 0,
    stealth: 0,
    magic: 0,
    perception: 0,
    mana: 100,
    extraRotation: 0,
    experience: 0,
    levelUp: 2,
    skillPoints: 0,
}

let movedSquares = false;

//=========== KEYS ================
let keys = [];
document.addEventListener('keydown', (e) => keys[e.key]=true);
document.addEventListener('keyup', (e) => keys[e.key]=false);
//============ INTERACTIONS ==================
interactionFunctions = {
    frontDoor: function() {

    }
}

//=========== ENEMIES =================

let activeEnemies = [];
let deadEnemies = [];
let returningEnemies = [];