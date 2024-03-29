const primaryNav = document.querySelector(".primary-navigation")
const navToggle = document.querySelector(".mobile-nav-toggle")

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute("data-visible")

  if (visibility === "false"){
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true)
  } else if (visibility === 'true'){
    primaryNav.setAttribute("data-visible" , false);
    navToggle.setAttribute("aria-expanded", false)
  }
})

// second
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tabindex of the current tabs to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }

  // if the right key is pushed, move to the next tabs on the right
  if (e.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
      tabFocus = 0;
    }
  }

  // if the left key is pushed, move to the next tabs on the left
  if (e.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
    }
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;
  console.log(targetTab);

  const targetPanel = targetTab.getAttribute("aria-controls");
  console.log(targetPanel);

  const targetImg = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode; // taking parent of targetTab in html
  console.log(tabContainer);

  const mainContainer = tabContainer.parentNode;
  console.log(mainContainer);

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImg}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}