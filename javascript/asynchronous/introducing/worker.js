onmessage = function(e) {
  console.log(e.data);

  let myDate;
  for(let i = 0; i < 10000000; i ++) {
    let date = new Date();
    myDate = date;
  }

  this.postMessage(myDate);
}