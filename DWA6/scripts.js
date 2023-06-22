
import { books, authors, genres, BOOKS_PER_PAGE ,} from './data.js'
import { selectors } from './call copy.js'
// eslint-disable-next-line no-unused-vars
let page = 1;
let matches = books

   // Object that stores references to DOM elements using selectors

   

  
  

/**
 * This function creates a book preview element,
 * extracts necessary data from the book object,
 * and creates a button element for the preview and sets inner HTML of the button with book data.
 * @param {*} book
 * 
 */


function createBookPreview(book) {
  const { author, id, image, title } = book;
  const previewElement = document.createElement('button');
 previewElement.classList.add('preview');
  previewElement.setAttribute('data-preview', id);

 const imageElement = document.createElement('img');
 imageElement.classList.add('previewimage');
  imageElement.src = image; 
  previewElement.appendChild(imageElement);

  const infoElement = document.createElement('div');
  infoElement.classList.add('previewinfo');

  const titleElement = document.createElement('h3');
  titleElement.classList.add('previewtitle');
  titleElement.textContent = title;
  infoElement.appendChild(titleElement);

 const authorElement = document.createElement('div');
authorElement.classList.add('previewauthor');
 authorElement.textContent = authors[author];
  infoElement.appendChild(authorElement);

 previewElement.appendChild(infoElement);

  return previewElement;
}


// Creating initial book previews and appending them to the list
const starting = document.createDocumentFragment()
for (const book of matches.slice(0, BOOKS_PER_PAGE)){
    const previewElement =createBookPreview(book);
    starting.appendChild(previewElement);
}
document.addEventListener('DOMContentLoaded', () => {
  // Your code that accesses the elements and performs operations
  selectors.listItems.appendChild(starting)
});


/**
 * Function to create an option element for a dropdown
 * @param {*} value - The value of the option
 * @param {*} text - The text content of the option
 * @returns {Element} - The created option element
 */
function createOptionElement(value, text){
const element = document.createElement('option');
element.value = value;
element.innerText = text;
return element ;
}
// Creating option elements for genres and authors dropdowns
const genreHtml = document.createDocumentFragment();
const authorsHtml = document.createDocumentFragment();
genreHtml.appendChild(createOptionElement('any', 'All Genres'))
authorsHtml.appendChild(createOptionElement('any','All Authors'))
for (const [id, name] of Object.entries(genres)) {
    genreHtml.appendChild(createOptionElement(id, name))
}
for (const [id, name] of Object.entries(authors)) {
    authorsHtml.appendChild(createOptionElement(id, name))
}
selectors.searchGenres.appendChild(genreHtml)
selectors.searchAuthors.appendChild(authorsHtml)

// Checking the user's preferred color scheme and setting the theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    selectors.settingsTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    selectors.settingsTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
// Updating the list button text  and disabling it if there are no more books
selectors.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0
// Setting the inner HTML
selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;
// Adding event listeners for search and settings overlays and hearder buttons
selectors.searchCancel.addEventListener('click', () => {
    selectors.searchOverlay.open = false
})
selectors.settingsCancel.addEventListener('click', () => {
    selectors.settingsOverlay.open = false
})
selectors.headerSearch.addEventListener('click', () => {
    selectors.searchOverlay.open = true
    selectors.searchTitle.focus()
})
selectors.headerSettings.addEventListener('click', () => {
    selectors.settingsOverlay.open = true
})
selectors.listClose.addEventListener('click', () => {
    selectors.listActive.open = false
})
// Adding an event listener to the settings form submit event
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    document.querySelector('[data-settings-overlay]').open = false
})
/**
 * Function to handle the search form submission
 * @param {*} event
 */
function handleSearchFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = filterBooks(filters);
  page = 1;
  matches = result;
  toggleListMessage(result.length < 1);
  clearListItems();
  const newItems = createBookPreviews(result.slice(0, BOOKS_PER_PAGE));
  appendItemsToList(newItems);
  updateListButton();
  scrollToTop();
  closeSearchOverlay();
}
// Function to handle the 'Show More' button click
function handleListButtonClicked() {
  const fragment = document.createDocumentFragment();
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;
  const previewElements = createBookPreviews(matches.slice(start, end));
  appendItemsToList(previewElements);
  page += 1;
}
/**
 * Function to filter books
 * @param {*} filters
 * @returns
 */
function filterBooks(filters) {
  return books.filter((book) => {
    let genreMatch = filters.genre === 'any';
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }
    return (
      (filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    );
  });
}
/**
 * Function to toggle the display of the list message based on the number of matches
 * @param {*} show
 */
function toggleListMessage(show) {
  selectors.listMessage.classList.toggle('list__message_show', show);
}
// Function to clear the list items
function clearListItems() {
  selectors.listItems.innerHTML = '';
}
/**
 * Function to create book previews for a given array of books
 * @param {*} books
 * @returns {fragment}
 */
function createBookPreviews(books) {
  const fragment = document.createDocumentFragment();
  for (const book of books) {
    const previewElement = createBookPreview(book);
    fragment.appendChild(previewElement);
  }
  return fragment;
}
/**
 * Function to append items to the list
 * @param {*} items
 */
function appendItemsToList(items) {
  selectors.listItems.appendChild(items);
}
// Function to append items to the list
function updateListButton() {
  selectors.listButton.disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;
  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
}
// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function closeSearchOverlay() {
  selectors.searchOverlay.open = false;
}
// Adding event listeners for the search form submit and list button click
selectors.searchForm.addEventListener('submit', handleSearchFormSubmit);
selectors.listButton.addEventListener('click', handleListButtonClicked);
// Adding event listeners for the search form submit and list button click
selectors.listButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    for ( const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const previewElement2 = createBookPreview(book)
        fragment.appendChild(previewElement2)
    }
    selectors.listItems.appendChild(fragment)
    page += 1
})
// Adding event listener to show book details when a preview is clicked
selectors.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null
    for (const node of pathArray) {
        if (active) break
        if (node?.dataset?.preview) {
            let result = null
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            }
            active = result
        }
    }
// Updating the book details in the active book display
   

if (active) {
        selectors.listActive.open = true
        selectors.listBlur.src = active.image
        selectors.listImage.src = active.image
        selectors.listTitle.innerText = active.title
        selectors.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        selectors.listDescription.innerText = active.description
    }
});


