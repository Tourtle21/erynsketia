//============= MAP ============= 

let currentMap = null;
const houseCollision = {'0 0':[[10, 270, 240, 123], [320, 40, 80, 200]]};
const houseInteractions = {frontDoor:[108, 0, 100, 30], selectMage:[290, 50, 30, 50], selectBerserker:[290, 115, 30, 50], selectRogue:[290, 180, 30, 50]};
let outsideCollision = {'0 24':[[1200, 1000, 400, 400]]};
const outsideInteractions = {houseDoor:[1325, 48970, 100, 30]}
let outsideEnemies = {'0 24':[Enemy('0 24', 'blob', 300, 200)]}
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
    speed: 20,
    radius: 25,
    size: 50,
    player: document.getElementById('player'),
    mapX: 0,
    mapY: 0,
    health: 10,
    damage: 1
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