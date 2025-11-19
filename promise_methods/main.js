// 1. "Порівняння кількох промісів"
const promise_A = randomPromice("IS DONE - A", getRandomTime(1000, 5000));
const promise_B = randomPromice("IS DONE - B", getRandomTime(1000, 5000));                                             
const promise_C = randomPromice("IS DONE - C", getRandomTime(1000, 5000)); 
const promise_D = randomPromice("IS DONE - D", getRandomTime(1000, 5000)); 
const promise_E = randomPromice("IS DONE - E", getRandomTime(1000, 5000));

function getRandomTime(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);

}

function randomPromice(text, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(text)
    }, delay);
  })
}

Promise.all([promise_A, promise_B, promise_C, promise_D, promise_E])
.then(value => console.log(value))

// 2. "Змагання промісів"

Promise.race([promise_A, promise_B, promise_C, promise_D, promise_E])
.then( value => console.log(`${value} || ${value[value.length - 1]} is the fastest promise`))