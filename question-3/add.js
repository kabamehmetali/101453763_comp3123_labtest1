// Mehmet Ali KABA
// 101353763
// LAB TEST 01 - Question 03, Answer 1 For Adding Files

// Defined the reqiered modules.
const fileSystemPromises = require('fs').promises; // I imported the file system module with promise support for asynchronous operations
const pathModule = require('path'); // I imported the path module to handle and construct file and directory paths
const readlineModule = require('readline'); // I imported the readline module to facilitate reading input from the command line
const LOGS_DIRECTORY_NAME = 'Logs';  // I defined a constant for the name of the Logs directory

// I created an interface for reading input from the command line
const userInputInterface = readlineModule.createInterface({
    input: process.stdin,  // I set the standard input as the input source
    output: process.stdout // I set the standard output as the output destination
});

// I defined a function to prompt the user with a question and return their input
const promptUser = (query) => {
    return new Promise((resolve) => {
        userInputInterface.question(query, (answer) => {
            resolve(answer);
        });
    });
};

// I defined an asynchronous function to handle the creation of log files
const createLogFiles = async () => {
    // I constructed the absolute path to the Logs directory based on the current working directory
    const logsDirectoryPath = pathModule.join(process.cwd(), LOGS_DIRECTORY_NAME);

    try {
        
        await fileSystemPromises.access(logsDirectoryPath); // I attempted to access the Logs directory to check if it already exists
        console.log(`${LOGS_DIRECTORY_NAME} directory already exists.`); // I informed the user that the Logs directory already exists
    } catch (error) {
        // I handled errors that occurred during the access check
        if (error.code === 'ENOENT') { // I checked if the directory does not exist
            // I attempted to create the Logs directory
            try {
                await fileSystemPromises.mkdir(logsDirectoryPath);
                console.log(`${LOGS_DIRECTORY_NAME} directory has been created successfully.`);
            } catch (mkdirError) {
                // I handled errors that occurred while creating the Logs directory
                if (mkdirError.code === 'EACCES' || mkdirError.code === 'EPERM') {
                    console.error(`Permission denied while creating the ${LOGS_DIRECTORY_NAME} directory:`, mkdirError.message);
                } else {
                    console.error(`Failed to create ${LOGS_DIRECTORY_NAME} directory:`, mkdirError.message);
                }
                userInputInterface.close(); // I closed the readline interface
                return; // I exited the function
            }
        } else {
            if (error.code === 'EACCES' || error.code === 'EPERM') {
                // I handled permission-related errors
                console.error('Permission denied while accessing the Logs directory:', error.message);
                userInputInterface.close(); // I closed the readline interface
                return; // I exited the function
            }
            // I rethrew the error if it was not related to directory existence or permissions
            throw error;
        }
    }

    // I attempted to change the current working directory to the Logs directory
    try {
        process.chdir(logsDirectoryPath);
        console.log(`Current working directory changed to: ${logsDirectoryPath}`);
    } catch (error) {
        // I handled errors that occurred while changing the working directory
        if (error.code === 'ENOENT') {
            console.error(`The directory ${logsDirectoryPath} does not exist:`, error.message);
        } else if (error.code === 'EACCES' || error.code === 'EPERM') {
            console.error('Permission denied while changing the working directory:', error.message);
        } else {
            console.error('Failed to change the working directory:', error.message);
        }
        userInputInterface.close(); // I closed the readline interface
        return; // I exited the function
    }

    // I initialized an array to store the names of successfully created or overwritten log files
    const successfullyCreatedFiles = [];

    // I initialized a flag to determine if the user chose to overwrite all remaining files
    let overwriteAll = false;

    // I looped ten times to create log0.txt to log9.txt
    for (let index = 0; index < 10; index++) {
        // I defined the name of the current log file
        const currentLogFileName = `log${index}.txt`;

        // I defined the content to write into the current log file
        const currentLogFileContent = `This is log file number ${index}`;

        try {
            // I attempted to write the current log file with the 'wx' flag to prevent overwriting existing files
            await fileSystemPromises.writeFile(currentLogFileName, currentLogFileContent, { flag: 'wx' });
            // I added the successfully created log file's name to the array
            successfullyCreatedFiles.push(currentLogFileName);
        } catch (error) {
            // I handled errors that occurred during the creation of the current log file
            if (error.code === 'EEXIST') { // I checked if the file already exists
                if (!overwriteAll) {
                    // I prompted the user to decide whether to overwrite the existing file
                    const userResponse = await promptUser(`File ${currentLogFileName} already exists. Do you want to overwrite it? (yes/y, no/n, all): `);
                    const normalizedResponse = userResponse.trim().toLowerCase();

                    if (normalizedResponse === 'yes' || normalizedResponse === 'y') {
                        // I attempted to overwrite the existing file
                        try {
                            await fileSystemPromises.writeFile(currentLogFileName, currentLogFileContent, { flag: 'w' });
                            successfullyCreatedFiles.push(currentLogFileName);
                        } catch (overwriteError) {
                            if (overwriteError.code === 'EACCES' || overwriteError.code === 'EPERM') {
                                console.error(`Permission denied while overwriting ${currentLogFileName}:`, overwriteError.message);
                            } else {
                                console.error(`Failed to overwrite ${currentLogFileName}:`, overwriteError.message);
                            }
                        }
                    } else if (normalizedResponse === 'all') {
                        // I set the flag to overwrite all remaining files without prompting
                        overwriteAll = true;
                        // I attempted to overwrite the existing file
                        try {
                            await fileSystemPromises.writeFile(currentLogFileName, currentLogFileContent, { flag: 'w' });
                            successfullyCreatedFiles.push(currentLogFileName);
                        } catch (overwriteError) {
                            if (overwriteError.code === 'EACCES' || overwriteError.code === 'EPERM') {
                                console.error(`Permission denied while overwriting ${currentLogFileName}:`, overwriteError.message);
                            } else {
                                console.error(`Failed to overwrite ${currentLogFileName}:`, overwriteError.message);
                            }
                        }
                    } else {
                        // I skipped overwriting the current file based on user input
                        console.log(`Skipped overwriting ${currentLogFileName}.`);
                    }
                } else {
                    // I attempted to overwrite the existing file without prompting
                    try {
                        await fileSystemPromises.writeFile(currentLogFileName, currentLogFileContent, { flag: 'w' });
                        successfullyCreatedFiles.push(currentLogFileName);
                    } catch (overwriteError) {
                        if (overwriteError.code === 'EACCES' || overwriteError.code === 'EPERM') {
                            console.error(`Permission denied while overwriting ${currentLogFileName}:`, overwriteError.message);
                        } else {
                            console.error(`Failed to overwrite ${currentLogFileName}:`, overwriteError.message);
                        }
                    }
                }
            } else if (error.code === 'EACCES' || error.code === 'EPERM') { // I checked for permission-related errors
                console.error(`Permission denied while creating ${currentLogFileName}:`, error.message);
            } else {
                console.error(`Failed to create ${currentLogFileName}:`, error.message);
            }
        }
    }

    // I checked if any log files were successfully created or overwritten
    if (successfullyCreatedFiles.length > 0) {
        console.log('Created/Overwritten Log Files:');
        // I looped through the array of successfully created files and logged their names
        successfullyCreatedFiles.forEach(fileName => console.log(fileName));
    } else {
        console.log('No new log files were created or overwritten.');
    }

    // I closed the readline interface as it's no longer needed
    userInputInterface.close();
};

// I executed the createLogFiles function and handled any unexpected errors
createLogFiles()
    .catch(error => {
        // I logged any unhandled errors that occurred during the execution of createLogFiles
        console.error('An unexpected error occurred:', error.message);
        userInputInterface.close(); // I ensured the readline interface is closed
    });
