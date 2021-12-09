// Single array of dish names to match corresponding add[dishName] functions and dish HTML id's
const dishes = ['baconEggCheeseBurrito', 'basicDal', 'cajunShrimpBoil', 'chickenBlackBeanTacoBowl', 'chickenWithSaucyTomatoes', 'coconutPoachedSalmon', 'couscousLemonChickenDates', 'creamyZucchiniPasta', 'farroTomatoesBasil', 'frenchToastPudding', 'fritatta', 'goldenFriedRice', 'hotLinkChili', 'kabochaSquashCurry', 'mushroomRisotto', 'pineappleChickenCurry', 'poachedEggs', 'salmonBraisedPeppers', 'salmonRice', 'shakshuka', 'shrimpCurry', 'stuffedSquash'];
var dish;
var groceryList = [];
var printedList = document.getElementById("list");
var username = "";

do { // Do/while loop to prompt for user's name
    username = prompt("What is your name?");
    if (username == "") {
        alert("Please enter a name.")
    }
} while (username == "")


// for loop to add event listeners for each meal choice dish
for (let i = 0; i < dishes.length; i++) {
    dish = document.getElementById(dishes[i]);
    dish.addEventListener("mouseover", mouseOver, false);
    dish.addEventListener("mouseout", mouseOut, false);

}

// loop to fill array that will hold check[#] corresponding to meal checkbox HTML id's
var checks = [];
for (let i = 0; i < dishes.length; i++) {
    checks[i] = "check" + i;
}

// save list button
var saveListButton = document.querySelector("#saveList");

function makeList() {
    groceryList = [];
    let i = 0;
    // while loop to check which dishes are checked and call add[dishName] functions to make grocery list, simplify it, and print
    while (i < dishes.length) {
        let check = document.querySelector("#" + checks[i]); // DOM query selector referencing meal checkbox HTML id's 
        if (check.checked) {
            switch (i) { // switch case statement to handle 
                case 0:
                    addBaconEggCheeseBurrito();
                    break;
                case 1:
                    addBasicDal();
                    break;
                case 2:
                    addCajunShrimpBoil();
                    break;
                case 3:
                    addChickenBlackBeanTacoBowl();
                    break;
                case 4:
                    addChickenWithSaucyTomatoes();
                    break;
                case 5:
                    addCoconutPoachedSalmon();
                    break;
                case 6:
                    addCouscousLemonChickenDates();
                    break;
                case 7:
                    addCreamyZucchiniPasta();
                    break;
                case 8:
                    addFarroTomatoesBasil();
                    break;
                case 9:
                    addFrenchToastPudding();
                    break;
                case 10:
                    addFritatta();
                    break;
                case 11:
                    addGoldenFriedRice();
                    break;
                case 12:
                    addHotLinkChili();
                    break;
                case 13:
                    addKabochaSquashCurry();
                    break;
                case 14:
                    addMushroomRisotto();
                    break;
                case 15:
                    addPineappleChickenCurry();
                    break;
                case 16:
                    addPoachedEggs();
                    break;
                case 17:
                    addSalmonBraisedPeppers();
                    break;
                case 18:
                    addSalmonRice();
                    break;
                case 19:
                    addShakshuka();
                    break;
                case 20:
                    addShrimpCurry();
                    break;
                case 21:
                    addStuffedSquash();
                    break;
                default:
                    break;
            }
        }
        i++;
    }
    if (groceryList.length == 0) { // Form validator to ensure user has selected meal(s)
        alert("Please select at least one meal to make a grocery list.");
        return null;
    }
    simplifyList();
    printList();
    saveListButton.setAttribute("style", "display: inline;");
}

function mouseOver(e) {
    e.target.src = "images/" + e.target.id + "Label.jpg";
}

function mouseOut(e) {
    e.target.src = "images/" + e.target.id + ".jpg";
}


function simplifyList() { // checks for redundant groceryList elements, eliminates duplicates, sorts array alphabetically
    for (let i = 0; i < groceryList.length; i++) {
        for (let j = 0; j < groceryList.length; j++)
            if (groceryList[i] == groceryList[j] && i != j) {
                groceryList.splice(j, 1);

            }
    }
    groceryList.sort();
}

var list = ' ';

function printList() {
    var today = new Date();
    var todayStr = today.toString(); // Date/time manipulation to convert Date to string
    list = ' ';
    for (let i = 0; i < groceryList.length; i++) {
        if (groceryList[i] != undefined) {
            list = list + '<input type="checkbox"> ' + groceryList[i] + '<br>'
        }
    }
    printedList.innerHTML = "<b><h3>" + username + "'s Grocery List</b><br>" + todayStr.slice(0, 15) + "</h3>" + list; // String manipulation to print Date without time, then concatenate grocery list below
    ingredientWheel(groceryList.length);
}

