let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
function getTabID() {
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({
                currentWindow: true,
                active: true,
            }, function (tabs) {
                resolve(tabs[0].id);
            })
        } catch (e) {
            reject(e);
        }
    })
}
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" called`);
    doRes()
});
async function doRes() {
    let responseTabID = await getTabID();
    console.log(`Command "${responseTabID}" called`);
    chrome.scripting.executeScript({
            target: { tabId: responseTabID },
            function: function(){
                document.getElementById("multi_page").getElementsByClassName("list-box")[0].getElementsByClassName("on")[0].nextElementSibling.getElementsByClassName("router-link-active")[0].click()
                location.reload();
            },
        }
    );
}

function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) {
            callback(tabs.length ? tabs[0].id: null);
        }
    });
}
