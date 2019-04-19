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

    Articles.displayArticles(numToDisplay, blogSettings);
    Pagination.buildPagination(numToDisplay, blogSettings);
  });
}

export default {
  initBlog: (baseSettings={}) => {
    // ensure defaults are added
    const blogSettings = Helpers.defaultSettings(baseSettings);
    // display the initial articles
    const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
    Articles.displayArticles(numToDisplay, blogSettings);
    addListeners(blogSettings);
  }
}