function ingredientWheel(ings) {
    var c = document.getElementById("pane").getContext("2d");

    for (var i = 0; i <= ings; i++) {
        c.beginPath();
        c.fillStyle = randomRGBA();
        c.arc(150, 150, 143, ((2 * Math.PI) / ings) * i, ((2 * Math.PI) / ings) * (i + 1));
        //c.arc(150, 150, 143, 0, 2 * Math.PI);
        c.fill();
    }

    // randomRGBA() from http://www.crunchzilla.com/code-monster
    function randomRGBA() {
        var r = randInt(255);
        var g = randInt(255);
        var b = randInt(255);
        var a = Math.random();
        var rgba = [r, g, b, a].join(",");
        return "rgba(" + rgba + ")";
    }

    // randInt() from http://www.crunchzilla.com/code-monster
    function randInt(limit) {
        var x = Math.random() * limit;
        return Math.floor(x);
    }
}

function resetForm() {
    document.getElementById("mealPlanner").reset();
    printedList.innerHTML = " ";
    saveListButton.setAttribute("style", "display: none;");
    list = ' ';
    var canvas = document.getElementById("pane");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var savedLists = document.querySelector("#saved");
var listCounter = 0;

function saveList() {
    if (groceryList.length == 0) {
        alert("Please make a grocery list first to save.");
        return null;
    } else {
        listCounter++;
        var listTitle = prompt("Enter list title:");
        var savedList = {
            title: listTitle,
            saveList: list,
        }

        savedLists.setAttribute("style", "width: 20vw; border: 2px groove white; padding-left: 1vw;")

        var newListHead = document.createElement("h3");
        newListHead.setAttribute("id", "listHead" + listCounter);
        if (savedList.title == null || savedList.title == undefined || savedList.title == "") {
            newListHead.innerHTML = "Grocery List #" + listCounter;
        } else {
            newListHead.innerHTML = savedList.title;
        }
        savedLists.appendChild(newListHead);
        var newList = document.createElement("div");
        newList.setAttribute("id", "list" + listCounter)
        newList.innerHTML = "<p>" + savedList.saveList + "</p>";
        savedLists.appendChild(newList);
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("id", "deleteList" + listCounter);
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "Delete List");
        deleteButton.setAttribute("onclick", "deleteList(" + listCounter + ")");
        savedLists.appendChild(deleteButton);
        var rule = document.createElement("hr");
        rule.setAttribute("id", "rule" + listCounter);
        savedLists.appendChild(rule);

    }
}

function deleteList(i) {
    var toDelete = document.querySelector("#listHead" + i);
    savedLists.removeChild(toDelete);
    toDelete = document.querySelector("#list" + i);
    savedLists.removeChild(toDelete);
    toDelete = document.querySelector("#deleteList" + i);
    savedLists.removeChild(toDelete);
    toDelete = document.querySelector("#rule" + i);
    savedLists.removeChild(toDelete);
    if (savedLists.children.length == 0) {
        savedLists.setAttribute("style", "display:none");
    }
}


function addBaconEggCheeseBurrito() {
    var baconEggCheeseBurritoIng = ['eggs', 'sour cream', 'avocado', 'bacon', 'cheddar cheese', 'hot sauce', 'tortillas'];
    groceryList = groceryList.concat(baconEggCheeseBurritoIng);
}

function addBasicDal() {
    var basicDal = ['chili powder', 'cilantro', 'ground turmeric', 'lime juice', 'olive oil', 'water', 'asafetida', 'cumin seeds', 'dried chile', 'kosher salt', 'orange lentils'];
    groceryList = groceryList.concat(basicDal);
}

function addCajunShrimpBoil() {
    var cajunShrimpBoil = ['butter', 'chicken stock', 'garlic', 'salt', 'cayenne pepper', 'celery', 'corn on the cob', 'frozen pearl onions', 'kielbasa sausage', 'lemon', 'parsley', 'red skin potato', "seafood boil seasoning (Old Bay, Zatarin's, etc)", 'shrimp shell-on'];
    groceryList = groceryList.concat(cajunShrimpBoil);
}

function addChickenBlackBeanTacoBowl() {
    var chickenBlackBeanTacoBowl = ['black pepper', 'chili powder', 'garlic powder', 'ground cumin', 'lemon juice', 'olive oil', 'red bell pepper', 'salt', 'canned black beans', 'boneless chicken breast'];
    groceryList = groceryList.concat(chickenBlackBeanTacoBowl);
}

function addChickenWithSaucyTomatoes() {
    var chickenWithSaucyTomatoes = ['cherry tomatoes', 'dried oregano', 'garlic', 'olive oil', 'red bell pepper', 'salt', 'chicken thighs, bone-in', 'tomato paste'];
    groceryList = groceryList.concat(chickenWithSaucyTomatoes);
}

function addCoconutPoachedSalmon() {
    var coconutPoachedSalmon = ['cilantro', 'coconut milk', 'ginger', 'jalapeno', 'lime juice', 'salmon', 'salt', 'soy sauce', 'lemongrass', 'swiss chard'];
    groceryList = groceryList.concat(coconutPoachedSalmon);
}

