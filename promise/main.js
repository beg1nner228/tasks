// first task

const delay = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  })
};

const logger = time => console.log(`Resolved after ${time}ms`);

delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

// second 

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];
const toggleUserState = (allUsers, userName) => {
  const updatedUsers = allUsers.map(user =>
    user.name === userName ? { ...user, active: !user.active } : user,
  );

  return new Promise((resolve, reject) => {
    resolve(updatedUsers);
  })
};

const secondLogger = updatedUsers => console.table(updatedUsers);

/*
 * Повинно працювати так
 */
toggleUserState(users, 'Mango').then(secondLogger);
toggleUserState(users, 'Lux').then(secondLogger);


// third task

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction, amount) => {

  return new Promise((resolve, reject) => {
    const delay = randomIntegerFromInterval(1000, 2500);

      setTimeout(() => {
    const canProcess = Math.random() > 0.3;

    if (canProcess) {
      resolve({ id: transaction.id, delay: delay })
    } else {
      reject(transaction.id)
    }
  }, delay)});
} 

const logSuccess = ({id, delay}) => {
  console.log(`Transaction ${id} processed in ${delay}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);