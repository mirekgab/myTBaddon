
messenger.WindowListener.registerChromeUrl([
	["content", "mirek", "chrome/content/mirek"],
]);
messenger.WindowListener.registerWindow(
	"chrome://messenger/content/messenger.html",
	"chrome://mboximport/content/mirek/messengerOL.js");
messenger.WindowListener.startListening();

async function main() {
  console.log('mybackground function main');
}

async function mirek1(result) {
  console.log('function mirek1');
  result.forEach(f => {
    console.log(f);
  })
}

main();
var m1;

function mirek1111() {
  console.log('mirek3');
  const promisedVal = messenger.accounts.list();
  promisedVal.then(val1 => mirek1(val1));
}

/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
  id: "mirek1111",
  title: browser.i18n.getMessage("mirek1111"),
  contexts: ["folder_pane"],
}, onCreated);

browser.menus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

browser.menus.create({
  id: "remove-me",
  title: browser.i18n.getMessage("menuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

browser.menus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

browser.menus.create({
  id: "greenify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemGreenify"),
  contexts: ["all"],
  checked: true,
  icons: {
    "16": "icons/paint-green-16.png",
    "32": "icons/paint-green-32.png"
  }
}, onCreated);

browser.menus.create({
  id: "bluify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemBluify"),
  contexts: ["all"],
  checked: false,
  icons: {
    "16": "icons/paint-blue-16.png",
    "32": "icons/paint-blue-32.png"
  }
}, onCreated);

browser.menus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
}, onCreated);

var checkedState = true;

browser.menus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: browser.i18n.getMessage("menuItemUncheckMe"),
  contexts: ["all"],
  checked: checkedState
}, onCreated);

browser.menus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action"
}, onCreated);

// browser.menus.create({
//   id: "tools-menu",
//   title: browser.i18n.getMessage("menuItemToolsMenu"),
//   contexts: ["tools_menu"],
// }, onCreated);



/*
Set a colored border on the document in the given tab.
Note that this only work on normal web pages, not special pages
like about:debugging.
*/
var blue = 'document.body.style.border = "5px solid blue"';
var green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  browser.tabs.executeScript(tabId, {
    code: color
  });
}

/*
Toggle checkedState, and update the menu item's title
appropriately.
Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
function updateCheckUncheck() {
  checkedState = !checkedState;
  if (checkedState) {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}



/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "remove-me":
      var removing = browser.menus.remove(info.menuItemId);
      removing.then(onRemoved, onError);
      break;
    case "bluify":
      borderify(tab.id, blue);
      break;
    case "greenify":
      borderify(tab.id, green);
      break;
    case "check-uncheck":
      updateCheckUncheck();
      break;
    case "open-sidebar":
      console.log("Opening my sidebar");
      break;
    case "tools-menu":
      console.log("Clicked the tools menu item");
      break;
    case "mirek1111":
      mirek1111();
      break;
  }
});
