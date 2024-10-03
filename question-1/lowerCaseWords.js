// Mehmet Ali KABA
// 101453763
// LAB TEST 1

let mixedArray = ["Pizza", 10, true, 25, false, "wings"]; // I defined default array as on paper.
let b;

const lowerCaseWords = async (myArr) => {
    // I used arrow function and async as presented in ES6 to define the function
    // I check if the array is defined or not so the app will not crush.
    if (!myArr) { 
        console.error("Array is not defined.");
        return; // app exits the function if array is not defined here.
    }

    try { // I use try and catch block to check and prevent app to crash.
        // Filter the array to keep only string values
        let filterResult = myArr.filter(item => typeof item === 'string'); // I filter the array to only include strings as we learned in class.
        // If no strings are found, I return a rejected promise with the message "No strings found in the array" and prevent to crush again.
        if (filterResult.length === 0) {
            return Promise.reject("No strings found in the array."); // return a recject promise here if there is no strings in array.
        }
        
        let lowerCaseArray = []; // If there are strings i loop it and save it into a new array.
        for (let x = 0; x < filterResult.length; x++) {
            lowerCaseArray.push(filterResult[x].toLowerCase()); // I lower the result and save it to new array
        }

        return Promise.resolve(lowerCaseArray); // I return a resolve promise with my new lower case array.
    } catch (e) {
        // If any other error occurs, reject the promise with an error message
        return Promise.reject("=> An error occurred. <= \n" + e);
    }
};

try { // I used try and catch block again to prevent app crash if the app is not declared.
// Test the function with an array that contains strings
    lowerCaseWords(mixedArray) // User can enter the array here
        .then(result => console.log(result))  // I output the result here if success
        .catch(error => console.error(error)); // if an error occur while catching i display it here.
} catch (e) {
    console.log("An Error has occured, Probably array is not declared") // if the input not declared i display this message
}



module.exports = { lowerCaseWords }; // Exporting the function as a module 
// (I know it is not requested but it may look more professional if i add the exports as extra)
