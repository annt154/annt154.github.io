//string variavles = text variables alphanumeric
const myName = "an";
const myAge = "100";
console.log(myName, myAge); // make them appear on the platform?

//number variable add substract multiply divide
let a = 10;
let b = 123;
let c = a - b;
console.log(c); //console: print out
const id = 1234;
const city = "melb";
const uni = "Rmit";

// objs: collection of related variables or data

const myStudentRecord = {
  name: "An",
  id: "14345",
  city: "hcm",
};

console.log(myStudentRecord.name);
console.log(myStudentRecord.id);

const myAssignmentRecord = {
  id: 12345678,
  a1Score: 100,
  a2Score: 99,
  a3Score: 99.5,
};
const total = myAssignmentRecord.a1Score + myAssignmentRecord.a2Score;
console.log(total);

// (): function, conditions
// {}: scoping things

//console: print out
//conse: data does not change , khai bao
//let: storing data that changes,

//boolean = true or false
const isItEvening = true;
const isItRaining = false;

//backticks: allow add space, add endline
const myAddress = `rmit uni 123"

latrobe st 
melb is ${myName}'s address`; //backticks can include variable

console.log(myAddress);

//Arrays:
const student1 = "Alice";
const student2 = "Mile";
const student3 = "Apo";
console.log("hello", student1);

let students = ["Alice", "Mile", "Apo", "jack", "Joe"]; //this is array
//console.log("hello", students[0]);
// console.log("hello", students[1]);
// console.log("hello", students[2]);
//let ids = [12, 13, 14, 15, 16];
// console.log(ids[2]); //se hien len "14" theo thu tu 0,1,2=>14
console.log("array size", students.length);
for (let i = 0; i < students.length; i++) {
  //++ la cgi
  //loop
  console.log("value of i", i);
  console.log("hello", students[i]);
}

//if condition
// let score = 100;
// if (score > 80) {
//   console.log("you got HD");
//   console.log("Slay!"); //can print both
// } else if (score <= 80 && score > 70) {
//   console.log("Distinction");
// } else if (score <= 70 && score > 50) {
//   console.log("passed, phew~");
// } else {
//   console.log("oops, try harder next time !");
// }

//let marks = "98";
//let marks2 = 98;
//console.log(marks === marks2); // ==: check value; === :

// && : and
// || : either is true => assum that true
//  ! : not , reverse

//loop
