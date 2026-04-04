const request = require('request'); // require request to use the REST API
let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// Input capabilities
let capabilities = {
   'browserName' : 'Firefox',
   'browser_version' : '56.0 beta',
   'os' : 'OS X',
   'os_version' : 'Sierra',
   'resolution' : '1280x1024',
   'browserstack.user' : 'chrismills4',
   'browserstack.key' : 'DoDmjvSzK5eLSmAtVwi4',
   'browserstack.debug' : 'true',
   'build' : 'First build',
   'project' : 'Google test 2' // split up into projects
};

let driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

// obtain session ID
let sessionId;

driver.session_.then(function(sessionData) {
  sessionId = sessionData.id_;
});

driver.get('http://www.google.com');
driver.findElement(By.name('q')).sendKeys('webdriver');

driver.sleep(1000).then(function() {
  driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
});

driver.findElement(By.name('btnK')).click();

driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if(title === 'webdriver - Google Search') {
      console.log('Test passed');
      request({uri: "https://chrismills4:DoDmjvSzK5eLSmAtVwi4@www.browserstack.com/automate/sessions/" + sessionId + ".json", method:"PUT", form:{"status":"passed","reason":"Google results showed correct title"}});
    } else {
      console.log('Test failed');
      request({uri: "https://chrismills4:DoDmjvSzK5eLSmAtVwi4@www.browserstack.com/automate/sessions/" + sessionId + ".json", method:"PUT", form:{"status":"failed","reason":"Google results showed wrong title"}});
    }
  });
});

driver.quit();
