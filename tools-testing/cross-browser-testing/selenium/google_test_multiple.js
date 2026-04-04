const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

let driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

searchTest(driver_fx);
searchTest(driver_chr);

function searchTest(driver) {
  driver.get('https://www.google.com');
  driver.findElement(By.name('q')).sendKeys('webdriver');

  driver.sleep(1000).then(function() {
    driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
  });

  driver.findElement(By.name('btnK')).click();

  driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'webdriver - Google Search') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.quit();
}
