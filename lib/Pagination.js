import Helpers from "./Helpers.js";
import Articles from "./Articles.js";

// build out pagination elements
const buildPaginationLink = (content, pageNumber, blogSettings) => {
  let paginationTab = document.createElement('li');
  paginationTab.innerHTML = content;
  paginationTab.dataset.page = pageNumber;
  paginationTab.addEventListener('click', (event) => {
    pageChange(event, blogSettings);
  });
  return paginationTab;
}

// Add pagination arrows to the pagination container
const addPaginationArrows = (blogSettings) => {
  const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
  // build arrows
  const previous     = buildPaginationLink('previous', 0, blogSettings);
  const next         = buildPaginationLink('next', 1, blogSettings);
  // add to the pagination container
  blogSettings.paginationContainer.insertBefore(previous, blogSettings.paginationContainer.firstChild);
  blogSettings.paginationContainer.appendChild(next);
}

const setPaginationArrowPages = (newPageNum, blogSettings) => {
  const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
  const numPages     = Math.ceil(blogSettings.articles.length / numToDisplay);
  // get pagination elements
  const previous = blogSettings.paginationContainer.firstChild;
  const next     = blogSettings.paginationContainer.lastChild;
  // set new page values
  previous.dataset.page = Math.max(newPageNum - 1, 0);
  next.dataset.page     = Math.min(newPageNum + 1, numPages - 1);
}

// Callback for pagination events
const pageChange = (event, blogSettings) => {
  const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
  let newPageNum = parseInt(event.target.dataset.page, 10);
  // set the new page
  blogSettings.articlesContainer.dataset.pageOn = newPageNum;
  // display articles for new page
  Articles.displayArticles(numToDisplay, blogSettings);
  setPaginationArrowPages(newPageNum, blogSettings);
}

export default {
  displayPagination: (numToDisplay, blogSettings) => {
    const articles            = blogSettings.articles;
    const paginationContainer = blogSettings.paginationContainer;
    const numPages = Math.ceil(articles.length / numToDisplay);
    // clear out old pagination links
    paginationContainer.innerHTML = '';
    // build new pagination events
    for (let i = 0; i < numPages; i++) {
      let paginationTab = buildPaginationLink(i + 1, i, blogSettings);
      paginationContainer.appendChild(paginationTab);
    }
    // adding the pagination arrows
    addPaginationArrows(blogSettings);
  }
}
