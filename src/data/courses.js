// 📚 ByteBunny Course Curriculum Data
// Supported Languages: Python, JS, Rust, SQL, Bash, Go, TS, C++, Java, C#

export const COURSE_DATA = {
  python: {
    basic: [
      {
        id: 'p1', title: 'Hello World', theory: 'The print() function is your first step in Python. It takes a message (a "string" in quotes) or a number and displays it on the screen. This is crucial for debugging and interacting with users.',
        questions: [
          { qId: 'p1q1', text: 'Print "Hello World"', defaultCode: '', expectedPattern: /print\(["']Hello World["']\)/ },
          { qId: 'p1q2', text: 'Print "ByteBunny"', defaultCode: '', expectedPattern: /print\(["']ByteBunny["']\)/ },
          { qId: 'p1q3', text: 'Print the number 42', defaultCode: '', expectedPattern: /print\(42\)/ },
          { qId: 'p1q4', text: 'Print "1" + "2"', defaultCode: '', expectedPattern: /print\(["']1["']\s*\+\s*["']2["']\)/ },
          { qId: 'p1q5', text: 'Print the boolean True', defaultCode: '', expectedPattern: /print\(True\)/ }
        ]
      },
      {
        id: 'p2', title: 'Variables', theory: 'Variables are like boxes that store data. In Python, you use the assignment operator (=) to name a value. For example, "x = 5" means the variable named x now holds the value 5. Variable names should be descriptive and start with a letter.',
        questions: [
          { qId: 'p2q1', text: 'Set x to 10', defaultCode: '', expectedPattern: /x\s*=\s*10/ },
          { qId: 'p2q2', text: 'Set msg to "Hi"', defaultCode: '', expectedPattern: /msg\s*=\s*["']Hi["']/ },
          { qId: 'p2q3', text: 'Set y to x', defaultCode: '', expectedPattern: /y\s*=\s*x/ },
          { qId: 'p2q4', text: 'Set active to False', defaultCode: '', expectedPattern: /active\s*=\s*False/ },
          { qId: 'p2q5', text: 'Set pi to 3.14', defaultCode: '', expectedPattern: /pi\s*=\s*3\.14/ }
        ]
      },
      {
        id: 'p3', title: 'Arithmetic', theory: 'Python can be used as a powerful calculator. Standard operators include + (add), - (subtract), * (multiply), and / (divide). Special operators include // for floor division (rounds down), % for remainder (modulus), and ** for exponents (power).',
        questions: [
          { qId: 'p3q1', text: 'Add 5 and 3', defaultCode: '', expectedPattern: /5\s*\+\s*3/ },
          { qId: 'p3q2', text: 'Divide 10 by 2', defaultCode: '', expectedPattern: /10\s*\/\s*2/ },
          { qId: 'p3q3', text: 'Get remainder of 7 / 2', defaultCode: '', expectedPattern: /7\s*%\s*2/ },
          { qId: 'p3q4', text: 'Calculate 2 to the power 3', defaultCode: '', expectedPattern: /2\s*\*\*\s*3/ },
          { qId: 'p3q5', text: 'Floor divide 10 by 3', defaultCode: '', expectedPattern: /10\s*\/\/\s*3/ }
        ]
      }
    ],
    intermediate: [
      {
        id: 'p4', title: 'Lists', theory: 'Lists are versatile, ordered collections in Python. They can hold different data types and are "mutable," meaning you can change them after creation. Common operations include accessing items by index, adding new ones with .append(), and removing the last one with .pop().',
        questions: [
          { qId: 'p4q1', text: 'Create list "l" with 1, 2, 3', defaultCode: '', expectedPattern: /l\s*=\s*\[1,\s*2,\s*3\]/ },
          { qId: 'p4q2', text: 'Append 4 to list "l"', defaultCode: '', expectedPattern: /l\.append\(4\)/ },
          { qId: 'p4q3', text: 'Access first element of "l"', defaultCode: '', expectedPattern: /l\[0\]/ },
          { qId: 'p4q4', text: 'Get length of "l"', defaultCode: '', expectedPattern: /len\(l\)/ },
          { qId: 'p4q5', text: 'Pop last item from "l"', defaultCode: '', expectedPattern: /l\.pop\(\)/ }
        ]
      },
      {
        id: 'p5', title: 'Strings', theory: 'Strings are sequences of characters. Python offers powerful ways to manipulate them, such as converting to .upper(), checking for substrings with "in," and splitting text into lists using .split(). F-strings (f"Hi {name}") are the modern way to embed variables directly into strings.',
        questions: [
          { qId: 'p5q1', text: 'Create f-string for variable "n"', defaultCode: '', expectedPattern: /f["'].*\{n\}.*["']/ },
          { qId: 'p5q2', text: 'Convert "s" to uppercase', defaultCode: '', expectedPattern: /s\.upper\(\)/ },
          { qId: 'p5q3', text: 'Check if "a" is in "text"', defaultCode: '', expectedPattern: /["']a["']\s*in\s*text/ },
          { qId: 'p5q4', text: 'Split "s" by comma', defaultCode: '', expectedPattern: /s\.split\(["'],["']\)/ },
          { qId: 'p5q5', text: 'Replace "a" with "b" in "s"', defaultCode: '', expectedPattern: /s\.replace\(["']a["'],\s*["']b["']\)/ }
        ]
      },
      {
        id: 'p6', title: 'Conditionals', theory: 'Conditional logic allows your program to make decisions. The "if" statement checks a condition, "elif" (else if) checks another if the first is false, and "else" runs if none of the conditions are met. Use comparison operators like == (equals) and != (not equals) along with logical operators like "and" and "or".',
        questions: [
          { qId: 'p6q1', text: 'If x is greater than 5', defaultCode: '', expectedPattern: /if\s*x\s*>\s*5:/ },
          { qId: 'p6q2', text: 'If x equals 10', defaultCode: '', expectedPattern: /if\s*x\s*==\s*10:/ },
          { qId: 'p6q3', text: 'Check if x is NOT 0', defaultCode: '', expectedPattern: /if\s*x\s*!=\s*0:/ },
          { qId: 'p6q4', text: 'If x > 0 AND x < 10', defaultCode: '', expectedPattern: /if\s*x\s*>\s*0\s*and\s*x\s*<\s*10:/ },
          { qId: 'p6q5', text: 'Else block', defaultCode: '', expectedPattern: /else:/ }
        ]
      },
      {
        id: 'p7', title: 'Loops', theory: 'Loops repeat a block of code. "for" loops are best for iterating over a sequence (like a list or range), while "while" loops run as long as a condition remains true. You can control loops using "break" to exit early or "continue" to skip to the next iteration.',
        questions: [
          { qId: 'p7q1', text: 'Loop through range 0-4', defaultCode: '', expectedPattern: /for\s*i\s*in\s*range\(5\):/ },
          { qId: 'p7q2', text: 'While x is less than 5', defaultCode: '', expectedPattern: /while\s*x\s*<\s*5:/ },
          { qId: 'p7q3', text: 'Break the loop', defaultCode: '', expectedPattern: /break/ },
          { qId: 'p7q4', text: 'Skip to next iteration', defaultCode: '', expectedPattern: /continue/ },
          { qId: 'p7q5', text: 'Loop through list "items"', defaultCode: '', expectedPattern: /for\s*x\s*in\s*items:/ }
        ]
      }
    ],
    expert: [
      {
        id: 'p8', title: 'Functions', theory: 'Functions are reusable blocks of code that perform a specific task. They help organize programs and avoid repetition. You define them using the "def" keyword, can pass "arguments" to them, and they can "return" a result to the caller.',
        questions: [
          { qId: 'p8q1', text: 'Define function "greet"', defaultCode: '', expectedPattern: /def\s*greet\(\):/ },
          { qId: 'p8q2', text: 'Return x squared', defaultCode: '', expectedPattern: /return\s*x\s*\*\*\s*2/ },
          { qId: 'p8q3', text: 'Function with argument "n"', defaultCode: '', expectedPattern: /def\s*\w+\(n\):/ },
          { qId: 'p8q4', text: 'Call function "fn"', defaultCode: '', expectedPattern: /fn\(\)/ },
          { qId: 'p8q5', text: 'Define function with default a=1', defaultCode: '', expectedPattern: /def\s*\w+\(a\s*=\s*1\):/ }
        ]
      },
      {
        id: 'p9', title: 'Dictionaries', theory: 'Dictionaries are "mappings" that store data in key-value pairs, similar to a real-world dictionary where you look up a word (key) to find its definition (value). Keys must be unique and are often strings. They provide extremely fast data retrieval.',
        questions: [
          { qId: 'p9q1', text: 'Create dict "d" with a=1', defaultCode: '', expectedPattern: /d\s*=\s*\{["']a["']:\s*1\}/ },
          { qId: 'p9q2', text: 'Access key "name" in "d"', defaultCode: '', expectedPattern: /d\[["']name["']\]/ },
          { qId: 'p9q3', text: 'Get keys of "d"', defaultCode: '', expectedPattern: /d\.keys\(\)/ },
          { qId: 'p9q4', text: 'Check if "k" in "d"', defaultCode: '', expectedPattern: /["']k["']\s*in\s*d/ },
          { qId: 'p9q5', text: 'Remove key "a" from "d"', defaultCode: '', expectedPattern: /d\.pop\(["']a["']\)/ }
        ]
      },
      {
        id: 'p10', title: 'Classes', theory: 'Classes are blueprints for creating "objects." Object-Oriented Programming (OOP) allows you to group data and functions that operate on that data into a single unit. The "__init__" method is a special constructor used to initialize an object\'s properties.',
        questions: [
          { qId: 'p10q1', text: 'Define class "Bunny"', defaultCode: '', expectedPattern: /class\s*Bunny:/ },
          { qId: 'p10q2', text: 'Define __init__ method', defaultCode: '', expectedPattern: /def\s*__init__\(self.*\):/ },
          { qId: 'p10q3', text: 'Create instance b = Bunny()', defaultCode: '', expectedPattern: /b\s*=\s*Bunny\(\)/ },
          { qId: 'p10q4', text: 'Access self.name', defaultCode: '', expectedPattern: /self\.name/ },
          { qId: 'p10q5', text: 'Define method "hop"', defaultCode: '', expectedPattern: /def\s*hop\(self\):/ }
        ]
      }
    ]
  },
  javascript: {
    basic: [
      {
        id: 'j1', title: 'Logging', theory: 'The console.log() method is your primary tool for "printing" data to the web console. It is essential for checking variable values and debugging your code during development. You can pass multiple values separated by commas, and they will be printed on the same line.',
        questions: [
          { qId: 'j1q1', text: 'Log "Hello"', defaultCode: '', expectedPattern: /console\.log\(["']Hello["']\)/ },
          { qId: 'j1q2', text: 'Log the sum 2 + 2', defaultCode: '', expectedPattern: /console\.log\(2\s*\+\s*2\)/ },
          { qId: 'j1q3', text: 'Log an error "Fail"', defaultCode: '', expectedPattern: /console\.error\(["']Fail["']\)/ },
          { qId: 'j1q4', text: 'Log variable "x"', defaultCode: '', expectedPattern: /console\.log\(x\)/ },
          { qId: 'j1q5', text: 'Log "JS" and "Fun"', defaultCode: '', expectedPattern: /console\.log\(["']JS["'],\s*["']Fun["']\)/ }
        ]
      },
      {
        id: 'j2', title: 'Variables', theory: 'Variables are containers for storing data values. In modern JavaScript, you use "const" for values that won\'t change (constants) and "let" for variables that you plan to reassign later. "var" is an older way to declare variables but is generally avoided in modern practice due to its scoping rules.',
        questions: [
          { qId: 'j2q1', text: 'Declare const "x" as 5', defaultCode: '', expectedPattern: /const\s*x\s*=\s*5/ },
          { qId: 'j2q2', text: 'Declare let "y"', defaultCode: '', expectedPattern: /let\s*y/ },
          { qId: 'j2q3', text: 'Assign 10 to "y"', defaultCode: '', expectedPattern: /y\s*=\s*10/ },
          { qId: 'j2q4', text: 'Declare const "name"', defaultCode: '', expectedPattern: /const\s*name\s*=\s*["'].*["']/ },
          { qId: 'j2q5', text: 'Increment "count" by 1', defaultCode: '', expectedPattern: /count\+\+|count\s*\+=\s*1/ }
        ]
      },
      {
        id: 'j3', title: 'Types', theory: 'JavaScript has dynamic typing, but it helps to understand its "primitive" types. "Strings" for text, "Numbers" for both integers and decimals, "Booleans" for true/false, and "null" or "undefined" for missing values. You can check the type of any value using the "typeof" operator.',
        questions: [
          { qId: 'j3q1', text: 'Get type of "x"', defaultCode: '', expectedPattern: /typeof\s*x/ },
          { qId: 'j3q2', text: 'Template literal with "v"', defaultCode: '', expectedPattern: /`.*\{v\}.*`/ },
          { qId: 'j3q3', text: 'Set "a" to null', defaultCode: '', expectedPattern: /a\s*=\s*null/ },
          { qId: 'j3q4', text: 'Convert "5" to Number', defaultCode: '', expectedPattern: /Number\(["']5["']\)/ },
          { qId: 'j3q5', text: 'Check if x is undefined', defaultCode: '', expectedPattern: /x\s*===\s*undefined/ }
        ]
      },
      {
        id: 'j4', title: 'Math', theory: 'The built-in "Math" object provides properties and methods for mathematical constants and functions. Unlike other objects, Math is not a constructor; all its properties and methods are static. Common uses include Math.round() for rounding, Math.floor() for rounding down, and Math.random() for generating random numbers.',
        questions: [
          { qId: 'j4q1', text: 'Round 4.7 to 5', defaultCode: '', expectedPattern: /Math\.round\(4\.7\)/ },
          { qId: 'j4q2', text: 'Floor 4.7 to 4', defaultCode: '', expectedPattern: /Math\.floor\(4\.7\)/ },
          { qId: 'j4q3', text: 'Get random number', defaultCode: '', expectedPattern: /Math\.random\(\)/ },
          { qId: 'j4q4', text: 'Get absolute of -10', defaultCode: '', expectedPattern: /Math\.abs\(-10\)/ },
          { qId: 'j4q5', text: 'Calculate 2 to power 3', defaultCode: '', expectedPattern: /Math\.pow\(2,\s*3\)/ }
        ]
      }
    ],
    intermediate: [
      {
        id: 'j5', title: 'Arrays', theory: 'Arrays in JavaScript are list-like objects whose prototype has methods to perform traversal and mutation operations. Neither the length of a JavaScript array nor the types of its elements are fixed. You can use methods like .push() to add elements, .pop() to remove them, and powerful higher-order functions like .map() and .filter() to transform your data.',
        questions: [
          { qId: 'j5q1', text: 'Push 5 to array "a"', defaultCode: '', expectedPattern: /a\.push\(5\)/ },
          { qId: 'j5q2', text: 'Map array "a" to double x', defaultCode: '', expectedPattern: /a\.map\(x\s*=>\s*x\s*\*\s*2\)/ },
          { qId: 'j5q3', text: 'Filter "a" for x > 10', defaultCode: '', expectedPattern: /a\.filter\(x\s*=>\s*x\s*>\s*10\)/ },
          { qId: 'j5q4', text: 'Get length of "a"', defaultCode: '', expectedPattern: /a\.length/ },
          { qId: 'j5q5', text: 'Find index of 7 in "a"', defaultCode: '', expectedPattern: /a\.indexOf\(7\)/ }
        ]
      },
      {
        id: 'j6', title: 'Objects', theory: 'Objects are used to store keyed collections of various data and more complex entities. An object can be created with figure brackets {…} with an optional list of properties. A property is a "key: value" pair, where key is a string (also called a "property name"), and value can be anything. You can access properties using dot notation (obj.key) or bracket notation (obj["key"]).',
        questions: [
          { qId: 'j6q1', text: 'Access property "name" of "o"', defaultCode: '', expectedPattern: /o\.name|o\[["']name["']\]/ },
          { qId: 'j6q2', text: 'Set property "age" to 20', defaultCode: '', expectedPattern: /o\.age\s*=\s*20/ },
          { qId: 'j6q3', text: 'Object with key "a" value 1', defaultCode: '', expectedPattern: /\{\s*a:\s*1\s*\}/ },
          { qId: 'j6q4', text: 'Get keys of object "o"', defaultCode: '', expectedPattern: /Object\.keys\(o\)/ },
          { qId: 'j6q5', text: 'Check if "p" in "o"', defaultCode: '', expectedPattern: /["']p["']\s*in\s*o/ }
        ]
      },
      {
        id: 'j7', title: 'Arrows', theory: 'Arrow functions allow us to write shorter function syntax. They are anonymous and change the way "this" binds in functions. If the function has only one statement, and the statement returns a value, you can remove the brackets and the return keyword (implicit return). They are perfect for short, one-line functions used in map, filter, or event listeners.',
        questions: [
          { qId: 'j7q1', text: 'Define arrow function "add"', defaultCode: '', expectedPattern: /const\s*add\s*=\s*\(\)\s*=>/ },
          { qId: 'j7q2', text: 'Arrow with param "x"', defaultCode: '', expectedPattern: /x\s*=>/ },
          { qId: 'j7q3', text: 'Implicit return of 10', defaultCode: '', expectedPattern: /=>\s*10/ },
          { qId: 'j7q4', text: 'Arrow with (a, b)', defaultCode: '', expectedPattern: /\(a,\s*b\)\s*=>/ },
          { qId: 'j7q5', text: 'Return x + y in arrow', defaultCode: '', expectedPattern: /=>\s*x\s*\+\s*y/ }
        ]
      }
    ],
    expert: [
      {
        id: 'j8', title: 'Async', theory: 'Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Modern JavaScript uses "Promises" and the "async/await" syntax to handle these operations cleanly, making your code look and behave more like synchronous code.',
        questions: [
          { qId: 'j8q1', text: 'Define async function "run"', defaultCode: '', expectedPattern: /async\s*function\s*run\(\)/ },
          { qId: 'j8q2', text: 'Await promise "p"', defaultCode: '', expectedPattern: /await\s*p/ },
          { qId: 'j8q3', text: 'New Promise executor', defaultCode: '', expectedPattern: /new\s*Promise\(\(resolve,\s*reject\)\s*=>/ },
          { qId: 'j8q4', text: 'Call .then() on promise', defaultCode: '', expectedPattern: /\.then\(.*\)/ },
          { qId: 'j8q5', text: 'Catch error in async', defaultCode: '', expectedPattern: /try\s*\{.*\}\s*catch/ }
        ]
      },
      {
        id: 'j9', title: 'Closures', theory: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.',
        questions: [
          { qId: 'j9q1', text: 'Function returning function', defaultCode: '', expectedPattern: /return\s*function|return\s*\(\)\s*=>/ },
          { qId: 'j9q2', text: 'Private variable "v"', defaultCode: '', expectedPattern: /let\s*v/ },
          { qId: 'j9q3', text: 'Outer function "outer"', defaultCode: '', expectedPattern: /function\s*outer\(\)/ },
          { qId: 'j9q4', text: 'Access outer "x" in inner', defaultCode: '', expectedPattern: /x/ },
          { qId: 'j9q5', text: 'Call returned function', defaultCode: '', expectedPattern: /\(\)\(\)/ }
        ]
      },
      {
        id: 'j10', title: 'Modules', theory: 'JavaScript modules allow you to break up your code into separate files. This makes it easier to maintain a code-base. Modules are imported from external files with the "import" statement. You use the "export" statement to make variables, functions, classes, or objects available to other modules.',
        questions: [
          { qId: 'j10q1', text: 'Export default "app"', defaultCode: '', expectedPattern: /export\s*default\s*app/ },
          { qId: 'j10q2', text: 'Import "fs" from "fs"', defaultCode: '', expectedPattern: /import\s*fs\s*from\s*["']fs["']/ },
          { qId: 'j10q3', text: 'Export const "pi"', defaultCode: '', expectedPattern: /export\s*const\s*pi/ },
          { qId: 'j10q4', text: 'Import { a } from "b"', defaultCode: '', expectedPattern: /import\s*\{\s*a\s*\}\s*from/ },
          { qId: 'j10q5', text: 'Import * as m from "n"', defaultCode: '', expectedPattern: /import\s*\* \s*as\s*m/ }
        ]
      }
    ]
  },
  rust: {
    basic: [
      {
        id: 'r1', title: 'Print', theory: 'In Rust, println!() is a "macro" (indicated by the !) that prints text to the standard output. It handles strings, variables, and formatting. The {} serves as a placeholder for variables, making it easy to create dynamic messages.',
        questions: [
          { qId: 'r1q1', text: 'Print "Hello"', defaultCode: '', expectedPattern: /println!\(["']Hello["']\)/ },
          { qId: 'r1q2', text: 'Print with placeholder {}', defaultCode: '', expectedPattern: /println!\(["']\{\}["'],\s*x\)/ },
          { qId: 'r1q3', text: 'Debug print with {:?}', defaultCode: '', expectedPattern: /println!\(["']\{:?\}["'],\s*x\)/ },
          { qId: 'r1q4', text: 'Format string to "s"', defaultCode: '', expectedPattern: /let\s*s\s*=\s*format!\(.*\)/ },
          { qId: 'r1q5', text: 'Print empty line', defaultCode: '', expectedPattern: /println!\(\)/ }
        ]
      },
      {
        id: 'r2', title: 'Variables', theory: 'Safety and speed are Rust\'s core goals. Variables are "immutable" by default, meaning their value cannot change once set. To create a variable that can be changed, you must use the "mut" keyword (e.g., let mut x = 5). This explicit declaration helps prevent accidental data corruption.',
        questions: [
          { qId: 'r2q1', text: 'Declare immutable x = 5', defaultCode: '', expectedPattern: /let\s*x\s*=\s*5;/ },
          { qId: 'r2q2', text: 'Declare mutable y = 10', defaultCode: '', expectedPattern: /let\s*mut\s*y\s*=\s*10;/ },
          { qId: 'r2q3', text: 'Shadow x with let x', defaultCode: '', expectedPattern: /let\s*x\s*=/ },
          { qId: 'r2q4', text: 'Declare constant PI', defaultCode: '', expectedPattern: /const\s*PI:\s*f64\s*=\s*3\.14;/ },
          { qId: 'r2q5', text: 'Specify type i32 for x', defaultCode: '', expectedPattern: /let\s*x:\s*i32\s*=/ }
        ]
      },
      {
        id: 'r3', title: 'Types', theory: 'Rust is a statically typed language, which means it must know the types of all variables at compile time. It has several scalar types: integers (i32, u32), floating-point numbers (f32, f64), booleans (bool), and characters (char). Compounded types like tuples and arrays allow grouping multiple values together.',
        questions: [
          { qId: 'r3q1', text: 'Declare boolean "b"', defaultCode: '', expectedPattern: /let\s*b:\s*bool\s*=/ },
          { qId: 'r3q2', text: 'Declare character "c"', defaultCode: '', expectedPattern: /let\s*c\s*=\s*['].['];/ },
          { qId: 'r3q3', text: 'Create tuple (1, 2)', defaultCode: '', expectedPattern: /\(1,\s*2\)/ },
          { qId: 'r3q4', text: 'Create array [1, 2, 3]', defaultCode: '', expectedPattern: /\[1,\s*2,\s*3\]/ },
          { qId: 'r3q5', text: 'Access tuple index .0', defaultCode: '', expectedPattern: /\.0/ }
        ]
      }
    ],
    intermediate: [
      {
        id: 'r4', title: 'Ownership', theory: 'Ownership is Rust\'s most unique feature. It enables Rust to make memory safety guarantees without needing a garbage collector. Each value has a variable that\'s called its "owner," and there can only be one owner at a time. When the owner goes out of scope, the value is dropped. You can use "references" (&) to borrow values without taking ownership.',
        questions: [
          { qId: 'r4q1', text: 'Borrow "s" as "&s"', defaultCode: '', expectedPattern: /&s/ },
          { qId: 'r4q2', text: 'Mutable borrow "&mut s"', defaultCode: '', expectedPattern: /&mut\s*s/ },
          { qId: 'r4q3', text: 'Clone "s"', defaultCode: '', expectedPattern: /s\.clone\(\)/ },
          { qId: 'r4q4', text: 'Transfer ownership to "f"', defaultCode: '', expectedPattern: /f\(s\)/ },
          { qId: 'r4q5', text: 'String from literal', defaultCode: '', expectedPattern: /String::from\(["'].*["']\)/ }
        ]
      },
      {
        id: 'r5', title: 'Structs', theory: 'Structs (short for structures) are custom data types that let you package together and name multiple related values that make up a meaningful group. They are similar to objects in other languages but are designed for efficient data layout in memory. You define a struct using the "struct" keyword and specify the name and type of each field.',
        questions: [
          { qId: 'r5q1', text: 'Define struct "User"', defaultCode: '', expectedPattern: /struct\s*User\s*\{/ },
          { qId: 'r5q2', text: 'Instantiate User', defaultCode: '', expectedPattern: /User\s*\{.*\}/ },
          { qId: 'r5q3', text: 'Define tuple struct "Color"', defaultCode: '', expectedPattern: /struct\s*Color\(.*\);/ },
          { qId: 'r5q4', text: 'Access field user.name', defaultCode: '', expectedPattern: /user\.name/ },
          { qId: 'r5q5', text: 'Implement methods for User', defaultCode: '', expectedPattern: /impl\s*User\s*\{/ }
        ]
      },
      {
        id: 'r6', title: 'Enums', theory: 'Enums (enumerations) allow you to define a type by enumerating its possible "variants." They are incredibly powerful in Rust because variants can also hold data. The Option and Result enums are built into the standard library and are essential for handling potential absence of values or operations that might fail.',
        questions: [
          { qId: 'r6q1', text: 'Define enum "Web"', defaultCode: '', expectedPattern: /enum\s*Web\s*\{/ },
          { qId: 'r6q2', text: 'Variant with value V(i32)', defaultCode: '', expectedPattern: /V\(i32\)/ },
          { qId: 'r6q3', text: 'Use Option::Some(5)', defaultCode: '', expectedPattern: /Some\(5\)/ },
          { qId: 'r6q4', text: 'Use Result::Ok(10)', defaultCode: '', expectedPattern: /Ok\(10\)/ },
          { qId: 'r6q5', text: 'Enum variant access Color::Red', defaultCode: '', expectedPattern: /Color::Red/ }
        ]
      }
    ],
    expert: [
      {
        id: 'r7', title: 'Match', theory: 'The match operator is a powerful control flow construct that allows you to compare a value against a series of patterns and then execute code based on which pattern matches. Patterns can be made up of literal values, variable names, wildcards, and many other things. It ensures "exhaustiveness," meaning you must handle every possible outcome.',
        questions: [
          { qId: 'r7q1', text: 'Match variable "x"', defaultCode: '', expectedPattern: /match\s*x\s*\{/ },
          { qId: 'r7q2', text: 'Match pattern 1 => ...', defaultCode: '', expectedPattern: /1\s*=>/ },
          { qId: 'r7q3', text: 'Default pattern _ => ...', defaultCode: '', expectedPattern: /_\s*=>/ },
          { qId: 'r7q4', text: 'Match Some(i) pattern', defaultCode: '', expectedPattern: /Some\(i\)\s*=>/ },
          { qId: 'r7q5', text: 'Match with range 1..=5', defaultCode: '', expectedPattern: /1\.\.=5\s*=>/ }
        ]
      },
      {
        id: 'r8', title: 'Traits', theory: 'A trait tells the Rust compiler about functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. They are similar to interfaces in other languages but are much more flexible and powerful, enabling "trait bounds" for generics.',
        questions: [
          { qId: 'r8q1', text: 'Define trait "Speak"', defaultCode: '', expectedPattern: /trait\s*Speak\s*\{/ },
          { qId: 'r8q2', text: 'Implement Speak for Dog', defaultCode: '', expectedPattern: /impl\s*Speak\s*for\s*Dog/ },
          { qId: 'r8q3', text: 'Define method in trait', defaultCode: '', expectedPattern: /fn\s*say\(&self\)/ },
          { qId: 'r8q4', text: 'Trait bound T: Display', defaultCode: '', expectedPattern: /T:\s*Display/ },
          { qId: 'r8q5', text: 'Derive Debug trait', defaultCode: '', expectedPattern: /#\[derive\(Debug\)\]/ }
        ]
      },
      {
        id: 'r9', title: 'Generics', theory: 'Generics are abstract stand-ins for concrete types or other properties. When we\'re writing code, we can use generics to define functions, structs, and enums that can then be used with many different concrete data types without repeating the code for each one. This promotes reuse and reduces complexity.',
        questions: [
          { qId: 'r9q1', text: 'Generic function foo<T>', defaultCode: '', expectedPattern: /fn\s*foo<T>/ },
          { qId: 'r9q2', text: 'Struct Point<T>', defaultCode: '', expectedPattern: /struct\s*Point<T>/ },
          { qId: 'r9q3', text: 'Generic with two types <T, U>', defaultCode: '', expectedPattern: /<T,\s*U>/ },
          { qId: 'r9q4', text: 'Implement for Point<T>', defaultCode: '', expectedPattern: /impl<T>\s*Point<T>/ },
          { qId: 'r9q5', text: 'Vector of integers Vec<i32>', defaultCode: '', expectedPattern: /Vec<i32>/ }
        ]
      },
      {
        id: 'r10', title: 'Errors', theory: 'Rust groups errors into two categories: recoverable and unrecoverable. For a recoverable error, such as a file not found error, it\'s reasonable to report the problem to the user and retry the operation. Unrecoverable errors are always symptoms of bugs, like accessing a location beyond the end of an array. Rust uses the Result enum for the former and the panic! macro for the latter.',
        questions: [
          { qId: 'r10q1', text: 'Panic with message', defaultCode: '', expectedPattern: /panic!\(.*\)/ },
          { qId: 'r10q2', text: 'Unwrap a Result', defaultCode: '', expectedPattern: /\.unwrap\(\)/ },
          { qId: 'r10q3', text: 'Expect with message', defaultCode: '', expectedPattern: /\.expect\(.*\)/ },
          { qId: 'r10q4', text: 'Propagation with ?', defaultCode: '', expectedPattern: /\?/ },
          { qId: 'r10q5', text: 'Match on Result', defaultCode: '', expectedPattern: /match\s*res\s*\{/ }
        ]
      }
    ]
  },
  sql: {
    basic: [
      {
        id: 's1', title: 'Select', theory: 'The SELECT statement is the most fundamental command in SQL, used to retrieve data from a database. You can specify individual column names to get only the data you need, or use an asterisk (*) to retrieve all columns from a table. It\'s the starting point for almost every database query.',
        questions: [
          { qId: 's1q1', text: 'Select all columns', defaultCode: '', expectedPattern: /SELECT\s*\*\s*FROM/i },
          { qId: 's1q2', text: 'Select "name" column', defaultCode: '', expectedPattern: /SELECT\s*name\s*FROM/i },
          { qId: 's1q3', text: 'Select "id", "name"', defaultCode: '', expectedPattern: /SELECT\s*id,\s*name/i },
          { qId: 's1q4', text: 'Alias "name" as "n"', defaultCode: '', expectedPattern: /SELECT\s*name\s*AS\s*n/i },
          { qId: 's1q5', text: 'Select distinct "city"', defaultCode: '', expectedPattern: /SELECT\s*DISTINCT\s*city/i }
        ]
      },
      {
        id: 's2', title: 'Where', theory: 'The WHERE clause allows you to filter the results of your SELECT statement based on specific conditions. This is essential for narrow down large datasets to find exactly the information you\'re looking for. You can use comparison operators like =, <, >, or the powerful LIKE operator for pattern matching.',
        questions: [
          { qId: 's2q1', text: 'Where id is 1', defaultCode: '', expectedPattern: /WHERE\s*id\s*=\s*1/i },
          { qId: 's2q2', text: 'Where age > 18', defaultCode: '', expectedPattern: /WHERE\s*age\s*>\s*18/i },
          { qId: 's2q3', text: 'Where name is "Bob"', defaultCode: '', expectedPattern: /WHERE\s*name\s*=\s*[']Bob[']/i },
          { qId: 's2q4', text: 'Where city IN ("NY", "LA")', defaultCode: '', expectedPattern: /WHERE\s*city\s*IN\s*\(/i },
          { qId: 's2q5', text: 'Where name LIKE "A%"', defaultCode: '', expectedPattern: /WHERE\s*name\s*LIKE\s*[']A%[']/i }
        ]
      },
      {
        id: 's3', title: 'Order', theory: 'Data in a database isn\'t stored in any particular order. The ORDER BY clause lets you sort your result set by one or more columns in either ascending (ASC) or descending (DESC) order. This makes your data much easier to read and analyze, especially when combined with a LIMIT to see only the top results.',
        questions: [
          { qId: 's3q1', text: 'Order by "name"', defaultCode: '', expectedPattern: /ORDER\s*BY\s*name/i },
          { qId: 's3q2', text: 'Order by "age" DESC', defaultCode: '', expectedPattern: /ORDER\s*BY\s*age\s*DESC/i },
          { qId: 's3q3', text: 'Order by "id" ASC', defaultCode: '', expectedPattern: /ORDER\s*BY\s*id\s*ASC/i },
          { qId: 's3q4', text: 'Limit to 5 results', defaultCode: '', expectedPattern: /LIMIT\s*5/i },
          { qId: 's3q5', text: 'Order by "a" then "b"', defaultCode: '', expectedPattern: /ORDER\s*BY\s*a,\s*b/i }
        ]
      }
    ],
    intermediate: [
      {
        id: 's4', title: 'Joins', theory: 'Relational databases store data across multiple tables to avoid redundancy. JOINS are the mechanism used to combine these tables back together based on a related column between them. An INNER JOIN only returns rows where there is a match in both tables, while LEFT JOINS ensure you don\'t lose data from your primary table even if there\'s no match.',
        questions: [
          { qId: 's4q1', text: 'Inner join "orders"', defaultCode: '', expectedPattern: /INNER\s*JOIN\s*orders/i },
          { qId: 's4q2', text: 'Join ON a.id = b.id', defaultCode: '', expectedPattern: /ON\s*.*\.id\s*=\s*.*\.id/i },
          { qId: 's4q3', text: 'Left join "users"', defaultCode: '', expectedPattern: /LEFT\s*JOIN\s*users/i },
          { qId: 's4q4', text: 'Cross join "tags"', defaultCode: '', expectedPattern: /CROSS\s*JOIN\s*tags/i },
          { qId: 's4q5', text: 'Full outer join', defaultCode: '', expectedPattern: /FULL\s*OUTER\s*JOIN/i }
        ]
      },
      {
        id: 's5', title: 'Grouping', theory: 'Aggregation is a core part of data analysis. The GROUP BY clause groups rows that have the same values into summary rows, like "find the number of customers in each country." You use aggregate functions like COUNT(), SUM(), AVG(), MIN(), or MAX() to perform calculations on each group.',
        questions: [
          { qId: 's5q1', text: 'Group by "country"', defaultCode: '', expectedPattern: /GROUP\s*BY\s*country/i },
          { qId: 's5q2', text: 'Count records', defaultCode: '', expectedPattern: /COUNT\(\*\)/i },
          { qId: 's5q3', text: 'Sum "total"', defaultCode: '', expectedPattern: /SUM\(total\)/i },
          { qId: 's5q4', text: 'Avg "price"', defaultCode: '', expectedPattern: /AVG\(price\)/i },
          { qId: 's5q5', text: 'Having count > 5', defaultCode: '', expectedPattern: /HAVING\s*COUNT\(.*\)\s*>\s*5/i }
        ]
      },
      {
        id: 's6', title: 'Insert', theory: 'The INSERT INTO statement is used to add new records to a table. You can specify the columns you want to fill and provide the corresponding values. It\'s also possible to insert multiple rows at once or even insert data directly from the results of another SELECT query.',
        questions: [
          { qId: 's6q1', text: 'Insert into "users"', defaultCode: '', expectedPattern: /INSERT\s*INTO\s*users/i },
          { qId: 's6q2', text: 'Specify columns (a, b)', defaultCode: '', expectedPattern: /\(a,\s*b\)/ },
          { qId: 's6q3', text: 'VALUES (1, "Bob")', defaultCode: '', expectedPattern: /VALUES\s*\(1,\s*[']Bob[']\)/i },
          { qId: 's6q4', text: 'Insert multiple rows', defaultCode: '', expectedPattern: /VALUES\s*\(.*\),\s*\(.*\)/i },
          { qId: 's6q5', text: 'Insert from SELECT', defaultCode: '', expectedPattern: /INSERT\s*INTO\s*.*SELECT/i }
        ]
      }
    ],
    expert: [
      {
        id: 's7', title: 'Update', theory: 'The UPDATE statement is used to modify existing records in a table. It\'s crucial to use a WHERE clause with UPDATE to specify exactly which records should be changed; otherwise, all records in the table will be updated! You can change one column or many at the same time.',
        questions: [
          { qId: 's7q1', text: 'Update "users"', defaultCode: '', expectedPattern: /UPDATE\s*users/i },
          { qId: 's7q2', text: 'Set "age" to 21', defaultCode: '', expectedPattern: /SET\s*age\s*=\s*21/i },
          { qId: 's7q3', text: 'Update where id is 5', defaultCode: '', expectedPattern: /WHERE\s*id\s*=\s*5/i },
          { qId: 's7q4', text: 'Increment salary by 100', defaultCode: '', expectedPattern: /salary\s*=\s*salary\s*\+\s*100/i },
          { qId: 's7q5', text: 'Update name and city', defaultCode: '', expectedPattern: /SET\s*name\s*=.*,\s*city\s*=/i }
        ]
      },
      {
        id: 's8', title: 'Delete', theory: 'The DELETE statement removes records from a table. Like UPDATE, using a WHERE clause is vital to prevent accidental data loss. For removing all records from a table very quickly without logging individual row deletions, TRUNCATE is a more efficient alternative to a DELETE without a WHERE clause.',
        questions: [
          { qId: 's8q1', text: 'Delete from "logs"', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*logs/i },
          { qId: 's8q2', text: 'Where status is "old"', defaultCode: '', expectedPattern: /WHERE\s*status\s*=\s*[']old[']/i },
          { qId: 's8q3', text: 'Truncate table "temp"', defaultCode: '', expectedPattern: /TRUNCATE\s*TABLE\s*temp/i },
          { qId: 's8q4', text: 'Delete with subquery', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*.*WHERE\s*id\s*IN\s*\(/i },
          { qId: 's8q5', text: 'Delete all records', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*\w+$/i }
        ]
      },
      {
        id: 's9', title: 'Create', theory: 'The CREATE TABLE statement is how you define the structure of a new table in your database. You specify the name of the table and define each column by its name and data type (like INT, VARCHAR, or DECIMAL). This is also where you define constraints like PRIMARY KEY to ensure data integrity.',
        questions: [
          { qId: 's9q1', text: 'Create table "items"', defaultCode: '', expectedPattern: /CREATE\s*TABLE\s*items/i },
          { qId: 's9q2', text: 'Column "id" INT PRIMARY KEY', defaultCode: '', expectedPattern: /id\s*INT\s*PRIMARY\s*KEY/i },
          { qId: 's9q3', text: 'Column "name" VARCHAR(50)', defaultCode: '', expectedPattern: /name\s*VARCHAR\(50\)/i },
          { qId: 's9q4', text: 'Column "price" DECIMAL', defaultCode: '', expectedPattern: /price\s*DECIMAL/i },
          { qId: 's9q5', text: 'Drop table "junk"', defaultCode: '', expectedPattern: /DROP\s*TABLE\s*junk/i }
        ]
      },
      {
        id: 's10', title: 'Subqueries', theory: 'A subquery is a query nested inside another SQL query. They are incredibly powerful because they allow you to perform dynamic calculations or filtering based on data that isn\'t known until the query actually runs. You can use them in WHERE, FROM, or even directly in your SELECT list.',
        questions: [
          { qId: 's10q1', text: 'Subquery in WHERE', defaultCode: '', expectedPattern: /WHERE\s*\w+\s*IN\s*\(\s*SELECT/i },
          { qId: 's10q2', text: 'Subquery in FROM', defaultCode: '', expectedPattern: /FROM\s*\(\s*SELECT/i },
          { qId: 's10q3', text: 'Correlated subquery', defaultCode: '', expectedPattern: /WHERE\s*EXISTS\s*\(/i },
          { qId: 's10q4', text: 'Subquery in SELECT', defaultCode: '', expectedPattern: /SELECT\s*.*,\s*\(\s*SELECT/i },
          { qId: 's10q5', text: 'Compare with subquery max', defaultCode: '', expectedPattern: /=\s*\(\s*SELECT\s*MAX/i }
        ]
      }
    ]
  },
  bash: {
    basic: [
      {
        id: 'b1', title: 'Commands', theory: 'The command line is a powerful way to interact with your computer. Basic commands like "echo" print text, "ls" lists files in a directory, and "pwd" shows your current working directory. Mastering these is the foundation of shell scripting and server management.',
        questions: [
          { qId: 'b1q1', text: 'Echo "Hello"', defaultCode: '', expectedPattern: /echo\s*["']Hello["']/ },
          { qId: 'b1q2', text: 'List files', defaultCode: '', expectedPattern: /ls/ },
          { qId: 'b1q3', text: 'Print working directory', defaultCode: '', expectedPattern: /pwd/ },
          { qId: 'b1q4', text: 'List all files (-a)', defaultCode: '', expectedPattern: /ls\s*-a/ },
          { qId: 'b1q5', text: 'Create directory "test"', defaultCode: '', expectedPattern: /mkdir\s*test/ }
        ]
      },
      {
        id: 'b2', title: 'Variables', theory: 'In Bash, variables are created by assigning a value to a name without spaces around the "=" sign. You access their value by prepending a dollar sign ($). This allows you to store and reuse data throughout your scripts, making them dynamic and adaptable.',
        questions: [
          { qId: 'b2q1', text: 'Set "x" to 5', defaultCode: '', expectedPattern: /x=5/ },
          { qId: 'b2q2', text: 'Echo variable "x"', defaultCode: '', expectedPattern: /echo\s*\$x/ },
          { qId: 'b2q3', text: 'Set "msg" to "Hi"', defaultCode: '', expectedPattern: /msg=["']Hi["']/ },
          { qId: 'b2q4', text: 'Command substitution $(ls)', defaultCode: '', expectedPattern: /\$\(ls\)/ },
          { qId: 'b2q5', text: 'Export "PATH"', defaultCode: '', expectedPattern: /export\s*PATH/ }
        ]
      },
      {
        id: 'b3', title: 'Pipes', theory: 'Pipes (|) are a core philosophy of Unix-like systems, allowing you to "chain" commands together by sending the output of one as input to another. Redirection (> and >>) lets you save command output into files, enabling powerful data processing pipelines directly from the terminal.',
        questions: [
          { qId: 'b3q1', text: 'Pipe ls to grep', defaultCode: '', expectedPattern: /ls\s*\|\s*grep/ },
          { qId: 'b3q2', text: 'Redirect to "file.txt"', defaultCode: '', expectedPattern: />\s*file\.txt/ },
          { qId: 'b3q3', text: 'Append to "file.txt"', defaultCode: '', expectedPattern: />>\s*file\.txt/ },
          { qId: 'b3q4', text: 'Redirect error (2>)', defaultCode: '', expectedPattern: /2>\s*error\.log/ },
          { qId: 'b3q5', text: 'Input from "in.txt"', defaultCode: '', expectedPattern: /<\s*in\.txt/ }
        ]
      }
    ],
    intermediate: [
      {
        id: 'b4', title: 'Grep', theory: 'Grep is the ultimate text search tool. It searches for specific patterns within files or command output. It supports regular expressions, recursive searching, and case-insensitive matching, making it indispensable for finding information in large logs or source code.',
        questions: [
          { qId: 'b4q1', text: 'Grep "error" in "log"', defaultCode: '', expectedPattern: /grep\s*["']error["']\s*log/ },
          { qId: 'b4q2', text: 'Recursive grep (-r)', defaultCode: '', expectedPattern: /grep\s*-r/ },
          { qId: 'b4q3', text: 'Case insensitive grep (-i)', defaultCode: '', expectedPattern: /grep\s*-i/ },
          { qId: 'b4q4', text: 'Invert match (-v)', defaultCode: '', expectedPattern: /grep\s*-v/ },
          { qId: 'b4q5', text: 'Count matches (-c)', defaultCode: '', expectedPattern: /grep\s*-c/ }
        ]
      },
      {
        id: 'b5', title: 'Perms', theory: 'File security is managed through permissions. Using "chmod," you can control who can read, write, or execute a file. Permissions are often represented as numbers (like 755) or symbols (+x). Understanding this is critical for keeping your system and data secure.',
        questions: [
          { qId: 'b5q1', text: 'Add execute perm (+x)', defaultCode: '', expectedPattern: /chmod\s*\+x/ },
          { qId: 'b5q2', text: 'Set perms to 755', defaultCode: '', expectedPattern: /chmod\s*755/ },
          { qId: 'b5q3', text: 'Change owner to "root"', defaultCode: '', expectedPattern: /chown\s*root/ },
          { qId: 'b5q4', text: 'Owner and group root:root', defaultCode: '', expectedPattern: /chown\s*root:root/ },
          { qId: 'b5q5', text: 'Read only for all (444)', defaultCode: '', expectedPattern: /chmod\s*444/ }
        ]
      },
      {
        id: 'b6', title: 'Logic', theory: 'Conditional logic in scripts is handled using "if" statements. The brackets [ ] are actually a command that evaluates a condition. You can check if files exist, compare strings, or perform numeric tests, allowing your scripts to react intelligently to different situations.',
        questions: [
          { qId: 'b6q1', text: 'If file "f" exists (-f)', defaultCode: '', expectedPattern: /if\s*\[\s*-f\s*f\s*\]/ },
          { qId: 'b6q2', text: 'If "x" equals "y"', defaultCode: '', expectedPattern: /if\s*\[\s*["']\$x["']\s*==\s*["']\$y["']\s*\]/ },
          { qId: 'b6q3', text: 'Else block', defaultCode: '', expectedPattern: /else/ },
          { qId: 'b6q4', text: 'End if (fi)', defaultCode: '', expectedPattern: /fi/ },
          { qId: 'b6q5', text: 'Check if directory (-d)', defaultCode: '', expectedPattern: /\[\s*-d\s*\w+\s*\]/ }
        ]
      }
    ],
    expert: [
      {
        id: 'b7', title: 'Loops', theory: 'Loops automate repetitive tasks. A "for" loop is great for processing a list of items or files, while a "while" loop continues as long as a condition is met. Combining loops with other shell commands allows you to perform massive batch operations with just a few lines of code.',
        questions: [
          { qId: 'b7q1', text: 'For i in 1 2 3', defaultCode: '', expectedPattern: /for\s*i\s*in\s*1\s*2\s*3/ },
          { qId: 'b7q2', text: 'Do block', defaultCode: '', expectedPattern: /do/ },
          { qId: 'b7q3', text: 'Done block', defaultCode: '', expectedPattern: /done/ },
          { qId: 'b7q4', text: 'While [ condition ]', defaultCode: '', expectedPattern: /while\s*\[.*\]/ },
          { qId: 'b7q5', text: 'For file in *.txt', defaultCode: '', expectedPattern: /for\s*f\s*in\s*\*\.txt/ }
        ]
      },
      {
        id: 'b8', title: 'Args', theory: 'Shell scripts can accept "arguments" from the user when they are run. $1, $2, etc., represent the first, second, and subsequent arguments. This makes your scripts interactive and reusable, as they can process different input each time they are executed.',
        questions: [
          { qId: 'b8q1', text: 'Access first argument', defaultCode: '', expectedPattern: /\$1/ },
          { qId: 'b8q2', text: 'Count of arguments ($#)', defaultCode: '', expectedPattern: /\$#/ },
          { qId: 'b8q3', text: 'All arguments ($@)', defaultCode: '', expectedPattern: /\$@/ },
          { qId: 'b8q4', text: 'Script name ($0)', defaultCode: '', expectedPattern: /\$0/ },
          { qId: 'b8q5', text: 'Exit status of last cmd ($?)', defaultCode: '', expectedPattern: /\$\?/ }
        ]
      },
      {
        id: 'b9', title: 'Functions', theory: 'Functions in Bash group a series of commands under a single name. They can take their own arguments and return a status code. Using functions helps organize your scripts into logical, manageable pieces and avoids code duplication.',
        questions: [
          { qId: 'b9q1', text: 'Define function "hi"', defaultCode: '', expectedPattern: /hi\(\)\s*\{/ },
          { qId: 'b9q2', text: 'Local variable "l"', defaultCode: '', expectedPattern: /local\s*l/ },
          { qId: 'b9q3', text: 'Call "hi"', defaultCode: '', expectedPattern: /hi/ },
          { qId: 'b9q4', text: 'Return status 0', defaultCode: '', expectedPattern: /return\s*0/ },
          { qId: 'b9q5', text: 'Pass arg to function hi 1', defaultCode: '', expectedPattern: /hi\s*1/ }
        ]
      },
      {
        id: 'b10', title: 'Scripts', theory: 'A complete script starts with a "shebang" (#!/bin/bash), which tells the system which interpreter to use. Scripts can read user input, perform arithmetic, and control their exit status, enabling complex automation and workflow creation.',
        questions: [
          { qId: 'b10q1', text: 'Shebang line', defaultCode: '', expectedPattern: /#!\/bin\/bash/ },
          { qId: 'b10q2', text: 'Exit script with 1', defaultCode: '', expectedPattern: /exit\s*1/ },
          { qId: 'b10q3', text: 'Read input into "val"', defaultCode: '', expectedPattern: /read\s*val/ },
          { qId: 'b10q4', text: 'Arithmetic with (( x++ ))', defaultCode: '', expectedPattern: /\(\(\s*x\+\+\s*\)\)/ },
          { qId: 'b10q5', text: 'Check command exists (type)', defaultCode: '', expectedPattern: /type\s*\w+/ }
        ]
      }
    ]
  },
  go: {
    basic: [
      { id: 'g1', title: 'Hello Go', theory: 'Go (Golang) is designed for extreme simplicity and high-concurrency performance. Every Go program is part of a "package," and the "main" package is where execution starts. You import the "fmt" package to access standard input/output functions, using fmt.Println() to output text to the console. It is the first step for any Go developer.', questions: [
        { qId: 'g1q1', text: 'Define package main', defaultCode: '', expectedPattern: /package\s*main/ },
        { qId: 'g1q2', text: 'Import "fmt"', defaultCode: '', expectedPattern: /import\s*["']fmt["']/ },
        { qId: 'g1q3', text: 'Define func main()', defaultCode: '', expectedPattern: /func\s*main\(\)/ },
        { qId: 'g1q4', text: 'Print "Hello"', defaultCode: '', expectedPattern: /fmt\.Println\(["']Hello["']\)/ },
        { qId: 'g1q5', text: 'Print 100', defaultCode: '', expectedPattern: /fmt\.Println\(100\)/ }
      ]},
      { id: 'g2', title: 'Variables', theory: 'Go is statically typed, but offers flexible declaration styles. You can use the explicit "var" keyword with a type, or the efficient ":=" shorthand for type inference within functions. Clarity is paramount in Go, which is why the compiler will actually error if you declare a variable but never use it!', questions: [
        { qId: 'g2q1', text: 'Declare var x int', defaultCode: '', expectedPattern: /var\s*x\s*int/ },
        { qId: 'g2q2', text: 'Shorthand y := 5', defaultCode: '', expectedPattern: /y\s*:=\s*5/ },
        { qId: 'g2q3', text: 'Set msg string', defaultCode: '', expectedPattern: /var\s*msg\s*string/ },
        { qId: 'g2q4', text: 'Assign shorthand msg', defaultCode: '', expectedPattern: /msg\s*:=\s*["'].*["']/ },
        { qId: 'g2q5', text: 'Declare multiple a, b := 1, 2', defaultCode: '', expectedPattern: /a,\s*b\s*:=\s*1,\s*2/ }
      ]},
      { id: 'g3', title: 'Types', theory: 'Go has a lean, efficient type system. It includes standard types like "bool," "string," and various sizes of integers and floats. Go forbids implicit type conversion—you cannot add an int32 to an int64 without an explicit cast. This strictness ensures that data manipulation is always intentional and safe.', questions: [
        { qId: 'g3q1', text: 'Declare float64', defaultCode: '', expectedPattern: /float64/ },
        { qId: 'g3q2', text: 'Declare bool', defaultCode: '', expectedPattern: /bool/ },
        { qId: 'g3q3', text: 'Create string literal', defaultCode: '', expectedPattern: /["'].*["']/ },
        { qId: 'g3q4', text: 'Type cast int to float', defaultCode: '', expectedPattern: /float64\(.*\)/ },
        { qId: 'g3q5', text: 'Check type (not easy in Go but regex for type)', defaultCode: '', expectedPattern: /int|string|bool/ }
      ]},
      { id: 'g4', title: 'Conditionals', theory: 'Control flow in Go is clean and readable. Parentheses are not required around "if" conditions. Go introduces a powerful "initialization" step in its "if" syntax, allowing you to execute a statement (like a function call) and check its result in a single scope, keeping your logic compact.', questions: [
        { qId: 'g4q1', text: 'If x > 5', defaultCode: '', expectedPattern: /if\s*x\s*>\s*5\s*\{/ },
        { qId: 'g4q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'g4q3', text: 'Else if x < 0', defaultCode: '', expectedPattern: /else\s*if\s*x\s*<\s*0/ },
        { qId: 'g4q4', text: 'If with init statement', defaultCode: '', expectedPattern: /if\s*v\s*:=\s*.*;\s*v\s*<\s*x/ },
        { qId: 'g4q5', text: 'Simple if err != nil', defaultCode: '', expectedPattern: /if\s*err\s*!=\s*nil/ }
      ]}
    ],
    intermediate: [
      { id: 'g5', title: 'Loops', theory: 'Go keeps things simple with only one loop keyword: "for." It can act as a standard counter-based loop, a condition-based "while" loop, or even an infinite loop. The "range" keyword provides an elegant way to iterate over slices, maps, or strings, providing both the index and the data in each pass.', questions: [
        { qId: 'g5q1', text: 'Basic for loop 0-9', defaultCode: '', expectedPattern: /for\s*i\s*:=\s*0;\s*i\s*<\s*10;\s*i\+\+\s*\{/ },
        { qId: 'g5q2', text: 'While-style for x < 5', defaultCode: '', expectedPattern: /for\s*x\s*<\s*5\s*\{/ },
        { qId: 'g5q3', text: 'Infinite for', defaultCode: '', expectedPattern: /for\s*\{/ },
        { qId: 'g5q4', text: 'Range over slice', defaultCode: '', expectedPattern: /for\s*\w+,\s*\w+\s*:=\s*range/ },
        { qId: 'g5q5', text: 'Break loop', defaultCode: '', expectedPattern: /break/ }
      ]},
      { id: 'g6', title: 'Slices', theory: 'While Go has fixed-size arrays, "slices" are the dynamic and preferred way to manage sequences of data. A slice is a flexible window into an underlying array. You can use the built-in append() function to grow slices as needed, and slicing syntax (s[1:3]) to create sub-views of your data effortlessly.', questions: [
        { qId: 'g6q1', text: 'Create slice of int', defaultCode: '', expectedPattern: /\[\]int/ },
        { qId: 'g6q2', text: 'Append 5 to slice s', defaultCode: '', expectedPattern: /append\(s,\s*5\)/ },
        { qId: 'g6q3', text: 'Slice from index 1 to 3', defaultCode: '', expectedPattern: /s\[1:3\]/ },
        { qId: 'g6q4', text: 'Make slice with len 5', defaultCode: '', expectedPattern: /make\(\[\]int,\s*5\)/ },
        { qId: 'g6q5', text: 'Get length len(s)', defaultCode: '', expectedPattern: /len\(s\)/ }
      ]},
      { id: 'g7', title: 'Structs', theory: 'Structs are Go\'s way of grouping related data together into custom types. They form the basis of Go\'s object-oriented model. Fields are accessed with dot notation. For performance and to allow modifications, you will often work with pointers to structs, indicated by the "&" and "*" operators.', questions: [
        { qId: 'g7q1', text: 'Define struct "P"', defaultCode: '', expectedPattern: /type\s*P\s*struct\s*\{/ },
        { qId: 'g7q2', text: 'Field "X" as int', defaultCode: '', expectedPattern: /X\s*int/ },
        { qId: 'g7q3', text: 'Create P{1, 2}', defaultCode: '', expectedPattern: /P\{\s*1,\s*2\s*\}/ },
        { qId: 'g7q4', text: 'Pointer to struct &P{}', defaultCode: '', expectedPattern: /&P\{.*\}/ },
        { qId: 'g7q5', text: 'Access field p.X', defaultCode: '', expectedPattern: /p\.X/ }
      ]}
    ],
    expert: [
      { id: 'g8', title: 'Methods', theory: 'Go doesn\'t have traditional classes, but you can define "methods" on any custom type using "receivers." Methods can be defined on values or pointers, allowing you to attach behavior to your data structures. This, combined with "interfaces," provides a powerful, decoupled way to build reusable code modules.', questions: [
        { qId: 'g8q1', text: 'Method receiver (p P)', defaultCode: '', expectedPattern: /func\s*\(p\s*P\)\s*Name\(\)/ },
        { qId: 'g8q2', text: 'Pointer receiver (*P)', defaultCode: '', expectedPattern: /func\s*\(p\s*\*P\)/ },
        { qId: 'g8q3', text: 'Interface "I"', defaultCode: '', expectedPattern: /type\s*I\s*interface\s*\{/ },
        { qId: 'g8q4', text: 'Method signature in interface', defaultCode: '', expectedPattern: /Run\(\)\s*string/ },
        { qId: 'g8q5', text: 'Empty interface{}', defaultCode: '', expectedPattern: /interface\{\}/ }
      ]},
      { id: 'g9', title: 'Goroutines', theory: 'Concurrency is at the heart of Go. "Goroutines" are extremely lightweight threads managed by the Go runtime. They allow you to execute thousands of concurrent tasks with minimal memory overhead. Goroutines communicate through "channels," ensuring safe data exchange and synchronization between tasks.', questions: [
        { qId: 'g9q1', text: 'Start goroutine go f()', defaultCode: '', expectedPattern: /go\s*\w+\(.*\)/ },
        { qId: 'g9q2', text: 'Create channel make(chan int)', defaultCode: '', expectedPattern: /make\(chan\s*int\)/ },
        { qId: 'g9q3', text: 'Send to channel ch <- 1', defaultCode: '', expectedPattern: /ch\s*<-\s*1/ },
        { qId: 'g9q4', text: 'Receive from channel <-ch', defaultCode: '', expectedPattern: /<-\s*ch/ },
        { qId: 'g9q5', text: 'Close channel', defaultCode: '', expectedPattern: /close\(ch\)/ }
      ]},
      { id: 'g10', title: 'Select', theory: 'The "select" statement is like a switch-case specifically for channel operations. It blocks until one of its cases can proceed, allowing a goroutine to wait on multiple communication operations. This is a fundamental pattern for building responsive, multi-tasking Go applications that handle timeouts and cancellations cleanly.', questions: [
        { qId: 'g10q1', text: 'Select block', defaultCode: '', expectedPattern: /select\s*\{/ },
        { qId: 'g10q2', text: 'Case for channel', defaultCode: '', expectedPattern: /case\s*<-\w+:/ },
        { qId: 'g10q3', text: 'Default case', defaultCode: '', expectedPattern: /default:/ },
        { qId: 'g10q4', text: 'Ticker with time.Tick', defaultCode: '', expectedPattern: /time\.Tick/ },
        { qId: 'g10q5', text: 'Timer with time.After', defaultCode: '', expectedPattern: /time\.After/ }
      ]}
    ]
  },
  typescript: {
    basic: [
      { id: 't1', title: 'Types', theory: 'TypeScript is a "superset" of JavaScript that adds optional static typing. By specifying types for variables (like number, string, or boolean), you enable the compiler to catch errors long before your code even runs. This "fail-fast" approach leads to significantly more robust and maintainable codebases.', questions: [
        { qId: 't1q1', text: 'Let x: number = 5', defaultCode: '', expectedPattern: /let\s*x:\s*number/ },
        { qId: 't1q2', text: 'Const s: string = "Hi"', defaultCode: '', expectedPattern: /const\s*s:\s*string/ },
        { qId: 't1q3', text: 'Array of strings string[]', defaultCode: '', expectedPattern: /string\[\]/ },
        { qId: 't1q4', text: 'Boolean type bool', defaultCode: '', expectedPattern: /:\s*boolean/ },
        { qId: 't1q5', text: 'Any type', defaultCode: '', expectedPattern: /:\s*any/ }
      ]},
      { id: 't2', title: 'Interfaces', theory: 'Interfaces are a powerful way to define "contracts" for object shapes. They allow you to specify exactly which properties and methods an object should have, and they can even define optional or readonly fields. Interfaces are purely a development-time tool and are completely removed from the resulting JavaScript.', questions: [
        { qId: 't2q1', text: 'Define interface User', defaultCode: '', expectedPattern: /interface\s*User/ },
        { qId: 't2q2', text: 'Optional property id?', defaultCode: '', expectedPattern: /id\?\s*:/ },
        { qId: 't2q3', text: 'Readonly property', defaultCode: '', expectedPattern: /readonly\s*\w+/ },
        { qId: 't2q4', text: 'Method in interface', defaultCode: '', expectedPattern: /\w+\(.*\)\s*:\s*\w+/ },
        { qId: 't2q5', text: 'Extends interface', defaultCode: '', expectedPattern: /extends\s+\w+/ }
      ]},
      { id: 't3', title: 'Functions', theory: 'TypeScript enhances functions by allowing you to define types for both parameters and return values. This ensures that you pass the correct data to your functions and that you handle their results appropriately. You can also define optional parameters and default values, making your functions highly flexible and type-safe.', questions: [
        { qId: 't3q1', text: 'Return type string', defaultCode: '', expectedPattern: /fn\(.*\)\s*:\s*string/ },
        { qId: 't3q2', text: 'Void return', defaultCode: '', expectedPattern: /:\s*void/ },
        { qId: 't3q3', text: 'Arrow fn with types', defaultCode: '', expectedPattern: /const\s*\w+\s*=\s*\(.*\)\s*:\s*\w+\s*=>/ },
        { qId: 't3q4', text: 'Optional parameter p?', defaultCode: '', expectedPattern: /p\?\s*:/ },
        { qId: 't3q5', text: 'Default parameter d=1', defaultCode: '', expectedPattern: /d\s*:\s*number\s*=\s*1/ }
      ]},
      { id: 't4', title: 'Enums', theory: 'Enums (enumerations) are a unique TypeScript feature that allows you to define a set of named constants. They make your code more readable by replacing magic numbers or strings with descriptive names (like Color.Red). TypeScript supports both numeric and string-based enums, and they are one of the few features that actually generate code at runtime.', questions: [
        { qId: 't4q1', text: 'Define enum Color', defaultCode: '', expectedPattern: /enum\s*Color/ },
        { qId: 't4q2', text: 'String enum member', defaultCode: '', expectedPattern: /Red\s*=\s*["']RED["']/ },
        { qId: 't4q3', text: 'Numeric enum member', defaultCode: '', expectedPattern: /Up\s*=\s*1/ },
        { qId: 't4q4', text: 'Access Color.Red', defaultCode: '', expectedPattern: /Color\.Red/ },
        { qId: 't4q5', text: 'Const enum', defaultCode: '', expectedPattern: /const\s*enum/ }
      ]}
    ],
    intermediate: [
      { id: 't5', title: 'Unions', theory: 'Union types allow a value to be one of several different types (e.g., string | number). This is perfect for situations where a variable could legitimately hold multiple types of data. You can also use "intersection types" (&) to combine multiple types into one, and "type aliases" to give your custom types meaningful names.', questions: [
        { qId: 't5q1', text: 'Union type string | number', defaultCode: '', expectedPattern: /string\s*\|\s*number/ },
        { qId: 't5q2', text: 'Literal union "A" | "B"', defaultCode: '', expectedPattern: /["']A["']\s*\|\s*["']B["']/ },
        { qId: 't5q3', text: 'Intersection type A & B', defaultCode: '', expectedPattern: /A\s*&\s*B/ },
        { qId: 't5q4', text: 'Type alias "MyType"', defaultCode: '', expectedPattern: /type\s*MyType\s*=/ },
        { qId: 't5q5', text: 'Nullable type T | null', defaultCode: '', expectedPattern: /\|\s*null/ }
      ]},
      { id: 't6', title: 'Generics', theory: 'Generics are a core part of TypeScript, allowing you to create components that work with a variety of types rather than just a single one. This enables you to build reusable functions, interfaces, and classes while still maintaining strong type safety. You can even add constraints to generics to restrict which types they can accept.', questions: [
        { qId: 't6q1', text: 'Generic function <T>', defaultCode: '', expectedPattern: /<T>/ },
        { qId: 't6q2', text: 'Generic interface Box<T>', defaultCode: '', expectedPattern: /Box<T>/ },
        { qId: 't6q3', text: 'Generic constraint <T extends U>', defaultCode: '', expectedPattern: /T\s*extends\s*U/ },
        { qId: 't6q4', text: 'Default generic <T = string>', defaultCode: '', expectedPattern: /T\s*=\s*string/ },
        { qId: 't6q5', text: 'Generic class Store<T>', defaultCode: '', expectedPattern: /class\s*Store<T>/ }
      ]},
      { id: 't7', title: 'Casting', theory: 'Sometimes you know more about a value\'s type than TypeScript does. In these cases, you can use "type assertions" (casting) to tell the compiler to treat a value as a specific type. You can also define "type guards"—special functions that narrow down a type within a block of code based on a runtime check.', questions: [
        { qId: 't7q1', text: 'Type assertion "as string"', defaultCode: '', expectedPattern: /as\s*string/ },
        { qId: 't7q2', text: 'Angle bracket cast <string>x', defaultCode: '', expectedPattern: /<string>x/ },
        { qId: 't7q3', text: 'Type guard "is string"', defaultCode: '', expectedPattern: /v\s*is\s*string/ },
        { qId: 't7q4', text: 'Non-null assertion x!', defaultCode: '', expectedPattern: /\w+!/ },
        { qId: 't7q5', text: 'typeof guard', defaultCode: '', expectedPattern: /typeof\s*\w+\s*===\s*["']string["']/ }
      ]}
    ],
    expert: [
      { id: 't8', title: 'Utility', theory: 'TypeScript provides several "utility types" that make common type transformations much easier. Partial<T> makes all properties optional, Readonly<T> makes them immutable, Pick<T, K> selects a specific subset of properties, and Record<K, T> creates an object with specific keys and value types. These utilities are essential for advanced type manipulation.', questions: [
        { qId: 't8q1', text: 'Partial<User>', defaultCode: '', expectedPattern: /Partial<User>/ },
        { qId: 't8q2', text: 'Readonly<T>', defaultCode: '', expectedPattern: /Readonly<T>/ },
        { qId: 't8q3', text: 'Pick<T, "id">', defaultCode: '', expectedPattern: /Pick<.*,\s*["']id["']>/ },
        { qId: 't8q4', text: 'Record<string, number>', defaultCode: '', expectedPattern: /Record<string,\s*number>/ },
        { qId: 't8q5', text: 'Omit<T, "k">', defaultCode: '', expectedPattern: /Omit<.*,\s*["']k["']>/ }
      ]},
      { id: 't9', title: 'Advanced', theory: 'Expert-level TypeScript involves complex features like "conditional types" (types that change based on a condition) and the "infer" keyword for capturing types within those conditions. You can also use "mapped types" to transform existing object shapes and "template literal types" to create types based on string patterns.', questions: [
        { qId: 't9q1', text: 'Conditional T extends string ? A : B', defaultCode: '', expectedPattern: /T\s*extends\s*string\s*\?\s*A\s*:\s*B/ },
        { qId: 't9q2', text: 'Infer keyword', defaultCode: '', expectedPattern: /infer\s*U/ },
        { qId: 't9q3', text: 'Mapped types [K in keyof T]', defaultCode: '', expectedPattern: /\[\w+\s*in\s*keyof\s*T\]/ },
        { qId: 't9q4', text: 'Keyof operator', defaultCode: '', expectedPattern: /keyof\s*\w+/ },
        { qId: 't9q5', text: 'Template literal types', defaultCode: '', expectedPattern: /`.*\$\{.*\}.*`/ }
      ]},
      { id: 't10', title: 'Decorators', theory: 'Decorators provide a way to add both annotations and meta-programming syntax for class declarations and members. They are a special kind of declaration that can be attached to a class, method, property, or parameter. Decorators use the "@" symbol and are a powerful tool for frameworks and libraries to manage metadata and behavior.', questions: [
        { qId: 't10q1', text: 'Class decorator @sealed', defaultCode: '', expectedPattern: /@sealed/ },
        { qId: 't10q2', text: 'Method decorator @log', defaultCode: '', expectedPattern: /@log/ },
        { qId: 't10q3', text: 'Decorator factory', defaultCode: '', expectedPattern: /function\s*\w+\(.*\)\s*\{\s*return\s*function/ },
        { qId: 't10q4', text: 'Property decorator', defaultCode: '', expectedPattern: /@\w+\s*\w+:\s*\w+/ },
        { qId: 't10q5', text: 'Parameter decorator', defaultCode: '', expectedPattern: /@\w+\s*target:/ }
      ]}
    ]
  },
  cpp: {
    basic: [
      { id: 'c1', title: 'Hello C++', theory: 'C++ is a high-performance, compiled language widely used for systems, games, and engines. "iostream" is the standard library for input and output, providing objects like std::cout to print text. Every C++ program must have an int main() function, which the system calls to begin execution.', questions: [
        { qId: 'c1q1', text: 'Include iostream', defaultCode: '', expectedPattern: /#include\s*<iostream>/ },
        { qId: 'c1q2', text: 'Define int main()', defaultCode: '', expectedPattern: /int\s*main\(\)/ },
        { qId: 'c1q3', text: 'Print Hello with cout', defaultCode: '', expectedPattern: /std::cout\s*<<\s*["']Hello["']/ },
        { qId: 'c1q4', text: 'Use std::endl', defaultCode: '', expectedPattern: /<<\s*std::endl/ },
        { qId: 'c1q5', text: 'Return 0', defaultCode: '', expectedPattern: /return\s*0;/ }
      ]},
      { id: 'c2', title: 'Variables', theory: 'C++ is a strongly typed language. This means every variable must be declared with a specific type (like int for whole numbers or double for decimals) before it can be used. This allows the compiler to optimize the code for speed and catch potential errors early by ensuring data is used correctly.', questions: [
        { qId: 'c2q1', text: 'Declare int x = 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'c2q2', text: 'Declare double d', defaultCode: '', expectedPattern: /double\s*d/ },
        { qId: 'c2q3', text: 'Declare bool b', defaultCode: '', expectedPattern: /bool\s*b/ },
        { qId: 'c2q4', text: 'Declare char c', defaultCode: '', expectedPattern: /char\s*c/ },
        { qId: 'c2q5', text: 'Constant const int x', defaultCode: '', expectedPattern: /const\s*int\s*x/ }
      ]},
      { id: 'c3', title: 'Logic', theory: 'Conditional logic allows your program to make decisions. The "if" statement evaluates a boolean condition, and an optional "else" block runs if that condition is false. You can combine multiple conditions using logical operators like && (AND) and || (OR) to build complex decision-making processes.', questions: [
        { qId: 'c3q1', text: 'If x is 10', defaultCode: '', expectedPattern: /if\s*\(x\s*==\s*10\)/ },
        { qId: 'c3q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'c3q3', text: 'Check x > 0', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*0\)/ },
        { qId: 'c3q4', text: 'Logical AND (&&)', defaultCode: '', expectedPattern: /&&/ },
        { qId: 'c3q5', text: 'Logical OR (||)', defaultCode: '', expectedPattern: /\|\|/ }
      ]},
      { id: 'c4', title: 'Loops', theory: 'Loops are used to repeat a block of code multiple times. A "for" loop is ideal when you know exactly how many iterations you need, while a "while" loop is better when you\'re waiting for a specific condition. The "do-while" loop is unique because it always runs at least once before checking its condition.', questions: [
        { qId: 'c4q1', text: 'For loop 0-9', defaultCode: '', expectedPattern: /for\s*\(int\s*i\s*=\s*0;\s*i\s*<\s*10;\s*i\+\+\)/ },
        { qId: 'c4q2', text: 'While loop x < 5', defaultCode: '', expectedPattern: /while\s*\(x\s*<\s*5\)/ },
        { qId: 'c4q3', text: 'Do while loop', defaultCode: '', expectedPattern: /do\s*\{.*\}\s*while/ },
        { qId: 'c4q4', text: 'Break loop', defaultCode: '', expectedPattern: /break;/ },
        { qId: 'c4q5', text: 'Continue loop', defaultCode: '', expectedPattern: /continue;/ }
      ]}
    ],
    intermediate: [
      { id: 'c5', title: 'Arrays', theory: 'An array is a collection of elements of the same type stored in contiguous memory locations. In C++, arrays have a fixed size that must be known at the time they are declared. You access individual elements using a zero-based index, allowing for very fast, direct access to any item in the collection.', questions: [
        { qId: 'c5q1', text: 'Declare int arr[5]', defaultCode: '', expectedPattern: /int\s*arr\[5\]/ },
        { qId: 'c5q2', text: 'Set arr[0] to 1', defaultCode: '', expectedPattern: /arr\[0\]\s*=\s*1/ },
        { qId: 'c5q3', text: 'Init {1, 2, 3}', defaultCode: '', expectedPattern: /\{1,\s*2,\s*3\}/ },
        { qId: 'c5q4', text: 'Get array size sizeof', defaultCode: '', expectedPattern: /sizeof\(arr\)/ },
        { qId: 'c5q5', text: '2D array arr[2][2]', defaultCode: '', expectedPattern: /arr\[2\]\[2\]/ }
      ]},
      { id: 'c6', title: 'Pointers', theory: 'Pointers are one of C++\'s most powerful (and dangerous) features. A pointer is a variable that stores the memory address of another variable. This allows you to directly manipulate memory, pass large objects efficiently, and build complex data structures like linked lists and trees. Always be careful with pointers to avoid memory leaks!', questions: [
        { qId: 'c6q1', text: 'Declare int pointer *p', defaultCode: '', expectedPattern: /int\s*\*p/ },
        { qId: 'c6q2', text: 'Set p to address &x', defaultCode: '', expectedPattern: /p\s*=\s*&x/ },
        { qId: 'c6q3', text: 'Dereference *p', defaultCode: '', expectedPattern: /\*p/ },
        { qId: 'c6q4', text: 'Null pointer nullptr', defaultCode: '', expectedPattern: /nullptr/ },
        { qId: 'c6q5', text: 'New keyword', defaultCode: '', expectedPattern: /new\s*int/ }
      ]},
      { id: 'c7', title: 'References', theory: 'A reference is an alternative name, or alias, for an existing variable. Unlike pointers, references cannot be null and cannot be "re-seated" to point to something else once created. They are often preferred for function parameters because they allow the function to modify the original variable without the complex syntax of pointers.', questions: [
        { qId: 'c7q1', text: 'Declare reference &r', defaultCode: '', expectedPattern: /int\s*&r\s*=\s*x/ },
        { qId: 'c7q2', text: 'Const reference const int&', defaultCode: '', expectedPattern: /const\s*int\s*&/ },
        { qId: 'c7q3', text: 'Pass by reference func(int& x)', defaultCode: '', expectedPattern: /void\s*\w+\(int\s*&/ },
        { qId: 'c7q4', text: 'Return by reference int&', defaultCode: '', expectedPattern: /int\s*&\s*\w+\(\)/ },
        { qId: 'c7q5', text: 'Update through reference', defaultCode: '', expectedPattern: /r\s*=\s*10/ }
      ]}
    ],
    expert: [
      { id: 'c8', title: 'Classes', theory: 'Classes are the blueprint for objects in Object-Oriented Programming (OOP). They group related data (members) and functions (methods) into a single unit. Use access specifiers like "public" and "private" to control which parts of your class can be seen and used by other code, ensuring a clean and secure design.', questions: [
        { qId: 'c8q1', text: 'Define class Box', defaultCode: '', expectedPattern: /class\s*Box\s*\{/ },
        { qId: 'c8q2', text: 'Public access specifier', defaultCode: '', expectedPattern: /public:/ },
        { qId: 'c8q3', text: 'Constructor Box()', defaultCode: '', expectedPattern: /Box\(\)/ },
        { qId: 'c8q4', text: 'Create object on stack', defaultCode: '', expectedPattern: /Box\s*b;/ },
        { qId: 'c8q5', text: 'Access member b.run()', defaultCode: '', expectedPattern: /b\.run\(\)/ }
      ]},
      { id: 'c9', title: 'STL', theory: 'The Standard Template Library (STL) is a powerful set of C++ template classes that provide common data structures and algorithms. Using STL components like vectors (dynamic arrays), maps (key-value pairs), and sorting algorithms allows you to write high-performance code much faster and with fewer bugs than building everything from scratch.', questions: [
        { qId: 'c9q1', text: 'Vector std::vector<int>', defaultCode: '', expectedPattern: /std::vector<int>/ },
        { qId: 'c9q2', text: 'Push back value', defaultCode: '', expectedPattern: /push_back\(.*\)/ },
        { qId: 'c9q3', text: 'Map std::map<string, int>', defaultCode: '', expectedPattern: /std::map<.*,\s*.*>/ },
        { qId: 'c9q4', text: 'Iterate STL container', defaultCode: '', expectedPattern: /::iterator/ },
        { qId: 'c9q5', text: 'Sort using std::sort', defaultCode: '', expectedPattern: /std::sort\(/ }
      ]},
      { id: 'c10', title: 'Templates', theory: 'Templates are C++\'s foundation for "generic programming." They allow you to write a single function or class that works with many different data types without sacrificing performance. This is how the STL is built, and it enables you to write highly reusable and flexible code that adapts to any data type provided.', questions: [
        { qId: 'c10q1', text: 'Define template <typename T>', defaultCode: '', expectedPattern: /template\s*<typename\s*T>/ },
        { qId: 'c10q2', text: 'Template function func(T x)', defaultCode: '', expectedPattern: /void\s*\w+\(T\s*x\)/ },
        { qId: 'c10q3', text: 'Template class Stack<T>', defaultCode: '', expectedPattern: /class\s*Stack\s*\{/ },
        { qId: 'c10q4', text: 'Template specialization', defaultCode: '', expectedPattern: /template\s*<>/ },
        { qId: 'c10q5', text: 'Multiple types <T, U>', defaultCode: '', expectedPattern: /<T,\s*U>/ }
      ]}
    ]
  },
  java: {
    basic: [
      { id: 'v1', title: 'Hello Java', theory: 'Java is an object-oriented language known for its "Write Once, Run Anywhere" philosophy. Everything in Java belongs to a "class," and execution always starts with the public static void main() method. It uses the System.out object to print text and other data directly to the console.', questions: [
        { qId: 'v1q1', text: 'Define public class Main', defaultCode: '', expectedPattern: /public\s*class\s*Main/ },
        { qId: 'v1q2', text: 'Define main method', defaultCode: '', expectedPattern: /public\s*static\s*void\s*main\s*\(String\[\]\s*args\)/ },
        { qId: 'v1q3', text: 'Print Hello with println', defaultCode: '', expectedPattern: /System\.out\.println\(["']Hello["']\)/ },
        { qId: 'v1q4', text: 'Print boolean true', defaultCode: '', expectedPattern: /System\.out\.println\(true\)/ },
        { qId: 'v1q5', text: 'Use final keyword for const', defaultCode: '', expectedPattern: /final\s*int/ }
      ]},
      { id: 'v2', title: 'Variables', theory: 'Java is a strongly typed language, meaning you must declare the data type of every variable. Basic "primitive" types include int for whole numbers, double for decimals, and boolean for true/false values. For text, Java uses the String class, which provides many built-in methods for data manipulation.', questions: [
        { qId: 'v2q1', text: 'Set int x to 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'v2q2', text: 'Set double d to 1.5', defaultCode: '', expectedPattern: /double\s*d\s*=\s*1\.5;/ },
        { qId: 'v2q3', text: 'Set String s to "A"', defaultCode: '', expectedPattern: /String\s*s\s*=\s*["']A["']/ },
        { qId: 'v2q4', text: 'Set boolean b to false', defaultCode: '', expectedPattern: /boolean\s*b\s*=\s*false;/ },
        { qId: 'v2q5', text: 'Type cast (int) 4.5', defaultCode: '', expectedPattern: /\(int\)\s*4\.5/ }
      ]},
      { id: 'v3', title: 'Math', theory: 'Java provides standard operators (+, -, *, /) and a comprehensive built-in Math class for more advanced calculations. This class includes methods for square roots, rounding, and generating random numbers. All Math methods are static, meaning you call them directly using the class name, like Math.sqrt().', questions: [
        { qId: 'v3q1', text: 'Add 10 + 20', defaultCode: '', expectedPattern: /10\s*\+\s*20/ },
        { qId: 'v3q2', text: 'Multiply 5 * 5', defaultCode: '', expectedPattern: /5\s*\*\s*5/ },
        { qId: 'v3q3', text: 'Math.sqrt(25)', defaultCode: '', expectedPattern: /Math\.sqrt\(25\)/ },
        { qId: 'v3q4', text: 'Math.random()', defaultCode: '', expectedPattern: /Math\.random\(\)/ },
        { qId: 'v3q5', text: 'Modulus 10 % 3', defaultCode: '', expectedPattern: /10\s*%\s*3/ }
      ]},
      { id: 'v4', title: 'Logic', theory: 'Control flow in Java is managed using "if-else" statements for boolean conditions and "switch" statements for multi-way branching based on a single value. These structures allow your application to handle complex logic and respond appropriately to different user inputs and system states.', questions: [
        { qId: 'v4q1', text: 'If x > 0', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*0\)/ },
        { qId: 'v4q2', text: 'Else if x < 0', defaultCode: '', expectedPattern: /else\s*if\s*\(x\s*<\s*0\)/ },
        { qId: 'v4q3', text: 'Switch statement', defaultCode: '', expectedPattern: /switch\s*\(.*\)\s*\{/ },
        { qId: 'v4q4', text: 'Case block', defaultCode: '', expectedPattern: /case\s*.*:/ },
        { qId: 'v4q5', text: 'Default block', defaultCode: '', expectedPattern: /default:/ }
      ]}
    ],
    intermediate: [
      { id: 'v5', title: 'Arrays', theory: 'An array in Java is an object that contains a fixed number of values of a single type. Once an array is created, its length is fixed and cannot be changed. You use zero-based indexing to access and modify individual elements, and the length property tells you exactly how many items are in the collection.', questions: [
        { qId: 'v5q1', text: 'Declare int[] arr', defaultCode: '', expectedPattern: /int\[\]\s*arr/ },
        { qId: 'v5q2', text: 'New array with size 10', defaultCode: '', expectedPattern: /new\s*int\[10\]/ },
        { qId: 'v5q3', text: 'Init array {1, 2}', defaultCode: '', expectedPattern: /\{1,\s*2\}/ },
        { qId: 'v5q4', text: 'Get length arr.length', defaultCode: '', expectedPattern: /arr\.length/ },
        { qId: 'v5q5', text: 'Access index arr[0]', defaultCode: '', expectedPattern: /arr\[0\]/ }
      ]},
      { id: 'v6', title: 'Lists', theory: 'The ArrayList class is a resizable-array implementation of the List interface. Unlike standard arrays, ArrayLists can grow or shrink dynamically as you add or remove elements. This makes them much more convenient for managing collections of data when the total number of items isn\'t known in advance.', questions: [
        { qId: 'v6q1', text: 'Create ArrayList<String>', defaultCode: '', expectedPattern: /ArrayList<String>/ },
        { qId: 'v6q2', text: 'Add element .add()', defaultCode: '', expectedPattern: /\.add\(.*\)/ },
        { qId: 'v6q3', text: 'Get element .get(0)', defaultCode: '', expectedPattern: /\.get\(0\)/ },
        { qId: 'v6q4', text: 'Remove element .remove(0)', defaultCode: '', expectedPattern: /\.remove\(0\)/ },
        { qId: 'v6q5', text: 'Get size .size()', defaultCode: '', expectedPattern: /\.size\(\)/ }
      ]},
      { id: 'v7', title: 'Inherit', theory: 'Inheritance allows one class (the subclass) to acquire the properties and methods of another class (the superclass). This is a fundamental concept of OOP that promotes code reuse and allows you to create hierarchical relationships between objects. Use the "extends" keyword and the "@Override" annotation to build specialized versions of existing classes.', questions: [
        { qId: 'v7q1', text: 'Class Dog extends Animal', defaultCode: '', expectedPattern: /class\s*Dog\s*extends\s*Animal/ },
        { qId: 'v7q2', text: 'Override method @Override', defaultCode: '', expectedPattern: /@Override/ },
        { qId: 'v7q3', text: 'Call super()', defaultCode: '', expectedPattern: /super\(\)/ },
        { qId: 'v7q4', text: 'Abstract class', defaultCode: '', expectedPattern: /abstract\s*class/ },
        { qId: 'v7q5', text: 'Final class', defaultCode: '', expectedPattern: /final\s*class/ }
      ]}
    ],
    expert: [
      { id: 'v8', title: 'Interfaces', theory: 'An interface in Java is a reference type, similar to a class, that can contain only constants, method signatures, default methods, and static methods. Interfaces cannot be instantiated directly—they must be "implemented" by a class. This provides a way to define a contract that multiple unrelated classes can all agree to follow.', questions: [
        { qId: 'v8q1', text: 'Interface Run', defaultCode: '', expectedPattern: /interface\s*Run/ },
        { qId: 'v8q2', text: 'Dog implements Run', defaultCode: '', expectedPattern: /implements\s*Run/ },
        { qId: 'v8q3', text: 'Multiple interfaces', defaultCode: '', expectedPattern: /implements\s*A,\s*B/ },
        { qId: 'v8q4', text: 'Default method', defaultCode: '', expectedPattern: /default\s*void/ },
        { qId: 'v8q5', text: 'Static method in interface', defaultCode: '', expectedPattern: /static\s*void/ }
      ]},
      { id: 'v9', title: 'Exceptions', theory: 'Exceptions are events that occur during program execution that disrupt the normal flow of instructions. Java uses "try-catch" blocks to catch and handle these errors gracefully, preventing your application from crashing. You can also use the "finally" block for code that must run regardless of whether an exception was thrown.', questions: [
        { qId: 'v9q1', text: 'Try block', defaultCode: '', expectedPattern: /try\s*\{/ },
        { qId: 'v9q2', text: 'Catch block', defaultCode: '', expectedPattern: /catch\s*\(.*\)\s*\{/ },
        { qId: 'v9q3', text: 'Finally block', defaultCode: '', expectedPattern: /finally\s*\{/ },
        { qId: 'v9q4', text: 'Throw exception', defaultCode: '', expectedPattern: /throw\s*new/ },
        { qId: 'v9q5', text: 'Throws in signature', defaultCode: '', expectedPattern: /throws\s*\w+/ }
      ]},
      { id: 'v10', title: 'Threads', theory: 'Threads allow a Java program to perform multiple tasks simultaneously. By either extending the Thread class or implementing the Runnable interface, you can build applications that handle background processing, user interfaces, and server requests concurrently. Proper synchronization is key to ensuring that multiple threads interact safely.', questions: [
        { qId: 'v10q1', text: 'Extend Thread', defaultCode: '', expectedPattern: /extends\s*Thread/ },
        { qId: 'v10q2', text: 'Implement Runnable', defaultCode: '', expectedPattern: /implements\s*Runnable/ },
        { qId: 'v10q3', text: 'Method public void run()', defaultCode: '', expectedPattern: /public\s*void\s*run\(\)/ },
        { qId: 'v10q4', text: 'Start thread t.start()', defaultCode: '', expectedPattern: /\.start\(\)/ },
        { qId: 'v10q5', text: 'Synchronized block', defaultCode: '', expectedPattern: /synchronized\s*\(.*\)/ }
      ]}
    ]
  },
  csharp: {
    basic: [
      { id: 'h1', title: 'Hello C#', theory: 'C# (C-Sharp) is a modern, general-purpose, object-oriented language developed by Microsoft. It runs on the .NET framework and is widely used for everything from web apps to game development with Unity. Every program is organized into "namespaces," and execution starts in a static Main method within a class.', questions: [
        { qId: 'h1q1', text: 'Using System', defaultCode: '', expectedPattern: /using\s*System;/ },
        { qId: 'h1q2', text: 'Namespace App', defaultCode: '', expectedPattern: /namespace\s*App/ },
        { qId: 'h1q3', text: 'Console.WriteLine("Hi")', defaultCode: '', expectedPattern: /Console\.WriteLine\(["']Hi["']\)/ },
        { qId: 'h1q4', text: 'Read line Console.ReadLine', defaultCode: '', expectedPattern: /Console\.ReadLine\(\)/ },
        { qId: 'h1q5', text: 'Main method static void Main', defaultCode: '', expectedPattern: /static\s*void\s*Main/ }
      ]},
      { id: 'h2', title: 'Variables', theory: 'C# is a strongly typed language, ensuring that variables hold exactly the data type they are designed for. You can explicitly declare types like "int" or "string," or use the "var" keyword for type inference when the compiler can determine the type from the context. Constants (const) are used for values that never change.', questions: [
        { qId: 'h2q1', text: 'Int x = 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'h2q2', text: 'String s = "A"', defaultCode: '', expectedPattern: /string\s*s\s*=\s*["']A["']/ },
        { qId: 'h2q3', text: 'Implicitly typed var y = 10', defaultCode: '', expectedPattern: /var\s*y\s*=\s*10;/ },
        { qId: 'h2q4', text: 'Boolean b = true', defaultCode: '', expectedPattern: /bool\s*b\s*=\s*true;/ },
        { qId: 'h2q5', text: 'Constant const int x', defaultCode: '', expectedPattern: /const\s*int\s*x/ }
      ]},
      { id: 'h3', title: 'Logic', theory: 'C# offers a rich set of operators for logical decision making. Comparison operators compare two values, while logical operators like && (AND) and || (OR) combine those comparisons. C# also includes unique features like the "null-coalescing operator" (??) which provides a default value for null variables.', questions: [
        { qId: 'h3q1', text: 'If x is 0', defaultCode: '', expectedPattern: /if\s*\(x\s*==\s*0\)/ },
        { qId: 'h3q2', text: 'Logical AND (&&)', defaultCode: '', expectedPattern: /&&/ },
        { qId: 'h3q3', text: 'Logical OR (||)', defaultCode: '', expectedPattern: /\|\|/ },
        { qId: 'h3q4', text: 'Ternary operator ? :', defaultCode: '', expectedPattern: /\?\s*.*:/ },
        { qId: 'h3q5', text: 'Check null (??)', defaultCode: '', expectedPattern: /\?\?/ }
      ]},
      { id: 'h4', title: 'Conditionals', theory: 'Flow control in C# is handled by "if-else" statements for simple conditions and "switch" statements for choosing between many options based on a single value. Modern C# has expanded the "switch" with powerful pattern matching capabilities, making it much more flexible than traditional switch statements in other languages.', questions: [
        { qId: 'h4q1', text: 'If x > 100', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*100\)/ },
        { qId: 'h4q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'h4q3', text: 'Switch block', defaultCode: '', expectedPattern: /switch\s*\(.*\)\s*\{/ },
        { qId: 'h4q4', text: 'Case block', defaultCode: '', expectedPattern: /case\s*.*:/ },
        { qId: 'h4q5', text: 'Break in switch', defaultCode: '', expectedPattern: /break;/ }
      ]}
    ],
    intermediate: [
      { id: 'h5', title: 'Arrays', theory: 'An array in C# is a collection of a fixed number of items of the same type. They are zero-indexed and occupy a continuous block of memory, making them very fast. The Array class provides static methods like Sort() to easily manipulate your collections without writing complex custom algorithms.', questions: [
        { qId: 'h5q1', text: 'Int array int[] a', defaultCode: '', expectedPattern: /int\[\]\s*a/ },
        { qId: 'h5q2', text: 'New array new int[3]', defaultCode: '', expectedPattern: /new\s*int\[3\]/ },
        { qId: 'h5q3', text: 'Init {1, 2}', defaultCode: '', expectedPattern: /\{1,\s*2\}/ },
        { qId: 'h5q4', text: 'Length a.Length', defaultCode: '', expectedPattern: /a\.Length/ },
        { qId: 'h5q5', text: 'Array.Sort', defaultCode: '', expectedPattern: /Array\.Sort\(/ }
      ]},
      { id: 'h6', title: 'Lists', theory: 'The List<T> class is a dynamic collection that can automatically resize itself as needed. It implements the IList interface and is the preferred way to store collections of data when you don\'t know the final size in advance. Use the "Count" property to see how many items are currently in the list.', questions: [
        { qId: 'h6q1', text: 'List<int> l', defaultCode: '', expectedPattern: /List<int>/ },
        { qId: 'h6q2', text: 'Add element .Add()', defaultCode: '', expectedPattern: /\.Add\(.*\)/ },
        { qId: 'h6q3', text: 'Remove element .Remove()', defaultCode: '', expectedPattern: /\.Remove\(.*\)/ },
        { qId: 'h6q4', text: 'Count property .Count', defaultCode: '', expectedPattern: /\.Count/ },
        { qId: 'h6q5', text: 'Clear list .Clear()', defaultCode: '', expectedPattern: /\.Clear\(\)/ }
      ]},
      { id: 'h7', title: 'Classes', theory: 'In C#, classes are the foundation for building objects. They use "properties" with built-in "get" and "set" accessors to manage internal data safely. Use "constructors" to initialize objects when they are created with the "new" keyword, ensuring that every object starts in a valid and consistent state.', questions: [
        { qId: 'h7q1', text: 'Class Person', defaultCode: '', expectedPattern: /class\s*Person/ },
        { qId: 'h7q2', text: 'Auto property { get; set; }', defaultCode: '', expectedPattern: /\{\s*get;\s*set;\s*\}/ },
        { qId: 'h7q3', text: 'Constructor Person()', defaultCode: '', expectedPattern: /Person\(\)/ },
        { qId: 'h7q4', text: 'Public method', defaultCode: '', expectedPattern: /public\s*void/ },
        { qId: 'h7q5', text: 'New instance new Person()', defaultCode: '', expectedPattern: /new\s*Person\(\)/ }
      ]}
    ],
    expert: [
      { id: 'h8', title: 'Linq', theory: 'LINQ (Language Integrated Query) is a revolutionary C# feature that allows you to query data directly within the language using a syntax similar to SQL. It works on collections, databases, and even XML. Methods like .Where(), .Select(), and .OrderBy() allow you to transform and filter data with incredible ease and type safety.', questions: [
        { qId: 'h8q1', text: 'Use .Where()', defaultCode: '', expectedPattern: /\.Where\(.*\)/ },
        { qId: 'h8q2', text: 'Use .Select()', defaultCode: '', expectedPattern: /\.Select\(.*\)/ },
        { qId: 'h8q3', text: 'Use .First()', defaultCode: '', expectedPattern: /\.First\(\)/ },
        { qId: 'h8q4', text: 'Use .OrderBy()', defaultCode: '', expectedPattern: /\.OrderBy\(.*\)/ },
        { qId: 'h8q5', text: 'ToList() conversion', defaultCode: '', expectedPattern: /\.ToList\(\)/ }
      ]},
      { id: 'h9', title: 'Async', theory: 'Asynchronous programming in C# is built around the Task class and the "async" and "await" keywords. This model allows you to perform long-running operations (like network requests or file I/O) without blocking the main execution thread, keeping your applications responsive and fast under heavy load.', questions: [
        { qId: 'h9q1', text: 'Async method signature', defaultCode: '', expectedPattern: /async\s*Task/ },
        { qId: 'h9q2', text: 'Await task', defaultCode: '', expectedPattern: /await\s*\w+/ },
        { qId: 'h9q3', text: 'Task.Delay', defaultCode: '', expectedPattern: /Task\.Delay/ },
        { qId: 'h9q4', text: 'Task.Run', defaultCode: '', expectedPattern: /Task\.Run/ },
        { qId: 'h9q5', text: 'Return Task<int>', defaultCode: '', expectedPattern: /Task<int>/ }
      ]},
      { id: 'h10', title: 'Delegates', theory: 'A "delegate" is a type that represents references to methods with a particular parameter list and return type. They are essentially type-safe function pointers. Built-in delegates like Action and Func make it easy to pass functions as arguments, serving as the basis for the C# event system logic.', questions: [
        { qId: 'h10q1', text: 'Define delegate', defaultCode: '', expectedPattern: /delegate\s*void/ },
        { qId: 'h10q2', text: 'Use Action delegate', defaultCode: '', expectedPattern: /Action/ },
        { qId: 'h10q3', text: 'Use Func delegate', defaultCode: '', expectedPattern: /Func<.*>/ },
        { qId: 'h10q4', text: 'Lambda as delegate', defaultCode: '', expectedPattern: /=>/ },
        { qId: 'h10q5', text: 'Events using event keyword', defaultCode: '', expectedPattern: /event\s*Action/ }
      ]}
    ]
  },
  c: {
    basic: [
      {
        id: 'c1', title: 'Hello C', theory: 'C is a foundational, procedural language. Every C program starts with the "main" function. You include <stdio.h> to use printf() for output. Every statement must end with a semicolon (;).',
        questions: [
          { qId: 'c1q1', text: 'Include stdio.h', defaultCode: '', expectedPattern: /#include\s*<stdio\.h>/ },
          { qId: 'c1q2', text: 'Define int main()', defaultCode: '', expectedPattern: /int\s*main\(\)/ },
          { qId: 'c1q3', text: 'Print "Hello" with printf', defaultCode: '', expectedPattern: /printf\(["']Hello["']\)/ },
          { qId: 'c1q4', text: 'Print with newline \\n', defaultCode: '', expectedPattern: /\\n/ },
          { qId: 'c1q5', text: 'Return 0 at end', defaultCode: '', expectedPattern: /return\s*0;/ }
        ]
      },
      {
        id: 'c2', title: 'Variables', theory: 'In C, you must declare the type of every variable. Common types are int, float, char, and double. Variables must be declared before they can be used.',
        questions: [
          { qId: 'c2q1', text: 'Declare int x = 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
          { qId: 'c2q2', text: 'Declare float f', defaultCode: '', expectedPattern: /float\s*f/ },
          { qId: 'c2q3', text: 'Declare char c = \'A\'', defaultCode: '', expectedPattern: /char\s*c\s*=\s*[']A[']/ },
          { qId: 'c2q4', text: 'Print int with %d', defaultCode: '', expectedPattern: /printf\(["']%d["'],\s*x\)/ },
          { qId: 'c2q5', text: 'Constant with #define', defaultCode: '', expectedPattern: /#define\s*PI\s*3\.14/ }
        ]
      }
    ],
    intermediate: [
      {
        id: 'c3', title: 'Pointers', theory: 'Pointers are variables that store memory addresses. Use & to get an address and * to dereference a pointer. Pointers are essential for dynamic memory and arrays.',
        questions: [
          { qId: 'c3q1', text: 'Declare int pointer *p', defaultCode: '', expectedPattern: /int\s*\*p/ },
          { qId: 'c3q2', text: 'Set p to address of x', defaultCode: '', expectedPattern: /p\s*=\s*&x/ },
          { qId: 'c3q3', text: 'Dereference *p', defaultCode: '', expectedPattern: /\*p/ },
          { qId: 'c3q4', text: 'Null pointer NULL', defaultCode: '', expectedPattern: /NULL/ },
          { qId: 'c3q5', text: 'Pointer addition p++', defaultCode: '', expectedPattern: /p\+\+/ }
        ]
      },
      {
        id: 'c4', title: 'Arrays', theory: 'Arrays store multiple elements of the same type in contiguous memory. Index starts at 0. Strings in C are actually character arrays ending with a null character (\\0).',
        questions: [
          { qId: 'c4q1', text: 'Declare int arr[5]', defaultCode: '', expectedPattern: /int\s*arr\[5\]/ },
          { qId: 'c4q2', text: 'Init {1, 2, 3}', defaultCode: '', expectedPattern: /\{1,\s*2,\s*3\}/ },
          { qId: 'c4q3', text: 'Access arr[0]', defaultCode: '', expectedPattern: /arr\[0\]/ },
          { qId: 'c4q4', text: 'String as char[]', defaultCode: '', expectedPattern: /char\s*s\[\]\s*=/ },
          { qId: 'c4q5', text: 'Size of array sizeof', defaultCode: '', expectedPattern: /sizeof\(arr\)/ }
        ]
      }
    ],
    expert: [
      {
        id: 'c5', title: 'Memory', theory: 'C allows manual memory management using malloc(), calloc(), realloc(), and free(). Memory is allocated on the heap and must be manually freed to avoid leaks.',
        questions: [
          { qId: 'c5q1', text: 'Include stdlib.h', defaultCode: '', expectedPattern: /#include\s*<stdlib\.h>/ },
          { qId: 'c5q2', text: 'malloc 10 ints', defaultCode: '', expectedPattern: /malloc\(10\s*\*\s*sizeof\(int\)\)/ },
          { qId: 'c5q3', text: 'Cast malloc result', defaultCode: '', expectedPattern: /\(int\s*\*\)malloc/ },
          { qId: 'c5q4', text: 'Free memory free(p)', defaultCode: '', expectedPattern: /free\(p\)/ },
          { qId: 'c5q5', text: 'Calloc for 5 floats', defaultCode: '', expectedPattern: /calloc\(5,\s*sizeof\(float\)\)/ }
        ]
      },
      {
        id: 'c6', title: 'Structs', theory: 'Structs let you group different data types into a single custom type. They are the precursor to classes in C++.',
        questions: [
          { qId: 'c6q1', text: 'Define struct Node', defaultCode: '', expectedPattern: /struct\s*Node\s*\{/ },
          { qId: 'c6q2', text: 'Struct field int val', defaultCode: '', expectedPattern: /int\s*val;/ },
          { qId: 'c6q3', text: 'Access with dot (.)', defaultCode: '', expectedPattern: /node\.val/ },
          { qId: 'c6q4', text: 'Access pointer with ->', defaultCode: '', expectedPattern: /p->val/ },
          { qId: 'c6q5', text: 'Typedef struct', defaultCode: '', expectedPattern: /typedef\s*struct/ }
        ]
      }
    ]
  },
  dsa: {

    basic: [
      { id: 'd1', title: 'Complexity', theory: 'Big-O notation is the language used to talk about how much time or memory an algorithm takes as the input size (N) grows. "Time complexity" measures the number of operations, while "space complexity" measures the extra memory used. Common notations like O(1), O(log N), O(N), and O(N²) help engineers choose the right tool for the job.', questions: [
        { qId: 'd1q1', text: 'Constant time notation', defaultCode: '', expectedPattern: /O\(1\)/ },
        { qId: 'd1q2', text: 'Linear time notation', defaultCode: '', expectedPattern: /O\(n\)/ },
        { qId: 'd1q3', text: 'Quadratic time notation', defaultCode: '', expectedPattern: /O\(n\^2\)/ },
        { qId: 'd1q4', text: 'Logarithmic time notation', defaultCode: '', expectedPattern: /O\(log\s*n\)/ },
        { qId: 'd1q5', text: 'Linearithmic time notation', defaultCode: '', expectedPattern: /O\(n\s*log\s*n\)/ }
      ]},
      { id: 'd2', title: 'Arrays & Strings', theory: 'Linear data structures store elements in a sequence. Arrays are contiguous blocks of memory where every item is the same size, allowing for instant access via an index. Strings are essentially arrays of characters. Understanding how these work at a low level is essential for optimizing performance in any language.', questions: [
        { qId: 'd2q1', text: 'Access element at index i', defaultCode: '', expectedPattern: /arr\[i\]/ },
        { qId: 'd2q2', text: 'String length operation', defaultCode: '', expectedPattern: /\.length|len\(|sizeof/ },
        { qId: 'd2q3', text: 'Initialize empty array', defaultCode: '', expectedPattern: /\[\]|\{\}|new/ },
        { qId: 'd2q4', text: 'Check if string is empty', defaultCode: '', expectedPattern: /==\s*["']["']|\.isEmpty/ },
        { qId: 'd2q5', text: 'Reverse a string logic', defaultCode: '', expectedPattern: /reverse|swap/ }
      ]},
      { id: 'd3', title: 'Linear Search', theory: 'Linear Search is the most basic searching algorithm. It starts at the first element and checks every single item one by one until it finds a match or reaches the end of the collection. Its time complexity is O(N), meaning the time it takes increases linearly with the number of items being searched.', questions: [
        { qId: 'd3q1', text: 'Start loop 0 to N', defaultCode: '', expectedPattern: /for.*i\s*<\s*n/ },
        { qId: 'd3q2', text: 'Check if element == target', defaultCode: '', expectedPattern: /==\s*target/ },
        { qId: 'd3q3', text: 'Return index if found', defaultCode: '', expectedPattern: /return\s*i/ },
        { qId: 'd3q4', text: 'Return -1 if not found', defaultCode: '', expectedPattern: /return\s*-1/ },
        { qId: 'd3q5', text: 'Linear search complexity', defaultCode: '', expectedPattern: /O\(n\)/ }
      ]},
      { id: 'd4', title: 'Selection Sort', theory: 'Selection Sort is a simple comparison-based sorting algorithm. It maintains two parts: the sorted portion at the beginning and the unsorted portion at the end. In each step, it finds the smallest element from the unsorted part and moves it to the end of the sorted part. Its performance is O(N²) regardless of the initial order of the data.', questions: [
        { qId: 'd4q1', text: 'Nested loop structure', defaultCode: '', expectedPattern: /for.*for/ },
        { qId: 'd4q2', text: 'Find min_idx', defaultCode: '', expectedPattern: /min_idx\s*=/ },
        { qId: 'd4q3', text: 'Swap elements', defaultCode: '', expectedPattern: /swap|temp\s*=/ },
        { qId: 'd4q4', text: 'Average complexity', defaultCode: '', expectedPattern: /O\(n\^2\)/ },
        { qId: 'd4q5', text: 'Is it stable?', defaultCode: '', expectedPattern: /no|false/i }
      ]},
      { id: 'd5', title: 'Recursion', theory: 'Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. To avoid infinite loops, every recursive function must have a "base case"—a condition where it stops calling itself and returns a simple result. Recursion is the foundation of many complex algorithms, like those for trees and sorting.', questions: [
        { qId: 'd5q1', text: 'Define base case if n == 0', defaultCode: '', expectedPattern: /if\s*\(?n\s*==\s*0\)?/ },
        { qId: 'd5q2', text: 'Return base value', defaultCode: '', expectedPattern: /return\s*[01]/ },
        { qId: 'd5q3', text: 'Recursive call with n-1', defaultCode: '', expectedPattern: /\w+\(n\s*-\s*1\)/ },
        { qId: 'd5q4', text: 'Factorial logic n * f(n-1)', defaultCode: '', expectedPattern: /n\s*\*\s*\w+/ },
        { qId: 'd5q5', text: 'Stack overflow cause', defaultCode: '', expectedPattern: /base\s*case/i }
      ]}
    ],
    intermediate: [
      { id: 'd6', title: 'Linked Lists', theory: 'A Linked List is a linear data structure where elements (nodes) are not stored in contiguous memory. Instead, each node contains its own data and a "pointer" (reference) to the next node in the sequence. This allows for very efficient insertions and deletions compared to arrays, but makes searching much slower as you must traverse the list from the start.', questions: [
        { qId: 'd6q1', text: 'Node structure (val, next)', defaultCode: '', expectedPattern: /val|next/ },
        { qId: 'd6q2', text: 'Traverse list while node != null', defaultCode: '', expectedPattern: /while.*!=\s*null/ },
        { qId: 'd6q3', text: 'Move to next: curr = curr.next', defaultCode: '', expectedPattern: /curr\.next/ },
        { qId: 'd6q4', text: 'Insertion at head', defaultCode: '', expectedPattern: /next\s*=\s*head/ },
        { qId: 'd6q5', text: 'Doubly linked list (prev)', defaultCode: '', expectedPattern: /prev/ }
      ]},
      { id: 'd7', title: 'Stacks & Queues', theory: 'Stacks and Queues are specialized linear data structures. A Stack follows the "Last-In, First-Out" (LIFO) principle, similar to a stack of plates. A Queue follows the "First-In, First-Out" (FIFO) principle, like a line at a store. Both are essential for managing data in specific orders during complex processing.', questions: [
        { qId: 'd7q1', text: 'Stack push operation', defaultCode: '', expectedPattern: /push/ },
        { qId: 'd7q2', text: 'Stack pop operation', defaultCode: '', expectedPattern: /pop/ },
        { qId: 'd7q3', text: 'Queue enqueue/offer', defaultCode: '', expectedPattern: /enqueue|offer|add/ },
        { qId: 'd7q4', text: 'Queue dequeue/poll', defaultCode: '', expectedPattern: /dequeue|poll|remove/ },
        { qId: 'd7q5', text: 'Peek top element', defaultCode: '', expectedPattern: /peek/ }
      ]},
      { id: 'd8', title: 'Hash Tables', theory: 'Hash Tables (or HashMaps) provide O(1) average-case time complexity for searching, inserting, and deleting data. They use a "hash function" to map keys to specific indices in an underlying array. Dealing with "collisions"—when two keys map to the same index—is a core part of hash table design, often solved through "chaining" or "probing."', questions: [
        { qId: 'd8q1', text: 'Set key-value pair', defaultCode: '', expectedPattern: /put|set|\[.*\]\s*=/ },
        { qId: 'd8q2', text: 'Get value by key', defaultCode: '', expectedPattern: /get|\[.*\]/ },
        { qId: 'd8q3', text: 'Check if key exists', defaultCode: '', expectedPattern: /contains|has/ },
        { qId: 'd8q4', text: 'Collision resolution', defaultCode: '', expectedPattern: /chaining|probing/i },
        { qId: 'd8q5', text: 'Remove key', defaultCode: '', expectedPattern: /remove|delete/ }
      ]},
      { id: 'd9', title: 'Binary Search', theory: 'Binary Search is a highly efficient algorithm for searching sorted arrays. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, it searches the left half; otherwise, it searches the right. This "divide and conquer" approach results in an incredibly fast O(log N) time complexity.', questions: [
        { qId: 'd9q1', text: 'Calculate mid index', defaultCode: '', expectedPattern: /left\s*\+\s*\(right\s*-\s*left\)\s*\/\s*2/ },
        { qId: 'd9q2', text: 'If target < mid, move right', defaultCode: '', expectedPattern: /right\s*=\s*mid\s*-\s*1/ },
        { qId: 'd9q3', text: 'If target > mid, move left', defaultCode: '', expectedPattern: /left\s*=\s*mid\s*\+\s*1/ },
        { qId: 'd9q4', text: 'Loop condition left <= right', defaultCode: '', expectedPattern: /left\s*<=\s*right/ },
        { qId: 'd9q5', text: 'Search space reduction', defaultCode: '', expectedPattern: /half|50%/i }
      ]},
      { id: 'd10', title: 'Fast Sorting', theory: 'Algorithms like Merge Sort and Quick Sort use a "Divide and Conquer" strategy to achieve O(N log N) time complexity, which is much faster than simple sorts for large datasets. Merge Sort is "stable" (maintains relative order of equal elements), while Quick Sort is often faster in practice due to lower overhead.', questions: [
        { qId: 'd10q1', text: 'Merge sort split logic', defaultCode: '', expectedPattern: /mid\s*=\s*n\s*\/\s*2/ },
        { qId: 'd10q2', text: 'Quick sort pivot selection', defaultCode: '', expectedPattern: /pivot\s*=/ },
        { qId: 'd10q3', text: 'Average complexity of both', defaultCode: '', expectedPattern: /O\(n\s*log\s*n\)/ },
        { qId: 'd10q4', text: 'Which is stable?', defaultCode: '', expectedPattern: /merge/i },
        { qId: 'd10q5', text: 'Quick sort partition', defaultCode: '', expectedPattern: /partition/ }
      ]},
      { id: 'd11', title: 'Bit Magic', theory: 'Bit manipulation involves directly operating on individual bits within a byte or word. This is extremely efficient and is used for low-level optimizations, compression, and cryptography. Common operators include AND (&), OR (|), and XOR (^), along with left and right shifts which serve as fast ways to multiply or divide by two.', questions: [
        { qId: 'd11q1', text: 'AND operator', defaultCode: '', expectedPattern: /&/ },
        { qId: 'd11q2', text: 'OR operator', defaultCode: '', expectedPattern: /\|/ },
        { qId: 'd11q3', text: 'XOR operator', defaultCode: '', expectedPattern: /\^/ },
        { qId: 'd11q4', text: 'Left shift (multiply by 2)', defaultCode: '', expectedPattern: /<</ },
        { qId: 'd11q5', text: 'Right shift (divide by 2)', defaultCode: '', expectedPattern: />>/ }
      ]},
      { id: 'd12', title: 'Sliding Window', theory: 'The Sliding Window pattern is used to solve problems involving arrays or lists where you need to find a specific subarray that meets a certain criteria. By maintaining a "window" of elements and "sliding" it across the collection, you can solve many problems in O(N) time that would otherwise require O(N²) nested loops.', questions: [
        { qId: 'd12q1', text: 'Expand window (right++)', defaultCode: '', expectedPattern: /right\+\+/ },
        { qId: 'd12q2', text: 'Shrink window condition', defaultCode: '', expectedPattern: /while.*left\+\+/ },
        { qId: 'd12q3', text: 'Calculate window size', defaultCode: '', expectedPattern: /right\s*-\s*left\s*\+\s*1/ },
        { qId: 'd12q4', text: 'Two pointers initialization', defaultCode: '', expectedPattern: /left\s*=\s*0.*right\s*=\s*0/ },
        { qId: 'd12q5', text: 'Typical complexity', defaultCode: '', expectedPattern: /O\(n\)/ }
      ]}
    ],
    expert: [
      { id: 'd13', title: 'Trees & BST', theory: 'Trees are hierarchical data structures consisting of nodes. A Binary Search Tree (BST) is a specialized binary tree where for every node, elements to the left are smaller and elements to the right are larger. This structure allows for fast searching, insertion, and deletion in O(log N) time when the tree is "balanced."', questions: [
        { qId: 'd13q1', text: 'In-order traversal', defaultCode: '', expectedPattern: /left.*root.*right/i },
        { qId: 'd13q2', text: 'Pre-order traversal', defaultCode: '', expectedPattern: /root.*left.*right/i },
        { qId: 'd13q3', text: 'Post-order traversal', defaultCode: '', expectedPattern: /left.*right.*root/i },
        { qId: 'd13q4', text: 'BST insert logic', defaultCode: '', expectedPattern: /<\s*root.*>\s*root/ },
        { qId: 'd13q5', text: 'Balanced tree examples', defaultCode: '', expectedPattern: /avl|red-black/i }
      ]},
      { id: 'd14', title: 'Heaps & Graphs', theory: 'Heaps are tree-based structures used to efficiently maintain priorities. Graphs are networks of nodes (vertices) connected by edges, used to model everything from social networks to city maps. Graph representation (Adjacency Matrix vs. List) and traversal (BFS/DFS) are core skills for solving complex pathfinding and networking problems.', questions: [
        { qId: 'd14q1', text: 'Min-heap root property', defaultCode: '', expectedPattern: /smallest|minimum/i },
        { qId: 'd14q2', text: 'Adjacency list representation', defaultCode: '', expectedPattern: /Map<.*List>|vector<vector>/i },
        { qId: 'd14q3', text: 'Adjacency matrix size', defaultCode: '', expectedPattern: /n\^2|v\^2/ },
        { qId: 'd14q4', text: 'Priority Queue push complexity', defaultCode: '', expectedPattern: /O\(log\s*n\)/ },
        { qId: 'd14q5', text: 'Graph edge notation (u, v)', defaultCode: '', expectedPattern: /u,\s*v/ }
      ]},
      { id: 'd15', title: 'Backtracking', theory: 'Backtracking is an algorithmic paradigm that explores all potential paths to a solution and "backtracks" (reverts) whenever a path is found to be invalid. It is commonly used for solving puzzles like Sudoku, finding all permutations of a string, or solving the classic N-Queens problem on a chessboard.', questions: [
        { qId: 'd15q1', text: 'Base case to record solution', defaultCode: '', expectedPattern: /if.*res\.add/ },
        { qId: 'd15q2', text: 'Recursive step', defaultCode: '', expectedPattern: /dfs\(.*\)|solve\(.*\)/ },
        { qId: 'd15q3', text: 'Undo step (backtrack)', defaultCode: '', expectedPattern: /remove|pop|unvisited/i },
        { qId: 'd15q4', text: 'N-Queens example', defaultCode: '', expectedPattern: /queen/i },
        { qId: 'd15q5', text: 'Complexity of permutations', defaultCode: '', expectedPattern: /O\(n!\)/ }
      ]},
      { id: 'd16', title: 'Dynamic Prog', theory: 'Dynamic Programming (DP) is a technique for solving complex problems by breaking them into overlapping sub-problems. Unlike simple recursion, DP stores the results of these sub-problems (memoization) so each one is only solved once. This can turn an exponential-time recursive solution into an efficient linear-time one.', questions: [
        { qId: 'd16q1', text: 'Memoization table check', defaultCode: '', expectedPattern: /if.*memo\[i\]\s*!=\s*-1/ },
        { qId: 'd16q2', text: 'Tabulation (Bottom-up) loop', defaultCode: '', expectedPattern: /dp\[i\]\s*=\s*/ },
        { qId: 'd16q3', text: 'Optimal substructure', defaultCode: '', expectedPattern: /max\(|min\(/ },
        { qId: 'd16q4', text: 'Knapsack 0/1 logic', defaultCode: '', expectedPattern: /weight/i },
        { qId: 'd16q5', text: 'Fibonacci DP complexity', defaultCode: '', expectedPattern: /O\(n\)/ }
      ]},
      { id: 'd17', title: 'Advanced Graphs', theory: 'Advanced graph algorithms solve specific network problems. Dijkstra\'s algorithm finds the shortest path between nodes, while Prim\'s and Kruskal\'s algorithms find the Minimum Spanning Tree—the network that connects all nodes with the lowest total edge weight. Topological sort is essential for managing dependencies in a task graph.', questions: [
        { qId: 'd17q1', text: 'Dijkstra complexity', defaultCode: '', expectedPattern: /e\s*log\s*v/i },
        { qId: 'd17q2', text: 'MST algorithm examples', defaultCode: '', expectedPattern: /prim|kruskal/i },
        { qId: 'd17q3', text: 'Topological sort (indegree)', defaultCode: '', expectedPattern: /indegree|in-degree/i },
        { qId: 'd17q4', text: 'Bellman-Ford for negative edges', defaultPattern: /negative/i },
        { qId: 'd17q5', text: 'Floyd-Warshall all-pairs', defaultCode: '', expectedPattern: /O\(v\^3\)/ }
      ]},
      { id: 'd18', title: 'Tries & DSU', theory: 'A Trie (Prefix Tree) is a specialized tree structure used for fast string searching and autocomplete. Disjoint Set Union (DSU) is a data structure that tracks elements split into non-overlapping sets. It uses "path compression" and "union by rank" to perform set merges and membership tests almost instantly.', questions: [
        { qId: 'd18q1', text: 'Trie node children', defaultCode: '', expectedPattern: /children|alphabet/i },
        { qId: 'd18q2', text: 'DSU find operation', defaultCode: '', expectedPattern: /find\(i\)/ },
        { qId: 'd18q3', text: 'DSU union by rank', defaultCode: '', expectedPattern: /union/i },
        { qId: 'd18q4', text: 'DSU path compression', defaultCode: '', expectedPattern: /parent\[i\]\s*=\s*find/ },
        { qId: 'd18q5', text: 'Trie search complexity', defaultCode: '', expectedPattern: /O\(L\)/ }
      ]},
      { id: 'd19', title: 'Segment Trees', theory: 'Segment Trees are used for storing information about intervals or segments. They allow for very efficient range queries (like "find the sum of elements from index i to j") and single-element updates, both in O(log N) time. This makes them significantly faster than simple arrays for large-scale range data processing.', questions: [
        { qId: 'd19q1', text: 'Build complexity', defaultCode: '', expectedPattern: /O\(n\)/ },
        { qId: 'd19q2', text: 'Query complexity', defaultCode: '', expectedPattern: /O\(log\s*n\)/ },
        { qId: 'd19q3', text: 'Tree array size', defaultCode: '', expectedPattern: /4\s*\*?\s*n/ },
        { qId: 'd19q4', text: 'Merge logic (sum/min/max)', defaultCode: '', expectedPattern: /left\s*\+\s*right/ },
        { qId: 'd19q5', text: 'Fenwick tree name', defaultCode: '', expectedPattern: /binary\s*indexed\s*tree/i }
      ]}
    ]
  },
  sorting: {
    basic: [
      {
        id: 'so1', title: 'Bubble Sort', theory: 'Bubble Sort is often the first algorithm students learn. It works by repeatedly "bubbling" the largest unsorted element to its correct position at the end of the list. It does this by comparing adjacent elements and swapping them if they are in the wrong order. While simple to understand, its O(n²) time complexity makes it inefficient for large datasets.',
        questions: [
          { qId: 'so1q1', text: 'Nested loop structure (i and j)', defaultCode: '', expectedPattern: /for.*for/ },
          { qId: 'so1q2', text: 'Compare adjacent: arr[j] > arr[j+1]', defaultCode: '', expectedPattern: /arr\[j\]\s*>\s*arr\[j\+1\]/ },
          { qId: 'so1q3', text: 'Swap elements logic', defaultCode: '', expectedPattern: /temp\s*=\s*arr\[j\]|arr\[j\],\s*arr\[j\+1\]\s*=\s*arr\[j\+1\],\s*arr\[j\]/ },
          { qId: 'so1q4', text: 'Average time complexity', defaultCode: '', expectedPattern: /O\(n\^2\)/ },
          { qId: 'so1q5', text: 'Is Bubble Sort stable?', defaultCode: '', expectedPattern: /yes|true/i }
        ]
      },
      {
        id: 'so2', title: 'Selection Sort', theory: 'Selection Sort improves slightly on Bubble Sort by reducing the number of swaps. In each pass, it "selects" the smallest (or largest) element from the unsorted portion and swaps it with the first element of the unsorted part. This grows the sorted portion one element at a time from the left. Like Bubble Sort, it remains O(n²) in all cases.',
        questions: [
          { qId: 'so2q1', text: 'Find min_index in loop', defaultCode: '', expectedPattern: /min_idx\s*=\s*i/ },
          { qId: 'so2q2', text: 'Update min_index if smaller found', defaultCode: '', expectedPattern: /if\s*arr\[j\]\s*<\s*arr\[min_idx\]/ },
          { qId: 'so2q3', text: 'Swap min with first unsorted', defaultCode: '', expectedPattern: /arr\[i\],\s*arr\[min_idx\]/ },
          { qId: 'so2q4', text: 'Best case complexity', defaultCode: '', expectedPattern: /O\(n\^2\)/ },
          { qId: 'so2q5', text: 'Selection sort stability', defaultCode: '', expectedPattern: /no|false/i }
        ]
      }
    ],
    intermediate: [
      {
        id: 'so3', title: 'Insertion Sort', theory: 'Insertion Sort mimics how most people sort a hand of playing cards. It processes the array from left to right, taking each "new" element and "inserting" it into its correct, sorted position among the elements already processed. It is highly efficient for small datasets and "nearly sorted" arrays, where it can even reach O(n) performance.',
        questions: [
          { qId: 'so3q1', text: 'Pick key element (arr[i])', defaultCode: '', expectedPattern: /key\s*=\s*arr\[i\]/ },
          { qId: 'so3q2', text: 'While loop for shifting elements', defaultCode: '', expectedPattern: /while\s*j\s*>=\s*0\s*and\s*key\s*<\s*arr\[j\]/ },
          { qId: 'so3q3', text: 'Shift element to the right', defaultCode: '', expectedPattern: /arr\[j\+1\]\s*=\s*arr\[j\]/ },
          { qId: 'so3q4', text: 'Place key in correct position', defaultCode: '', expectedPattern: /arr\[j\+1\]\s*=\s*key/ },
          { qId: 'so3q5', text: 'Complexity for sorted list', defaultCode: '', expectedPattern: /O\(n\)/ }
        ]
      },
      {
        id: 'so4', title: 'Merge Sort', theory: 'Merge Sort is a classic "Divide and Conquer" algorithm. It recursively splits the array into single-element halves (which are sorted by definition) and then "merges" those halves back together in the correct order. This approach guarantees an efficient O(n log n) time complexity, making it much faster than simple sorts for large data.',
        questions: [
          { qId: 'so4q1', text: 'Find middle point', defaultCode: '', expectedPattern: /mid\s*=\s*len\(arr\)\s*\/\/\s*2/ },
          { qId: 'so4q2', text: 'Recursive calls for left and right', defaultCode: '', expectedPattern: /mergeSort\(L\).*mergeSort\(R\)/ },
          { qId: 'so4q3', text: 'Merge condition (i < len(L) and j < len(R))', defaultCode: '', expectedPattern: /while\s*i\s*<\s*len\(L\)\s*and\s*j\s*<\s*len\(R\)/ },
          { qId: 'so4q4', text: 'Copy remaining elements', defaultCode: '', expectedPattern: /arr\[k\]\s*=\s*L\[i\]/ },
          { qId: 'so4q5', text: 'Worst case time complexity', defaultCode: '', expectedPattern: /O\(n\s*log\s*n\)/ }
        ]
      }
    ],
    expert: [
      {
        id: 'so5', title: 'Quick Sort', theory: 'Quick Sort is often the fastest sorting algorithm in practice. It uses a "pivot" element to partition the array into two parts: elements smaller than the pivot and elements larger. By recursively sorting these parts, the entire array becomes ordered. While its worst-case is O(n²), its average-case of O(n log n) with small hidden constants makes it a top choice for standard libraries.',
        questions: [
          { qId: 'so5q1', text: 'Choose pivot element', defaultCode: '', expectedPattern: /pivot\s*=\s*arr\[high\]/ },
          { qId: 'so5q2', text: 'Partitioning loop', defaultCode: '', expectedPattern: /for\s*j\s*in\s*range\(low,\s*high\)/ },
          { qId: 'so5q3', text: 'Swap if element < pivot', defaultCode: '', expectedPattern: /if\s*arr\[j\]\s*<=\s*pivot/ },
          { qId: 'so5q4', text: 'Recursive calls around pivot', defaultCode: '', expectedPattern: /quickSort\(arr,\s*low,\s*pi-1\).*quickSort\(arr,\s*pi\+1,\s*high\)/ },
          { qId: 'so5q5', text: 'Worst case complexity', defaultCode: '', expectedPattern: /O\(n\^2\)/ }
        ]
      },
      {
        id: 'so6', title: 'Heap Sort', theory: 'Heap Sort leverages the properties of a Binary Heap—a complete binary tree where every parent is larger than its children (Max-Heap). The algorithm first builds a heap from the data, then repeatedly swaps the root (the largest element) with the last element of the unsorted portion and "re-heapifies." It provides a guaranteed O(n log n) performance without the recursion overhead of Merge Sort.',
        questions: [
          { qId: 'so6q1', text: 'Build max heap loop', defaultCode: '', expectedPattern: /range\(n\s*\/\/\s*2\s*-\s*1,\s*-1,\s*-1\)/ },
          { qId: 'so6q2', text: 'Heapify function call', defaultCode: '', expectedPattern: /heapify\(arr,\s*n,\s*i\)/ },
          { qId: 'so6q3', text: 'Extract element from heap', defaultCode: '', expectedPattern: /arr\[i\],\s*arr\[0\]\s*=\s*arr\[0\],\s*arr\[i\]/ },
          { qId: 'so6q4', text: 'Is Heap Sort stable?', defaultCode: '', expectedPattern: /no|false/i },
          { qId: 'so6q5', text: 'Space complexity', defaultCode: '', expectedPattern: /O\(1\)/ }
        ]
      }
    ]
  }
};

export const DIFFICULTY_LEVELS = ['basic', 'intermediate', 'expert'];
export const LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '⚡' },
  { id: 'rust', label: 'Rust', icon: '🦀' },
  { id: 'sql', label: 'SQL', icon: '🗄️' },
  { id: 'bash', label: 'Bash', icon: '🔧' },
  { id: 'go', label: 'Go', icon: '🐹' },
  { id: 'typescript', label: 'TypeScript', icon: '📘' },
  { id: 'cpp', label: 'C++', icon: '⚙️' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'csharp', label: 'C#', icon: '🎮' },
  { id: 'c', label: 'C', icon: '©️' },
  { id: 'dsa', label: 'DSA', icon: '🧩' },
  { id: 'sorting', label: 'Sorting', icon: '📊' }
];
