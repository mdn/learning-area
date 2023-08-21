// Defining a baseURL and key to as part of the request URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'INSERT-YOUR-API-KEY-HERE';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

// Event listeners to control the functionality
