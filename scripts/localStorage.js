function saveToLocalStorage(data) {
    // Get current values that are saved into local storage
    // Create an array of values to store into local storage
    let favorites = getLocalStorage();

    // Add new name to our favorites array
    favorites = data;

    // Save updated array to local storage
    localStorage.setItem('Data', JSON.stringify(favorites));
}

function getLocalStorage() {
    // Get all of the values that are stored in favorites in local storage
    let localStorageData = localStorage.getItem('Data');

    if (localStorageData === null) {
        return {
            budget: null,
            expenses: [],
            totalExp: 0
        };
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name) {
    let favorites = getLocalStorage();

    // Find the index of the name in local storage
    let nameIndex = favorites.indexOf(name);

    // Remove the name from the array using splice method
    favorites.splice(nameIndex, 1);

    // Save Updated array to local storage
    localStorage.setItem('Data', JSON.stringify(favorites));
}

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };