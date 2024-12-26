import * as events from "./src/events.js";
import { nameDryad, nameSpirit } from "./src/events.js";
import {
  store,
  loadStore,
  saveStore,
} from "./src/store.js";


const EVENTS = {};
Object.values(events).forEach((event) => {
  EVENTS[event.key] = event;
});


/**
 *
 * @param {String} eventId
 * @description Creates a tile for the specified event and returns the tile element.
 * @returns {JQuery<HTMLElement>} The tile element
 */
function createTile(eventId) {
  const event = EVENTS[eventId];

  // Create tile container
  const $tile = $("<div>", { class: "tile", id: `tile-${eventId}` });

  // Add title
  $("<h3>").text(event.title).appendTo($tile);

  // Add input prompt and text field if input is allowed
  if (event.allowInput) {
    $("<p>").text(event.inputPrompt).appendTo($tile);
    $("<input>", {
      type: "text",
      id: `input-${eventId}`,
      placeholder: "Type your description here...",
      required: true,
    }).appendTo($tile);
  }

  // Add button
  $("<button>")
    .text("Continue")
    .on("click", () => resolveTile(eventId))
    .appendTo($tile);

  return $tile;
}

/**
 *
 * @param {String} eventId
 * @description Resolves the event associated with the specified eventId.
 * @returns {void}
 */
function resolveTile(eventId) {
  const event = EVENTS[eventId];

  const $tile = $(`#tile-${eventId}`);

  // Handle player input for events that require it
  if (event.allowInput) {
    const playerInput = $(`#input-${eventId}`).val().trim();
    event.handleInput(store, playerInput);
  }
  $tile.remove();
  addLogItem(event.key, event.message);
  checkAndUnlockNextTiles();
}


function addLogItem(eventId, message, skipStore = false) {
  // Replace placeholders with actual names
  // (TODO - make this more dynamic)
  message = (message || "")
    .replace("{dryadName}", store.dryadName)
    .replace("{spiritName}", store.spiritName)
    .replace("{wizardDescription}", store.wizardDescription)
    .replace("{wolfName}", store.wolfName);

  const $log = $("#event-log");
  const $logItem = $("<li>", { class: "log-item" });
  $logItem.text(message);
  $log.append($logItem);
  // scroll to bottom of log
  $log.scrollTop($log[0].scrollHeight);

  if (!skipStore) {
    store.eventLog.push({
      eventId,
      message,
    });
  }
}


/**
 * @param {Number} n - Number of tiles set to
 * @description Checks for events whose prerequisites are now satisfied and unlocks them.
 *  Adds until there are N Tiles
 * @returns {void}
 */
function checkAndUnlockNextTiles(n = 3) {
  // Check for events whose prerequisites are now satisfied
  const completedTiles = new Set(store.eventLog.map((logEntry) => logEntry.eventId));
  Object.values(events).forEach((event) => {
    // Ensure the event isn't already completed or already visible
    if (
      !completedTiles.has(event.key)
      && $(`#tile-${event.key}`).length === 0
      && $("#tiles-container").children().length < n  // Limit the number of tiles
    ) {
      // Check if all prerequisites for the next event are satisfied
      if (event.prerequisites.every((prereq) => completedTiles.has(prereq))) {
        const $newTile = createTile(event.key);
        $("#tiles-container").append($newTile);
      }
    }
  });
}


// Initialize with the first tile
$(document).ready(() => {
  const $container = $("#tiles-container");
  $container.append(createTile("mirror"));

  $("#save-game").on("click", saveStore);
  $("#load-game").on("click", () => {
    loadStore();
    store.eventLog.forEach((logEntry) => {
      addLogItem(logEntry.eventId, logEntry.message);
    });
    $("#tiles-container").empty(); // Clear existing tiles
    checkAndUnlockNextTiles();
  });
});
