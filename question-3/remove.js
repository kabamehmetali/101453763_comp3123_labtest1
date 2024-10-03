// Mehmet Ali KABA
// 101353763
// LAB TEST 01 - Question 03, Answer 1 For Removing Files



const fileSystemPromises = require('fs').promises; // I imported the required file system module with promise support for asynchronous operations
const filePathModule = require('path');  // I imported the path module to handle and construct file and directory paths
const LOGS_DIRECTORY_NAME = 'Logs'; // I defined a constant for the name of the Logs directory to ensure consistency

// I defined an asynchronous function to handle the removal of log files and the Logs directory
const removeLogFiles = async () => {
    // I constructed the absolute path to the Logs directory based on the current working directory
    const logsDirectoryPath = filePathModule.join(process.cwd(), LOGS_DIRECTORY_NAME);
    try {
        // I attempted to access the Logs directory to check if it exists
        await fileSystemPromises.access(logsDirectoryPath);
        // If no error is thrown, the Logs directory exists here
    } catch (error) {
        // I handled errors that occurred during the access check
        if (error.code === 'ENOENT') { // I checked if the directory does not exist
            // I informed the user that the Logs directory does not exist and exited the script
            console.log(`${LOGS_DIRECTORY_NAME} directory does not exist. No files to remove.`);
            return; // I exited the function to prevent further execution
        } else {
            // I handled permission-related errors specifically
            if (error.code === 'EACCES' || error.code === 'EPERM') {
                console.error('Permission denied while accessing the Logs directory:', error.message);
                return; // I exited the function to prevent further execution
            }
            // I rethrew the error if it was not related to directory existence or permissions
            throw error;
        }
    }
    let logFiles = []; // I defined an empty array here.
    try {
        logFiles = await fileSystemPromises.readdir(logsDirectoryPath); // I attempted to read all files within the Logs directory
    } catch (error) {
        if (error.code === 'EACCES' || error.code === 'EPERM') { // I handled errors that occurred while reading the contents of the Logs directory
            console.error('Permission denied while reading the Logs directory:', error.message);
        } else {
            console.error(`Failed to read contents of ${LOGS_DIRECTORY_NAME} directory:`, error.message);
        }
        return; // I exited the function to prevent further execution
    }
    // I checked if the Logs directory is empty
    if (logFiles.length === 0) {
        console.log(`${LOGS_DIRECTORY_NAME} directory is empty. No files to delete.`);
    } else {
        // I informed the user that the deletion process is starting
        console.log(`Starting deletion of ${logFiles.length} files in ${LOGS_DIRECTORY_NAME} directory...`);

        // I looped through each file in the Logs directory
        for (const fileName of logFiles) {
            // I constructed the full path to the current file
            const filePath = filePathModule.join(logsDirectoryPath, fileName);
            try {
                // I attempted to delete the current file
                await fileSystemPromises.unlink(filePath);
                // I outputted the name of the deleted file with a prefix
                console.log(`delete files...${fileName}`);
            } catch (error) {
                // I handled errors that occurred while deleting the current file
                if (error.code === 'EACCES' || error.code === 'EPERM') {
                    console.error(`Permission denied while deleting ${fileName}:`, error.message);
                } else if (error.code === 'ENOENT') {
                    console.error(`File ${fileName} does not exist:`, error.message);
                } else {
                    console.error(`Failed to delete ${fileName}:`, error.message);
                }
            }
        }
    }

    try {
        await fileSystemPromises.rmdir(logsDirectoryPath); // I attempted to remove the Logs directory itself
        console.log(`${LOGS_DIRECTORY_NAME} directory has been removed successfully.`);
    } catch (error) {
        // I handled errors that occurred while removing the Logs directory
        if (error.code === 'EACCES' || error.code === 'EPERM') {
            console.error(`Permission denied while removing ${LOGS_DIRECTORY_NAME} directory:`, error.message);
        } else if (error.code === 'ENOTEMPTY') {
            console.error(`Cannot remove ${LOGS_DIRECTORY_NAME} directory because it is not empty:`, error.message);
        } else {
            console.error(`Failed to remove ${LOGS_DIRECTORY_NAME} directory:`, error.message);
        }
    }
};
removeLogFiles() // I executed the removeLogFiles function and handled any unexpected errors
    .catch(error => {
        console.error('An unexpected error occurred:', error.message); // I logged any unhandled errors that occurred during the execution of removeLogFiles
    });
