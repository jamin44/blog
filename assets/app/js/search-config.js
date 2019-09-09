SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>', // 文章列表模板
    noResultsText: '没有搜索到文章', // 无搜索数据提示语
    limit: 20, // 返回最大文章数
    fuzzy: false // 是否模糊匹配
  })