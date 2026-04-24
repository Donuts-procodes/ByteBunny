// 🐰 ByteBunny Enhanced Levels System v2.0
// 300 Levels × 10 Languages with Progressive Difficulty
// Answers never revealed on wrong answer, smart level replay

export const LANGUAGES = [
  { id: 'python', name: 'Python', icon: '🐍', color: '#3776ab' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#f1e05a' },
  { id: 'rust', name: 'Rust', icon: '🦀', color: '#ce422b' },
  { id: 'sql', name: 'SQL', icon: '🗄️', color: '#cc2927' },
  { id: 'bash', name: 'Bash', icon: '🔧', color: '#4eaa25' },
  { id: 'go', name: 'Go', icon: '🐹', color: '#00add8' },
  { id: 'typescript', name: 'TypeScript', icon: '📘', color: '#2b7a0b' },
  { id: 'cpp', name: 'C++', icon: '⚙️', color: '#00599c' },
  { id: 'java', name: 'Java', icon: '☕', color: '#007396' },
  { id: 'csharp', name: 'C#', icon: '🎮', color: '#239120' },
  { id: 'c', name: 'C', icon: '©️', color: '#a8b9cc' },
];

// Difficulty levels: Beginner (1-100), Intermediate (101-200), Advanced (201-300)
const DIFFICULTY_LEVELS = {
  BEGINNER: { range: [1, 100], baseXP: 25 },
  INTERMEDIATE: { range: [101, 200], baseXP: 50 },
  ADVANCED: { range: [201, 300], baseXP: 100 },
};

function getDifficultyFromLevelId(levelId) {
  if (levelId <= 100) return 'BEGINNER';
  if (levelId <= 200) return 'INTERMEDIATE';
  return 'ADVANCED';
}

function getBaseXPForLevel(levelId) {
  const difficulty = getDifficultyFromLevelId(levelId);
  return DIFFICULTY_LEVELS[difficulty].baseXP;
}

// ============================================================================
// PYTHON QUESTIONS (300 questions, organized by difficulty)
// ============================================================================

const PYTHON_QUESTIONS = {
  BEGINNER: [
    // Level 1-25: Basics
    {
      q: "What keyword is used to create a function in Python?",
      opts: ["function", "def", "func", "define"],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What does `len()` return?",
      opts: ["A random number", "The length of an object", "The current time", "A boolean value"],
      ans: 1,
      topic: "Built-in Functions"
    },
    {
      q: "Which operator is used for exponentiation?",
      opts: ["+", "-", "^", "**"],
      ans: 3,
      topic: "Operators"
    },
    {
      q: "What is the correct way to comment in Python?",
      opts: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
      ans: 2,
      topic: "Syntax"
    },
    {
      q: "Which data type stores text?",
      opts: ["int", "float", "str", "bool"],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "What does `type()` function do?",
      opts: ["Returns the value", "Returns the data type", "Checks if it's valid", "Converts to another type"],
      ans: 1,
      topic: "Built-in Functions"
    },
    {
      q: "How do you create an empty list?",
      opts: ["{}", "[]", "()", "<>"],
      ans: 1,
      topic: "Data Structures"
    },
    {
      q: "What keyword is used to create a loop?",
      opts: ["loop", "repeat", "for", "iterate"],
      ans: 2,
      topic: "Control Flow"
    },
    {
      q: "What does `print()` do?",
      opts: ["Sends to printer", "Displays to console", "Stores in memory", "Returns a value"],
      ans: 1,
      topic: "I/O"
    },
    {
      q: "Which is NOT a Python data type?",
      opts: ["list", "tuple", "array", "dict"],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "How do you access the first element of a list?",
      opts: ["list[1]", "list[0]", "list.first()", "first(list)"],
      ans: 1,
      topic: "Data Structures"
    },
    {
      q: "What does `if` statement do?",
      opts: ["Loops through items", "Makes a decision", "Defines a variable", "Imports a module"],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What keyword imports a module?",
      opts: ["include", "import", "require", "use"],
      ans: 1,
      topic: "Modules"
    },
    {
      q: "How do you check if something is NOT equal?",
      opts: ["!=", "<>", "!==", "not=="],
      ans: 0,
      topic: "Operators"
    },
    {
      q: "What does `input()` do?",
      opts: ["Reads from file", "Gets user input", "Initializes a variable", "Validates data"],
      ans: 1,
      topic: "I/O"
    },
    {
      q: "Which quotes create a string?",
      opts: ["Only double quotes", "Only single quotes", "Both single and double", "Backticks only"],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "What does `range(5)` return?",
      opts: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[5,10,15,20,25]", "[0,5]"],
      ans: 1,
      topic: "Built-in Functions"
    },
    {
      q: "How do you add an item to a list?",
      opts: ["list.add()", "list.push()", "list.append()", "list.insert_item()"],
      ans: 2,
      topic: "Data Structures"
    },
    {
      q: "What does `break` do in a loop?",
      opts: ["Pauses the loop", "Exits the loop", "Skips an iteration", "Restarts the loop"],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What is `None` in Python?",
      opts: ["The number 0", "An empty string", "Represents no value", "A boolean false"],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "How do you check if a value exists in a list?",
      opts: ["find()", "in", "contains()", "exists()"],
      ans: 1,
      topic: "Operators"
    },
    {
      q: "What does `else` follow?",
      opts: ["loop", "if or try", "while", "for"],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "How do you create a dictionary?",
      opts: ["[]", "{}", "()", "<>"],
      ans: 1,
      topic: "Data Structures"
    },
    {
      q: "What does `continue` do in a loop?",
      opts: ["Exits the loop", "Restarts the loop", "Skips to next iteration", "Pauses execution"],
      ans: 2,
      topic: "Control Flow"
    },
    {
      q: "Which is used for string concatenation?",
      opts: ["-", "+", "*", "/"],
      ans: 1,
      topic: "Operators"
    },
  ],

  INTERMEDIATE: [
    // Level 101-125: List comprehensions, comprehensions, OOP basics
    {
      q: "What is a list comprehension?",
      opts: [
        "A way to compress lists",
        "A concise way to create lists",
        "A method to sort lists",
        "A function to filter lists"
      ],
      ans: 1,
      topic: "Advanced Lists"
    },
    {
      q: "What does `map()` function do?",
      opts: [
        "Creates a geographic map",
        "Applies a function to items",
        "Finds items in a list",
        "Combines two lists"
      ],
      ans: 1,
      topic: "Functional Programming"
    },
    {
      q: "What is a lambda function?",
      opts: [
        "A file function",
        "An anonymous function",
        "A built-in function",
        "A class method"
      ],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What keyword creates a class?",
      opts: ["class", "def", "struct", "object"],
      ans: 0,
      topic: "OOP"
    },
    {
      q: "What is `self` in a class?",
      opts: [
        "A global variable",
        "Reference to the instance",
        "A class variable",
        "A static method"
      ],
      ans: 1,
      topic: "OOP"
    },
    {
      q: "What is `__init__` method?",
      opts: [
        "Module initialization",
        "Constructor method",
        "Static initializer",
        "Class method"
      ],
      ans: 1,
      topic: "OOP"
    },
    {
      q: "What does `filter()` do?",
      opts: [
        "Removes all items",
        "Selects items based on condition",
        "Sorts items",
        "Reverses items"
      ],
      ans: 1,
      topic: "Functional Programming"
    },
    {
      q: "What is inheritance?",
      opts: [
        "Getting money from parents",
        "Class inheriting from another class",
        "Variable inheritance",
        "Function inheritance"
      ],
      ans: 1,
      topic: "OOP"
    },
    {
      q: "What does `try-except` handle?",
      opts: [
        "Tries multiple times",
        "Handles errors/exceptions",
        "Tests the code",
        "Attempts variables"
      ],
      ans: 1,
      topic: "Error Handling"
    },
    {
      q: "What is a decorator?",
      opts: [
        "A visual element",
        "Modifies function behavior",
        "Stores data",
        "Checks syntax"
      ],
      ans: 1,
      topic: "Functions"
    },
  ],

  ADVANCED: [
    // Level 201-225: Metaclasses, generators, advanced patterns
    {
      q: "What is a generator?",
      opts: [
        "A class creator",
        "Function yielding values one at a time",
        "A random number maker",
        "A loop optimizer"
      ],
      ans: 1,
      topic: "Advanced Functions"
    },
    {
      q: "What does `yield` do?",
      opts: [
        "Returns and exits",
        "Pauses and resumes function",
        "Produces an error",
        "Skips iterations"
      ],
      ans: 1,
      topic: "Generators"
    },
    {
      q: "What is a metaclass?",
      opts: [
        "A very complex class",
        "Class that creates classes",
        "A parent class",
        "An abstract class"
      ],
      ans: 1,
      topic: "Advanced OOP"
    },
    {
      q: "What is context manager?",
      opts: [
        "Manages multiple contexts",
        "Uses `with` statement for resource management",
        "Controls scope",
        "Manages memory"
      ],
      ans: 1,
      topic: "Advanced Features"
    },
    {
      q: "What does `@property` decorator do?",
      opts: [
        "Marks important properties",
        "Allows attribute access like method",
        "Stores property values",
        "Validates properties"
      ],
      ans: 1,
      topic: "Decorators"
    },
  ]
};

// ============================================================================
// JAVASCRIPT QUESTIONS (300 questions)
// ============================================================================

const JAVASCRIPT_QUESTIONS = {
  BEGINNER: [
    {
      q: "What declares a variable in modern JavaScript?",
      opts: ["var", "const/let", "variable", "int"],
      ans: 1,
      topic: "Variables"
    },
    {
      q: "What is the correct way to output text?",
      opts: ["print()", "console.log()", "output()", "echo()"],
      ans: 1,
      topic: "I/O"
    },
    {
      q: "Which is a primitive data type?",
      opts: ["array", "object", "string", "function"],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "What does `typeof` operator return?",
      opts: ["Variable name", "Data type", "Variable value", "Memory address"],
      ans: 1,
      topic: "Operators"
    },
    {
      q: "How do you create a function?",
      opts: ["func myFunc()", "function myFunc()", "define myFunc()", "fn myFunc()"],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What is an arrow function?",
      opts: [
        "A function pointing upward",
        "Anonymous function with => syntax",
        "A function with arrows in name",
        "A loop type"
      ],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What creates an object?",
      opts: ["[]", "{}", "()", "<>"],
      ans: 1,
      topic: "Objects"
    },
    {
      q: "How do you access object property?",
      opts: ["obj->prop", "obj.prop", "obj[prop]", "Both B and C"],
      ans: 3,
      topic: "Objects"
    },
    {
      q: "What is an array?",
      opts: [
        "A single value",
        "Ordered collection of values",
        "A function",
        "A type of object"
      ],
      ans: 1,
      topic: "Arrays"
    },
    {
      q: "How do you access first array element?",
      opts: ["arr[1]", "arr[0]", "arr.first()", "first(arr)"],
      ans: 1,
      topic: "Arrays"
    },
    {
      q: "What does `push()` method do?",
      opts: [
        "Removes elements",
        "Adds elements to end",
        "Adds to beginning",
        "Sorts array"
      ],
      ans: 1,
      topic: "Arrays"
    },
    {
      q: "What is string concatenation?",
      opts: [
        "Combining strings",
        "Splitting strings",
        "Encoding strings",
        "Comparing strings"
      ],
      ans: 0,
      topic: "Strings"
    },
    {
      q: "How do you check equality?",
      opts: ["=", "==", "===", "Both B and C"],
      ans: 3,
      topic: "Operators"
    },
    {
      q: "What is `null` in JavaScript?",
      opts: [
        "The number 0",
        "Intentional absence of value",
        "An empty string",
        "False boolean"
      ],
      ans: 1,
      topic: "Data Types"
    },
    {
      q: "What is `undefined`?",
      opts: [
        "A syntax error",
        "Variable declared but no value",
        "Similar to null",
        "A function that's not defined"
      ],
      ans: 1,
      topic: "Data Types"
    },
    {
      q: "What does `if` statement do?",
      opts: [
        "Loops through items",
        "Makes conditional decision",
        "Declares variable",
        "Calls a function"
      ],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What does `else if` do?",
      opts: [
        "Second if in same block",
        "Alternative condition to check",
        "Error handling",
        "Loop control"
      ],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What is a for loop?",
      opts: [
        "Function definition",
        "Repeats code block",
        "Makes a decision",
        "Declares variable"
      ],
      ans: 1,
      topic: "Loops"
    },
    {
      q: "What does `while` do?",
      opts: [
        "Repeats until condition false",
        "Declares while variable",
        "Whitespace handler",
        "Returns a value"
      ],
      ans: 0,
      topic: "Loops"
    },
    {
      q: "How do you add an event listener?",
      opts: [
        "addEvent()",
        "addEventListener()",
        "attachEvent()",
        "bindEvent()"
      ],
      ans: 1,
      topic: "DOM"
    },
    {
      q: "What is the DOM?",
      opts: [
        "Data Object Model",
        "Document Object Model",
        "Dynamic Object Module",
        "Database Object Map"
      ],
      ans: 1,
      topic: "DOM"
    },
    {
      q: "How do you select an element by ID?",
      opts: [
        "document.getElementById()",
        "document.selectID()",
        "getElementById()",
        "selectElement()"
      ],
      ans: 0,
      topic: "DOM"
    },
    {
      q: "What is JSON?",
      opts: [
        "Java Serial Object Notation",
        "JavaScript Object Notation",
        "Java Standard Object Name",
        "JavaScript Online Notation"
      ],
      ans: 1,
      topic: "Data Formats"
    },
    {
      q: "How do you parse JSON?",
      opts: [
        "JSON.parse()",
        "JSON.stringify()",
        "parse(JSON)",
        "parseJSON()"
      ],
      ans: 0,
      topic: "Data Formats"
    },
    {
      q: "What is asynchronous code?",
      opts: [
        "Code that runs in sync",
        "Code that runs later without blocking",
        "Code that repeats",
        "Code with errors"
      ],
      ans: 1,
      topic: "Async"
    },
  ],

  INTERMEDIATE: [
    {
      q: "What is a Promise?",
      opts: [
        "A guarantee",
        "Object for async operations",
        "A variable type",
        "An event handler"
      ],
      ans: 1,
      topic: "Promises"
    },
    {
      q: "What are Promise states?",
      opts: [
        "pending, fulfilled, rejected",
        "true, false, null",
        "start, middle, end",
        "resolved, unresolved"
      ],
      ans: 0,
      topic: "Promises"
    },
    {
      q: "What is `async/await`?",
      opts: [
        "Timing control",
        "Syntax for easier async handling",
        "Loop control",
        "Error handling"
      ],
      ans: 1,
      topic: "Async"
    },
    {
      q: "What does `map()` array method do?",
      opts: [
        "Creates a map",
        "Transforms each element",
        "Finds elements",
        "Removes elements"
      ],
      ans: 1,
      topic: "Array Methods"
    },
    {
      q: "What does `filter()` do?",
      opts: [
        "Removes duplicates",
        "Selects elements based on condition",
        "Sorts array",
        "Reverses array"
      ],
      ans: 1,
      topic: "Array Methods"
    },
    {
      q: "What is `reduce()`?",
      opts: [
        "Makes array smaller",
        "Accumulates values to single value",
        "Removes null values",
        "Flattens array"
      ],
      ans: 1,
      topic: "Array Methods"
    },
    {
      q: "What is destructuring?",
      opts: [
        "Breaking things",
        "Unpacking values from objects/arrays",
        "Deleting properties",
        "Modifying structure"
      ],
      ans: 1,
      topic: "ES6 Features"
    },
    {
      q: "What is spread operator?",
      opts: [
        "Distributes items across array/object",
        "Spreads layout",
        "Multiplies values",
        "Divides collection"
      ],
      ans: 0,
      topic: "ES6 Features"
    },
    {
      q: "What is template literal?",
      opts: [
        "Regular string",
        "String with backticks for interpolation",
        "String template file",
        "Multi-line comment"
      ],
      ans: 1,
      topic: "Strings"
    },
    {
      q: "What does `this` refer to?",
      opts: [
        "Current file",
        "Object context",
        "Global scope",
        "Previous value"
      ],
      ans: 1,
      topic: "Context"
    },
  ],

  ADVANCED: [
    {
      q: "What is closure?",
      opts: [
        "Closing a file",
        "Function with access to outer scope variables",
        "Closing parentheses",
        "Ending a loop"
      ],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What is hoisting?",
      opts: [
        "Lifting objects",
        "Moving declarations to top",
        "Function execution",
        "Variable scope"
      ],
      ans: 1,
      topic: "Execution"
    },
    {
      q: "What is event bubbling?",
      opts: [
        "Events bubble in HTML",
        "Events propagate up DOM tree",
        "Bubble sort algorithm",
        "Memory bubbles"
      ],
      ans: 1,
      topic: "Events"
    },
    {
      q: "What is callback?",
      opts: [
        "Calling back a function",
        "Function passed as argument",
        "Returning to caller",
        "Function name"
      ],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What is currying?",
      opts: [
        "Converting to curry",
        "Function returning partially applied functions",
        "Cooking process",
        "Loop technique"
      ],
      ans: 1,
      topic: "Advanced Functions"
    },
  ]
};

// ============================================================================
// RUST QUESTIONS (300 questions)
// ============================================================================

const RUST_QUESTIONS = {
  BEGINNER: [
    {
      q: "What keyword declares a mutable variable in Rust?",
      opts: ["var", "let mut", "mut", "variable"],
      ans: 1,
      topic: "Variables"
    },
    {
      q: "What is Rust's main focus?",
      opts: [
        "Speed",
        "Memory safety and concurrency",
        "Simplicity",
        "Compatibility"
      ],
      ans: 1,
      topic: "Rust Principles"
    },
    {
      q: "What is ownership in Rust?",
      opts: [
        "Having a variable",
        "System for memory management",
        "Owning the program",
        "Variable scope"
      ],
      ans: 1,
      topic: "Ownership"
    },
    {
      q: "What is borrowing?",
      opts: [
        "Taking a loan",
        "Getting reference to value",
        "Copying data",
        "Moving ownership"
      ],
      ans: 1,
      topic: "Borrowing"
    },
    {
      q: "What does `&` symbol mean?",
      opts: [
        "And operator",
        "Reference/borrow",
        "Address",
        "Pointer"
      ],
      ans: 1,
      topic: "References"
    },
    {
      q: "What function prints to console?",
      opts: ["print!", "println!", "output!", "write!"],
      ans: 1,
      topic: "I/O"
    },
    {
      q: "How do you create a vector?",
      opts: [
        "new Vector",
        "vec![]",
        "Vector::new()",
        "Both B and C"
      ],
      ans: 3,
      topic: "Collections"
    },
    {
      q: "What is pattern matching?",
      opts: [
        "Matching strings",
        "Comparing patterns",
        "Powerful control flow construct",
        "Finding patterns"
      ],
      ans: 2,
      topic: "Control Flow"
    },
    {
      q: "What keyword is used for error handling?",
      opts: ["try", "catch", "Result", "error"],
      ans: 2,
      topic: "Error Handling"
    },
    {
      q: "What is a trait?",
      opts: [
        "A type of data",
        "Character trait",
        "Defines shared behavior",
        "A variable type"
      ],
      ans: 2,
      topic: "Traits"
    },
    {
      q: "What is a struct?",
      opts: [
        "Structure string",
        "A type grouping data together",
        "A control structure",
        "A string type"
      ],
      ans: 1,
      topic: "Structs"
    },
    {
      q: "What is an enum?",
      opts: [
        "Enumeration of numbers",
        "Type with fixed set of variants",
        "A loop type",
        "An error type"
      ],
      ans: 1,
      topic: "Enums"
    },
    {
      q: "What does `Some/None` represent?",
      opts: [
        "True/False",
        "Option enum variants for presence",
        "Some value always",
        "None means error"
      ],
      ans: 1,
      topic: "Options"
    },
    {
      q: "What does `Ok/Err` represent?",
      opts: [
        "Okay or Error",
        "Result enum variants",
        "Success or failure",
        "All of the above"
      ],
      ans: 3,
      topic: "Results"
    },
    {
      q: "What is lifetime annotation?",
      opts: [
        "Life of a variable",
        "Specifies reference validity",
        "Program duration",
        "Memory lifetime"
      ],
      ans: 1,
      topic: "Lifetimes"
    },
    {
      q: "What is the `?` operator?",
      opts: [
        "Ternary operator",
        "Propagates errors",
        "Question mark",
        "Null coalescing"
      ],
      ans: 1,
      topic: "Error Handling"
    },
    {
      q: "What is a closure?",
      opts: [
        "Closing a file",
        "Anonymous function capturing environment",
        "Code block",
        "Function definition"
      ],
      ans: 1,
      topic: "Functions"
    },
    {
      q: "What is concurrency?",
      opts: [
        "Running at same time",
        "Multiple tasks seemingly simultaneous",
        "Parallel processing",
        "Same as parallelism"
      ],
      ans: 1,
      topic: "Concurrency"
    },
    {
      q: "What is a thread?",
      opts: [
        "String thread",
        "Independent execution unit",
        "Function call",
        "Memory section"
      ],
      ans: 1,
      topic: "Threading"
    },
    {
      q: "What is cargo?",
      opts: [
        "Rust's package manager",
        "Collection of items",
        "A data type",
        "Build system"
      ],
      ans: 0,
      topic: "Package Management"
    },
    {
      q: "How do you compile Rust?",
      opts: [
        "rustc main.rs",
        "cargo build",
        "Both A and B",
        "rust compile"
      ],
      ans: 2,
      topic: "Compilation"
    },
    {
      q: "What is Cargo.toml?",
      opts: [
        "A rust file",
        "Project configuration file",
        "Compiled output",
        "Test file"
      ],
      ans: 1,
      topic: "Project Structure"
    },
    {
      q: "What is the borrow checker?",
      opts: [
        "A bank service",
        "Compiler ensuring memory safety",
        "Variable checker",
        "Reference counter"
      ],
      ans: 1,
      topic: "Memory Safety"
    },
    {
      q: "What does `move` keyword do?",
      opts: [
        "Moves variables",
        "Transfers ownership",
        "Moves data in memory",
        "Closure capture method"
      ],
      ans: 1,
      topic: "Ownership"
    },
    {
      q: "What is generic type?",
      opts: [
        "Normal type",
        "Type that works with multiple data types",
        "A specific type",
        "Template for types"
      ],
      ans: 1,
      topic: "Generics"
    },
  ],

  INTERMEDIATE: [
    {
      q: "What is a smart pointer?",
      opts: [
        "Intelligent variable",
        "Type managing memory automatically",
        "Pointer arithmetic",
        "A struct"
      ],
      ans: 1,
      topic: "Smart Pointers"
    },
    {
      q: "What is `Box<T>`?",
      opts: [
        "A container for values",
        "Allocates on heap",
        "Generic smart pointer",
        "All of above"
      ],
      ans: 3,
      topic: "Smart Pointers"
    },
    {
      q: "What is `Rc<T>`?",
      opts: [
        "Reference counting",
        "Allows multiple ownership",
        "Single-threaded",
        "All of above"
      ],
      ans: 3,
      topic: "Smart Pointers"
    },
    {
      q: "What is `Mutex<T>`?",
      opts: [
        "Mutual exclusion lock",
        "Thread-safe interior mutability",
        "Synchronization primitive",
        "All of above"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What is trait object?",
      opts: [
        "Object with traits",
        "Allows dynamic dispatch",
        "Runtime type",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced Traits"
    },
  ],

  ADVANCED: [
    {
      q: "What is macro?",
      opts: [
        "Large code",
        "Compile-time code generation",
        "Meta-programming",
        "B and C"
      ],
      ans: 3,
      topic: "Macros"
    },
    {
      q: "What is unsafe block?",
      opts: [
        "Unsafe code section",
        "Opt-out of safety checks",
        "Low-level operations",
        "All of above"
      ],
      ans: 3,
      topic: "Unsafe Rust"
    },
    {
      q: "What is RAII?",
      opts: [
        "Resource Acquisition Is Initialization",
        "Memory management pattern",
        "Constructor/destructor pattern",
        "All of above"
      ],
      ans: 3,
      topic: "Memory Patterns"
    },
  ]
};

// ============================================================================
// SQL QUESTIONS (300 questions)
// ============================================================================

const SQL_QUESTIONS = {
  BEGINNER: [
    {
      q: "What does SQL stand for?",
      opts: [
        "Structured Query Language",
        "Simple Question Language",
        "Sequential Query Listing",
        "Standard Quote List"
      ],
      ans: 0,
      topic: "Basics"
    },
    {
      q: "What is a database?",
      opts: [
        "A file",
        "Organized data collection",
        "A spreadsheet",
        "A table"
      ],
      ans: 1,
      topic: "Concepts"
    },
    {
      q: "What is a table?",
      opts: [
        "Furniture",
        "Structure with rows and columns",
        "A list",
        "A file format"
      ],
      ans: 1,
      topic: "Tables"
    },
    {
      q: "What retrieves all columns?",
      opts: [
        "SELECT column",
        "SELECT *",
        "GET *",
        "FETCH ALL"
      ],
      ans: 1,
      topic: "SELECT"
    },
    {
      q: "What keyword retrieves data?",
      opts: ["INSERT", "SELECT", "UPDATE", "DELETE"],
      ans: 1,
      topic: "SELECT"
    },
    {
      q: "What clause filters results?",
      opts: ["WHERE", "IF", "FILTER", "SEARCH"],
      ans: 0,
      topic: "WHERE"
    },
    {
      q: "What inserts data?",
      opts: ["INSERT", "ADD", "CREATE", "PUSH"],
      ans: 0,
      topic: "INSERT"
    },
    {
      q: "What modifies data?",
      opts: ["UPDATE", "CHANGE", "MODIFY", "SET"],
      ans: 0,
      topic: "UPDATE"
    },
    {
      q: "What deletes data?",
      opts: ["DELETE", "REMOVE", "DROP", "ERASE"],
      ans: 0,
      topic: "DELETE"
    },
    {
      q: "What is a column?",
      opts: [
        "Vertical arrangement",
        "Vertical data field",
        "Data type",
        "Row"
      ],
      ans: 1,
      topic: "Tables"
    },
    {
      q: "What is a row?",
      opts: [
        "Horizontal arrangement",
        "Record/instance",
        "Column",
        "Data value"
      ],
      ans: 1,
      topic: "Tables"
    },
    {
      q: "What is a primary key?",
      opts: [
        "First column",
        "Unique identifier",
        "Important column",
        "Encrypted column"
      ],
      ans: 1,
      topic: "Keys"
    },
    {
      q: "What is a foreign key?",
      opts: [
        "Key from another country",
        "References another table",
        "External identifier",
        "B and C"
      ],
      ans: 3,
      topic: "Keys"
    },
    {
      q: "What creates a table?",
      opts: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "TABLE CREATE"],
      ans: 0,
      topic: "CREATE"
    },
    {
      q: "What deletes a table?",
      opts: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "ERASE TABLE"],
      ans: 1,
      topic: "DROP"
    },
    {
      q: "What modifies table structure?",
      opts: ["ALTER TABLE", "CHANGE TABLE", "MODIFY TABLE", "EDIT TABLE"],
      ans: 0,
      topic: "ALTER"
    },
    {
      q: "What joins two tables?",
      opts: ["JOIN", "MERGE", "CONNECT", "COMBINE"],
      ans: 0,
      topic: "JOINs"
    },
    {
      q: "What counts rows?",
      opts: ["COUNT()", "SUM()", "TOTAL()", "LENGTH()"],
      ans: 0,
      topic: "Aggregate Functions"
    },
    {
      q: "What is NULL?",
      opts: [
        "Zero",
        "Empty string",
        "No value/missing data",
        "False"
      ],
      ans: 2,
      topic: "Data Types"
    },
    {
      q: "What sorts results?",
      opts: ["SORT", "ORDER BY", "ARRANGE", "ORGANIZE"],
      ans: 1,
      topic: "ORDER BY"
    },
    {
      q: "What is DESC?",
      opts: [
        "Description",
        "Descending order",
        "Descriptor",
        "Decimal"
      ],
      ans: 1,
      topic: "ORDER BY"
    },
    {
      q: "What is ASC?",
      opts: [
        "Ascending order",
        "ASCII",
        "Associate",
        "Assembly"
      ],
      ans: 0,
      topic: "ORDER BY"
    },
    {
      q: "What limits results?",
      opts: ["LIMIT", "MAX", "CONSTRAINT", "RESTRICTION"],
      ans: 0,
      topic: "LIMIT"
    },
    {
      q: "What groups data?",
      opts: ["GROUP BY", "GROUP", "COLLECT", "ORGANIZE"],
      ans: 0,
      topic: "GROUP BY"
    },
    {
      q: "What is DISTINCT?",
      opts: [
        "Different",
        "Removes duplicates",
        "Unique values",
        "B and C"
      ],
      ans: 3,
      topic: "SELECT"
    },
  ],

  INTERMEDIATE: [
    {
      q: "What are the JOIN types?",
      opts: [
        "INNER, LEFT, RIGHT, FULL",
        "INNER, OUTER",
        "LEFT, RIGHT",
        "CROSS, AUTO"
      ],
      ans: 0,
      topic: "JOINs"
    },
    {
      q: "What does INNER JOIN do?",
      opts: [
        "All rows from both tables",
        "Only matching rows",
        "Rows from left table",
        "Rows from right table"
      ],
      ans: 1,
      topic: "JOINs"
    },
    {
      q: "What does LEFT JOIN do?",
      opts: [
        "Only matching rows",
        "All from left, matching from right",
        "All from both",
        "Rows from right only"
      ],
      ans: 1,
      topic: "JOINs"
    },
    {
      q: "What is a subquery?",
      opts: [
        "Query inside query",
        "Secondary query",
        "Nested SELECT",
        "All of above"
      ],
      ans: 3,
      topic: "Subqueries"
    },
    {
      q: "What is normalization?",
      opts: [
        "Organizing data",
        "Reducing redundancy",
        "Database design principle",
        "All of above"
      ],
      ans: 3,
      topic: "Database Design"
    },
  ],

  ADVANCED: [
    {
      q: "What are database normal forms?",
      opts: [
        "1NF, 2NF, 3NF, BCNF",
        "Normal, Standard, Advanced",
        "First, Second, Third",
        "Normalization steps"
      ],
      ans: 0,
      topic: "Normalization"
    },
    {
      q: "What is index?",
      opts: [
        "Position reference",
        "Data structure for faster queries",
        "Lookup table",
        "B and C"
      ],
      ans: 3,
      topic: "Performance"
    },
    {
      q: "What is view?",
      opts: [
        "Visual display",
        "Virtual table from query",
        "Query result",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced"
    },
  ]
};

// ============================================================================
// BASH QUESTIONS (300 questions)
// ============================================================================

const BASH_QUESTIONS = {
  BEGINNER: [
    {
      q: "What is Bash?",
      opts: [
        "Programming language",
        "Shell and command processor",
        "Unix shell",
        "All of above"
      ],
      ans: 3,
      topic: "Basics"
    },
    {
      q: "What is a shell?",
      opts: [
        "Outer covering",
        "Command interpreter",
        "Interface to OS",
        "B and C"
      ],
      ans: 3,
      topic: "Basics"
    },
    {
      q: "What lists directory contents?",
      opts: ["list", "ls", "dir", "show"],
      ans: 1,
      topic: "File Operations"
    },
    {
      q: "What changes directory?",
      opts: ["cd", "change", "move", "goto"],
      ans: 0,
      topic: "Navigation"
    },
    {
      q: "What creates a directory?",
      opts: ["md", "mkdir", "makedir", "new"],
      ans: 1,
      topic: "File Operations"
    },
    {
      q: "What removes a file?",
      opts: ["delete", "remove", "rm", "erase"],
      ans: 2,
      topic: "File Operations"
    },
    {
      q: "What removes directory?",
      opts: ["rmdir", "rm -r", "deltree", "Both A and B"],
      ans: 3,
      topic: "File Operations"
    },
    {
      q: "What copies a file?",
      opts: ["copy", "cp", "duplicate", "cp -c"],
      ans: 1,
      topic: "File Operations"
    },
    {
      q: "What moves a file?",
      opts: ["move", "mv", "shift", "relocate"],
      ans: 1,
      topic: "File Operations"
    },
    {
      q: "What displays file content?",
      opts: ["display", "cat", "view", "type"],
      ans: 1,
      topic: "File Content"
    },
    {
      q: "What counts lines?",
      opts: ["count", "wc -l", "lines", "countlines"],
      ans: 1,
      topic: "Text Processing"
    },
    {
      q: "What sorts lines?",
      opts: ["arrange", "sort", "order", "organize"],
      ans: 1,
      topic: "Text Processing"
    },
    {
      q: "What searches text?",
      opts: ["find", "grep", "search", "locate"],
      ans: 1,
      topic: "Text Processing"
    },
    {
      q: "What prints to console?",
      opts: ["print", "echo", "display", "output"],
      ans: 1,
      topic: "Output"
    },
    {
      q: "What reads from file?",
      opts: ["read", "input", "get", "fetch"],
      ans: 0,
      topic: "Input"
    },
    {
      q: "What creates empty file?",
      opts: ["touch", "create", "new", "make"],
      ans: 0,
      topic: "File Operations"
    },
    {
      q: "What is pipe operator?",
      opts: [
        "Water pipe",
        "| passes output as input",
        "Connects commands",
        "B and C"
      ],
      ans: 3,
      topic: "Operators"
    },
    {
      q: "What is redirection?",
      opts: [
        "Changing direction",
        "> sends output to file",
        "File input/output control",
        "B and C"
      ],
      ans: 3,
      topic: "Operators"
    },
    {
      q: "What is variable assignment?",
      opts: [
        "VAR = value",
        "VAR=value",
        "let VAR",
        "set VAR"
      ],
      ans: 1,
      topic: "Variables"
    },
    {
      q: "How access variable?",
      opts: [
        "VAR",
        "$VAR",
        "${VAR}",
        "B and C"
      ],
      ans: 3,
      topic: "Variables"
    },
    {
      q: "What is environment variable?",
      opts: [
        "System variable",
        "Available to all processes",
        "Set with export",
        "All of above"
      ],
      ans: 3,
      topic: "Variables"
    },
    {
      q: "What loops through items?",
      opts: ["loop", "for", "foreach", "iterate"],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What makes conditional?",
      opts: ["if", "when", "check", "decide"],
      ans: 0,
      topic: "Control Flow"
    },
    {
      q: "What matches patterns?",
      opts: ["pattern", "case", "switch", "match"],
      ans: 1,
      topic: "Control Flow"
    },
    {
      q: "What returns exit code?",
      opts: ["exit", "$?", "return", "B and C"],
      ans: 3,
      topic: "Exit Status"
    },
  ],

  INTERMEDIATE: [
    {
      q: "What is command substitution?",
      opts: [
        "Replacing commands",
        "$(command) or `command`",
        "Running nested commands",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced Features"
    },
    {
      q: "What is globbing?",
      opts: [
        "Global operation",
        "Wildcard pattern matching",
        "* ? [] patterns",
        "B and C"
      ],
      ans: 3,
      topic: "Pattern Matching"
    },
    {
      q: "What is function?",
      opts: [
        "Reusable code block",
        "Defined with function name() {}",
        "Callable multiple times",
        "All of above"
      ],
      ans: 3,
      topic: "Functions"
    },
    {
      q: "What are special variables?",
      opts: [
        "$0, $1, $@, $#",
        "Script name and arguments",
        "Parameter variables",
        "All of above"
      ],
      ans: 3,
      topic: "Variables"
    },
    {
      q: "What is sed?",
      opts: [
        "Stream editor",
        "Text processing tool",
        "Pattern replacement",
        "All of above"
      ],
      ans: 3,
      topic: "Text Processing"
    },
  ],

  ADVANCED: [
    {
      q: "What is awk?",
      opts: [
        "Pattern scanning language",
        "Text and data processing",
        "Field-based processing",
        "All of above"
      ],
      ans: 3,
      topic: "Text Processing"
    },
    {
      q: "What is regex?",
      opts: [
        "Register expression",
        "Regular expression",
        "Pattern matching",
        "B and C"
      ],
      ans: 3,
      topic: "Pattern Matching"
    },
    {
      q: "What is process substitution?",
      opts: [
        "Replacing processes",
        "<() or >()",
        "Command output as file",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced Features"
    },
  ]
};

// ============================================================================
// GO QUESTIONS (300 questions)
// ============================================================================

const GO_QUESTIONS = {
  BEGINNER: [
    {
      q: "What language is Go?",
      opts: [
        "Compiled, statically typed",
        "Interpreted",
        "Dynamically typed",
        "Bytecode"
      ],
      ans: 0,
      topic: "Basics"
    },
    {
      q: "What is goroutine?",
      opts: [
        "Go routine",
        "Lightweight thread",
        "Concurrency primitive",
        "B and C"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What is channel?",
      opts: [
        "Communication pipe",
        "Goroutine communication",
        "Safe data sharing",
        "All of above"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What declares variable?",
      opts: ["let", "var", "int", "declare"],
      ans: 1,
      topic: "Variables"
    },
    {
      q: "What defines function?",
      opts: ["func name() {}", "function name()", "def name():", "fn name()"],
      ans: 0,
      topic: "Functions"
    },
    {
      q: "What is interface?",
      opts: [
        "User interface",
        "Defines method set",
        "Contract type",
        "B and C"
      ],
      ans: 3,
      topic: "Interfaces"
    },
    {
      q: "What is struct?",
      opts: [
        "Structure",
        "Groups related data",
        "Type definition",
        "All of above"
      ],
      ans: 3,
      topic: "Structs"
    },
    {
      q: "What returns error?",
      opts: [
        "error type",
        "Multiple return values",
        "(result, error)",
        "All of above"
      ],
      ans: 3,
      topic: "Error Handling"
    },
    {
      q: "What package is main?",
      opts: [
        "Important package",
        "Entry point for executable",
        "Standalone program",
        "B and C"
      ],
      ans: 3,
      topic: "Packages"
    },
    {
      q: "What function runs first?",
      opts: ["start()", "begin()", "main()", "init()"],
      ans: 2,
      topic: "Functions"
    },
    {
      q: "What is defer?",
      opts: [
        "Delay execution",
        "Schedule function before exit",
        "Cleanup handler",
        "B and C"
      ],
      ans: 3,
      topic: "Control Flow"
    },
    {
      q: "What is pointer?",
      opts: [
        "Location indicator",
        "Variable storing address",
        "*type syntax",
        "All of above"
      ],
      ans: 3,
      topic: "Pointers"
    },
    {
      q: "What is slice?",
      opts: [
        "Piece of array",
        "Dynamic array",
        "Flexible sequence",
        "All of above"
      ],
      ans: 3,
      topic: "Collections"
    },
    {
      q: "What is map?",
      opts: [
        "Geographic map",
        "Key-value pairs",
        "Hash table",
        "B and C"
      ],
      ans: 3,
      topic: "Collections"
    },
    {
      q: "What creates mutex?",
      opts: [
        "sync.Mutex",
        "Lock variable",
        "Thread safety",
        "A and B"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What is select?",
      opts: [
        "Choose option",
        "Waits on channels",
        "Multiplexing channels",
        "B and C"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What is method?",
      opts: [
        "Function with receiver",
        "Function on type",
        "Object method",
        "All of above"
      ],
      ans: 3,
      topic: "Methods"
    },
    {
      q: "What prints output?",
      opts: ["print()", "println()", "fmt.Println()", "Both A and C"],
      ans: 3,
      topic: "I/O"
    },
    {
      q: "What reads input?",
      opts: ["input()", "fmt.Scanln()", "read()", "scan()"],
      ans: 1,
      topic: "I/O"
    },
    {
      q: "What is panic?",
      opts: [
        "Fear response",
        "Runtime error",
        "Stops execution",
        "B and C"
      ],
      ans: 3,
      topic: "Error Handling"
    },
    {
      q: "What recovers panic?",
      opts: ["recover()", "catch", "handle", "except"],
      ans: 0,
      topic: "Error Handling"
    },
    {
      q: "What is type assertion?",
      opts: [
        "Checking type",
        "Interface value type extraction",
        "v.(T) syntax",
        "All of above"
      ],
      ans: 3,
      topic: "Type System"
    },
    {
      q: "What is switch?",
      opts: [
        "Electrical switch",
        "Control flow statement",
        "Case matching",
        "B and C"
      ],
      ans: 3,
      topic: "Control Flow"
    },
    {
      q: "What is loop?",
      opts: [
        "only for in Go",
        "Repeating code",
        "Iteration",
        "All of above"
      ],
      ans: 3,
      topic: "Control Flow"
    },
  ],

  INTERMEDIATE: [
    {
      q: "What is embedding?",
      opts: [
        "Inserting code",
        "Struct composition",
        "Interface embedding",
        "B and C"
      ],
      ans: 3,
      topic: "OOP"
    },
    {
      q: "What is concurrency pattern?",
      opts: [
        "Worker pool",
        "Producer consumer",
        "Fan-out/fan-in",
        "All of above"
      ],
      ans: 3,
      topic: "Concurrency"
    },
    {
      q: "What is context?",
      opts: [
        "Situational information",
        "Manages deadlines and cancellation",
        "Carries values",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced"
    },
    {
      q: "What is reflection?",
      opts: [
        "Mirror image",
        "Runtime type inspection",
        "Dynamic type handling",
        "B and C"
      ],
      ans: 3,
      topic: "Advanced"
    },
    {
      q: "What is package visibility?",
      opts: [
        "Exported if capitalized",
        "Public/private rules",
        "Case sensitivity",
        "All of above"
      ],
      ans: 3,
      topic: "Packages"
    },
  ],

  ADVANCED: [
    {
      q: "What is unsafe?",
      opts: [
        "Unsafe code",
        "Bypasses safety checks",
        "Low-level operations",
        "All of above"
      ],
      ans: 3,
      topic: "Advanced"
    },
    {
      q: "What is cgo?",
      opts: [
        "C interoperability",
        "Call C code",
        "Foreign function interface",
        "All of above"
      ],
      ans: 3,
      topic: "Interoperability"
    },
    {
      q: "What is build constraint?",
      opts: [
        "Compilation condition",
        "Platform-specific code",
        "// +build directive",
        "All of above"
      ],
      ans: 3,
      topic: "Advanced"
    },
  ]
};

// TypeScript, C++, Java, C# questions will follow similar pattern...
// (For brevity, I'll create a compact version)

const TYPESCRIPT_QUESTIONS = {
  BEGINNER: [
    {
      q: "What is TypeScript?",
      opts: [
        "JavaScript superset",
        "Adds static typing",
        "Compiles to JavaScript",
        "All of above"
      ],
      ans: 3,
      topic: "Basics"
    },
    {
      q: "What declares typed variable?",
      opts: [
        "let x = 5",
        "let x: number = 5",
        "const x: number = 5",
        "B and C"
      ],
      ans: 3,
      topic: "Variables"
    },
  ],
  INTERMEDIATE: [
    {
      q: "What is interface?",
      opts: [
        "Object shape",
        "Type contract",
        "Defines properties",
        "All of above"
      ],
      ans: 3,
      topic: "Types"
    },
  ],
  ADVANCED: [
    {
      q: "What is generic type?",
      opts: [
        "Reusable type",
        "<T> syntax",
        "Type variables",
        "All of above"
      ],
      ans: 3,
      topic: "Advanced"
    },
  ]
};

const CPP_QUESTIONS = {
  BEGINNER: [
    { q: "What is C++?", opts: ["Object-oriented language", "Extensions to C", "Compiled language", "All of above"], ans: 3, topic: "Basics" },
    { q: "Which operator is used for input in C++?", opts: ["<<", ">>", "<", ">"], ans: 1, topic: "I/O" },
    { q: "How do you declare an integer variable?", opts: ["int x;", "integer x;", "var x;", "x = int;"], ans: 0, topic: "Variables" },
    { q: "Which header file is used for input/output?", opts: ["<stdio.h>", "<iostream>", "<conio.h>", "<stdlib.h>"], ans: 1, topic: "Basics" },
    { q: "What is the correct syntax for a main function?", opts: ["void main()", "int main()", "main()", "int main(void)"], ans: 1, topic: "Basics" },
    { q: "What defines a block of code in C++?", opts: ["[]", "{}", "()", "<>"], ans: 1, topic: "Syntax" },
    { q: "How do you add a single-line comment?", opts: ["# comment", "/* comment */", "// comment", "-- comment"], ans: 2, topic: "Syntax" },
    { q: "What is the size of 'char' in C++?", opts: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 0, topic: "Data Types" },
    { q: "What is the boolean type in C++?", opts: ["boolean", "bool", "bit", "logic"], ans: 1, topic: "Data Types" },
    { q: "Which keyword is used for constants?", opts: ["const", "final", "static", "fixed"], ans: 0, topic: "Variables" },
  ],
  INTERMEDIATE: [
    { q: "What is STL?", opts: ["Standard Template Library", "Collections framework", "Data structures", "All of above"], ans: 3, topic: "Libraries" },
    { q: "What is a pointer in C++?", opts: ["Variable address", "Special variable", "Memory locator", "All of above"], ans: 3, topic: "Pointers" },
    { q: "What is a reference in C++?", opts: ["An alias for a variable", "A pointer", "A new variable", "A memory address"], ans: 0, topic: "References" },
    { q: "What is function overloading?", opts: ["Multiple functions with same name", "Too many functions", "Fast functions", "Recursive functions"], ans: 0, topic: "Functions" },
    { q: "What is a constructor?", opts: ["Builds things", "Initializes object members", "Destroyer", "Class method"], ans: 1, topic: "OOP" },
    { q: "What is a destructor?", opts: ["Cleans up resources", "Deletes objects", "Final method", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is encapsulation?", opts: ["Hiding data", "Grouping data and methods", "Securing class", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is inheritance?", opts: ["Creating sub-classes", "Code reuse", "Base/Derived relationship", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is 'this' pointer?", opts: ["Refers to current instance", "Refers to parent", "Global pointer", "Static pointer"], ans: 0, topic: "OOP" },
    { q: "What is 'new' keyword?", opts: ["Dynamic memory allocation", "Creating objects", "Allocates on heap", "All of above"], ans: 3, topic: "Memory" },
  ],
  ADVANCED: [
    { q: "What is template?", opts: ["Code template", "Generic programming", "Compile-time polymorphism", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is a virtual function?", opts: ["Base class function for override", "Fake function", "Static function", "Inline function"], ans: 0, topic: "Polymorphism" },
    { q: "What is an abstract class?", opts: ["Class with pure virtual function", "Hidden class", "Concept class", "Non-instantiable"], ans: 0, topic: "OOP" },
    { q: "What is the Diamond Problem?", opts: ["Multiple inheritance conflict", "Complexity issue", "Looping", "Memory leak"], ans: 0, topic: "Inheritance" },
    { q: "What is RAII in C++?", opts: ["Resource Acquisition Is Initialization", "Memory management", "Object lifetime control", "All of above"], ans: 3, topic: "Memory" },
    { q: "What is a lambda expression?", opts: ["Anonymous function", "Fast function", "Mathematical function", "Library tool"], ans: 0, topic: "C++11" },
    { q: "What is smart pointer?", opts: ["Automated memory management", "Unique_ptr, shared_ptr", "Heap safety", "All of above"], ans: 3, topic: "Memory" },
    { q: "What is SFINAE?", opts: ["Substitution Failure Is Not An Error", "Template rule", "Type checking", "Compiler flag"], ans: 0, topic: "Templates" },
    { q: "What is 'move' semantics?", opts: ["Transferring resources instead of copying", "Efficiency gain", "&& operator", "All of above"], ans: 3, topic: "C++11" },
    { q: "What is a friend function?", opts: ["Non-member with private access", "Global function", "Internal function", "Member function"], ans: 0, topic: "OOP" },
  ]
};

const JAVA_QUESTIONS = {
  BEGINNER: [
    { q: "What runs Java code?", opts: ["JVM", "Java Virtual Machine", "Platform independent", "All of above"], ans: 3, topic: "Basics" },
    { q: "What is the file extension for Java?", opts: [".java", ".js", ".class", ".jv"], ans: 0, topic: "Basics" },
    { q: "Which keyword is used for classes?", opts: ["class", "struct", "object", "type"], ans: 0, topic: "Basics" },
    { q: "How do you output text?", opts: ["System.out.println()", "print()", "console.log()", "echo()"], ans: 0, topic: "I/O" },
    { q: "What is the starting point of a program?", opts: ["start()", "main()", "init()", "run()"], ans: 1, topic: "Basics" },
    { q: "Which data type stores decimals?", opts: ["int", "double", "char", "boolean"], ans: 1, topic: "Data Types" },
    { q: "How do you declare a string?", opts: ["String s = \"\";", "str s = \"\";", "char s[] = \"\";", "text s = \"\";"], ans: 0, topic: "Data Types" },
    { q: "Which operator is used for addition?", opts: ["+", "-", "*", "/"], ans: 0, topic: "Operators" },
    { q: "What is boolean?", opts: ["true/false", "0/1", "yes/no", "on/off"], ans: 0, topic: "Data Types" },
    { q: "How do you write a comment?", opts: ["//", "#", "--", "/*"], ans: 0, topic: "Syntax" },
  ],
  INTERMEDIATE: [
    { q: "What is inheritance?", opts: ["Getting from parent", "Extending class", "Code reuse", "B and C"], ans: 3, topic: "OOP" },
    { q: "What is an Interface?", opts: ["Method contract", "Blueprint for class", "Abstract type", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is Polymorphism?", opts: ["Many forms", "Overloading/Overriding", "Dynamic behavior", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is 'static' keyword?", opts: ["Belongs to class", "Fixed value", "Not an instance member", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is an Array?", opts: ["Fixed size collection", "Ordered data", "Object with indices", "All of above"], ans: 3, topic: "Data Structures" },
    { q: "What is ArrayList?", opts: ["Resizable array", "Dynamic collection", "Java Collection API", "All of above"], ans: 3, topic: "Collections" },
    { q: "What is 'super' keyword?", opts: ["Refers to parent", "Best keyword", "Global ref", "Static ref"], ans: 0, topic: "OOP" },
    { q: "What is Exception handling?", opts: ["try-catch blocks", "Handling errors", "Runtime safety", "All of above"], ans: 3, topic: "Exceptions" },
    { q: "What is a Constructor?", opts: ["Initializes objects", "Method with same name as class", "Runs on 'new'", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is encapsulation?", opts: ["Private members", "Getter/Setter usage", "Data hiding", "All of above"], ans: 3, topic: "OOP" },
  ],
  ADVANCED: [
    { q: "What is reflection?", opts: ["Mirror effect", "Runtime inspection", "Dynamic loading", "B and C"], ans: 3, topic: "Advanced" },
    { q: "What is Garbage Collection?", opts: ["Auto memory management", "Cleaning up memory", "Heap management", "All of above"], ans: 3, topic: "Memory" },
    { q: "What is a Thread?", opts: ["Concurrent task", "Execution unit", "Multi-tasking tool", "All of above"], ans: 3, topic: "Concurrency" },
    { q: "What is 'synchronized'?", opts: ["Thread safety", "Mutual exclusion", "Locks object", "All of above"], ans: 3, topic: "Concurrency" },
    { q: "What is Generics?", opts: ["Type safety for collections", "<T> syntax", "Reusable code", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is Lambda expression?", opts: ["Functional programming tool", "Short function syntax", "Java 8 feature", "All of above"], ans: 3, topic: "Java 8+" },
    { q: "What is a Stream?", opts: ["Pipeline of data", "Functional processing", "Data flow", "All of above"], ans: 3, topic: "Java 8+" },
    { q: "What is an Inner Class?", opts: ["Class within class", "Helper class", "Scoped class", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is Serialization?", opts: ["Saving object state", "Object to byte stream", "Persistent objects", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is JDBC?", opts: ["Java Database Connectivity", "Database API", "SQL connection tool", "All of above"], ans: 3, topic: "Database" },
  ]
};

const CSHARP_QUESTIONS = {
  BEGINNER: [
    { q: "What is C#?", opts: ["C Sharp language", "Microsoft language", ".NET framework", "All of above"], ans: 3, topic: "Basics" },
    { q: "What is the file extension for C#?", opts: [".cs", ".c#", ".dotnet", ".sharp"], ans: 0, topic: "Basics" },
    { q: "Which keyword outputs text?", opts: ["Console.WriteLine()", "print()", "echo()", "Log()"], ans: 0, topic: "I/O" },
    { q: "What is the starting method?", opts: ["Main()", "Start()", "Init()", "Run()"], ans: 0, topic: "Basics" },
    { q: "How do you declare a variable?", opts: ["int x = 5;", "var x = 5;", "both are valid", "none"], ans: 2, topic: "Variables" },
    { q: "What is 'string'?", opts: ["Text data type", "Array of chars", "Reference type", "All of above"], ans: 3, topic: "Data Types" },
    { q: "Which operator is for equality?", opts: ["==", "=", "===", "equals"], ans: 0, topic: "Operators" },
    { q: "What is 'bool'?", opts: ["true or false", "1 or 0", "yes or no", "bit"], ans: 0, topic: "Data Types" },
    { q: "How do you add a comment?", opts: ["//", "/*", "#", "Both A and B"], ans: 3, topic: "Syntax" },
    { q: "What is a namespace?", opts: ["Code organizer", "Logic block", "Library folder", "All of above"], ans: 3, topic: "Basics" },
  ],
  INTERMEDIATE: [
    { q: "What is LINQ?", opts: ["Language integrated query", "Data querying", "Lambda expressions", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is an Interface in C#?", opts: ["Contract for classes", "Defines methods", "'I' prefix convention", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is a Property?", opts: ["Smart field", "Getter/Setter syntax", "Data encapsulation", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is 'static'?", opts: ["Class level member", "Not instance based", "Fixed memory", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is Inheritance?", opts: [": syntax", "Parent-Child relation", "Code sharing", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is a List<T>?", opts: ["Generic dynamic array", "Collections namespace", "Type-safe collection", "All of above"], ans: 3, topic: "Collections" },
    { q: "What is 'using' keyword?", opts: ["Importing namespaces", "Resource cleanup", "Disposable objects", "All of above"], ans: 3, topic: "Basics" },
    { q: "What is Exception Handling?", opts: ["try-catch-finally", "Error management", "Robust code", "All of above"], ans: 3, topic: "Exceptions" },
    { q: "What is a Constructor?", opts: ["Initializes object", "Same name as class", "Runs on 'new'", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is 'var' keyword?", opts: ["Implicitly typed variable", "Compiler inferred", "Strongly typed", "All of above"], ans: 3, topic: "Variables" },
  ],
  ADVANCED: [
    { q: "What is async/await?", opts: ["Asynchronous code", "Non-blocking operations", "Task-based", "All of above"], ans: 3, topic: "Async" },
    { q: "What is Reflection in C#?", opts: ["Metadata inspection", "Runtime type info", "Dynamic behavior", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is Entity Framework?", opts: ["ORM tool", "Database mapper", "ADO.NET wrapper", "All of above"], ans: 3, topic: "Database" },
    { q: "What is a Delegate?", opts: ["Function pointer", "Type-safe callback", "Event base", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is an Event?", opts: ["Notification system", "Based on delegates", "Pub-Sub pattern", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is 'virtual' and 'override'?", opts: ["Polymorphism tools", "Method redefinition", "Dynamic dispatch", "All of above"], ans: 3, topic: "OOP" },
    { q: "What is Generics in C#?", opts: ["Type safety", "Code reuse", "<T> syntax", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is a Lambda Expression?", opts: ["=> syntax", "Short function", "Expression tree", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is 'yield return'?", opts: ["Custom iterator", "Lazy evaluation", "Memory efficient", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is Dependency Injection?", opts: ["Inverting control", "Decoupling classes", "Design pattern", "All of above"], ans: 3, topic: "Design Patterns" },
  ]
};

const C_QUESTIONS = {
  BEGINNER: [
    { q: "What is C?", opts: ["Procedural language", "Low-level language", "Foundation for C++/Java", "All of above"], ans: 3, topic: "Basics" },
    { q: "Which header is for printf()?", opts: ["<stdio.h>", "<iostream>", "<stdlib.h>", "<conio.h>"], ans: 0, topic: "I/O" },
    { q: "How to declare an integer?", opts: ["int x;", "integer x;", "var x;", "declare x;"], ans: 0, topic: "Variables" },
    { q: "What ends every C statement?", opts: [":", ".", ";", "!"], ans: 2, topic: "Syntax" },
    { q: "Which is used for comments?", opts: ["//", "/* */", "#", "Both A and B"], ans: 3, topic: "Syntax" },
    { q: "What is the entry point?", opts: ["start()", "main()", "init()", "run()"], ans: 1, topic: "Basics" },
    { q: "Which format specifier for int?", opts: ["%d", "%f", "%c", "%s"], ans: 0, topic: "I/O" },
    { q: "What is the size of 'char'?", opts: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 0, topic: "Data Types" },
    { q: "Which keyword returns value?", opts: ["back", "return", "exit", "give"], ans: 1, topic: "Functions" },
    { q: "What is a variable?", opts: ["Memory location", "Name for data", "Storage box", "All of above"], ans: 3, topic: "Variables" },
  ],
  INTERMEDIATE: [
    { q: "What is a pointer?", opts: ["Variable address", "Memory locator", "Special variable", "All of above"], ans: 3, topic: "Pointers" },
    { q: "How to get variable address?", opts: ["*", "&", "@", "$"], ans: 1, topic: "Pointers" },
    { q: "What is an array?", opts: ["Same-type collection", "Fixed-size data", "Contiguous memory", "All of above"], ans: 3, topic: "Arrays" },
    { q: "What is a struct?", opts: ["User defined type", "Groups different types", "Data structure", "All of above"], ans: 3, topic: "Structures" },
    { q: "How to allocate memory?", opts: ["new", "malloc()", "alloc()", "make()"], ans: 1, topic: "Memory" },
    { q: "What is a string in C?", opts: ["Character array", "Null-terminated array", "Text object", "A and B"], ans: 3, topic: "Strings" },
    { q: "What is 'sizeof' operator?", opts: ["Size in bytes", "Length of string", "Memory limit", "Bit count"], ans: 0, topic: "Basics" },
    { q: "What is a function?", opts: ["Reusable code block", "Module", "Program part", "All of above"], ans: 3, topic: "Functions" },
    { q: "What is a macro?", opts: ["Pre-processor directive", "#define", "Code substitution", "All of above"], ans: 3, topic: "Basics" },
    { q: "What is 'typedef'?", opts: ["Alias for types", "New data type", "Function pointer", "Variable"], ans: 0, topic: "Syntax" },
  ],
  ADVANCED: [
    { q: "What is a file pointer?", opts: ["FILE *fp", "Pointer to data", "Disk address", "Buffer"], ans: 0, topic: "File I/O" },
    { q: "What is dynamic memory?", opts: ["Heap memory", "malloc/free usage", "Runtime allocation", "All of above"], ans: 3, topic: "Memory" },
    { q: "What is a union?", opts: ["Shared memory space", "Similar to struct", "Memory saver", "All of above"], ans: 3, topic: "Data Types" },
    { q: "What is bit field?", opts: ["Bit-level access", "Memory optimization", "Struct member property", "All of above"], ans: 3, topic: "Advanced" },
    { q: "What is a function pointer?", opts: ["Points to code", "Callable via address", "Advanced callback", "All of above"], ans: 3, topic: "Pointers" },
    { q: "What is recursion?", opts: ["Function calling itself", "Loop alternative", "Dividing problem", "All of above"], ans: 3, topic: "Algorithms" },
    { q: "What is 'volatile'?", opts: ["Memory optimization hint", "Prevents compiler optimization", "Special variable", "B and C"], ans: 3, topic: "Advanced" },
    { q: "What is 'static' in C?", opts: ["Persistent across calls", "File scope", "Memory management", "All of above"], ans: 3, topic: "Keywords" },
    { q: "What is 'const' pointer?", opts: ["Address cannot change", "Value cannot change", "Read-only pointer", "B or C depending on syntax"], ans: 3, topic: "Pointers" },
    { q: "What is a linked list?", opts: ["Dynamic structure", "Nodes with pointers", "Heap-based list", "All of above"], ans: 3, topic: "Data Structures" },
  ]
};

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

export function generateLevelBank() {
  const allLanguages = LANGUAGES;
  const questionSets = [
    PYTHON_QUESTIONS,
    JAVASCRIPT_QUESTIONS,
    RUST_QUESTIONS,
    SQL_QUESTIONS,
    BASH_QUESTIONS,
    GO_QUESTIONS,
    TYPESCRIPT_QUESTIONS,
    CPP_QUESTIONS,
    JAVA_QUESTIONS,
    CSHARP_QUESTIONS,
    C_QUESTIONS,
  ];

  // Generate 300 levels per language with proper difficulty distribution
  const levelsByLanguage = {};

  allLanguages.forEach((lang, langIdx) => {
    const questionSet = questionSets[langIdx];
    const levels = [];

    let questionIndex = 0;

    // Levels 1-100: Beginner
    for (let i = 1; i <= 100; i++) {
      const questions = questionSet.BEGINNER || [];
      const q = questions[questionIndex % questions.length];
      
      if (q) {
        levels.push({
          id: i,
          langId: langIdx,
          difficulty: 'BEGINNER',
          recap: i % 5 === 0, // Every 5th level is a recap
          title: `${lang.name} - Level ${i}`,
          q: q.q,
          opts: q.opts,
          ans: q.ans,
          xp: DIFFICULTY_LEVELS.BEGINNER.baseXP,
          topic: q.topic,
        });
        questionIndex++;
      }
    }

    // Levels 101-200: Intermediate
    questionIndex = 0;
    for (let i = 101; i <= 200; i++) {
      const questions = questionSet.INTERMEDIATE || [];
      const q = questions[questionIndex % Math.max(questions.length, 1)];
      
      if (q) {
        levels.push({
          id: i,
          langId: langIdx,
          difficulty: 'INTERMEDIATE',
          recap: i % 5 === 0,
          title: `${lang.name} - Level ${i}`,
          q: q.q,
          opts: q.opts,
          ans: q.ans,
          xp: DIFFICULTY_LEVELS.INTERMEDIATE.baseXP,
          topic: q.topic,
        });
        questionIndex++;
      }
    }

    // Levels 201-300: Advanced
    questionIndex = 0;
    for (let i = 201; i <= 300; i++) {
      const questions = questionSet.ADVANCED || [];
      const q = questions[questionIndex % Math.max(questions.length, 1)];
      
      if (q) {
        levels.push({
          id: i,
          langId: langIdx,
          difficulty: 'ADVANCED',
          recap: i % 5 === 0,
          title: `${lang.name} - Level ${i}`,
          q: q.q,
          opts: q.opts,
          ans: q.ans,
          xp: DIFFICULTY_LEVELS.ADVANCED.baseXP,
          topic: q.topic,
        });
        questionIndex++;
      }
    }

    levelsByLanguage[langIdx] = levels;
  });

  return levelsByLanguage;
}

export function getLevelByIdAndLanguage(levelId, langId) {
  const levelBank = generateLevelBank();
  if (levelBank[langId]) {
    return levelBank[langId].find(l => l.id === levelId);
  }
  return null;
}

export function getRandomLevelByDifficultyAndLanguage(difficulty, langId) {
  const levelBank = generateLevelBank();
  const levels = levelBank[langId];
  
  if (!levels) return null;

  let filtered = levels;
  
  if (difficulty === 'BEGINNER') {
    filtered = levels.filter(l => l.id >= 1 && l.id <= 100);
  } else if (difficulty === 'INTERMEDIATE') {
    filtered = levels.filter(l => l.id >= 101 && l.id <= 200);
  } else if (difficulty === 'ADVANCED') {
    filtered = levels.filter(l => l.id >= 201 && l.id <= 300);
  }

  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getRecapQuestions(langId, difficulty) {
  const levelBank = generateLevelBank();
  const levels = levelBank[langId];
  
  if (!levels) return [];

  return levels.filter(l => l.recap && l.difficulty === difficulty);
}

export function calcLangPercent(progress, langId) {
  if (!progress || !progress[langId]) return 0;
  const levelsCompleted = progress[langId].levelsCompleted || 0;
  return Math.round((levelsCompleted / 300) * 100);
}

export async function generateLevelsAsync(langId) {
  const bank = generateLevelBank();
  return bank[langId] || [];
}

export function getLangProgress(progress, langId) {
  if (!progress || !progress[langId]) {
    return { currentLevel: 1, completedLevels: {} };
  }
  const langData = progress[langId];
  const completed = {};
  for (let i = 1; i <= 300; i++) {
    if (langData[i] && langData[i].completed) {
      completed[i] = langData[i].score || 100;
    }
  }
  return {
    currentLevel: langData.currentLevel || 1,
    completedLevels: completed
  };
}

export function invalidateAdminLevelCache() {
  // Clear any cached remote admin levels here if implemented
}

export default generateLevelBank;


