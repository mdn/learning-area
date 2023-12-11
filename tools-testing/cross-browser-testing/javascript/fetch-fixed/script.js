const header = document.querySelector("header");
const section = document.querySelector("section");

const requestURL =
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

fetch(requestURL)
  .then((response) => response.json())
  .then((json) => {
    populateHeader(json);
    showHeroes(json);
  });

function populateHeader(jsonObj) {
  const h1 = document.createElement("h1");
  h1.textContent = jsonObj["squadName"];
  header.appendChild(h1);

  const para = document.createElement("p");
  para.textContent = `Hometown: ${jsonObj["homeTown"]} // Formed: ${jsonObj["formed"]}`;
  header.appendChild(para);
}

function showHeroes(jsonObj) {
  const heroes = jsonObj["members"];

  for (const hero of heroes) {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const para1 = document.createElement("p");
    const para2 = document.createElement("p");
    const para3 = document.createElement("p");
    const list = document.createElement("ul");

    h2.textContent = hero.name;
    para1.textContent = `Secret identity: ${hero.secretIdentity}`;
    para2.textContent = `Age: ${hero.age}`;
    para3.textContent = "Superpowers:";

    const superPowers = hero.powers;
    for (const superPower of superPowers) {
      const listItem = document.createElement("li");
      listItem.textContent = superPower;
      list.appendChild(listItem);
    }

    article.appendChild(h2);
    article.appendChild(para1);
    article.appendChild(para2);
    article.appendChild(para3);
    article.appendChild(list);

    section.appendChild(article);
  }
}
