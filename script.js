const started = false;
let activeRace = 'Argonian';
let activeWeapon = 'dagger';
let activeSkill = 'Magic';
let name = 'Alfonzo';
let townMusic = new Audio('town.wav')
townMusic.loop = true;

document.getElementById('skills').addEventListener('click', function() {
    if (document.getElementById('statPointsScreen').style.display === 'flex') document.getElementById('statPointsScreen').style.display = 'none';
    else document.getElementById('statPointsScreen').style.display = 'flex';
})

let skillButtons = document.getElementsByClassName('statbutton');
for (let i = 0; i < skillButtons.length; i++) {
    skillButtons[i].addEventListener('click', function() {
        if (i === 0) player.maxHealth += 1;
        if (i === 1) player.strength += 1;
        if (i === 2) player.speed += 0.25;
        if (i === 3) player.agility += 1;
        if (i === 4) player.magic += 1;
        if (i === 5) player.perception += 1;
        if (i === 6) player.stealth += 1;
        document.getElementById('agility').innerHTML = player.agility;
        document.getElementById('stealth').innerHTML = player.stealth;
        document.getElementById('strength').innerHTML = player.strength;
        document.getElementById('magic').innerHTML = player.magic;
        document.getElementById('perception').innerHTML = player.perception;
        document.getElementById('health').innerHTML = player.maxHealth - 10;
        document.getElementById('speed').innerHTML = (player.speed - 5) * 4;
        player.skillPoints -= 1;
        if (player.skillPoints == 0) {
            for (let j = 0; j < skillButtons.length; j++) {
                skillButtons[j].style.display = 'none';
            }
        }
    })
}

