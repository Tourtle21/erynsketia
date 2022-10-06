const started = true;

function startGame() {
    switchMap("house", 200, 200);
    createEnemies();
    setInterval(function() {
        movePlayer();
        moveEnemies();
    }, 20);

    document.addEventListener('keypress', function(e) {
        if (e.key == "Enter") {
            if (interaction == 'frontDoor') switchMap("outside", 1400, 49000);
            if (interaction == 'houseDoor') switchMap("house", 200, 0);
        } 
    })
}





if (!started) {
    let activeRace = null;
let race = document.getElementsByClassName('race');
for (let i = 0; i < race.length; i++) {
    race[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-race').length > 0)
        document.getElementsByClassName('active-race')[0].classList.remove('active-race');
        this.classList.add('active-race');
        activeRace = this.innerHTML;
    })
}

let activeWeapon = null;
let weapon = document.getElementsByClassName('weapon');
for (let i = 0; i < weapon.length; i++) {
    weapon[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-weapon').length > 0)
        document.getElementsByClassName('active-weapon')[0].classList.remove('active-weapon');
        this.classList.add('active-weapon');
        activeWeapon = this.innerHTML;
    })
}

let activeSkill = null;
let skill = document.getElementsByClassName('skill');
for (let i = 0; i < skill.length; i++) {
    skill[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-skill').length > 0)
        document.getElementsByClassName('active-skill')[0].classList.remove('active-skill');
        this.classList.add('active-skill');
        activeSkill = this.innerHTML;
    })
}

let activePet = null;
let pet = document.getElementsByClassName('pet');
for (let i = 0; i < pet.length; i++) {
    pet[i].addEventListener('click', function() {
        if (document.getElementsByClassName('active-pet').length > 0)
        document.getElementsByClassName('active-pet')[0].classList.remove('active-pet');
        this.classList.add('active-pet');
        activePet = this.innerHTML;
    })
}

let name = null;
document.getElementById('name').addEventListener('change', function(e) {
    name = e.target.value;
});

let clicked = false;

document.getElementById('start').addEventListener('click', function() {
    if (activeRace != null && activePet != null && activeSkill != null && activeWeapon != null && !clicked && name != null) {
        clicked = true;
        let time = 0;
       let scrollInterval = setInterval(function() {
            time++;
            document.getElementById('scroll').style.opacity = 100 - time + '%';
            if (time > 100) {
                document.getElementById('map').style.display = "block";
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



