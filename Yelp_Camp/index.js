
async function  f1(){
console.log('hello');
return 5;
}
function f2(){
console.log('f2 entry');
f1().then((data)=> console.log(data));
f1().then((data)=> console.log(data));
f1().then((data)=> console.log(data));
console.log('f2 exit');
}
f2()
