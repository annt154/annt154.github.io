let a = 10;
letb = 40;

//declaring or defining function
function add(a,b){
let c = a + b
console.log("value of c", c);
return c;
}
function substract (a,b){
    let f = a-b;
    console.log("value of f", f);
    return f;
}

function greet(name)
{
    let newName = name.toUppercase();
    let msg = "Hello" + newName;
    if (newName === "An"){
        
    }
    console.log(msg);
    return newName;
}

let name = "An";
greet(name);

//calling of a function
let sum = add(a,b);
console.log("value of sum", sum);
let sum2= add(44;89);
let d= 98;
let e= 909;
let sum3= add(66;897);
console.log("value of sum", sum3);
let balance = substract(100,78);
console.log("value of balance", balance);