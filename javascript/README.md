# JavaScript
An introduction to JavaScript in web programming. I have provided some resources and some practice code.
<!--  SHIELDS  -->
![GitHub](https://img.shields.io/github/license/wonntann/learning-area?color=informational&logoColor=yellow&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/wonntann/learning-area?color=red&style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues-raw/wonntann/learning-area?color=critical&style=for-the-badge)


<!--  PROJECT INTRO  -->
<br />
<div align="center">Introduction to JavaScript to get you started with programming.</div>


<!--  TABLE OF CONTENTS  -->
<details>
  <summary>Table of Contents</summary>
  <ol>
        <li>
        <a href="#what-is-oop">What is JavaScript?</a></li>
        <ul>
            <li><a href="#getting-started">Getting Started</a></li>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#key-notes">Key Notes</a></li>
        </ul>      
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#resources">Resources</a></li>
    </ol>
</details>


<!--  ABOUT PROJECT  -->
# What Is JavaScipt?
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


<p align="right">(<a href="#top">back to top</a>)</p>


## Getting Started
- [MDN Getting Started](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction#getting_started_with_javascript)
- Install and use an IDE 
    - Online: [codepen](https://codepen.io/, [replit](https://replit.com/))
    - Local: [VS Code](https://code.visualstudio.com/), [atom](https://atom.io/)
        - Setup: [VS Code](https://code.visualstudio.com/docs/languages/javascript)

- Running the code
    - Create an html
    - Create js script
    - Link js script to html
    - Run code, open the inspector and check the console for the js code if running the HTML file (copy pathway and open in browser)

    ** Use console.log(\<code to print\>) to see in the console.

    ** You can run straight from the terminal for the js script by:
        - Navigating to file pathway in terminal 
        - Type <em>node <filename> <em>

    ** If you have nodejs and visual code installed/setup on your machine, you can run it "without debugging".

<p align="right">(<a href="#top">back to top</a>)</p>


## Prerequisite
- Computer
- Web Browser (if using online editor)
- Code Editor (if using local machine)
- nodejs (if using local machine, not required)

<p align="right">(<a href="#top">back to top</a>)</p>


## How to Use
Follow the resources in the [Resources Section](#resources). I have provided my brief notes with no explanation, might be better to follow the resource links or contact me with questions. I multi-line commented out each problem that I worked through, which if you want to test it out yourself, just copy the code between the open and close multi-line comment symbols.

<p align="right">(<a href="#top">back to top</a>)</p>

# Key Notes
- Making an object
``` JavaScript
const person = {
    firstName: 'Tanya',     // key: value pari: property
    nickName: 'wonntann',
    /* fullName: function() {}  // object: method: old syntax */

    myFunction()  {             // declare method inside of object 
        return `${person.firstName} ${person.nickName}`;
    }    
};
//console.log(`${person.firstName} ${person.nickName}`);      // before making method
console.log(person.myFunction());
```

- use getter to access properties in an object & read a method like a property
``` JavaScript
const person = {
    firstName: 'Tanya',     // key: value pari: property
    nickName: 'wonntann',
    // read method like property when called
    get myFunction()  {             // preface method (properties) with getter
        return `${person.firstName} ${person.nickName}`;
    },    
};
console.log(person.myFunction);
```

- use setter
``` JavaScript
const person = {
    firstName: 'Tanya',     // key: value pari: property
    nickName: 'wonntann',
    // read method like property when called
    set myFunction(value)  {             // preface method (properties) to access outside function
        const parts = value.split(' ');
        this.firstName = parts[0];
        this.nickName = parts[1];
    }
};
    person.myFunction = 'Jeff Jep'
console.log(person);
```

- Function outside of an object
``` JavaScript
function myFunction() {
    //do something
};
```

- this keyword using a method in an object
``` JavaScript
//  method in obj
const radio = {
    station: 'kcrw',
    play() {
        console.log(this);      // this ref this object, everything in the braces
    }
};

radio.stop = function() {   // stop == method in radio object
    console.log(this);
};

radio.stop();

radio.play();
```

- this keyword using a function this ref global (window, global)
``` JavaScript
//  function --> global (window, global)
const radio = {
    station: 'kcrw',
    play() {
        console.log(this);      // this ref this object, everything in the braces
    }
};

function Radio(station) {   // constructor function
    this.station = station;
    console.log(this);
};

const r = new Radio('KCRW');        // empty object
```


<p align="right">(<a href="#top">back to top</a>)</p>



## Contributing
Thanks for checking out this page, since the more positive edits and critics of this repo will help this project benefit more individuals.

Submit an issue or I encourage you to fork this repo and make another page in the changes directory and contribute to this project!

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

# Resources
- [freecodecamp](https://www.youtube.com/watch?v=PkZNo7MFNFg)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN Function.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
- [Basic JavaScript Scrimba](https://scrimba.com/playlist/pny4ghw)
- [ES6 JavaScript Scrimba](https://scrimba.com/playlist/p7v3gCd)
- [VS Code on the browser](https://vscode.dev/)


<p align="right">(<a href="#top">back to top</a>)</p>


# Vocabulary
- Algorithms
- Escape characters
- Bracket Notation
- Method
- Immutable
- Zero Based Indexing
- Array
- Functions
- Parameter
- Scope
- or ||
- else if
- Template Literal (have to use backtick around arguments \`${Object.property}\`)
- [return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

<p align="right">(<a href="#top">back to top</a>)</p>
