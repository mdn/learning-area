const SauceLabs = require('saucelabs');

let myAccount = new SauceLabs({
  username: "your-sauce-username",
  password: "your-sauce-api-key"
});

myAccount.getAccountDetails(function (err, res) {
  console.log(res);
  myAccount.getServiceStatus(function (err, res) {
    // Status of the Sauce Labs services
    console.log(res);
    myAccount.getJobs(function (err, jobs) {
      // Get a list of all your jobs
      for (let k in jobs) {
        if ( jobs.hasOwnProperty( k )) {
          myAccount.showJob(jobs[k].id, function (err, res) {
            let str = res.id + ": Status: " + res.status;
            if (res.error) {
              str += "\033[31m Error: " + res.error + " \033[0m";
            }
            console.log(str);
          });
        }
      }
    });
  });
});
