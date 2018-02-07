let animals = ["lion", "tiger", "cat", "dog"];
animals = animals.map((elem, index) => {
    return { type: "Animal", name: elem };
});
let cities = ["berlin", "tbilisi", "dubai", "washington"];
cities = cities.map((elem, index) => {
    return { type: "City", name: elem };
});
let countries = ["germany", "georgia", "uae", "usa"];
countries = countries.map((elem, index) => {
    return { type: "Country", name: elem };
});
let fruits = ["apple", "bannana", "peach", "orange"];
fruits = fruits.map((elem, index) => {
    return { type: "Fruit", name: elem };
});

let words = animals.concat(cities).concat(countries).concat(fruits);