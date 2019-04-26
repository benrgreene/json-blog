import Helpers from "./lib/Helpers.js";
import Articles from "./lib/Articles.js";
import Pagination from "./lib/Pagination.js";

// Add all our event listeners for the blog instance
const addListeners = (blogSettings) => {
  // On resize, need to check if the blog article count updates
  window.addEventListener('resize', () => {
    const numToDisplay    = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
    const numberDisplayed = Helpers.numberDisplayed(blogSettings);
    // update the articles only if the number to display isn't equal to the number ACTUALLY displayed
    if (numberDisplayed == numToDisplay) { return };
    // only display if there is no lazyloading OR the articles are in view anyway
    const shouldDisplay = !blogSettings.lazyload || articlesAreInView(blogSettings);
    shouldDisplay && Articles.displayArticles(numToDisplay, blogSettings);
    shouldDisplay && Pagination.displayPagination(numToDisplay, blogSettings);
  });

  // If there's lazyloading, then we'll add a scroll listener for adding
  // the articles into existence.
  blogSettings.lazyload && document.addEventListener('scroll', (event) => {
    const articlesLoaded = articlesAlreadyLoaded(blogSettings);
    const inView         = articlesAreInView(blogSettings);
    // If the articles aren't already loaded AND are in view, load them in
    if (!articlesLoaded && inView) {
      Articles.displayArticles(numToDisplay, blogSettings);
      Pagination.displayPagination(numToDisplay, blogSettings);
    }
  });
}

export default {
  initBlog: (baseSettings={}) => {
    // ensure defaults are added
    const blogSettings = Helpers.defaultSettings(baseSettings);
    addListeners(blogSettings);
    // display the initial articles
    const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
    // only display if there is no lazyloading OR the articles are in view anyway
    const shouldDisplay = !blogSettings.lazyload || articlesAreInView(blogSettings);
    shouldDisplay && Articles.displayArticles(numToDisplay, blogSettings);
    shouldDisplay && Pagination.displayPagination(numToDisplay, blogSettings);
  }
}
