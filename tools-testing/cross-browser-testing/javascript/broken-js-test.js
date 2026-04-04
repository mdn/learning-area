for(let i = 1; i <= 10; i++) {
  const para = document.createElement('p');
  para.textContent = 'This is paragraph ' + i + '.';
  document.body.appendChild(para);
  addHandler(para, i);
}

function addHandler(para, i) {
  para.onclick = function() {
    alert('Hello from paragraph ' + i + '!');
  }
