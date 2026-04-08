// ── Languages ────────────────────────────────────────────────────────────────

export const LANGUAGES = [
  { id: 'python',     name: 'Python',     icon: '🐍', color: '#3572a5', desc: 'Beginner friendly'   },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#f7df1e', desc: 'Web & everywhere'    },
  { id: 'rust',       name: 'Rust',       icon: '⚙️', color: '#dea584', desc: 'Systems & speed'     },
  { id: 'sql',        name: 'SQL',        icon: '🗄️', color: '#e38c00', desc: 'Data mastery'        },
  { id: 'bash',       name: 'Bash',       icon: '💻', color: '#4eaa25', desc: 'Shell scripting'     },
  { id: 'go',         name: 'Go',         icon: '🦫', color: '#00add8', desc: 'Cloud & concurrency' },
];

// ── Question bank per language (40 base questions, escalating difficulty) ────

const QUESTIONS = {
  python: [
    // Tier 1: Basics (Levels 1-4, 6-9)
    { q: 'What keyword prints output in Python?',            opts: ['echo', 'print', 'console.log', 'output'],            ans: 1, xp: 10 },
    { q: 'Which of these is a valid Python list?',           opts: ['{}', '()', '[]', '<>'],                              ans: 2, xp: 10 },
    { q: 'What does `len([1, 2, 3])` return?',               opts: ['2', '3', '4', '1'],                                  ans: 1, xp: 10 },
    { q: 'Which keyword defines a function in Python?',      opts: ['function', 'def', 'func', 'fn'],                     ans: 1, xp: 10 },
    { q: 'How do you start a for loop in Python?',           opts: ['for i in range(10):', 'for(i=0;i<10;i++)', 'foreach i', 'loop i:'], ans: 0, xp: 15 },
    { q: 'What is the output of `2 ** 3`?',                  opts: ['6', '8', '9', '5'],                                  ans: 1, xp: 10 },
    { q: 'Which method adds an item to a Python list?',      opts: ['add()', 'push()', 'append()', 'insert()'],           ans: 2, xp: 15 },
    { q: 'What does `type("hello")` return?',                opts: ["<class 'string'>", "<class 'str'>", 'String', 'str'], ans: 1, xp: 15 },
    
    // Tier 2: Intermediate Data Structures (Levels 11-14, 16-19)
    { q: 'Which data structure uses key-value pairs?',       opts: ['List', 'Tuple', 'Set', 'Dictionary'],                ans: 3, xp: 15 },
    { q: 'How do you access the value of key "a" in dict d?',opts: ['d.a', 'd("a")', 'd["a"]', 'd[a]'],                   ans: 2, xp: 15 },
    { q: 'Are Python tuples mutable or immutable?',          opts: ['Mutable', 'Immutable', 'Depends on data', 'Both'],   ans: 1, xp: 15 },
    { q: 'What does `set([1, 2, 2, 3])` return?',            opts: ['{1, 2, 2, 3}', '[1, 2, 3]', '{1, 2, 3}', '(1, 2, 3)'], ans: 2, xp: 20 },
    { q: 'Which keyword handles exceptions?',                opts: ['catch', 'except', 'error', 'handle'],                ans: 1, xp: 20 },
    { q: 'What does the `pass` statement do?',               opts: ['Exits loop', 'Throws error', 'Does nothing', 'Returns null'], ans: 2, xp: 20 },
    { q: 'How do you import a module named "math"?',         opts: ['include math', 'require("math")', 'import math', 'use math'], ans: 2, xp: 15 },
    { q: 'What is the result of `"a" + "b"`?',               opts: ['ab', 'a b', 'TypeError', 'a+b'],                     ans: 0, xp: 15 },
    
    // Tier 3: Functions & Comprehensions (Levels 21-24, 26-29)
    { q: 'What is a list comprehension?',                    opts: ['A type of dictionary', 'A compact way to create lists', 'A loop replacement', 'A list method'], ans: 1, xp: 20 },
    { q: '`[x*2 for x in range(3)]` returns:',               opts: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'],  ans: 0, xp: 20 },
    { q: 'What keyword creates an anonymous function?',      opts: ['anon', 'lambda', 'arrow', 'func'],                   ans: 1, xp: 20 },
    { q: 'How do you define default function arguments?',    opts: ['def f(a=1):', 'def f(a:=1):', 'def f(a==1):', 'def f(a): a=1'], ans: 0, xp: 20 },
    { q: 'What does `*args` do in a function definition?',   opts: ['Passes a dictionary', 'Passes a tuple of arguments', 'Multiplies arguments', 'Unpacks a list'], ans: 1, xp: 25 },
    { q: 'What does `**kwargs` represent?',                  opts: ['Keyword arguments as a dictionary', 'Math exponents', 'Pointer reference', 'Global vars'], ans: 0, xp: 25 },
    { q: 'Which function creates an iterator?',              opts: ['iter()', 'next()', 'loop()', 'gen()'],               ans: 0, xp: 25 },
    { q: 'What keyword yields values from a generator?',     opts: ['return', 'generate', 'yield', 'output'],             ans: 2, xp: 25 },
    
    // Tier 4: OOP & Classes (Levels 31-34, 36-39)
    { q: 'How do you create a class in Python?',             opts: ['new Class:', 'class MyClass:', 'create MyClass:', 'MyClass()'], ans: 1, xp: 25 },
    { q: 'What is the standard name for the constructor?',   opts: ['__init__', 'constructor', '__start__', 'init'],      ans: 0, xp: 25 },
    { q: 'What refers to the instance within a class method?',opts: ['this', 'self', 'cls', 'instance'],                  ans: 1, xp: 25 },
    { q: 'How do you inherit from `Parent` class?',          opts: ['class Child(Parent):', 'class Child extends Parent:', 'class Child uses Parent:', 'Child: Parent'], ans: 0, xp: 30 },
    { q: 'What does `super()` do?',                          opts: ['Makes class fast', 'Calls parent methods', 'Creates global var', 'Ends class'], ans: 1, xp: 30 },
    { q: 'Which decorator creates a class method?',          opts: ['@static', '@classmethod', '@method', '@class'],      ans: 1, xp: 30 },
    { q: 'What are `__dunder__` methods used for?',          opts: ['Private vars', 'Operator overloading & built-ins', 'Nothing', 'Security'], ans: 1, xp: 30 },
    { q: 'How do you define a private attribute?',           opts: ['private x', '_x', '__x', 'hidden x'],                ans: 2, xp: 30 },

    // Tier 5: Advanced & Meta (Levels 41-44, 46-49)
    { q: 'What is a decorator in Python?',                   opts: ['A UI styling tool', 'A function that modifies another function', 'A class builder', 'A syntax checker'], ans: 1, xp: 35 },
    { q: 'How do you apply a decorator named `timer`?',      opts: ['@timer', 'timer()', '#timer', 'use timer'],          ans: 0, xp: 35 },
    { q: 'What does the Global Interpreter Lock (GIL) do?',  opts: ['Secures memory', 'Prevents multiple threads from executing Python bytecodes at once', 'Locks databases', 'Encrypts files'], ans: 1, xp: 35 },
    { q: 'Which module provides async support?',             opts: ['threading', 'multiprocessing', 'asyncio', 'concurrent'], ans: 2, xp: 35 },
    { q: 'What does `await` do?',                            opts: ['Stops the program', 'Pauses execution until async task finishes', 'Waits for user input', 'Sleeps for 1 sec'], ans: 1, xp: 35 },
    { q: 'What is a metaclass?',                             opts: ['A class of a class', 'A large class', 'An abstract class', 'A parent class'], ans: 0, xp: 40 },
    { q: 'Which of these is used for typing hints?',         opts: ['x: int', 'int x', 'x -> int', 'type x = int'],       ans: 0, xp: 40 },
    { q: 'What does `is` check compared to `==`?',           opts: ['Value equality', 'Memory identity', 'Type equality', 'Size'], ans: 1, xp: 40 },
  ],
  javascript: [
    // Tier 1: Basics (1-4, 6-9)
    { q: 'Which keyword declares a constant in JS?',         opts: ['var', 'let', 'const', 'def'],                        ans: 2, xp: 10 },
    { q: 'What does `typeof null` return?',                  opts: ['null', 'undefined', 'object', 'boolean'],            ans: 2, xp: 15 },
    { q: 'Which method adds to the end of an array?',        opts: ['push()', 'pop()', 'shift()', 'add()'],               ans: 0, xp: 10 },
    { q: 'What does `===` check compared to `==`?',          opts: ['Only value', 'Only type', 'Type AND value', 'Reference'], ans: 2, xp: 15 },
    { q: 'How do you write an arrow function?',              opts: ['function()=>{}', '()=>{}', 'fn(){}', 'arrow(){}'],   ans: 1, xp: 10 },
    { q: 'What does `console.log(1 + "2")` print?',          opts: ['3', '"12"', '12', 'Error'],                          ans: 1, xp: 15 },
    { q: 'Which statement handles errors in JS?',            opts: ['catch/try', 'try/catch', 'error/handle', 'guard'],   ans: 1, xp: 10 },
    { q: 'What does `Array.isArray([])` return?',            opts: ['false', 'true', '[]', 'undefined'],                  ans: 1, xp: 15 },
    
    // Tier 2: Intermediate Data & DOM (11-14, 16-19)
    { q: 'What does `[1,2,3].map(x => x*2)` return?',        opts: ['[1,2,3]', '[2,4,6]', '12', '[3,6,9]'],               ans: 1, xp: 20 },
    { q: 'Which method removes the LAST element of an array?',opts: ['shift()', 'unshift()', 'pop()', 'splice()'],        ans: 2, xp: 15 },
    { q: 'How do you select an element by ID?',              opts: ['getElement("#id")', 'querySelector(id)', 'getElementById()', 'selectId()'], ans: 2, xp: 20 },
    { q: 'What is `NaN`?',                                   opts: ['Not a Null', 'Not a Number', 'Negative and Null', 'New Array Node'], ans: 1, xp: 15 },
    { q: 'Which operator spreads an array `...`?',           opts: ['Spread', 'Rest', 'Concat', 'Split'],                 ans: 0, xp: 20 },
    { q: 'What is template literal syntax?',                 opts: ["'text'", '"text"', '`text`', '<text>'],              ans: 2, xp: 20 },
    { q: 'What does `Object.keys({a: 1})` return?',          opts: ['[1]', '["a"]', 'a', '1'],                            ans: 1, xp: 20 },
    { q: 'How do you parse a JSON string?',                  opts: ['JSON.parse()', 'JSON.stringify()', 'JSON.read()', 'JSON.load()'], ans: 0, xp: 20 },

    // Tier 3: Async & Closures (21-24, 26-29)
    { q: 'Which creates a Promise in JavaScript?',           opts: ['new Promise()', 'async()', 'Promise.new()', 'createPromise()'], ans: 0, xp: 25 },
    { q: 'What state is a Promise in initially?',            opts: ['Fulfilled', 'Rejected', 'Pending', 'Waiting'],       ans: 2, xp: 25 },
    { q: 'How do you handle a successful Promise?',          opts: ['.catch()', '.then()', '.finally()', '.done()'],      ans: 1, xp: 25 },
    { q: 'What keyword pauses an async function?',           opts: ['pause', 'wait', 'await', 'yield'],                   ans: 2, xp: 25 },
    { q: 'What is a Closure?',                               opts: ['A locked object', 'A function remembering its outer scope', 'A completed loop', 'An error state'], ans: 1, xp: 30 },
    { q: 'What does `setTimeout(fn, 0)` do?',                opts: ['Runs immediately', 'Puts fn in macro-task queue', 'Cancels fn', 'Errors out'], ans: 1, xp: 30 },
    { q: 'Which variable declaration is block-scoped?',      opts: ['var', 'let', 'global', 'function'],                  ans: 1, xp: 20 },
    { q: 'What is variable hoisting?',                       opts: ['Deleting vars', 'Moving declarations to the top', 'Changing types', 'Exporting vars'], ans: 1, xp: 30 },

    // Tier 4: OOP & Advanced Functions (31-34, 36-39)
    { q: 'How do you inherit a class in ES6?',               opts: ['extends', 'inherits', 'implements', 'uses'],         ans: 0, xp: 30 },
    { q: 'What is `this` inside an arrow function?',         opts: ['The window object', 'Lexically inherited `this`', 'Undefined', 'The event target'], ans: 1, xp: 30 },
    { q: 'What does `bind()` do?',                           opts: ['Calls the function', 'Returns a new function with bound `this`', 'Combines strings', 'Attaches events'], ans: 1, xp: 30 },
    { q: 'How do you define a getter in an object?',         opts: ['get prop()', 'fetch prop()', 'read prop()', 'prop: get()'], ans: 0, xp: 30 },
    { q: 'What does `Object.freeze()` do?',                  opts: ['Hides object', 'Prevents adding/removing/modifying properties', 'Deletes object', 'Converts to string'], ans: 1, xp: 35 },
    { q: 'Which method runs a reducer on an array?',         opts: ['map()', 'filter()', 'reduce()', 'accumulate()'],     ans: 2, xp: 30 },
    { q: 'What is the Event Loop responsible for?',          opts: ['Drawing the DOM', 'Handling async execution and call stack', 'CSS animations', 'Compiling code'], ans: 1, xp: 35 },
    { q: 'What is the difference between `call` and `apply`?',opts: ['No difference', '`apply` takes an array of arguments', '`call` is faster', '`apply` creates a new func'], ans: 1, xp: 35 },

    // Tier 5: Expert & Meta Programming (41-44, 46-49)
    { q: 'What is a JavaScript Proxy?',                      opts: ['A VPN tool', 'An object that intercepts operations on another object', 'A network request', 'A Web Worker'], ans: 1, xp: 40 },
    { q: 'Which API lets you run JS in a background thread?',opts: ['Service Worker', 'Web Worker', 'Async/Await', 'Background API'], ans: 1, xp: 40 },
    { q: 'What does `Reflect.has(obj, prop)` do?',           opts: ['Same as the `in` operator', 'Same as `hasOwnProperty`', 'Sets a property', 'Deletes a property'], ans: 0, xp: 40 },
    { q: 'What is the purpose of `Symbol`?',                 opts: ['Drawing icons', 'Creating unique object properties', 'String manipulation', 'Math operations'], ans: 1, xp: 40 },
    { q: 'Which queue has higher priority?',                 opts: ['Macro-task queue', 'Micro-task queue (Promises)', 'Render queue', 'They are equal'], ans: 1, xp: 45 },
    { q: 'What is an IIFE?',                                 opts: ['Immediately Invoked Function Expression', 'Internal Internet Frame Error', 'Inline Iteration For Elements', 'Indexed Iterator Function Engine'], ans: 0, xp: 40 },
    { q: 'What causes a memory leak in JS?',                 opts: ['Using const', 'Unused variables inside global scope / closures', 'Using async', 'Using let'], ans: 1, xp: 45 },
    { q: 'How does garbage collection work in V8?',          opts: ['Manual memory freeing', 'Reference counting only', 'Mark-and-sweep algorithm', 'FIFO queue'], ans: 2, xp: 50 },
  ],
  rust: [
    // Standard questions (add more here to reach 40 for Rust)
    { q: 'Which keyword declares a mutable variable in Rust?', opts: ['mut let', 'let mut', 'var', 'let'],               ans: 1, xp: 15 },
    { q: 'Which type handles optional values in Rust?',        opts: ['Maybe', 'Nullable', 'Option', 'Result'],           ans: 2, xp: 15 },
    { q: 'What symbol denotes a reference in Rust?',           opts: ['*', '@', '&', '#'],                               ans: 2, xp: 15 },
    { q: 'Which macro prints output in Rust?',                 opts: ['print!()', 'echo!()', 'console!()', 'log!()'],     ans: 0, xp: 15 },
    { q: 'What keyword creates a struct in Rust?',             opts: ['class', 'struct', 'record', 'type'],              ans: 1, xp: 15 },
    { q: 'What does `Result<T, E>` represent?',                opts: ['A tuple', 'Success or Error', 'An enum', 'A promise'], ans: 1, xp: 20 },
    { q: 'Which iterator method transforms elements?',         opts: ['filter', 'fold', 'map', 'collect'],               ans: 2, xp: 20 },
    { q: 'What does `defer` do in Rust (via Drop)?',           opts: ['Delays import', 'Runs cleanup on drop', 'Async run', 'Skips scope'], ans: 1, xp: 20 },
    { q: 'Rust prevents data races at...',                     opts: ['Runtime', 'Link time', 'Compile time', 'Test time'], ans: 2, xp: 25 },
    { q: 'Which trait enables printing with `{:?}`?',          opts: ['Display', 'Debug', 'Print', 'Format'],            ans: 1, xp: 25 },
  ],
  sql: [
    // Add more here to reach 40 for SQL
    { q: 'Which SQL command retrieves data?',                  opts: ['GET', 'FETCH', 'SELECT', 'PULL'],                  ans: 2, xp: 10 },
    { q: 'Which clause filters rows in a query?',              opts: ['HAVING', 'GROUP BY', 'WHERE', 'FILTER'],           ans: 2, xp: 10 },
    { q: 'What does `COUNT(*)` do?',                           opts: ['Counts columns', 'Counts rows', 'Sums values', 'Counts nulls'], ans: 1, xp: 10 },
    { q: 'Which JOIN keeps all rows from the left table?',     opts: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL JOIN'], ans: 2, xp: 15 },
    { q: 'Which command inserts data into a table?',           opts: ['ADD', 'INSERT INTO', 'PUSH', 'NEW'],               ans: 1, xp: 15 },
    { q: 'What does DISTINCT do in a SELECT query?',           opts: ['Sorts rows', 'Removes duplicates', 'Filters nulls', 'Indexes'], ans: 1, xp: 15 },
    { q: 'Which clause sorts query results?',                  opts: ['SORT BY', 'GROUP BY', 'ORDER BY', 'RANK BY'],      ans: 2, xp: 15 },
    { q: 'What does PRIMARY KEY ensure?',                      opts: ['Unique + Not Null', 'Just unique', 'Just not null', 'Indexed only'], ans: 0, xp: 20 },
    { q: 'Which function returns the highest value?',          opts: ['TOP()', 'GREATEST()', 'MAX()', 'HIGH()'],          ans: 2, xp: 20 },
    { q: 'What does `LIKE "%bunny%"` match?',                  opts: ['Exact "bunny"', 'Starts with bunny', 'Contains "bunny"', 'Ends with bunny'], ans: 2, xp: 20 },
  ],
  bash: [
    // Add more here to reach 40 for Bash
    { q: 'Which command lists files in a directory?',         opts: ['dir', 'ls', 'list', 'files'],                      ans: 1, xp: 10 },
    { q: 'What does `cd ..` do?',                             opts: ['Removes dir', 'Goes up one dir', 'Lists files', 'Creates dir'], ans: 1, xp: 10 },
    { q: 'Which command creates a new directory?',            opts: ['touch', 'newdir', 'mkdir', 'makedir'],             ans: 2, xp: 10 },
    { q: 'What does `chmod +x script.sh` do?',                opts: ['Copies file', 'Makes executable', 'Deletes file', 'Renames file'], ans: 1, xp: 15 },
    { q: 'Which command shows file contents?',                opts: ['read', 'cat', 'show', 'open'],                     ans: 1, xp: 15 },
    { q: 'What does `$1` represent in a bash script?',        opts: ['First function', 'First argument', 'Line 1', 'PID'], ans: 1, xp: 15 },
    { q: 'Which command searches text inside files?',         opts: ['find', 'search', 'grep', 'locate'],               ans: 2, xp: 15 },
    { q: 'What does `&&` do between two commands?',           opts: ['OR logic', 'Background job', 'AND – run if prev succeeds', 'Pipe output'], ans: 2, xp: 20 },
    { q: 'What does `>` do when used with a command?',        opts: ['Appends output', 'Overwrites output to file', 'Reads input', 'Pipes'], ans: 1, xp: 20 },
    { q: 'How do you make a variable in bash?',               opts: ['var x=5', 'x = 5', 'x=5', 'let x = 5'],           ans: 2, xp: 20 },
  ],
  go: [
    // Add more here to reach 40 for Go
    { q: 'What keyword declares a variable in Go?',           opts: ['var', 'let', 'dim', 'def'],                        ans: 0, xp: 10 },
    { q: 'Go uses which concurrency primitive?',              opts: ['Thread', 'Goroutine', 'Process', 'Fiber'],          ans: 1, xp: 15 },
    { q: 'What replaces null in Go?',                         opts: ['undefined', 'nil', 'none', 'empty'],               ans: 1, xp: 15 },
    { q: 'Which keyword starts a goroutine?',                 opts: ['async', 'go', 'thread', 'spawn'],                  ans: 1, xp: 15 },
    { q: 'What is a channel used for in Go?',                 opts: ['DB connections', 'HTTP requests', 'Goroutine communication', 'File I/O'], ans: 2, xp: 20 },
    { q: 'Go interfaces are implemented...',                  opts: ['Explicitly', 'Implicitly', "With 'implements'", "With 'interface{}'"], ans: 1, xp: 20 },
    { q: 'What does `defer` do in Go?',                       opts: ['Delays import', 'Runs at function end', 'Async run', 'Cancels func'], ans: 1, xp: 20 },
    { q: 'How does Go handle multiple return values?',        opts: ['Array only', 'Not possible', 'Comma-separated in ()', 'Using struct'], ans: 2, xp: 20 },
    { q: 'Which tool formats Go code automatically?',         opts: ['goformat', 'gofmt', 'prettier', 'rustfmt'],        ans: 1, xp: 20 },
    { q: 'What does `:=` do in Go?',                          opts: ['Compares values', 'Short variable declaration', 'Assigns a channel', 'Imports package'], ans: 1, xp: 25 },
  ],
};

// ── Recap questions (10 questions, played every 5th level) ───────────────────

const RECAPS = {
  python: [
    { q: 'Python variables need explicit type declarations?',    opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Python uses indentation to define code blocks?',       opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Lists in Python are mutable?',                         opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Python is a compiled language?',                       opts: ['True', 'False'],                                 ans: 1 },
    { q: '`None` in Python is equivalent to null?',              opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Python supports multiple inheritance?',                opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Tuples in Python are immutable?',                      opts: ['True', 'False'],                                 ans: 0 },
    { q: 'The `range()` function returns a list in Python 3?',   opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Python dictionaries maintain insertion order (3.7+)?', opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Lambda functions can have multiple statements?',       opts: ['True', 'False'],                                 ans: 1 },
  ],
  javascript: [
    { q: '`let` is block-scoped in JavaScript?',                 opts: ['True', 'False'],                                 ans: 0 },
    { q: 'JavaScript is single-threaded?',                       opts: ['True', 'False'],                                 ans: 0 },
    { q: '`===` checks type AND value?',                         opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Promises replace callbacks entirely?',                 opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Arrow functions have their own `this` context?',       opts: ['True', 'False'],                                 ans: 1 },
    { q: 'null == undefined evaluates to true in JS?',           opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Array.map() modifies the original array?',             opts: ['True', 'False'],                                 ans: 1 },
    { q: 'async/await is built on top of Promises?',             opts: ['True', 'False'],                                 ans: 0 },
    { q: 'JSON.parse() converts a string to an object?',         opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Closure means a function remembers its outer scope?',  opts: ['True', 'False'],                                 ans: 0 },
  ],
  rust: [
    { q: 'Rust prevents null pointer exceptions at compile time?', opts: ['True', 'False'],                              ans: 0 },
    { q: 'Rust has a garbage collector?',                         opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust uses a borrow checker for memory safety?',         opts: ['True', 'False'],                                ans: 0 },
    { q: 'You can have multiple mutable references to data?',     opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust enums can contain data?',                          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Rust panics are always unrecoverable?',                 opts: ['True', 'False'],                                ans: 1 },
    { q: 'The ? operator propagates errors automatically?',       opts: ['True', 'False'],                                ans: 0 },
    { q: 'Rust supports object-oriented programming?',            opts: ['True', 'False'],                                ans: 0 },
    { q: 'Lifetimes are always explicit in Rust?',                opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust traits are similar to interfaces?',                opts: ['True', 'False'],                                ans: 0 },
  ],
  sql: [
    { q: 'SELECT * retrieves all columns from a table?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'GROUP BY is used with aggregate functions?',            opts: ['True', 'False'],                                ans: 0 },
    { q: 'A PRIMARY KEY can contain NULL values?',                opts: ['True', 'False'],                                ans: 1 },
    { q: 'INNER JOIN returns rows that match in BOTH tables?',    opts: ['True', 'False'],                                ans: 0 },
    { q: 'HAVING filters rows before GROUP BY?',                  opts: ['True', 'False'],                                ans: 1 },
    { q: 'SQL is case-sensitive for keywords by default?',        opts: ['True', 'False'],                                ans: 1 },
    { q: 'A FOREIGN KEY references a PRIMARY KEY?',               opts: ['True', 'False'],                                ans: 0 },
    { q: 'ORDER BY sorts in ascending order by default?',         opts: ['True', 'False'],                                ans: 0 },
    { q: 'Subqueries can be used in a WHERE clause?',             opts: ['True', 'False'],                                ans: 0 },
    { q: 'Indexes always speed up INSERT operations?',            opts: ['True', 'False'],                                ans: 1 },
  ],
  bash: [
    { q: '`>` overwrites and `>>` appends to a file?',           opts: ['True', 'False'],                                ans: 0 },
    { q: 'Variables in bash use `$` to access their value?',     opts: ['True', 'False'],                                ans: 0 },
    { q: 'Bash scripts must end with `.sh` to run?',             opts: ['True', 'False'],                                ans: 1 },
    { q: 'The pipe `|` passes output of one command to next?',   opts: ['True', 'False'],                                ans: 0 },
    { q: '`/dev/null` discards all output written to it?',       opts: ['True', 'False'],                                ans: 0 },
    { q: 'Single quotes prevent variable expansion in bash?',    opts: ['True', 'False'],                                ans: 0 },
    { q: 'Exit code 0 means success in bash?',                   opts: ['True', 'False'],                                ans: 0 },
    { q: '`*` glob expands to all files in the directory?',      opts: ['True', 'False'],                                ans: 0 },
    { q: 'You can define functions in bash?',                    opts: ['True', 'False'],                                ans: 0 },
    { q: 'Bash arrays are zero-indexed?',                        opts: ['True', 'False'],                                ans: 0 },
  ],
  go: [
    { q: 'Go has garbage collection?',                           opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go is a statically typed compiled language?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Goroutines are heavier than OS threads?',              opts: ['True', 'False'],                                ans: 1 },
    { q: 'Go supports exceptions like Java?',                    opts: ['True', 'False'],                                ans: 1 },
    { q: 'Channels are safe for concurrent use in Go?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go has generics (as of Go 1.18)?',                     opts: ['True', 'False'],                                ans: 0 },
    { q: 'Unused imports cause a compile error in Go?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go supports class-based inheritance?',                 opts: ['True', 'False'],                                ans: 1 },
    { q: '`make()` can create slices, maps, and channels?',      opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go programs must have a `main` package to run?',       opts: ['True', 'False'],                                ans: 0 },
  ],
};

// ── generateLevels — 50 levels scaling progressively ────────────────────────

export function generateLevels(langId) {
  const questions = QUESTIONS[langId] || QUESTIONS.python;
  const recaps    = RECAPS[langId]    || RECAPS.python;
  const levels = [];
  let recapIdx = 0;
  let qIdx = 0;

  for (let i = 0; i < 50; i++) {
    const levelNum = i + 1;
    const isRecap  = levelNum % 5 === 0;
    const tier     = Math.floor(i / 10); // 0-4, increases difficulty/xp
    const tierXpBonus = tier * 8;

    if (isRecap) {
      // Pulls sequential recap, or falls back to last one if array is short
      const rq = recaps[recapIdx] || recaps[recaps.length - 1];
      levels.push({
        id:    levelNum,
        recap: true,
        title: `Recap ${Math.floor(levelNum / 5)}`,
        q:     rq.q,
        opts:  rq.opts,
        ans:   rq.ans,
        xp:    25 + tierXpBonus,
      });
      recapIdx++;
    } else {
      // Pulls sequential regular question, or falls back to last one if array is short
      const bq = questions[qIdx] || questions[questions.length - 1];
      levels.push({
        id:    levelNum,
        recap: false,
        title: `Level ${levelNum}`,
        q:     bq.q,
        opts:  bq.opts,
        ans:   bq.ans,
        xp:    (bq.xp || 10) + tierXpBonus,
      });
      qIdx++;
    }
  }

  return levels;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getLangById(id) {
  return LANGUAGES.find((l) => l.id === id);
}

export function getLangProgress(progress, langId) {
  return progress[langId] || { currentLevel: 1, completedLevels: {} };
}

export function calcLangPercent(progress, langId) {
  const lp = getLangProgress(progress, langId);
  return Math.round(Object.keys(lp.completedLevels).length / 50 * 100);
}

// ── Admin-pushed level cache ──────────────────────────────────────────────────
// Fetched once from Firestore /admin/levels and cached in memory.
let _adminLevelCache = null;
let _adminFetchPromise = null;

async function getAdminLevels() {
  if (_adminLevelCache) return _adminLevelCache;
  if (_adminFetchPromise) return _adminFetchPromise;

  _adminFetchPromise = (async () => {
    try {
      const { db }     = await import('../lib/firebase');
      const { doc, getDoc } = await import('firebase/firestore');
      const snap       = await getDoc(doc(db, 'admin', 'levels'));
      _adminLevelCache = snap.exists() ? snap.data() : {};
    } catch {
      _adminLevelCache = {};
    }
    return _adminLevelCache;
  })();

  return _adminFetchPromise;
}

/** Async version of generateLevels — checks Firestore for overrides */
export async function generateLevelsAsync(langId) {
  const adminData = await getAdminLevels();
  if (adminData?.[langId]?.length > 0) {
    return adminData[langId];
  }
  return generateLevels(langId);
}

export function invalidateAdminLevelCache() {
  _adminLevelCache = null;
  _adminFetchPromise = null;
}