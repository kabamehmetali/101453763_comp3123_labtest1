// Mehmet Ali KABA
// 101453763
// LAB TEST 1 - Question 02 Answer

// I declared a function to return a resolved promise after 500ms delay as requsted on test.
const resolvedPromise = () => {
    return new Promise((resolve, reject) => { // I return a new promise 
        // I set a setTimeout function to simulate asynchronous delay of 500ms like requested.
        setTimeout(() => {
            // I resolve the promise with a success message same as output image.
            resolve({ 'message': 'delayed success!' });
        }, 500); // 500 = 500ms here.
    })
    // I handled the resolved promise and log the result to the console here
    .then((success) => {
        console.log(success); // I display the result here
    })
    // I catch and log any potential errors here.
    .catch((error) => {
        console.error(error);
    });
}
// I declared a function to return a rejected promise after 500ms delay as requested.
const rejectedPromise = () => {
    return new Promise((resolve, reject) => {
        // I set a setTimeout function to simulate asynchronous delay of 500ms like requeste here too.
        setTimeout(() => {
            // I display a reject the promise with an error message like on the output image.
            reject({ 'error': 'delayed exception!' });
        }, 500); // 500 is for delay
    })
   // I handled the resolved promise and log the result to the console here too.
    .then((success) => {
        console.log(success); // it displays if success
    })
     // I catch and log any potential errors here too.
    .catch((error) => {
        console.error(error); // it displays if any error has occured.
    });
}

// I call the succees function here
resolvedPromise();

// I call error function here.
rejectedPromise();
