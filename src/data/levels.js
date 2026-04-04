// ── Languages ────────────────────────────────────────────────────────────────

export const LANGUAGES = [
  { id: 'python',     name: 'Python',     icon: '🐍', color: '#3572a5', desc: 'Beginner friendly'   },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#f7df1e', desc: 'Web & everywhere'    },
  { id: 'rust',       name: 'Rust',       icon: '⚙️', color: '#dea584', desc: 'Systems & speed'     },
  { id: 'sql',        name: 'SQL',        icon: '🗄️', color: '#e38c00', desc: 'Data mastery'        },
  { id: 'bash',       name: 'Bash',       icon: '💻', color: '#4eaa25', desc: 'Shell scripting'     },
  { id: 'go',         name: 'Go',         icon: '🦫', color: '#00add8', desc: 'Cloud & concurrency' },
];

// ── Question bank per language (10 base questions, cycled to 50 levels) ──────

const QUESTIONS = {
  python: [
    { q: 'What keyword prints output in Python?',            opts: ['echo', 'print', 'console.log', 'output'],            ans: 1, xp: 10 },
    { q: 'Which of these is a valid Python list?',           opts: ['{}', '()', '[]', '<>'],                              ans: 2, xp: 10 },
    { q: 'What does `len([1, 2, 3])` return?',              opts: ['2', '3', '4', '1'],                                  ans: 1, xp: 10 },
    { q: 'Which keyword defines a function in Python?',      opts: ['function', 'def', 'func', 'fn'],                     ans: 1, xp: 15 },
    { q: 'What is the output of `2 ** 3`?',                  opts: ['6', '8', '9', '5'],                                  ans: 1, xp: 15 },
    { q: 'How do you start a for loop in Python?',           opts: ['for i in range(10):', 'for(i=0;i<10;i++)', 'foreach i', 'loop i:'], ans: 0, xp: 15 },
    { q: 'What does `isinstance(5, int)` return?',           opts: ['5', 'int', 'True', 'None'],                          ans: 2, xp: 20 },
    { q: 'Which method adds an item to a Python list?',      opts: ['add()', 'push()', 'append()', 'insert()'],            ans: 2, xp: 20 },
    { q: 'What does `type("hello")` return?',               opts: ["<class 'string'>", "<class 'str'>", 'String', 'str'], ans: 1, xp: 20 },
    { q: 'Which keyword exits a loop early in Python?',      opts: ['exit', 'stop', 'break', 'end'],                      ans: 2, xp: 20 },
  ],
  javascript: [
    { q: 'Which keyword declares a constant in JavaScript?', opts: ['var', 'let', 'const', 'def'],                        ans: 2, xp: 10 },
    { q: 'What does `typeof null` return in JS?',            opts: ['null', 'undefined', 'object', 'boolean'],            ans: 2, xp: 15 },
    { q: 'Which method adds to the end of an array?',        opts: ['push()', 'pop()', 'shift()', 'add()'],               ans: 0, xp: 10 },
    { q: 'What does `[1,2,3].map(x => x*2)` return?',       opts: ['[1,2,3]', '[2,4,6]', '12', '[3,6,9]'],              ans: 1, xp: 15 },
    { q: 'Which creates a Promise in JavaScript?',           opts: ['new Promise()', 'async()', 'Promise.new()', 'createPromise()'], ans: 0, xp: 20 },
    { q: 'What does `===` check compared to `==`?',          opts: ['Only value', 'Only type', 'Type AND value', 'Reference'], ans: 2, xp: 20 },
    { q: 'Which statement handles errors in JS?',            opts: ['catch/try', 'try/catch', 'error/handle', 'guard'], ans: 1, xp: 15 },
    { q: 'What does `console.log(1 + "2")` print?',          opts: ['3', '"12"', '12', 'Error'],                         ans: 2, xp: 20 },
    { q: 'How do you write an arrow function?',              opts: ['function()=>{}', '()=>{}', 'fn(){}', 'arrow(){}'],  ans: 1, xp: 15 },
    { q: 'What does `Array.isArray([])` return?',            opts: ['false', 'true', '[]', 'undefined'],                 ans: 1, xp: 20 },
  ],
  rust: [
    { q: 'Which keyword declares a mutable variable in Rust?', opts: ['mut let', 'let mut', 'var', 'let'],               ans: 1, xp: 15 },
    { q: 'Which type handles optional values in Rust?',        opts: ['Maybe', 'Nullable', 'Option', 'Result'],           ans: 2, xp: 15 },
    { q: 'What symbol denotes a reference in Rust?',           opts: ['*', '@', '&', '#'],                               ans: 2, xp: 15 },
    { q: 'Which macro prints output in Rust?',                 opts: ['print!()', 'echo!()', 'console!()', 'log!()'],     ans: 0, xp: 15 },
    { q: 'What keyword creates a struct in Rust?',             opts: ['class', 'struct', 'record', 'type'],              ans: 1, xp: 15 },
    { q: 'What does `Result<T, E>` represent?',               opts: ['A tuple', 'Success or Error', 'An enum', 'A promise'], ans: 1, xp: 20 },
    { q: 'Which iterator method transforms elements?',         opts: ['filter', 'fold', 'map', 'collect'],               ans: 2, xp: 20 },
    { q: 'What does `defer` do in Rust (via Drop)?',          opts: ['Delays import', 'Runs cleanup on drop', 'Async run', 'Skips scope'], ans: 1, xp: 20 },
    { q: 'Rust prevents data races at...',                     opts: ['Runtime', 'Link time', 'Compile time', 'Test time'], ans: 2, xp: 25 },
    { q: 'Which trait enables printing with `{:?}`?',         opts: ['Display', 'Debug', 'Print', 'Format'],            ans: 1, xp: 25 },
  ],
  sql: [
    { q: 'Which SQL command retrieves data?',                  opts: ['GET', 'FETCH', 'SELECT', 'PULL'],                  ans: 2, xp: 10 },
    { q: 'Which clause filters rows in a query?',             opts: ['HAVING', 'GROUP BY', 'WHERE', 'FILTER'],           ans: 2, xp: 10 },
    { q: 'What does `COUNT(*)` do?',                          opts: ['Counts columns', 'Counts rows', 'Sums values', 'Counts nulls'], ans: 1, xp: 10 },
    { q: 'Which JOIN keeps all rows from the left table?',    opts: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL JOIN'], ans: 2, xp: 15 },
    { q: 'Which command inserts data into a table?',          opts: ['ADD', 'INSERT INTO', 'PUSH', 'NEW'],               ans: 1, xp: 15 },
    { q: 'What does DISTINCT do in a SELECT query?',          opts: ['Sorts rows', 'Removes duplicates', 'Filters nulls', 'Indexes'], ans: 1, xp: 15 },
    { q: 'Which clause sorts query results?',                 opts: ['SORT BY', 'GROUP BY', 'ORDER BY', 'RANK BY'],      ans: 2, xp: 15 },
    { q: 'What does PRIMARY KEY ensure?',                     opts: ['Unique + Not Null', 'Just unique', 'Just not null', 'Indexed only'], ans: 0, xp: 20 },
    { q: 'Which function returns the highest value?',         opts: ['TOP()', 'GREATEST()', 'MAX()', 'HIGH()'],          ans: 2, xp: 20 },
    { q: 'What does `LIKE "%bunny%"` match?',                 opts: ['Exact "bunny"', 'Starts with bunny', 'Contains "bunny"', 'Ends with bunny'], ans: 2, xp: 20 },
  ],
  bash: [
    { q: 'Which command lists files in a directory?',         opts: ['dir', 'ls', 'list', 'files'],                      ans: 1, xp: 10 },
    { q: 'What does `cd ..` do?',                             opts: ['Removes dir', 'Goes up one dir', 'Lists files', 'Creates dir'], ans: 1, xp: 10 },
    { q: 'Which command creates a new directory?',            opts: ['touch', 'newdir', 'mkdir', 'makedir'],             ans: 2, xp: 10 },
    { q: 'What does `chmod +x script.sh` do?',               opts: ['Copies file', 'Makes executable', 'Deletes file', 'Renames file'], ans: 1, xp: 15 },
    { q: 'Which command shows file contents?',               opts: ['read', 'cat', 'show', 'open'],                     ans: 1, xp: 15 },
    { q: 'What does `$1` represent in a bash script?',       opts: ['First function', 'First argument', 'Line 1', 'PID'], ans: 1, xp: 15 },
    { q: 'Which command searches text inside files?',         opts: ['find', 'search', 'grep', 'locate'],               ans: 2, xp: 15 },
    { q: 'What does `&&` do between two commands?',           opts: ['OR logic', 'Background job', 'AND – run if prev succeeds', 'Pipe output'], ans: 2, xp: 20 },
    { q: 'What does `>` do when used with a command?',       opts: ['Appends output', 'Overwrites output to file', 'Reads input', 'Pipes'], ans: 1, xp: 20 },
    { q: 'How do you make a variable in bash?',              opts: ['var x=5', 'x = 5', 'x=5', 'let x = 5'],           ans: 2, xp: 20 },
  ],
  go: [
    { q: 'What keyword declares a variable in Go?',           opts: ['var', 'let', 'dim', 'def'],                        ans: 0, xp: 10 },
    { q: 'Go uses which concurrency primitive?',              opts: ['Thread', 'Goroutine', 'Process', 'Fiber'],          ans: 1, xp: 15 },
    { q: 'What replaces null in Go?',                        opts: ['undefined', 'nil', 'none', 'empty'],               ans: 1, xp: 15 },
    { q: 'Which keyword starts a goroutine?',                 opts: ['async', 'go', 'thread', 'spawn'],                  ans: 1, xp: 15 },
    { q: 'What is a channel used for in Go?',                opts: ['DB connections', 'HTTP requests', 'Goroutine communication', 'File I/O'], ans: 2, xp: 20 },
    { q: 'Go interfaces are implemented...',                  opts: ['Explicitly', 'Implicitly', "With 'implements'", "With 'interface{}'"], ans: 1, xp: 20 },
    { q: 'What does `defer` do in Go?',                      opts: ['Delays import', 'Runs at function end', 'Async run', 'Cancels func'], ans: 1, xp: 20 },
    { q: 'How does Go handle multiple return values?',       opts: ['Array only', 'Not possible', 'Comma-separated in ()', 'Using struct'], ans: 2, xp: 20 },
    { q: 'Which tool formats Go code automatically?',        opts: ['goformat', 'gofmt', 'prettier', 'rustfmt'],        ans: 1, xp: 20 },
    { q: 'What does `:=` do in Go?',                         opts: ['Compares values', 'Short variable declaration', 'Assigns a channel', 'Imports package'], ans: 1, xp: 25 },
  ],
};

// ── Recap questions (every 5th level) ────────────────────────────────────────

const RECAPS = {
  python: [
    { q: 'Python variables need explicit type declarations?',    opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Python uses indentation to define code blocks?',       opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Lists in Python are mutable?',                        opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Python is a compiled language?',                       opts: ['True', 'False'],                                 ans: 1 },
    { q: '`None` in Python is equivalent to null in other languages?', opts: ['True', 'False'],                          ans: 0 },
    { q: 'Python supports multiple inheritance?',                opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Tuples in Python are immutable?',                     opts: ['True', 'False'],                                 ans: 0 },
    { q: 'The `range()` function returns a list?',               opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Python dictionaries maintain insertion order (3.7+)?', opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Lambda functions in Python can have multiple statements?', opts: ['True', 'False'],                            ans: 1 },
  ],
  javascript: [
    { q: '`let` is block-scoped in JavaScript?',                 opts: ['True', 'False'],                                 ans: 0 },
    { q: 'JavaScript is single-threaded?',                       opts: ['True', 'False'],                                 ans: 0 },
    { q: '`===` checks type AND value?',                         opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Promises replace callbacks entirely?',                 opts: ['True', 'False'],                                 ans: 1 },
    { q: 'Arrow functions have their own `this`?',               opts: ['True', 'False'],                                 ans: 1 },
    { q: 'null == undefined evaluates to true in JS?',           opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Array.map() modifies the original array?',            opts: ['True', 'False'],                                 ans: 1 },
    { q: 'async/await is built on top of Promises?',             opts: ['True', 'False'],                                 ans: 0 },
    { q: 'JSON.parse() converts a string to an object?',         opts: ['True', 'False'],                                 ans: 0 },
    { q: 'Closure means a function remembers its outer scope?',  opts: ['True', 'False'],                                 ans: 0 },
  ],
  rust: [
    { q: 'Rust prevents null pointer exceptions at compile time?', opts: ['True', 'False'],                              ans: 0 },
    { q: 'Rust has a garbage collector?',                         opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust uses a borrow checker for memory safety?',         opts: ['True', 'False'],                                ans: 0 },
    { q: 'You can have multiple mutable references to data?',     opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust enums can contain data?',                         opts: ['True', 'False'],                                ans: 0 },
    { q: 'Rust panics are always unrecoverable?',                opts: ['True', 'False'],                                ans: 1 },
    { q: 'The ? operator propagates errors automatically?',       opts: ['True', 'False'],                                ans: 0 },
    { q: 'Rust supports object-oriented programming?',           opts: ['True', 'False'],                                ans: 0 },
    { q: 'Lifetimes are always explicit in Rust?',               opts: ['True', 'False'],                                ans: 1 },
    { q: 'Rust traits are similar to interfaces?',               opts: ['True', 'False'],                                ans: 0 },
  ],
  sql: [
    { q: 'SELECT * retrieves all columns from a table?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'GROUP BY is used with aggregate functions?',            opts: ['True', 'False'],                                ans: 0 },
    { q: 'A PRIMARY KEY can contain NULL values?',               opts: ['True', 'False'],                                ans: 1 },
    { q: 'INNER JOIN returns rows that match in BOTH tables?',    opts: ['True', 'False'],                                ans: 0 },
    { q: 'HAVING filters rows before GROUP BY?',                 opts: ['True', 'False'],                                ans: 1 },
    { q: 'SQL is case-sensitive for keywords by default?',        opts: ['True', 'False'],                                ans: 1 },
    { q: 'A FOREIGN KEY references a PRIMARY KEY?',              opts: ['True', 'False'],                                ans: 0 },
    { q: 'ORDER BY sorts in ascending order by default?',         opts: ['True', 'False'],                                ans: 0 },
    { q: 'Subqueries can be used in a WHERE clause?',            opts: ['True', 'False'],                                ans: 0 },
    { q: 'Indexes always speed up INSERT operations?',           opts: ['True', 'False'],                                ans: 1 },
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
    { q: 'Goroutines are heavier than OS threads?',             opts: ['True', 'False'],                                ans: 1 },
    { q: 'Go supports exceptions like Java?',                   opts: ['True', 'False'],                                ans: 1 },
    { q: 'Channels are safe for concurrent use in Go?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go has generics (as of Go 1.18)?',                    opts: ['True', 'False'],                                ans: 0 },
    { q: 'Unused imports cause a compile error in Go?',          opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go supports class-based inheritance?',                 opts: ['True', 'False'],                                ans: 1 },
    { q: '`make()` can create slices, maps, and channels?',      opts: ['True', 'False'],                                ans: 0 },
    { q: 'Go programs must have a `main` package to run?',       opts: ['True', 'False'],                                ans: 0 },
  ],
};

// ── generateLevels — 50 levels with recap every 5 ───────────────────────────

export function generateLevels(langId) {
  const questions = QUESTIONS[langId] || QUESTIONS.python;
  const recaps    = RECAPS[langId]    || RECAPS.python;
  const levels = [];
  let recapIdx = 0;

  for (let i = 0; i < 50; i++) {
    const levelNum = i + 1;
    const isRecap  = levelNum % 5 === 0;
    const tier     = Math.floor(i / 10); // 0-4, increases difficulty/xp
    const tierXpBonus = tier * 8;

    if (isRecap) {
      const rq = recaps[recapIdx % recaps.length];
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
      const qIdx = (i - Math.floor(i / 5)) % questions.length;
      const bq   = questions[qIdx];
      levels.push({
        id:    levelNum,
        recap: false,
        title: `Level ${levelNum}`,
        q:     bq.q,
        opts:  bq.opts,
        ans:   bq.ans,
        xp:    bq.xp + tierXpBonus,
      });
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
// If an admin has pushed custom levels for a language, they override the built-ins.
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

/**
 * Async version of generateLevels — checks Firestore for admin-pushed overrides first.
 * Use this in LevelPage and MapPage for live updates.
 */
export async function generateLevelsAsync(langId) {
  const adminData = await getAdminLevels();
  if (adminData?.[langId]?.length > 0) {
    // Admin has pushed custom levels — use them
    return adminData[langId];
  }
  // Fall back to built-in generated levels
  return generateLevels(langId);
}

/** Call this to force a fresh fetch (e.g. after admin pushes new levels) */
export function invalidateAdminLevelCache() {
  _adminLevelCache = null;
  _adminFetchPromise = null;
}
