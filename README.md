# JSON Blog

This is a SPA-like blog solution. It takes in a JSON array of objects, and will display paginated views of them.

## Arguements

These are the required arguements:

* **buildArticleCallback** (function): callback for displaying a single article
* **container** (element): the element that should container the articles and pagination

## Example

```
import JSONBlog from 'json-blog';

// all our articles & pagination goes in here
const containerElement = document.querySelector('#js-container');

// array of article objects
const jsonData         = [...];

// display our single article
const displayCallback  = (article) => {
  let articleElement   = document.createElement('article');
  ...
  return articleElement;
}

JSONBlog.initBlog({
  container: containerElement,
  buildArticleCallback: displayCallback,
  articles: jsonData.items
});
```