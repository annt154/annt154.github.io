const topHeading = document.querySelector("h1");
console.log(topHeading); //to find thing(s) in html file
console.log(topHeading.textContent);
topHeading.textContent = "this is my new heading";
topHeading.style.color = "red"; //changing style jus by calling n change?

const firstPara = document.querySelector("p");
console.log(firstPara);
console.log(firstPara.textContent);
firstPara.textContent = "This is new par";
firstPara.innerHTML += <span>"New element"</span>;

const mySelection = document.querySelector("section");
console.log(mySelection);
let mynewContent =
<h2>this is an img of cat</h2>
<p>Do u like it?</p>;
mySelection.innerHTML += mynewContent;
const h2Heading = document.querySelector(#)

const h2Heading = document.querySelector("#second-heading");
console.log(h2Heading);
console.log(h2Heading.textContent);

const allParas = document.querySelectorAll("p");
console.log(allParas);
//console.log(allParas.textContent);
for (let i = 0; i < allParas.length; i++) {
  console.log("Para", i + 1, ":", allParas[i].textContent);
}
//console.log(allParas.textContent);

const allAnothers = document.querySelectorAll(".another");
console.log(allAnothers);
//console.log(allParas.textContent);
for (let i = 0; i < allParas.length; i++) {
  console.log(
    "Elements with class another",
    i + 1,
    ":",
    allParas[i].textContent
  );
}

function toggleMe() {
  const myImg = document.querySelector("img");
  console.log(myImg);
  myImg.classList.toggle("round");
}
