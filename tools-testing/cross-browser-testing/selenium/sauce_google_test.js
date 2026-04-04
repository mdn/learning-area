const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    username = "YOUR-USER-NAME",
    accessKey = "YOUR-ACCESS-KEY";

let SauceLabs = require('saucelabs');

let saucelabs = new SauceLabs({
    username : "YOUR-USER-NAME",
    password : "YOUR-ACCESS-KEY"
});

let driver = new webdriver.Builder().
    withCapabilities({
      'browserName': 'chrome',
      'platform': 'Windows XP',
      'version': '43.0',
      'username': username,
      'accessKey': accessKey
    }).
    usingServer("https://" + username + ":" + accessKey +
          "@ondemand.saucelabs.com:443/wd/hub").
    build();

driver.getSession().then(function (sessionid){
      driver.sessionID = sessionid.id_;
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
      let testPassed = true;
    } else {
      console.log('Test failed');
      let testPassed = false;
    }

    saucelabs.updateJob(driver.sessionID, {
      name: 'Google search results page title test',
      passed: testPassed
    }, function(err,res) {

    });
  });
});

driver.quit();
