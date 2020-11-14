document.querySelector(".middle-right-1").innerHTML="";
const element = document.createElement('p');
element.textContent = "test";
document.querySelector(".middle-right-1").appendChild(element);
console.log("test")