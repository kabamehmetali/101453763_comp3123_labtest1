const lowerCaseWords = (mixedArray) => {
    return new Promise((resolve, reject) => {
        try {
            const result = mixedArray
                .filter(item => typeof item === 'string')
                .map(str => str.toLowerCase());
            resolve(result);
        } catch (error) {
            reject('Error: Invalid input');
        }
    });
};

// Example usage:
lowerCaseWords([1, 'Hello', 2, 'WORLD', true, 'JavaScript'])
    .then(result => console.log(result))  // Output: ['hello', 'world', 'javascript']
    .catch(error => console.error(error));


module.exports = lowerCaseWords;
