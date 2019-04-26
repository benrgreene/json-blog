const addBlogElements = (container) => {
  // build the article container
  let newArticleContainer = document.createElement('div');
  //newArticleContainer.setAttribute('id', `jsonblog-${handle}`);
  newArticleContainer.dataset.pageOn = 0;
  container.appendChild(newArticleContainer);
  // build the pagination container
  let newPaginationContainer = document.createElement('ul');
  container.appendChild(newPaginationContainer);

  return {
    articlesContainer: newArticleContainer,
    paginationContainer: newPaginationContainer
  }
};

export default {
  defaultSettings: (settings) => {
    // ensure we've got a callback for displaying articles, our blog handle, and somewhere to put the articles
    if (!settings.buildArticleCallback) { throw new Error('setting parameter "buildArticleCallback" (function) is not defined!'); }
    if (!settings.container) { throw new Error('setting parameter "container" (element) is not defined!'); }
    // our new elements to hold the articles and the pagination
    const blogElements = addBlogElements(settings.container);
    // combine all the settings into one object
    return Object.assign({
      breakpoints: [
        {
          width: 0,
          numberArticles: 3
        },
        {
          width: 650,
          numberArticles: 6
        }
      ],
      articles: [],
      paginationArrows: true,
      previousContent: '&#8592;',
      nextContent: '&#8594;'
    }, blogElements, settings);
  },
  maxNumberToDisplay: (breakpoints) => {
    const windowWidth = window.innerWidth;
    const toDisplay   = breakpoints.reduce((bestBreakpoint, breakpoint) => {
      if (windowWidth > breakpoint.width && breakpoint.width > bestBreakpoint.width) {
        bestBreakpoint = breakpoint;
      }
      return bestBreakpoint;
    }, { width: -1, numberArticles: 3 });
    return toDisplay.numberArticles;
  },
  numberDisplayed: ({articlesContainer}) => {
    return articlesContainer.childElementCount;
  }
}
