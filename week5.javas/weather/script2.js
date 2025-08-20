function checkWeather() {
  const body = document.querySelector("body");
  const temp = document.querySelector("#myTemp");

  console.log(temp);
  const t = temp.value;
  console.log(t);
  if (t > 40) {
    console.log("its super hot");
    body.style.backgroundColor = "red";
  } else if (t <= 40 && t > 30) {
    console.log("its warm outside");
    body.style.backgroundColor = "orange";
  } else if (t <= 30 && t > 18) {
    console.log("soso");
    body.style.backgroundColor = "yellow";
  } else if (t <= 18 && t > 8) {
    console.log("cold af");
    body.style.backgroundColor = "blue";
  } else if (t <= 8) {
    console.log("freezing");
    body.style.backgroundColor = "black";
  }
}
