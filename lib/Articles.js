import LoadMore from './LoadMore.js';

const addArticles = (pageOn, toLoad, {articles, buildArticleCallback, articlesContainer, noMoreMessage}) => {
  // grab the starting index
  const startingIndex = pageOn * toLoad;
  const endingIndex = startingIndex + toLoad;
  // build array of articles to display
  const toDisplay     = [...articles].slice(startingIndex, endingIndex);
  // display all articles
  toDisplay.forEach((article, index) => {
    let articleElement = buildArticleCallback(article, index);
    articlesContainer.appendChild(articleElement);
  });
  // check if there are no more articles to display
  if (endingIndex >= articles.length) {
    LoadMore.displayNoMoreButton(noMoreMessage);
  }
  // set loaded attribute to the container
  articlesContainer.setAttribute('data-is-loaded', '');
  // return the displayed articles
  return toDisplay;
};

const displayArticles = (numberToDisplay, {articles, handle, buildArticleCallback, articlesContainer}) => {
  const pageOn        = parseInt(articlesContainer.dataset.pageOn, 10);
  const startingIndex = pageOn * numberToDisplay;
  const toDisplay     = [...articles].slice(startingIndex, startingIndex + numberToDisplay);
  // reset the articles conatiner
  articlesContainer.innerHTML = '';
  // set the number of displayable children
  articlesContainer.dataset.numberChildren = numberToDisplay;
  // build out new articles & add to the container
  toDisplay.forEach((article, index) => {
    let articleElement = buildArticleCallback(article, index);
    articlesContainer.appendChild(articleElement);
  });
  // set loaded attribute to the container
  articlesContainer.setAttribute('data-is-loaded', '');
  // return the displayed articles
  return toDisplay;
};

export default {
  addArticles,
  displayArticles,
}
