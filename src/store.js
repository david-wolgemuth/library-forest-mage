
const KEY = "store";
const store = {
  eventLog: [
    // Example event log entry
    // {
    //   eventId: "mirror",
    //   responseText: "You see a wizard.",
    // },
  ],

  dryadName: null, // Initially null; populated when the dryad is named
  spiritName: null, // Initially null; populated when the spirit is named
};

/**
 * @description Saves the store to local storage
 */
function saveStore() {
  localStorage.setItem(KEY, JSON.stringify(store));
}

/**
 * @description Loads the store from local storage
 */
function loadStore() {
  const _store = JSON.parse(localStorage.getItem(KEY));
  if (_store) {
    Object.assign(store, _store);
  }
}

export {
  store,
  saveStore,
  loadStore,
};
