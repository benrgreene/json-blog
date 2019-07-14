import Helpers from "./Helpers.js";
import Articles from "./Articles.js";

const displayNoMoreButton = (noMoreMessage) => {
  const loadMoreButton = document.querySelector('[data-load-more]');
  loadMoreButton.innerHTML = noMoreMessage;
  loadMoreButton.setAttribute('disabled', 'disabled');
};

// loads articles on loadmore click
const loadMoreArticles = (blogSettings) => {
  const loadMoreButton = document.querySelector('[data-load-more]');
  const pageOn = parseInt(loadMoreButton.dataset.pageOn, 10);
  const toLoad = parseInt(loadMoreButton.dataset.toLoad, 10);
  // build new articles
  Articles.addArticles(pageOn, toLoad, blogSettings);
  // update pageOn
  loadMoreButton.dataset.pageOn = pageOn + 1;
};

// add our loadmore button to the page
const addLoadMoreButton = (numToDisplay, blogSettings) => {
  const loadMore = document.createElement('button');
  loadMore.dataset.toLoad = numToDisplay;
  loadMore.dataset.pageOn = 1;
  loadMore.dataset.loadMore = 'true';
  loadMore.innerHTML = 'Load More';
  loadMore.addEventListener('click', (event) => {
    loadMoreArticles(blogSettings);
  });
  blogSettings.container.appendChild(loadMore);
  // check if the load more should just be disabled from the start
  if (numToDisplay >= blogSettings.articles.length) {
    displayNoMoreButton(blogSettings.noMoreMessage);
  }
};

// setup for the load more
const displayLoadMore = (numToDisplay, blogSettings) => {
  const articles = blogSettings.articles;
  const numPages = Math.ceil(articles.length / numToDisplay);
  // add the load more button
  addLoadMoreButton(numToDisplay, blogSettings);
  //loadMoreArticles(blogSettings);
};

export default {
  displayLoadMore,
  displayNoMoreButton,
}