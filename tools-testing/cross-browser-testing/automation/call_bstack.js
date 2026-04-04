const request = require("request");

let bsUser = "BROWSERSTACK_USERNAME";
let bsKey = "BROWSERSTACK_ACCESS_KEY";
let baseUrl = "https://" + bsUser + ":" + bsKey + "@www.browserstack.com/automate/";

function getPlanDetails(){
	request({uri: baseUrl + "plan.json"}, function(err, res, body){
		console.log(JSON.parse(body));
	});
	/* Response:
	{
		automate_plan: <string>,
		parallel_sessions_running: <int>,
		team_parallel_sessions_max_allowed: <int>,
		parallel_sessions_max_allowed: <int>,
		queued_sessions: <int>,
		queued_sessions_max_allowed: <int>
	}
	*/
}

getPlanDetails();
