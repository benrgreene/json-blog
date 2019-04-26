export default {
  displayArticles: (numberToDisplay, {articles, handle, buildArticleCallback, articlesContainer}) => {
    const pageOn           = parseInt(articlesContainer.dataset.pageOn, 10);
    const startingIndex    = pageOn * numberToDisplay;
    const toDisplay        = [...articles].slice(startingIndex, startingIndex + numberToDisplay);
    // reset the articles conatiner
    articlesContainer.innerHTML = '';
    // build out new articles & add to the container
    toDisplay.forEach((article, index) => {
      let articleElement = buildArticleCallback(article, index);
      articlesContainer.appendChild(articleElement);
    });
    // set loaded attribute to the container
    articlesContainer.setAttribute('data-is-loaded', '');
  }
}
