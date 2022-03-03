// util functions
const on = "addEventListener";
const query = s => document.body.querySelector(s);
const query_all = s => document.body.querySelectorAll(s);
const gebid = id => document.getElementById(id);

// Choices enum
const Choices = {
    Rock: "rock",
    Paper: "paper",
    Scissors: "scissors",
    FourLegged: "four_legged",
    PrettyFace: "pretty_face"
};
Object.freeze(Choices);

const rules = [
    [0, -1, 1, 1, -1],
    [1, 0, -1, -1, 1],
    [-1, 1, 0, 1, -1],
    [-1, 1, -1, 0, 1],
    [1, -1, 1, -1, 0]
];

const to_numerical_choice = (choice) => {
    switcher = {
        [Choices.Rock]: 0,
        [Choices.Paper]: 1,
        [Choices.Scissors]: 2,
        [Choices.FourLegged]: 3,
        [Choices.PrettyFace]: 4
    }
    return switcher[choice]
}

const to_pretty_text = (value) => {
    switcher = {
        [Choices.Rock]: "Rock",
        [Choices.Paper]: "Paper",
        [Choices.Scissors]: "Scissors",
        [Choices.FourLegged]: "Four Legged Monster",
        [Choices.PrettyFace]: "Pretty Face"
    }
    return switcher[value]
}

/**
 * @param {String} userChoice 
 * @param {String} cpuChoice 
 */
const drawChoices = (userChoice, cpuChoice) => {

    const canvas = query_all("canvas");
    const ctx = canvas[0].getContext('2d');
    const ctx2 = canvas[1].getContext('2d');

    let img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, 300, 300);
        ctx.drawImage(img, 0, 0);
    }
    img.src = getImageSrc(cpuChoice);

    let img2 = new Image();
    img2.onload = function () {
        ctx2.clearRect(0, 0, 300, 300);
        ctx2.drawImage(img2, 0, 0);
    }
    img2.src = getImageSrc(userChoice);
}

const getImageSrc = choice => {
    const images_dir = "./images/png"
    let src = "";
    switch (choice) {
        case Choices.Rock:
            src = `${images_dir}/rock.png`;
            break;
        case Choices.Paper:
            src = `${images_dir}/paper.png`;
            break;
        case Choices.Scissors:
            src = `${images_dir}/scissors.png`;
            break;
        case Choices.FourLegged:
            src = `${images_dir}/four_legged_monster.png`;
            break;
        case Choices.PrettyFace:
            src = `${images_dir}/pretty_face.png`;
            break;
        default:
            src = `${images_dir}/paper.png`;
    }
    return src;
}

const game_round = (userChoice) => {
    //We have user selection
    //Now the CPU chooses
    //CPU is not aware of user selection
    let validChoices = [Choices.Rock, Choices.Paper, Choices.Scissors, Choices.FourLegged, Choices.PrettyFace];
    let rand = Math.floor(Math.random() * validChoices.length);
    let cpuChoice = validChoices[rand];

    let result = rules[to_numerical_choice(userChoice)][to_numerical_choice(cpuChoice)];
    let textResult = (result === 0) ? "Draw" : (result === 1 ? "Win" : "Defeat");

    gebid("comp_choice").textContent = to_pretty_text(cpuChoice);
    gebid("user_choice").textContent = to_pretty_text(userChoice);
    gebid("result").textContent = textResult;
    drawChoices(userChoice, cpuChoice);
}

// setup
let all_buttons = query_all("button");

for (const single_butt of all_buttons) {
    // user selection kicks game round
    single_butt[on]('click', e => {
        const v = e.target.getAttribute("data-value");
        game_round(v);
    });
}