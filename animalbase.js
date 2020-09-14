"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let animals = allAnimals;
let sortName = 0;
let sortType = 0;
let sortDesc = 0;
let sortAge = 0;


// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start() {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons
    document.querySelector("p button:nth-child(1)").addEventListener("click", filter);
    document.querySelector("p button:nth-child(2)").addEventListener("click", filter);
    document.querySelector("p button:nth-child(3)").addEventListener("click", filter);


    document.querySelector("th:nth-child(1)").addEventListener("click", sort);
    document.querySelector("th:nth-child(2)").addEventListener("click", sort);
    document.querySelector("th:nth-child(3)").addEventListener("click", sort);
    document.querySelector("th:nth-child(4)").addEventListener("click", sort);


    loadJSON();
}

function filter() {
    console.log(allAnimals);
    console.log(this.getAttribute("data-filter"));
    if (this.getAttribute("data-filter") === "cat") {
        animals = allAnimals.filter(allAnimals => allAnimals.type === "cat");
    }
    if (this.getAttribute("data-filter") == "dog") {
        animals = allAnimals.filter(allAnimals => allAnimals.type === "dog");
    }
    if (this.getAttribute("data-filter") == "*") {
        animals = allAnimals.filter(allAnimals => allAnimals.type !== "");
    }
    console.log(animals);

    displayList(animals);
}

function sort() {
    console.log("nameSort");
    console.log(allAnimals);
    const sortSelect = this.getAttribute("data-sort");

    sortCalc(sortSelect);
    displayList(animals);


}

function sortCalc(sortSelect) {
    if (sortSelect === "name") {
        if (sortName % 2 === 0) {
            animals = allAnimals.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            sortName++;
        } else {
            if (sortSelect === "name") {
                animals = allAnimals.reverse(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                sortName++;
            }
        }
    }
    if (sortSelect === "type") {
        if (sortType % 2 === 0) {
            animals = allAnimals.sort(function (a, b) {
                if (a.type < b.type) {
                    return -1;
                }
                if (a.type > b.type) {
                    return 1;
                }
                return 0;
            });
            sortType++;
        } else {
            if (sortSelect === "type") {
                animals = allAnimals.reverse(function (a, b) {
                    if (a.type < b.type) {
                        return -1;
                    }
                    if (a.type > b.type) {
                        return 1;
                    }
                    return 0;
                });
                sortType++;
            }
        }
    }
    if (sortSelect === "desc") {
        if (sortDesc % 2 === 0) {
            animals = allAnimals.sort(function (a, b) {
                if (a.desc < b.desc) {
                    return -1;
                }
                if (a.desc > b.desc) {
                    return 1;
                }
                return 0;
            });
            sortDesc++;
        } else {
            if (sortSelect === "desc") {
                animals = allAnimals.reverse(function (a, b) {
                    if (a.desc < b.desc) {
                        return -1;
                    }
                    if (a.desc > b.desc) {
                        return 1;
                    }
                    return 0;
                });
                sortDesc++;
            }
        }
    }
    if (sortSelect === "age") {
        if (sortAge % 2 === 0) {
            animals = allAnimals.sort(function (a, b) {
                if (a.age < b.age) {
                    return -1;
                }
                if (a.age > b.age) {
                    return 1;
                }
                return 0;
            });
            sortAge++;
        } else {
            if (sortSelect === "age") {
                animals = allAnimals.reverse(function (a, b) {
                    if (a.age < b.age) {
                        return -1;
                    }
                    if (a.age > b.age) {
                        return 1;
                    }
                    return 0;
                });
                sortDesc++;
            }
        }
    }
    return animals;
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();

    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    allAnimals = jsonData.map(preapareObject);

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject(jsonObject) {
    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}