function startGame() {
    if (activeRace === "Bogling") {
        player.agility += 1;
        player.stealth += 1;
        player.speed += 0.25;
    }
    if (activeRace === "Stalwert") {
        player.speed += 0.25;
        player.agility += 1;
        player.perception += 1;
    }
    if (activeRace === "Burmecian") {
        player.strength += 2;
        player.maxHealth += 1;
    }
    if (activeRace === "Zudunee") {
        player.perception += 2;
        player.agility += 1;
    }
    if (activeRace === "Argonian") {
        player.magic += 2;
        player.maxHealth += 1;
    }
    if (activeSkill === "Speed") player.speed += 0.25;
    else player[activeSkill.toLowerCase()] += 1;
    document.getElementById('agility').innerHTML = player.agility;
    document.getElementById('stealth').innerHTML = player.stealth;
    document.getElementById('strength').innerHTML = player.strength;
    document.getElementById('magic').innerHTML = player.magic;
    document.getElementById('perception').innerHTML = player.perception;
    document.getElementById('health').innerHTML = player.maxHealth - 10;
    document.getElementById('speed').innerHTML = (player.speed - 5) * 4;
    switchMap("house", 200, 200);
    player.player.style.background = `url(./images/${activeRace.toLowerCase()}.png)`;
    player.player.style.backgroundSize = "cover";
    slot1 = activeWeapon.toLowerCase();
    document.getElementsByClassName('slot')[0].style.background = `url(./images/weapons/${activeWeapon.toLowerCase()}.png) 0% 0% / contain no-repeat`;
    document.getElementsByClassName('slot')[0].style.backgroundPosition = 'center';
    document.getElementById('rug-name').innerHTML = `${name}'s`;
    createEnemies();
    setInterval(function() {
        movePlayer();
        moveEnemies();
    }, 20);

    document.addEventListener('keypress', function(e) {
        if (e.key == 'r') {
            if (player.rightWeapon) {
                player.rightWeapon = null;
                document.getElementById('rightHand').style.background = 'none';
            }
        }
        if (e.key == "Enter") {
            if (interaction == 'frontDoor') switchMap("outside", 1400, 49000);
            if (interaction == 'houseDoor') switchMap("house", 200, 0);
            if (interaction == 'selectFirst') {
                if (slot1 && player.rightWeapon) {
                    let otherWeapon = player.rightWeapon;
                    player.rightWeapon = slot1;
                    slot1 = otherWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[0].style.background = `url(./images/weapons/${slot1.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[0].style.backgroundPosition = 'center';
                    equipWeapon(player.rightWeapon);
                }
                else if (slot1) {
                    document.getElementsByClassName('slot')[0].style.background = "none";
                    equipWeapon(slot1);
                    slot1 = null;
                } else if (player.rightWeapon) {
                    slot1 = player.rightWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[0].style.background = `url(./images/weapons/${slot1.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[0].style.backgroundPosition = 'center';
                    player.rightWeapon = null;
                }
            }
            if (interaction == 'selectSecond') {
                if (slot2 && player.rightWeapon) {
                    let otherWeapon = player.rightWeapon;
                    player.rightWeapon = slot2;
                    slot2 = otherWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[1].style.background = `url(./images/weapons/${slot2.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[1].style.backgroundPosition = 'center';
                    equipWeapon(player.rightWeapon);
                }
                else if (slot2) {
                    document.getElementsByClassName('slot')[1].style.background = "none";
                    equipWeapon(slot2);
                    slot2 = null;
                } else if (player.rightWeapon) {
                    slot2 = player.rightWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[1].style.background = `url(./images/weapons/${slot2.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[1].style.backgroundPosition = 'center';
                    player.rightWeapon = null;
                }
            }
            if (interaction == 'selectThird') {
                if (slot3 && player.rightWeapon) {
                    let otherWeapon = player.rightWeapon;
                    player.rightWeapon = slot3;
                    slot3 = otherWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[2].style.background = `url(./images/weapons/${slot3.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[2].style.backgroundPosition = 'center';
                    equipWeapon(player.rightWeapon);
                }
                else if (slot3) {
                    document.getElementsByClassName('slot')[2].style.background = "none";
                    equipWeapon(slot3);
                    slot3 = null;
                } else if (player.rightWeapon) {
                    slot3 = player.rightWeapon;
                    document.getElementById('rightHand').style.background = 'none';
                    document.getElementsByClassName('slot')[2].style.background = `url(./images/weapons/${slot3.toLowerCase()}.png) 0% 0% / contain no-repeat`;
                    document.getElementsByClassName('slot')[2].style.backgroundPosition = 'center';
                    player.rightWeapon = null;
                }
            }
        } 
    })
}





if (!started) {
let race = document.getElementsByClassName('race');
for (let i = 0; i < race.length; i++) {
    race[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-race').length > 0)
        document.getElementsByClassName('active-race')[0].classList.remove('active-race');
        this.classList.add('active-race');
        activeRace = this.innerHTML;
    })
}

let weapon = document.getElementsByClassName('weapon');
for (let i = 0; i < weapon.length; i++) {
    weapon[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-weapon').length > 0)
        document.getElementsByClassName('active-weapon')[0].classList.remove('active-weapon');
        this.classList.add('active-weapon');
        activeWeapon = this.innerHTML;
    })
}

let skill = document.getElementsByClassName('skill');
for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-skill').length > 0)
        document.getElementsByClassName('active-skill')[0].classList.remove('active-skill');
        this.classList.add('active-skill');
        activeSkill = this.innerHTML;
    })
}

// let activePet = null;
// let pet = document.getElementsByClassName('pet');
// for (let i = 0; i < pet.length; i++) {
//     pet[i].addEventListener('click', function() {
//         if (document.getElementsByClassName('active-pet').length > 0)
//         document.getElementsByClassName('active-pet')[0].classList.remove('active-pet');
//         this.classList.add('active-pet');
//         activePet = this.innerHTML;
//     })
// }

document.getElementById('name').addEventListener('change', function(e) {
    name = e.target.value;
});

let clicked = false;

document.getElementById('start').addEventListener('click', function() {
    if (activeRace != null && activeSkill != null && activeWeapon != null && !clicked && name != null) {
        clicked = true;
        let time = 0;
       let scrollInterval = setInterval(function() {
            time++;
            document.getElementById('scroll').style.opacity = 100 - time + '%';
            if (time > 100) {
                document.getElementById('map').style.display = "block";
                townMusic.play();
                startGame();
                clearInterval(scrollInterval);
            }
        }, 30)
    }
}) 
} else {
    document.getElementById('scroll').style.display = 'none';
    document.getElementById('map').style.display = "block";
    startGame();
}



