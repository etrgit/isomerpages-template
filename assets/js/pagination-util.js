// Populate the pagination elements
function displayPagination() {
  document.querySelector(".pagination").style.display = "flex";
  var pagination = document.getElementById('paginator-pages');
  
  for (let i = 0; i < pageResults.length; i++) {
    let ele = document.createElement("span");
    let text = document.createTextNode(i + 1);
    
    ele.appendChild(text);
    ele.onclick = function(e) {
      changePage(e.target, i)
    }
    pagination.appendChild(ele);
  }

  // Initialise selected page and nav arrows
  setCurrentPage(pagination.firstElementChild);
  displayNavArrows(currentPageIndex);
  setNavArrowHandlers();
}

// Set click handlers for nav arrows
function setNavArrowHandlers() {
  let left = document.querySelector(".pagination .sgds-icon.sgds-icon-arrow-left");
  let right = document.querySelector(".pagination .sgds-icon.sgds-icon-arrow-right");
  let sel = document.querySelector("#paginator-pages .selected-page");

  left.onclick = function(e) {
    let sel = document.querySelector("#paginator-pages .selected-page");
    changePage(sel.previousElementSibling, currentPageIndex - 1)
  }

  right.onclick = function(e) {
    let sel = document.querySelector("#paginator-pages .selected-page");
    changePage(sel.nextElementSibling, currentPageIndex + 1)
  }
}

function changePageUtil(curr, index) {
  let prev = document.querySelector("#paginator-pages .selected-page");
  prev.className = "";
  prev.style.pointerEvents = "auto";
  currentPageIndex = index;
  setCurrentPage(curr);
  displayNavArrows(index);
  scrollToTop();
}

function displayNavArrows(i) {
  let left = document.querySelector(".pagination .sgds-icon.sgds-icon-arrow-left");
  let right = document.querySelector(".pagination .sgds-icon.sgds-icon-arrow-right");

  if (i === 0) {
    left.classList.add("sgds-icon-disabled");
  } else {
    left.classList.remove("sgds-icon-disabled");
  }
  if (i === pageResults.length - 1) {
    right.classList.add("sgds-icon-disabled")
  } else {
    right.classList.remove("sgds-icon-disabled");
  }
}

function resetDisplayPages(pages) {
  for (let p = 0; p < pages.length; p++) {
    pages[p].classList.add("is-hidden-mobile");
    pages[p].style.display = "none";
  }
}

// function to ensure that number of pagination btns 
// displayed are constant
function computeAdjacentPages(max) {
  let btns = max;
  if (currentPageIndex < max) {
    btns += max - currentPageIndex;
  }
    if ((pageResults.length - currentPageIndex - 1) < max) {
    btns += max - (pageResults.length - currentPageIndex - 1);
  }
    return btns;
}

function setCurrentPage(ele) {
  var pages = document.getElementById('paginator-pages').children;
  resetDisplayPages(pages);

  ele.className = "selected-page";
  ele.style.display = "inline-block";
  ele.style.pointerEvents = "none";

  for (let i = 1; i <= computeAdjacentPages(MAX_ADJACENT_PAGE_BTNS); i++) {
    if (pages[currentPageIndex + i]) {
      pages[currentPageIndex + i].style.display = "inline-block";
    }
     if (pages[currentPageIndex - i]) {
      pages[currentPageIndex - i].style.display = "inline-block";
    }
  }
   for (let i = 1; i <= computeAdjacentPages(MAX_ADJACENT_MOBILE_PAGE_BTNS); i++) {
    if (pages[currentPageIndex + i]) {
      pages[currentPageIndex + i].classList.remove("is-hidden-mobile");
    }
     if (pages[currentPageIndex - i]) {
      pages[currentPageIndex - i].classList.remove("is-hidden-mobile");
    }
  }
}

function splitPages(results, pageSize) {
  var tempArray = [];

  for (let i = 0; i < results.length; i += pageSize) {
      var chunk = results.slice(i, i + pageSize);
      tempArray.push(chunk);
  }

  return tempArray;
}

function scrollToTop() {
  // scroll to top of results
  window.scroll({top: 0, left: 0, behavior: 'smooth' })
}
