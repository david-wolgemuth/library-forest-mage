
/**
 * @class GameEvent
 * @description Represents a game event with a title, message, prerequisites, and impediments.
 * @param {String} key The unique key for the event
 * @param {String} title The title of the event
 * @param {String} message The message displayed to the player
 * @param {Array<String>} prerequisites An array of prerequisite event IDs
 *    (those which must be completed before this event can be triggered)
 * @param {Array<String>} impediments An array of impediment event IDs
 *    (those which -if completed- would make this event not able to be triggered)
 * @param {Boolean} allowInput Flag to indicate player input is required
 * @param {String} inputPrompt Input prompt for the player
 * @param {Function} handleInput Function to handle player input
 */
class GameEvent {
  constructor({
    key,
    title,
    message,

    prerequisites = [],
    impediments = [],

    // Input
    allowInput = false,
    inputPrompt = "",
    handleInput = () => { },
  }) {
    this.key = key;
    this.title = title;
    this.message = message;
    this.prerequisites = prerequisites || [];
    this.impediments = impediments || [];
    this.allowInput = allowInput || false;
    this.inputPrompt = inputPrompt || "";
    this.handleInput = handleInput || (() => { });
  }
}

export const mirror = new GameEvent({
  key: "mirror",
  title: "Look in the Mirror",
  message: "You are a wizard. Your reflection stares back, full of potential and purpose.",
  allowInput: true,
  inputPrompt: "What do you see? Describe yourself as a wizard:",
  handleInput: (store, input) => {
    store.wizardDescription = input;
  },
});

export const lookAround = new GameEvent({
  key: "look-around",
  title: "Look Around You",
  message: "You are deep within an enchanted forest. The air hums with forgotten magic, the ground thick with untamed growth.",
});

export const lookInside = new GameEvent({
  key: "look-inside",
  title: "Look Inside",
  message: "Your goal is clear: to grow a magical colony, a haven for mystical beings, and to protect this enchanted land.",
});

export const clearSpace = new GameEvent({
  key: "clear-space",
  title: "Clear Space for a Basic Hut",
  message: "The forest is dense here. You need to make room for the simplest of shelters.",
  prerequisites: [lookInside.key],
});

export const gatherMaterials = new GameEvent({
  key: "gather-materials",
  title: "Start Gathering Materials",
  message: "Using your magic, begin gathering basic materials from the surroundings.",
  prerequisites: [clearSpace.key],
});

export const lookCreatures = new GameEvent({
  key: "look-creatures",
  title: "Look Out for Creatures",
  message: "Reach out with your magic to sense creatures nearby. Some may be friendly, others dangerous.",
  prerequisites: [gatherMaterials.key],
});

export const welcomeSprite = new GameEvent({
  key: "welcome-sprite",
  title: "Welcome a Forest Sprite",
  message: "A small forest sprite emerges from the undergrowth. It seems curious and willing to help. What will you name it?",
  prerequisites: [lookCreatures.key],
  allowInput: true,
  inputPrompt: "Name the forest sprite:",
  handleInput: (store, input) => {
    store.spriteName = input;
  },
});

export const buildBasicHut = new GameEvent({
  key: "build-basic-hut",
  title: "Build a Basic Hut",
  message: "With space cleared, you can construct a simple hut for shelter. It won't be much, but it's a start.",
  prerequisites: [clearSpace.key],
});

export const exploreGrove = new GameEvent({
  key: "explore-grove",
  title: "Explore the Nearby Grove",
  message: "The grove nearby hums with magical energy. Shall we investigate?",
  prerequisites: [lookAround.key],
});

export const findWolf = new GameEvent({
  key: "find-wolf",
  title: "A Wolf Appears",
  message: "A massive wolf with glowing eyes watches from the shadows. It seems to be evaluating you.",
  prerequisites: [exploreGrove.key],
});

export const nameWolf = new GameEvent({
  key: "name-wolf",
  title: "Name the Wolf",
  message: "The wolf approaches and bows its head slightly, waiting for your command. It has no name. What will you call it?",
  prerequisites: [findWolf.key],
  allowInput: true,
  inputPrompt: "Name the wolf:",
  handleInput: (store, input) => {
    store.wolfName = input;
  },
});

export const wolfTrust = new GameEvent({
  key: "wolf-trust",
  title: "Earn the Wolf's Trust",
  message: "{wolfName} is cautious. It seems to require a gesture of goodwill before fully trusting you.",
  prerequisites: [nameWolf.key],
});

