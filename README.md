# JSON Blog

This is a SPA-like blog solution. It takes in a JSON array of objects, and will display paginated views of them.

## Arguements

These are the *required* arguements:

* **buildArticleCallback** (function): callback for displaying a single article
* **container** (element): the element that should container the articles and pagination

Here is the list of *optional* arguements:

* **articles** (array of objects): objects represent articles. defaults to an empty array.
* **paginationArrows** (boolean): whether or not pagination arrows are displayed, defaults to true.
* **previousContent** (string): content to be used for the previous arrow. defaults to '&#8592;',
* **nextContent** (string): content to be used for the next arrow. defaults to '&#8594;',
* **lazyload** (boolean): whether or not the function for displaying the first page of articles should wait to be fired until the articles container is in view. defaults to false
* **lazyloadCompensation** (int): the offset for how far above the bottom of the screen (in px) the article container should be before lazyloading in. defaults to 100.

## Example

```
import JSONBlog from 'json-blog';

// all our articles & pagination goes in here
const containerElement = document.querySelector('#js-container');

// array of article objects
const jsonData         = [
	{
		"title": "This is my article title",
		"summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		"author": "Ben G"
	},
	...
];

// display our single article
const displayCallback  = (article) => {
  let articleElement   = document.createElement('article');
  let articleElement.innerHTML = `
  	<h3>${article.title}</h3>
  	<p>${article.summary}</p>
  `;
  return articleElement;
}

// This initiates our blog!
const myBlog = JSONBlog.initBlog({
  container: containerElement,
  buildArticleCallback: displayCallback,
  articles: jsonData.items
});
```

## Custom Event

The JSON Blog package includes two events custom events:

* `JSONBlogPageUpdate`: emitted when a new page is viewed. Callbacks should take in the arguements
  * newPageNum: the new page number being viewed
  * numToDisplay: the number of articles being displayed
  * articles: an array of the article objects being displayed
* `JSONBlogBreakpoint`: emitted when resizing the window causes a new breakpoint to be viewed:
  * pageOn: the page being viewed
  * numberDisplayed: the number of articles being displayed

Here's how to bind to them:

```
const myBlog = JSONBlog.initBlog({ ... });

myBlog.on('JSONBlogBreakpoint', (pageOn, numberDisplayed) => {
  console.log(`new breakpoint - ${numberDisplayed} articles displayed on page ${pageOn}`);
})

myBlog.on('JSONBlogPageUpdate', (newPageNum, numToDisplay, articles) => {
  console.log(`${newPageNum} ${numToDisplay}`);
  console.log(articles);
});
```
