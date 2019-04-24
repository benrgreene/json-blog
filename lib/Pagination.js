export default {
  displayPagination: (numToDisplay, blogSettings, pageChange) => {
    const articles            = blogSettings.articles;
    const paginationContainer = blogSettings.paginationContainer;
    const numPages = Math.ceil(articles.length / numToDisplay);
    for (let i = 0; i < numPages; i++) {
      let paginationTab = document.createElement('li');
      paginationTab.innerHTML = `${i + 1}`;
      paginationTab.dataset.page = i;
      paginationTab.addEventListener('click', (event) => {
        pageChange(event, blogSettings);
      });
      paginationContainer.appendChild(paginationTab);
    }
  },
  addPaginationArrows: () => {

  }
}
