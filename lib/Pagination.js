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
  const previous     = buildPaginationLink(blogSettings.previousContent, 0, blogSettings);
  const next         = buildPaginationLink(blogSettings.nextContent, 1, blogSettings);
  // add to the pagination container
  blogSettings.paginationContainer.insertBefore(previous, blogSettings.paginationContainer.firstChild);
  blogSettings.paginationContainer.appendChild(next);
  // need set active/inactive states on the pagination
  setPaginationArrowPages(0, blogSettings);
}

const setPaginationArrowPages = (newPageNum, blogSettings) => {
  const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
  const numPages     = Math.ceil(blogSettings.articles.length / numToDisplay);
  // get pagination elements
  const previous = blogSettings.paginationContainer.firstChild;
  const next     = blogSettings.paginationContainer.lastChild;
  // page number values
  const previousPage = Math.max(newPageNum - 1, 0);
  const nextPage     = Math.min(newPageNum + 1, numPages - 1);
  // set new page values
  previous.dataset.page = previousPage;
  next.dataset.page     = nextPage;
  // Update pagination arrow classes based on if they point to a page other than themselves
  previous.dataset.active = (previousPage == newPageNum) ? 'inactive' : 'active';
  next.dataset.active     = (nextPage == newPageNum) ? 'inactive' : 'active';
}

// Callback for pagination events
const pageChange = (event, blogSettings) => {
  const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
  let newPageNum = parseInt(event.target.dataset.page, 10);
  // return if the new page is the same as the current page
  if (blogSettings.articlesContainer.dataset.pageOn == newPageNum) { return }
  // set the new page
  blogSettings.articlesContainer.dataset.pageOn = newPageNum;
  // display articles for new page
  const articles = Articles.displayArticles(numToDisplay, blogSettings);
  blogSettings.paginationArrows && setPaginationArrowPages(newPageNum, blogSettings);
  // send out custom event to notify page update
  const pageEvent = new CustomEvent('JSONBlogPageUpdate', { detail: {
    pageOn: newPageNum,
    numToDisplay: numToDisplay,
    articles: articles
  }});
  document.dispatchEvent(pageEvent);
}

export default {
  displayPagination: (numToDisplay, blogSettings) => {
    const articles            = blogSettings.articles;
    const paginationContainer = blogSettings.paginationContainer;
    const numPages            = Math.ceil(articles.length / numToDisplay);
    // clear out old pagination links
    paginationContainer.innerHTML = '';
    // build new pagination events
    for (let i = 0; i < numPages; i++) {
      let paginationTab = buildPaginationLink(i + 1, i, blogSettings);
      paginationContainer.appendChild(paginationTab);
    }
    // adding the pagination arrows (if applicable)
    blogSettings.paginationArrows && addPaginationArrows(blogSettings);
  }
}
