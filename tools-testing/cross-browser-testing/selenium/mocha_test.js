"use strict";

const assert = require("assert");

const { Builder, Capabilities, By } = require("selenium-webdriver");

describe("Alert", () => {
  it("should have the correct text content - this is from the first button", (done) => {
    let driver = new Builder()
      .withCapabilities(Capabilities.firefox())
      .build();

    driver
      .get(
        "http://mdn.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/native-keyboard-accessibility.html"
      )
      .then(() => driver.findElement(By.css("button:nth-of-type(1)")))
      .then((button) => button.click())
      .then(() => driver.switchTo().alert())
      .then((alert) => alert.getText())
      .then((text) => assert.equal(text, "This is from the first button"))
      .then(() => driver.quit())
      .then(done)
      .catch((err) => done(err));
  });
});
