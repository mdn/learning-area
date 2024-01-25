// Create constants
const section = document.querySelector('section');
const videos = [
  { 'name' : 'crystal' },
  { 'name' : 'elf' },
  { 'name' : 'frog' },
  { 'name' : 'monster' },
  { 'name' : 'pig' },
  { 'name' : 'rabbit' }
];
// Create an instance of a db object for us to store our database in
let db;

function init() {
  // Loop through the video names one by one
  for(const video of videos) {
    // Open transaction, get object store, and get() each video by name
    const objectStore = db.transaction('videos_os').objectStore('videos_os');
    const request = objectStore.get(video.name);
    request.addEventListener('success', () => {
      // If the result exists in the database (is not undefined)
      if(request.result) {
        // Grab the videos from IDB and display them using displayVideo()
        console.log('taking videos from IDB');
        displayVideo(request.result.mp4, request.result.webm, request.result.name);
      } else {
        // Fetch the videos from the network
        fetchVideoFromNetwork(video);
      }
    });
  }
}

// Define the fetchVideoFromNetwork() function
function fetchVideoFromNetwork(video) {
  console.log('fetching videos from network');
  // Fetch the MP4 and WebM versions of the video using the fetch() function,
  // then expose their response bodies as blobs
  const mp4Blob = fetch(`videos/${video.name}.mp4`).then(response => response.blob());
  const webmBlob = fetch(`videos/${video.name}.webm`).then(response => response.blob());

  // Only run the next code when both promises have fulfilled
  Promise.all([mp4Blob, webmBlob]).then(values => {
    // display the video fetched from the network with displayVideo()
    displayVideo(values[0], values[1], video.name);
    // store it in the IDB using storeVideo()
    storeVideo(values[0], values[1], video.name);
  });
}

// Define the storeVideo() function
function storeVideo(mp4Blob, webmBlob, name) {
  // Open transaction, get object store; make it a readwrite so we can write to the IDB
  const objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
  // Create a record to add to the IDB
  const record = {
    mp4 : mp4Blob,
    webm : webmBlob,
    name : name
  }

  // Add the record to the IDB using add()
  const request = objectStore.add(record);

  request.addEventListener('success', () => console.log('Record addition attempt finished'));
  request.addEventListener('error', () => console.error(request.error));
}

// Define the displayVideo() function
function displayVideo(mp4Blob, webmBlob, title) {
  // Create object URLs out of the blobs
  const mp4URL = URL.createObjectURL(mp4Blob);
  const webmURL = URL.createObjectURL(webmBlob);

  // Create DOM elements to embed video in the page
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  const video = document.createElement('video');
  video.controls = true;
  const source1 = document.createElement('source');
  source1.src = mp4URL;
  source1.type = 'video/mp4';
  const source2 = document.createElement('source');
  source2.src = webmURL;
  source2.type = 'video/webm';

  // Embed DOM elements into page
  section.appendChild(article);
  article.appendChild(h2);
  article.appendChild(video);
  video.appendChild(source1);
  video.appendChild(source2);
}

// Open our database; it is created if it doesn't already exist
// (see upgradeneeded below)
const request = window.indexedDB.open('videos_db', 1);

// error handler signifies that the database didn't open successfully
request.addEventListener('error', () => console.error('Database failed to open'));

// success handler signifies that the database opened successfully
request.addEventListener('success', () => {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = request.result;
  init();
});

// Setup the database tables if this has not already been done
request.addEventListener('upgradeneeded', e => {

  // Grab a reference to the opened database
  const db = e.target.result;

  // Create an objectStore to store our videos in (basically like a single table)
  // including a auto-incrementing key
  const objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

  // Define what data items the objectStore will contain
  objectStore.createIndex('mp4', 'mp4', { unique: false });
  objectStore.createIndex('webm', 'webm', { unique: false });

  console.log('Database setup complete');
});
