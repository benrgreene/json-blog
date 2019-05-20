// check if the articles container is in the viewport (used for lazyloading)
const articlesAreInView = ({articlesContainer, lazyloadCompensation}) => {
  const documentHeight   = window.innerHeight;
  const documentPosition = document.documentElement.scrollTop;
  const articlesPosition = articlesContainer.offsetTop;
  return (articlesPosition < (documentHeight - lazyloadCompensation) + documentPosition);
}

const articlesAlreadyLoaded = ({articlesContainer}) => {
  return articlesContainer.hasAttribute('data-is-loaded');
}

const addBlogElements = ({container, classes=[], paginationClasses=[]}) => {
  // build the article container
  let newArticleContainer = document.createElement('div');
  // add custom classes to the article container
  (classes.length > 0) && newArticleContainer.classList.add(...classes);
  // set default page on info
  newArticleContainer.dataset.pageOn = 0;
  // add the article container to the page
  container.appendChild(newArticleContainer);
  // build the pagination container
  let newPaginationContainer = document.createElement('ul');
  // add any custom pagination classes
  (paginationClasses.length > 0) && newPaginationContainer.classList.add(...paginationClasses);
  // add pagination container to the page
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
    const blogElements = addBlogElements(settings);
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
      lazyload: false,
      lazyloadCompensation: 100,
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
    return articlesContainer.dataset.numberChildren;
  },
  articlesAreInView: articlesAreInView,
  articlesAlreadyLoaded: articlesAlreadyLoaded
}