export const buildWolfDen = new GameEvent({
  key: "build-wolf-den",
  title: "Construct a Wolf Den",
  message: "A proper den might help {wolfName} feel at home. Shall we build it?",
  prerequisites: [wolfTrust.key],
});

export const gatherHerbs = new GameEvent({
  key: "gather-herbs",
  title: "Gather Magical Herbs",
  message: "The grove is rich with magical herbs. Harvesting them might prove useful for alchemy or healing.",
  prerequisites: [exploreGrove.key],
});

export const learnAlchemy = new GameEvent({
  key: "learn-alchemy",
  title: "Learn Alchemy",
  message: "The herbs you've gathered could be used for powerful potions. Shall we begin experimenting?",
  prerequisites: [gatherHerbs.key],
});

export const buildWorkshop = new GameEvent({
  key: "build-workshop",
  title: "Construct a Workshop",
  message: "A workshop would allow you to craft tools and experiment with magical materials.",
  prerequisites: [buildBasicHut.key, gatherMaterials.key],
});

export const expandClearing = new GameEvent({
  key: "expand-clearing",
  title: "Expand the Clearing",
  message: "The current space feels cramped. Shall we clear more of the forest to grow the colony?",
  prerequisites: [buildBasicHut.key],
});

export const meetDryad = new GameEvent({
  key: "meet-dryad",
  title: "Meet a Dryad",
  message: "A dryad emerges from a nearby tree, curious about your work. It offers guidance in exchange for your protection of the forest.",
  prerequisites: [expandClearing.key],
});

export const nameDryad = new GameEvent({
  key: "name-dryad",
  title: "Name the Dryad",
  message: "The dryad has no name. It looks at you expectantly, waiting to be claimed as part of your colony.",
  prerequisites: [meetDryad.key],
  allowInput: true,
  inputPrompt: "Name the dryad:",
  handleInput: (store, input) => {
    store.dryadName = input;
  },
});

export const buildGatheringHall = new GameEvent({
  key: "build-gathering-hall",
  title: "Construct a Gathering Hall",
  message: "A central place for your magical beings to meet and plan could help organize the colony.",
  prerequisites: [buildBasicHut.key, nameDryad.key],
});

export const defendFromThreat = new GameEvent({
  key: "defend-from-threat",
  title: "Defend Against a Threat",
  message: "A shadowy figure looms at the edge of the clearing. It feels hostile. What shall we do?",
  prerequisites: [expandClearing.key, meetDryad.key],
});

export const researchMagic = new GameEvent({
  key: "research-magic",
  title: "Research New Magic",
  message: "The knowledge you've gained from the grove and dryad offers new magical insights. Shall we study them?",
  prerequisites: [meetDryad.key, learnAlchemy.key],
});

export const discoverCave = new GameEvent({
  key: "discover-cave",
  title: "Discover a Hidden Cave",
  message: "While expanding the clearing, you stumble upon the entrance to a dark cave. Shall we explore?",
  prerequisites: [expandClearing.key],
});

export const exploreCave = new GameEvent({
  key: "explore-cave",
  title: "Explore the Cave",
  message: "The cave entrance is dark and foreboding, but you sense untold treasures and dangers within.",
  prerequisites: [discoverCave.key],
});

export const meetSpirit = new GameEvent({
  key: "meet-spirit",
  title: "Encounter a Spirit",
  message: "A ghostly spirit floats toward you. It seems tied to the magic of this land.",
  prerequisites: [exploreCave.key],
});

export const nameSpirit = new GameEvent({
  key: "name-spirit",
  title: "Name the Spirit",
  message: "The spirit lingers, awaiting your recognition. Shall we name it and invite it to join us?",
  prerequisites: [meetSpirit.key],
  allowInput: true,
  inputPrompt: "Name the spirit:",
  handleInput: (store, input) => {
    store.spiritName = input;
  },
});

export const buildLibrary = new GameEvent({
  key: "build-library",
  title: "Build a Magical Library",
  message: "{spiritName} suggests creating a library to preserve magical knowledge. Shall we begin?",
  prerequisites: [nameSpirit.key],
});

export const tradeWithForest = new GameEvent({
  key: "trade-with-forest",
  title: "Trade with the Forest",
  message: "*{dryadName}* suggests a trade system to balance your needs with the forest's preservation.",
  prerequisites: [nameDryad.key],
});

export const prepareForWinter = new GameEvent({
  key: "prepare-for-winter",
  title: "Prepare for Winter",
  message: "The air grows colder. Supplies are needed to ensure the colony's survival through the harsh winter.",
  prerequisites: [expandClearing.key, buildBasicHut.key],
});