function addCouscousLemonChickenDates() {
    var couscousLemonChickenDates = ['black pepper', 'boneless chicken thighs', 'chicken stock', 'chili flakes', 'cilantro', 'cinnamon', 'ground cumin', 'ground turmeric', 'lemon juice', 'olive oil', 'salt', 'Moroccan couscous', 'pitted dates', 'pomegranate seeds', 'shallot'];
    groceryList = groceryList.concat(couscousLemonChickenDates);
}

function addCreamyZucchiniPasta() {
    var creamyZucchiniPasta = ['garlic', 'olive oil', 'parmesan cheese', 'salt', 'sour cream', 'water', 'pancetta', 'penne pasta', 'slivered almonds', 'zucchini'];
    groceryList = groceryList.concat(creamyZucchiniPasta);
}

function addFarroTomatoesBasil() {
    var farroTomatoesBasil = ['basil', 'black pepper', 'butter', 'cherry tomatoes', 'lemon juice', 'olive oil', 'parmesan cheese', 'salt', 'water', 'pearled farro', 'yellow onion'];
    groceryList = groceryList.concat(farroTomatoesBasil);
}

function addFrenchToastPudding() {
    var frenchToastPudding = ['butter', 'cinnamon', 'eggs', 'soft bread', 'evaporated milk', 'maple syrup', 'raisins', 'sugar', 'vanilla extract'];
    groceryList = groceryList.concat(frenchToastPudding);
}

function addFritatta() {
    var fritatta = ['basil', 'bell pepper', 'butter', 'eggs', 'garlic', 'onion', 'pepper', 'salt', 'sour cream', 'jack cheese'];
    groceryList = groceryList.concat(fritatta);
}

function addGoldenFriedRice() {
    var goldenFriedRice = ['eggs', 'garlic', 'ginger', 'ground turmeric', 'onion', 'salt', 'soy sauce', 'broccoli', 'rice', 'sesame oil', 'white pepper'];
    groceryList = groceryList.concat(goldenFriedRice);
}

function addHotLinkChili() {
    var hotLinkChili = ['bell pepper', 'chicken stock', 'chili powder', 'garlic', 'jalapeno', 'olive oil', 'onion', 'salt', 'smoked paprika', 'canned diced tomatoes', 'canned pinto beans', 'hot link'];
    groceryList = groceryList.concat(hotLinkChili);
}

function addKabochaSquashCurry() {
    var kabochaSquashCurry = ['bell pepper', 'butter', 'chicken stock', 'corn starch', 'garlic powder', 'olive oil', 'pepper', 'salt', 'eggplant', 'Japanese golden curry cube', 'kabocha squash'];
    groceryList = groceryList.concat(kabochaSquashCurry);
}

function addMushroomRisotto() {
    var mushroomRisotto = ['black pepper', 'chicken stock', 'garlic', 'parmesan cheese', 'salt', 'short grain rice', 'mushrooms', 'unsalted butter', 'white wine'];
    groceryList = groceryList.concat(mushroomRisotto);
}

function addPineappleChickenCurry() {
    var pineappleChickenCurry = ['boneless chicken thighs', 'chili flakes', 'coconut milk', 'cornstarch', 'garlic', 'ginger', 'onion', 'red bell pepper', 'salt', 'diced pineapple', 'yellow curry paste'];
    groceryList = groceryList.concat(pineappleChickenCurry);
}

function addPoachedEggs() {
    var poachedEggs = ['eggs'];
    groceryList = groceryList.concat(poachedEggs);
}

function addSalmonBraisedPeppers() {
    var salmonBraisedPeppers = ['black pepper', 'cherry tomatoes', 'garlic', 'jalapeno', 'olive oil', 'paprika', 'red bell pepper', 'salmon', 'salt', 'red onion', 'yellow bell pepper'];
    groceryList = groceryList.concat(salmonBraisedPeppers);
}

function addSalmonRice() {
    var salmonRice = ['chicken stock', 'salmon', 'short grain rice', 'soy sauce', 'frozen spinach', 'scallions', 'sesame seeds'];
    groceryList = groceryList.concat(salmonRice);
}

function addShakshuka() {
    var shakshuka = ['black pepper', 'eggs', 'garlic', 'ground cumin', 'olive oil', 'paprika', 'red bell pepper', 'salt', 'chunky tomato sauce'];
    groceryList = groceryList.concat(shakshuka);
}

function addShrimpCurry() {
    var shrimpCurry = ['bell pepper', 'chili flakes', 'cilantro', 'coconut milk', 'corn starch', 'garlic', 'olive oil', 'onion', 'paprika', 'pepper', 'salt', 'curry powder', 'fish sauce', 'lime', 'peeled shrimp'];
    groceryList = groceryList.concat(shrimpCurry);
}

function addStuffedSquash() {
    var stuffedSquash = ['dried oregano', 'garlic powder', 'olive oil', 'onion', 'salt', 'lean ground beef', 'marinara sauce', 'mozzarella', 'small spaghetti squash'];
    groceryList = groceryList.concat(stuffedSquash);
}