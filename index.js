import EventEmitter from "./lib/EventEmitter.js";
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
    if (blogSettings.lazyload && !Helpers.articlesAreInView(blogSettings)) { return; }
    // need to display new articles, paginations, and send event for new breakpoint reached
    Articles.displayArticles(numToDisplay, blogSettings);
    Pagination.displayPagination(numToDisplay, blogSettings);
    blogSettings.emitter.emit('JSONBlogBreakpoint',
                              parseInt(blogSettings.articlesContainer.dataset.pageOn, 10),
                              numToDisplay);
  });

  // If there's lazyloading, then we'll add a scroll listener for adding
  // the articles into existence.
  blogSettings.lazyload && document.addEventListener('scroll', (event) => {
    const numToDisplay   = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
    const articlesLoaded = Helpers.articlesAlreadyLoaded(blogSettings);
    const inView         = Helpers.articlesAreInView(blogSettings);
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
    // our custom event emitter for the blog
    blogSettings.emitter = new EventEmitter();
    // resize listener for checking breakpoints
    addListeners(blogSettings);
    // display the initial articles
    const numToDisplay = Helpers.maxNumberToDisplay(blogSettings.breakpoints);
    // only display if there is no lazyloading OR the articles are in view anyway
    if (blogSettings.lazyload && !Helpers.articlesAreInView(blogSettings)) { return; }
    Articles.displayArticles(numToDisplay, blogSettings);
    Pagination.displayPagination(numToDisplay, blogSettings);
    // send back the event emmiter for users to attach to
    return blogSettings.emitter;
  }
}
