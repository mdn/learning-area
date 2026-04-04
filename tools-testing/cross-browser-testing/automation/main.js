let array = ['Chris', 'Bob', 'Mark', 'Paul'];

// Arrow function syntax
array.forEach((e, i, a) => {
   const elem = document.createElement('p');
   elem.textContent = (i + 1) + '. ' + e;
   document.body.appendChild(elem);
});
