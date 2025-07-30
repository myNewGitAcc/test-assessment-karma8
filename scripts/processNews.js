'use strict';

const state = {
  articles: [],
  currentPage: 0,
  totalPages: 0
};

const getImgPath = (imgName, css = false) => {
  const path = `data/news/images/${imgName}`;
  return css ? `url(${path})` : path;
};

const timeAgo = (iso) => {
  const seconds = Math.floor((new Date() - new Date(iso)) / 1000);
  const intervals = [
    { label: 'yr', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hr', seconds: 3600 },
    { label: 'min', seconds: 60 },
    { label: 'sec', seconds: 1 }
  ];
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
};

/**
 * Populates container with data from its template using functions from dataMapper.
 * @param templateId {string} - The ID of the <template> element to clone.
 * @param dataMapper {Array<(clone: DocumentFragment) => void>}
 *  An array of functions. Each function receives a cloned template fragment
 *  and is responsible for populating it with data.
 * @param parentSelector {string} - CSS selector for the parent container to append clones to.
 */
const renderTemplate = (templateId, dataMapper, parentSelector) => {
  const template = document.getElementById(templateId);
  const parent = document.querySelector(parentSelector);
  const fragment = document.createDocumentFragment();
  dataMapper.forEach((handle) => {
    const clone = template.content.cloneNode(true);
    handle(clone);
    fragment.appendChild(clone);
  });
  parent.appendChild(fragment);
};

const loadArticles = async (page = 1) => {
  const [primary, secondary] = await Promise.all([
    fetch(`data/news/primary.json`).then((res) => res.json()),
    fetch(`data/news/secondary.json`).then((res) => res.json())
  ]);
  const totalPages = primary.pagination.totalPages;
  if (page < 1 || page > totalPages) throw new Error('Invalid page range');
  return {
    main: primary.main,
    primaryArticles: primary.pages[page],
    secondaryArticles: secondary.data,
    currentPage: page,
    totalPages
  };
};

const relocateButtons = () => {
  const buttons = document.querySelector('.article-buttons');
  const titleWrapper = document.querySelector('.title-wrapper');
  const mainArticle = document.querySelector('#main-article');

  const isMobile = window.innerWidth <= 768;

  if (isMobile && titleWrapper.contains(buttons)) {
    // Move it out, after #main-article
    mainArticle.after(buttons);
  } else if (!isMobile && !titleWrapper.contains(buttons)) {
    // Move it back inside title-wrapper
    titleWrapper.appendChild(buttons);
  }

  window.addEventListener('resize', relocateButtons);
  window.addEventListener('DOMContentLoaded', relocateButtons);
};

const init = async () => {
  try {
    const {
      main,
      primaryArticles,
      secondaryArticles,
      currentPage,
      totalPages
    } = await loadArticles();
    Object.assign(state, { currentPage, totalPages });

    // Main Article
    const mainContainer = document.getElementById('main-article');
    mainContainer.style.backgroundImage = getImgPath(main.img, true);
    renderTemplate(
      'main-article-template',
      [
        (el) => {
          el.querySelector('.title').textContent = main.title;
          el.querySelectorAll('.article-link').forEach(
            (a) => (a.href = main.url)
          );
        }
      ],
      '#main-article'
    );

    // Secondary Articles
    renderTemplate(
      'secondary-article-template',
      secondaryArticles.map((article) => (el) => {
        el.querySelector('.title').textContent = article.title;
        el.querySelector('.description-secondary').textContent =
          article.content;
        el.querySelector('.tags').textContent =
          `${timeAgo(article.timestamp)} | ${article.tag}`;
        el.querySelector('a').href = article.url;
      }),
      '#secondary-articles'
    );

    // Primary Articles
    const renderRestPrimary = (articles) =>
      renderTemplate(
        'primary-article-template',
        articles.map((article) => (el) => {
          el.querySelector('img').src = getImgPath(article.img);
          el.querySelector('.title').textContent = article.title;
          el.querySelector('.description-primary').textContent =
            article.content;
          el.querySelector('.tags').textContent =
            `${timeAgo(article.timestamp)} | ${article.tag}`;
          el.querySelector('a').href = article.url;
        }),
        '#primary-articles'
      );

    renderRestPrimary(primaryArticles);
    relocateButtons();

    // Pagination
    document
      .getElementById('readMore')
      .addEventListener('click', async function () {
        const nextPage = state.currentPage + 1;
        if (nextPage >= state.totalPages) this.remove();
        const { primaryArticles, currentPage } = await loadArticles(nextPage);
        renderRestPrimary(primaryArticles);
        Object.assign(state, { currentPage });
      });
  } catch (err) {
    console.error('Failed to load articles:', err);
  }
};

init();
