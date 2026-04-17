// 📚 ByteBunny Course Curriculum Data
// Supported Languages: Python, JS, Rust, SQL, Bash, Go, TS, C++, Java, C#

export const COURSE_DATA = {
  python: {
    basic: [
      {
        id: 'p1', title: 'Hello World', theory: 'The print() function outputs text to the screen.',
        questions: [
          { qId: 'p1q1', text: 'Print "Hello World"', defaultCode: '', expectedPattern: /print\(["']Hello World["']\)/ },
          { qId: 'p1q2', text: 'Print "ByteBunny"', defaultCode: '', expectedPattern: /print\(["']ByteBunny["']\)/ },
          { qId: 'p1q3', text: 'Print the number 42', defaultCode: '', expectedPattern: /print\(42\)/ },
          { qId: 'p1q4', text: 'Print "1" + "2"', defaultCode: '', expectedPattern: /print\(["']1["']\s*\+\s*["']2["']\)/ },
          { qId: 'p1q5', text: 'Print the boolean True', defaultCode: '', expectedPattern: /print\(True\)/ }
        ]
      },
      {
        id: 'p2', title: 'Variables', theory: 'Variables store data using the = operator.',
        questions: [
          { qId: 'p2q1', text: 'Set x to 10', defaultCode: '', expectedPattern: /x\s*=\s*10/ },
          { qId: 'p2q2', text: 'Set msg to "Hi"', defaultCode: '', expectedPattern: /msg\s*=\s*["']Hi["']/ },
          { qId: 'p2q3', text: 'Set y to x', defaultCode: '', expectedPattern: /y\s*=\s*x/ },
          { qId: 'p2q4', text: 'Set active to False', defaultCode: '', expectedPattern: /active\s*=\s*False/ },
          { qId: 'p2q5', text: 'Set pi to 3.14', defaultCode: '', expectedPattern: /pi\s*=\s*3\.14/ }
        ]
      },
      {
        id: 'p3', title: 'Arithmetic', theory: 'Math operators: +, -, *, /, // (floor), % (mod), ** (power).',
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
        id: 'p4', title: 'Lists', theory: 'Lists store items: [a, b, c]. Use .append() to add.',
        questions: [
          { qId: 'p4q1', text: 'Create list "l" with 1, 2, 3', defaultCode: '', expectedPattern: /l\s*=\s*\[1,\s*2,\s*3\]/ },
          { qId: 'p4q2', text: 'Append 4 to list "l"', defaultCode: '', expectedPattern: /l\.append\(4\)/ },
          { qId: 'p4q3', text: 'Access first element of "l"', defaultCode: '', expectedPattern: /l\[0\]/ },
          { qId: 'p4q4', text: 'Get length of "l"', defaultCode: '', expectedPattern: /len\(l\)/ },
          { qId: 'p4q5', text: 'Pop last item from "l"', defaultCode: '', expectedPattern: /l\.pop\(\)/ }
        ]
      },
      {
        id: 'p5', title: 'Strings', theory: 'Strings can be formatted using f-strings: f"{var}".',
        questions: [
          { qId: 'p5q1', text: 'Create f-string for variable "n"', defaultCode: '', expectedPattern: /f["'].*\{n\}.*["']/ },
          { qId: 'p5q2', text: 'Convert "s" to uppercase', defaultCode: '', expectedPattern: /s\.upper\(\)/ },
          { qId: 'p5q3', text: 'Check if "a" is in "text"', defaultCode: '', expectedPattern: /["']a["']\s*in\s*text/ },
          { qId: 'p5q4', text: 'Split "s" by comma', defaultCode: '', expectedPattern: /s\.split\(["'],["']\)/ },
          { qId: 'p5q5', text: 'Replace "a" with "b" in "s"', defaultCode: '', expectedPattern: /s\.replace\(["']a["'],\s*["']b["']\)/ }
        ]
      },
      {
        id: 'p6', title: 'Conditionals', theory: 'Use if, elif, and else for logic.',
        questions: [
          { qId: 'p6q1', text: 'If x is greater than 5', defaultCode: '', expectedPattern: /if\s*x\s*>\s*5:/ },
          { qId: 'p6q2', text: 'If x equals 10', defaultCode: '', expectedPattern: /if\s*x\s*==\s*10:/ },
          { qId: 'p6q3', text: 'Check if x is NOT 0', defaultCode: '', expectedPattern: /if\s*x\s*!=\s*0:/ },
          { qId: 'p6q4', text: 'If x > 0 AND x < 10', defaultCode: '', expectedPattern: /if\s*x\s*>\s*0\s*and\s*x\s*<\s*10:/ },
          { qId: 'p6q5', text: 'Else block', defaultCode: '', expectedPattern: /else:/ }
        ]
      },
      {
        id: 'p7', title: 'Loops', theory: 'Use "for item in list:" to iterate.',
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
        id: 'p8', title: 'Functions', theory: 'Define functions using def name(args):.',
        questions: [
          { qId: 'p8q1', text: 'Define function "greet"', defaultCode: '', expectedPattern: /def\s*greet\(\):/ },
          { qId: 'p8q2', text: 'Return x squared', defaultCode: '', expectedPattern: /return\s*x\s*\*\*\s*2/ },
          { qId: 'p8q3', text: 'Function with argument "n"', defaultCode: '', expectedPattern: /def\s*\w+\(n\):/ },
          { qId: 'p8q4', text: 'Call function "fn"', defaultCode: '', expectedPattern: /fn\(\)/ },
          { qId: 'p8q5', text: 'Define function with default a=1', defaultCode: '', expectedPattern: /def\s*\w+\(a\s*=\s*1\):/ }
        ]
      },
      {
        id: 'p9', title: 'Dictionaries', theory: 'Dictionaries store key-value pairs: {key: value}.',
        questions: [
          { qId: 'p9q1', text: 'Create dict "d" with a=1', defaultCode: '', expectedPattern: /d\s*=\s*\{["']a["']:\s*1\}/ },
          { qId: 'p9q2', text: 'Access key "name" in "d"', defaultCode: '', expectedPattern: /d\[["']name["']\]/ },
          { qId: 'p9q3', text: 'Get keys of "d"', defaultCode: '', expectedPattern: /d\.keys\(\)/ },
          { qId: 'p9q4', text: 'Check if "k" in "d"', defaultCode: '', expectedPattern: /["']k["']\s*in\s*d/ },
          { qId: 'p9q5', text: 'Remove key "a" from "d"', defaultCode: '', expectedPattern: /d\.pop\(["']a["']\)/ }
        ]
      },
      {
        id: 'p10', title: 'Classes', theory: 'Use class Name: to define a blueprint.',
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
        id: 'j1', title: 'Logging', theory: 'Use console.log() to print to the console.',
        questions: [
          { qId: 'j1q1', text: 'Log "Hello"', defaultCode: '', expectedPattern: /console\.log\(["']Hello["']\)/ },
          { qId: 'j1q2', text: 'Log the sum 2 + 2', defaultCode: '', expectedPattern: /console\.log\(2\s*\+\s*2\)/ },
          { qId: 'j1q3', text: 'Log an error "Fail"', defaultCode: '', expectedPattern: /console\.error\(["']Fail["']\)/ },
          { qId: 'j1q4', text: 'Log variable "x"', defaultCode: '', expectedPattern: /console\.log\(x\)/ },
          { qId: 'j1q5', text: 'Log "JS" and "Fun"', defaultCode: '', expectedPattern: /console\.log\(["']JS["'],\s*["']Fun["']\)/ }
        ]
      },
      {
        id: 'j2', title: 'Variables', theory: 'Use let for reassignable and const for fixed variables.',
        questions: [
          { qId: 'j2q1', text: 'Declare const "x" as 5', defaultCode: '', expectedPattern: /const\s*x\s*=\s*5/ },
          { qId: 'j2q2', text: 'Declare let "y"', defaultCode: '', expectedPattern: /let\s*y/ },
          { qId: 'j2q3', text: 'Assign 10 to "y"', defaultCode: '', expectedPattern: /y\s*=\s*10/ },
          { qId: 'j2q4', text: 'Declare const "name"', defaultCode: '', expectedPattern: /const\s*name\s*=\s*["'].*["']/ },
          { qId: 'j2q5', text: 'Increment "count" by 1', defaultCode: '', expectedPattern: /count\+\+|count\s*\+=\s*1/ }
        ]
      },
      {
        id: 'j3', title: 'Types', theory: 'Primitive types: string, number, boolean, null, undefined.',
        questions: [
          { qId: 'j3q1', text: 'Get type of "x"', defaultCode: '', expectedPattern: /typeof\s*x/ },
          { qId: 'j3q2', text: 'Template literal with "v"', defaultCode: '', expectedPattern: /`.*\{v\}.*`/ },
          { qId: 'j3q3', text: 'Set "a" to null', defaultCode: '', expectedPattern: /a\s*=\s*null/ },
          { qId: 'j3q4', text: 'Convert "5" to Number', defaultCode: '', expectedPattern: /Number\(["']5["']\)/ },
          { qId: 'j3q5', text: 'Check if x is undefined', defaultCode: '', expectedPattern: /x\s*===\s*undefined/ }
        ]
      },
      {
        id: 'j4', title: 'Math', theory: 'Use the Math object for calculations.',
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
        id: 'j5', title: 'Arrays', theory: 'Arrays use []. Methods: push, pop, map, filter.',
        questions: [
          { qId: 'j5q1', text: 'Push 5 to array "a"', defaultCode: '', expectedPattern: /a\.push\(5\)/ },
          { qId: 'j5q2', text: 'Map array "a" to double x', defaultCode: '', expectedPattern: /a\.map\(x\s*=>\s*x\s*\*\s*2\)/ },
          { qId: 'j5q3', text: 'Filter "a" for x > 10', defaultCode: '', expectedPattern: /a\.filter\(x\s*=>\s*x\s*>\s*10\)/ },
          { qId: 'j5q4', text: 'Get length of "a"', defaultCode: '', expectedPattern: /a\.length/ },
          { qId: 'j5q5', text: 'Find index of 7 in "a"', defaultCode: '', expectedPattern: /a\.indexOf\(7\)/ }
        ]
      },
      {
        id: 'j6', title: 'Objects', theory: 'Objects store keyed data {key: value}.',
        questions: [
          { qId: 'j6q1', text: 'Access property "name" of "o"', defaultCode: '', expectedPattern: /o\.name|o\[["']name["']\]/ },
          { qId: 'j6q2', text: 'Set property "age" to 20', defaultCode: '', expectedPattern: /o\.age\s*=\s*20/ },
          { qId: 'j6q3', text: 'Object with key "a" value 1', defaultCode: '', expectedPattern: /\{\s*a:\s*1\s*\}/ },
          { qId: 'j6q4', text: 'Get keys of object "o"', defaultCode: '', expectedPattern: /Object\.keys\(o\)/ },
          { qId: 'j6q5', text: 'Check if "p" in "o"', defaultCode: '', expectedPattern: /["']p["']\s*in\s*o/ }
        ]
      },
      {
        id: 'j7', title: 'Arrows', theory: 'Arrow functions: () => {}.',
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
        id: 'j8', title: 'Async', theory: 'Use async/await for asynchronous code.',
        questions: [
          { qId: 'j8q1', text: 'Define async function "run"', defaultCode: '', expectedPattern: /async\s*function\s*run\(\)/ },
          { qId: 'j8q2', text: 'Await promise "p"', defaultCode: '', expectedPattern: /await\s*p/ },
          { qId: 'j8q3', text: 'New Promise executor', defaultCode: '', expectedPattern: /new\s*Promise\(\(resolve,\s*reject\)\s*=>/ },
          { qId: 'j8q4', text: 'Call .then() on promise', defaultCode: '', expectedPattern: /\.then\(.*\)/ },
          { qId: 'j8q5', text: 'Catch error in async', defaultCode: '', expectedPattern: /try\s*\{.*\}\s*catch/ }
        ]
      },
      {
        id: 'j9', title: 'Closures', theory: 'Functions remember their scope.',
        questions: [
          { qId: 'j9q1', text: 'Function returning function', defaultCode: '', expectedPattern: /return\s*function|return\s*\(\)\s*=>/ },
          { qId: 'j9q2', text: 'Private variable "v"', defaultCode: '', expectedPattern: /let\s*v/ },
          { qId: 'j9q3', text: 'Outer function "outer"', defaultCode: '', expectedPattern: /function\s*outer\(\)/ },
          { qId: 'j9q4', text: 'Access outer "x" in inner', defaultCode: '', expectedPattern: /x/ },
          { qId: 'j9q5', text: 'Call returned function', defaultCode: '', expectedPattern: /\(\)\(\)/ }
        ]
      },
      {
        id: 'j10', title: 'Modules', theory: 'Use import and export to share code.',
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
        id: 'r1', title: 'Print', theory: 'println!() macro prints text to console.',
        questions: [
          { qId: 'r1q1', text: 'Print "Hello"', defaultCode: '', expectedPattern: /println!\(["']Hello["']\)/ },
          { qId: 'r1q2', text: 'Print with placeholder {}', defaultCode: '', expectedPattern: /println!\(["']\{\}["'],\s*x\)/ },
          { qId: 'r1q3', text: 'Debug print with {:?}', defaultCode: '', expectedPattern: /println!\(["']\{:?\}["'],\s*x\)/ },
          { qId: 'r1q4', text: 'Format string to "s"', defaultCode: '', expectedPattern: /let\s*s\s*=\s*format!\(.*\)/ },
          { qId: 'r1q5', text: 'Print empty line', defaultCode: '', expectedPattern: /println!\(\)/ }
        ]
      },
      {
        id: 'r2', title: 'Variables', theory: 'Variables are immutable by default.',
        questions: [
          { qId: 'r2q1', text: 'Declare immutable x = 5', defaultCode: '', expectedPattern: /let\s*x\s*=\s*5;/ },
          { qId: 'r2q2', text: 'Declare mutable y = 10', defaultCode: '', expectedPattern: /let\s*mut\s*y\s*=\s*10;/ },
          { qId: 'r2q3', text: 'Shadow x with let x', defaultCode: '', expectedPattern: /let\s*x\s*=/ },
          { qId: 'r2q4', text: 'Declare constant PI', defaultCode: '', expectedPattern: /const\s*PI:\s*f64\s*=\s*3\.14;/ },
          { qId: 'r2q5', text: 'Specify type i32 for x', defaultCode: '', expectedPattern: /let\s*x:\s*i32\s*=/ }
        ]
      },
      {
        id: 'r3', title: 'Types', theory: 'Rust is statically typed. Common: i32, f64, bool, char.',
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
        id: 'r4', title: 'Ownership', theory: 'Data has one owner. Use & to borrow.',
        questions: [
          { qId: 'r4q1', text: 'Borrow "s" as "&s"', defaultCode: '', expectedPattern: /&s/ },
          { qId: 'r4q2', text: 'Mutable borrow "&mut s"', defaultCode: '', expectedPattern: /&mut\s*s/ },
          { qId: 'r4q3', text: 'Clone "s"', defaultCode: '', expectedPattern: /s\.clone\(\)/ },
          { qId: 'r4q4', text: 'Transfer ownership to "f"', defaultCode: '', expectedPattern: /f\(s\)/ },
          { qId: 'r4q5', text: 'String from literal', defaultCode: '', expectedPattern: /String::from\(["'].*["']\)/ }
        ]
      },
      {
        id: 'r5', title: 'Structs', theory: 'Structs group related data.',
        questions: [
          { qId: 'r5q1', text: 'Define struct "User"', defaultCode: '', expectedPattern: /struct\s*User\s*\{/ },
          { qId: 'r5q2', text: 'Instantiate User', defaultCode: '', expectedPattern: /User\s*\{.*\}/ },
          { qId: 'r5q3', text: 'Define tuple struct "Color"', defaultCode: '', expectedPattern: /struct\s*Color\(.*\);/ },
          { qId: 'r5q4', text: 'Access field user.name', defaultCode: '', expectedPattern: /user\.name/ },
          { qId: 'r5q5', text: 'Implement methods for User', defaultCode: '', expectedPattern: /impl\s*User\s*\{/ }
        ]
      },
      {
        id: 'r6', title: 'Enums', theory: 'Enums allow a value to be one of several variants.',
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
        id: 'r7', title: 'Match', theory: 'Match is a powerful control flow operator.',
        questions: [
          { qId: 'r7q1', text: 'Match variable "x"', defaultCode: '', expectedPattern: /match\s*x\s*\{/ },
          { qId: 'r7q2', text: 'Match pattern 1 => ...', defaultCode: '', expectedPattern: /1\s*=>/ },
          { qId: 'r7q3', text: 'Default pattern _ => ...', defaultCode: '', expectedPattern: /_\s*=>/ },
          { qId: 'r7q4', text: 'Match Some(i) pattern', defaultCode: '', expectedPattern: /Some\(i\)\s*=>/ },
          { qId: 'r7q5', text: 'Match with range 1..=5', defaultCode: '', expectedPattern: /1\.\.=5\s*=>/ }
        ]
      },
      {
        id: 'r8', title: 'Traits', theory: 'Traits define shared behavior.',
        questions: [
          { qId: 'r8q1', text: 'Define trait "Speak"', defaultCode: '', expectedPattern: /trait\s*Speak\s*\{/ },
          { qId: 'r8q2', text: 'Implement Speak for Dog', defaultCode: '', expectedPattern: /impl\s*Speak\s*for\s*Dog/ },
          { qId: 'r8q3', text: 'Define method in trait', defaultCode: '', expectedPattern: /fn\s*say\(&self\)/ },
          { qId: 'r8q4', text: 'Trait bound T: Display', defaultCode: '', expectedPattern: /T:\s*Display/ },
          { qId: 'r8q5', text: 'Derive Debug trait', defaultCode: '', expectedPattern: /#\[derive\(Debug\)\]/ }
        ]
      },
      {
        id: 'r9', title: 'Generics', theory: 'Use <T> for generic types.',
        questions: [
          { qId: 'r9q1', text: 'Generic function foo<T>', defaultCode: '', expectedPattern: /fn\s*foo<T>/ },
          { qId: 'r9q2', text: 'Struct Point<T>', defaultCode: '', expectedPattern: /struct\s*Point<T>/ },
          { qId: 'r9q3', text: 'Generic with two types <T, U>', defaultCode: '', expectedPattern: /<T,\s*U>/ },
          { qId: 'r9q4', text: 'Implement for Point<T>', defaultCode: '', expectedPattern: /impl<T>\s*Point<T>/ },
          { qId: 'r9q5', text: 'Vector of integers Vec<i32>', defaultCode: '', expectedPattern: /Vec<i32>/ }
        ]
      },
      {
        id: 'r10', title: 'Errors', theory: 'Use Result for recoverable errors.',
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
        id: 's1', title: 'Select', theory: 'Use SELECT to retrieve data from a table.',
        questions: [
          { qId: 's1q1', text: 'Select all columns', defaultCode: '', expectedPattern: /SELECT\s*\*\s*FROM/i },
          { qId: 's1q2', text: 'Select "name" column', defaultCode: '', expectedPattern: /SELECT\s*name\s*FROM/i },
          { qId: 's1q3', text: 'Select "id", "name"', defaultCode: '', expectedPattern: /SELECT\s*id,\s*name/i },
          { qId: 's1q4', text: 'Alias "name" as "n"', defaultCode: '', expectedPattern: /SELECT\s*name\s*AS\s*n/i },
          { qId: 's1q5', text: 'Select distinct "city"', defaultCode: '', expectedPattern: /SELECT\s*DISTINCT\s*city/i }
        ]
      },
      {
        id: 's2', title: 'Where', theory: 'Use WHERE to filter records.',
        questions: [
          { qId: 's2q1', text: 'Where id is 1', defaultCode: '', expectedPattern: /WHERE\s*id\s*=\s*1/i },
          { qId: 's2q2', text: 'Where age > 18', defaultCode: '', expectedPattern: /WHERE\s*age\s*>\s*18/i },
          { qId: 's2q3', text: 'Where name is "Bob"', defaultCode: '', expectedPattern: /WHERE\s*name\s*=\s*[']Bob[']/i },
          { qId: 's2q4', text: 'Where city IN ("NY", "LA")', defaultCode: '', expectedPattern: /WHERE\s*city\s*IN\s*\(/i },
          { qId: 's2q5', text: 'Where name LIKE "A%"', defaultCode: '', expectedPattern: /WHERE\s*name\s*LIKE\s*[']A%[']/i }
        ]
      },
      {
        id: 's3', title: 'Order', theory: 'Use ORDER BY to sort results.',
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
        id: 's4', title: 'Joins', theory: 'Use JOIN to combine rows from tables.',
        questions: [
          { qId: 's4q1', text: 'Inner join "orders"', defaultCode: '', expectedPattern: /INNER\s*JOIN\s*orders/i },
          { qId: 's4q2', text: 'Join ON a.id = b.id', defaultCode: '', expectedPattern: /ON\s*.*\.id\s*=\s*.*\.id/i },
          { qId: 's4q3', text: 'Left join "users"', defaultCode: '', expectedPattern: /LEFT\s*JOIN\s*users/i },
          { qId: 's4q4', text: 'Cross join "tags"', defaultCode: '', expectedPattern: /CROSS\s*JOIN\s*tags/i },
          { qId: 's4q5', text: 'Full outer join', defaultCode: '', expectedPattern: /FULL\s*OUTER\s*JOIN/i }
        ]
      },
      {
        id: 's5', title: 'Grouping', theory: 'Use GROUP BY with aggregate functions.',
        questions: [
          { qId: 's5q1', text: 'Group by "country"', defaultCode: '', expectedPattern: /GROUP\s*BY\s*country/i },
          { qId: 's5q2', text: 'Count records', defaultCode: '', expectedPattern: /COUNT\(\*\)/i },
          { qId: 's5q3', text: 'Sum "total"', defaultCode: '', expectedPattern: /SUM\(total\)/i },
          { qId: 's5q4', text: 'Avg "price"', defaultCode: '', expectedPattern: /AVG\(price\)/i },
          { qId: 's5q5', text: 'Having count > 5', defaultCode: '', expectedPattern: /HAVING\s*COUNT\(.*\)\s*>\s*5/i }
        ]
      },
      {
        id: 's6', title: 'Insert', theory: 'Use INSERT INTO to add data.',
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
        id: 's7', title: 'Update', theory: 'Use UPDATE to modify records.',
        questions: [
          { qId: 's7q1', text: 'Update "users"', defaultCode: '', expectedPattern: /UPDATE\s*users/i },
          { qId: 's7q2', text: 'Set "age" to 21', defaultCode: '', expectedPattern: /SET\s*age\s*=\s*21/i },
          { qId: 's7q3', text: 'Update where id is 5', defaultCode: '', expectedPattern: /WHERE\s*id\s*=\s*5/i },
          { qId: 's7q4', text: 'Increment salary by 100', defaultCode: '', expectedPattern: /salary\s*=\s*salary\s*\+\s*100/i },
          { qId: 's7q5', text: 'Update name and city', defaultCode: '', expectedPattern: /SET\s*name\s*=.*,\s*city\s*=/i }
        ]
      },
      {
        id: 's8', title: 'Delete', theory: 'Use DELETE FROM to remove records.',
        questions: [
          { qId: 's8q1', text: 'Delete from "logs"', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*logs/i },
          { qId: 's8q2', text: 'Where status is "old"', defaultCode: '', expectedPattern: /WHERE\s*status\s*=\s*[']old[']/i },
          { qId: 's8q3', text: 'Truncate table "temp"', defaultCode: '', expectedPattern: /TRUNCATE\s*TABLE\s*temp/i },
          { qId: 's8q4', text: 'Delete with subquery', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*.*WHERE\s*id\s*IN\s*\(/i },
          { qId: 's8q5', text: 'Delete all records', defaultCode: '', expectedPattern: /DELETE\s*FROM\s*\w+$/i }
        ]
      },
      {
        id: 's9', title: 'Create', theory: 'Use CREATE TABLE to define a new table.',
        questions: [
          { qId: 's9q1', text: 'Create table "items"', defaultCode: '', expectedPattern: /CREATE\s*TABLE\s*items/i },
          { qId: 's9q2', text: 'Column "id" INT PRIMARY KEY', defaultCode: '', expectedPattern: /id\s*INT\s*PRIMARY\s*KEY/i },
          { qId: 's9q3', text: 'Column "name" VARCHAR(50)', defaultCode: '', expectedPattern: /name\s*VARCHAR\(50\)/i },
          { qId: 's9q4', text: 'Column "price" DECIMAL', defaultCode: '', expectedPattern: /price\s*DECIMAL/i },
          { qId: 's9q5', text: 'Drop table "junk"', defaultCode: '', expectedPattern: /DROP\s*TABLE\s*junk/i }
        ]
      },
      {
        id: 's10', title: 'Subqueries', theory: 'Nested queries provide dynamic values.',
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
        id: 'b1', title: 'Commands', theory: 'Basic shell commands: echo, ls, pwd.',
        questions: [
          { qId: 'b1q1', text: 'Echo "Hello"', defaultCode: '', expectedPattern: /echo\s*["']Hello["']/ },
          { qId: 'b1q2', text: 'List files', defaultCode: '', expectedPattern: /ls/ },
          { qId: 'b1q3', text: 'Print working directory', defaultCode: '', expectedPattern: /pwd/ },
          { qId: 'b1q4', text: 'List all files (-a)', defaultCode: '', expectedPattern: /ls\s*-a/ },
          { qId: 'b1q5', text: 'Create directory "test"', defaultCode: '', expectedPattern: /mkdir\s*test/ }
        ]
      },
      {
        id: 'b2', title: 'Variables', theory: 'Define variables without spaces: name=value.',
        questions: [
          { qId: 'b2q1', text: 'Set "x" to 5', defaultCode: '', expectedPattern: /x=5/ },
          { qId: 'b2q2', text: 'Echo variable "x"', defaultCode: '', expectedPattern: /echo\s*\$x/ },
          { qId: 'b2q3', text: 'Set "msg" to "Hi"', defaultCode: '', expectedPattern: /msg=["']Hi["']/ },
          { qId: 'b2q4', text: 'Command substitution $(ls)', defaultCode: '', expectedPattern: /\$\(ls\)/ },
          { qId: 'b2q5', text: 'Export "PATH"', defaultCode: '', expectedPattern: /export\s*PATH/ }
        ]
      },
      {
        id: 'b3', title: 'Pipes', theory: 'Connect commands using | and redirect with >.',
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
        id: 'b4', title: 'Grep', theory: 'Use grep to search text patterns.',
        questions: [
          { qId: 'b4q1', text: 'Grep "error" in "log"', defaultCode: '', expectedPattern: /grep\s*["']error["']\s*log/ },
          { qId: 'b4q2', text: 'Recursive grep (-r)', defaultCode: '', expectedPattern: /grep\s*-r/ },
          { qId: 'b4q3', text: 'Case insensitive grep (-i)', defaultCode: '', expectedPattern: /grep\s*-i/ },
          { qId: 'b4q4', text: 'Invert match (-v)', defaultCode: '', expectedPattern: /grep\s*-v/ },
          { qId: 'b4q5', text: 'Count matches (-c)', defaultCode: '', expectedPattern: /grep\s*-c/ }
        ]
      },
      {
        id: 'b5', title: 'Perms', theory: 'Use chmod to change file permissions.',
        questions: [
          { qId: 'b5q1', text: 'Add execute perm (+x)', defaultCode: '', expectedPattern: /chmod\s*\+x/ },
          { qId: 'b5q2', text: 'Set perms to 755', defaultCode: '', expectedPattern: /chmod\s*755/ },
          { qId: 'b5q3', text: 'Change owner to "root"', defaultCode: '', expectedPattern: /chown\s*root/ },
          { qId: 'b5q4', text: 'Owner and group root:root', defaultCode: '', expectedPattern: /chown\s*root:root/ },
          { qId: 'b5q5', text: 'Read only for all (444)', defaultCode: '', expectedPattern: /chmod\s*444/ }
        ]
      },
      {
        id: 'b6', title: 'Logic', theory: 'Use if [ condition ]; then for logic.',
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
        id: 'b7', title: 'Loops', theory: 'Use for/while loops to automate.',
        questions: [
          { qId: 'b7q1', text: 'For i in 1 2 3', defaultCode: '', expectedPattern: /for\s*i\s*in\s*1\s*2\s*3/ },
          { qId: 'b7q2', text: 'Do block', defaultCode: '', expectedPattern: /do/ },
          { qId: 'b7q3', text: 'Done block', defaultCode: '', expectedPattern: /done/ },
          { qId: 'b7q4', text: 'While [ condition ]', defaultCode: '', expectedPattern: /while\s*\[.*\]/ },
          { qId: 'b7q5', text: 'For file in *.txt', defaultCode: '', expectedPattern: /for\s*f\s*in\s*\*\.txt/ }
        ]
      },
      {
        id: 'b8', title: 'Args', theory: 'Scripts take args: $1, $2, etc.',
        questions: [
          { qId: 'b8q1', text: 'Access first argument', defaultCode: '', expectedPattern: /\$1/ },
          { qId: 'b8q2', text: 'Count of arguments ($#)', defaultCode: '', expectedPattern: /\$#/ },
          { qId: 'b8q3', text: 'All arguments ($@)', defaultCode: '', expectedPattern: /\$@/ },
          { qId: 'b8q4', text: 'Script name ($0)', defaultCode: '', expectedPattern: /\$0/ },
          { qId: 'b8q5', text: 'Exit status of last cmd ($?)', defaultCode: '', expectedPattern: /\$\?/ }
        ]
      },
      {
        id: 'b9', title: 'Functions', theory: 'Define functions: name() { ... }.',
        questions: [
          { qId: 'b9q1', text: 'Define function "hi"', defaultCode: '', expectedPattern: /hi\(\)\s*\{/ },
          { qId: 'b9q2', text: 'Local variable "l"', defaultCode: '', expectedPattern: /local\s*l/ },
          { qId: 'b9q3', text: 'Call "hi"', defaultCode: '', expectedPattern: /hi/ },
          { qId: 'b9q4', text: 'Return status 0', defaultCode: '', expectedPattern: /return\s*0/ },
          { qId: 'b9q5', text: 'Pass arg to function hi 1', defaultCode: '', expectedPattern: /hi\s*1/ }
        ]
      },
      {
        id: 'b10', title: 'Scripts', theory: 'Start scripts with a shebang #!/bin/bash.',
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
      { id: 'g1', title: 'Hello Go', theory: 'Go uses packages and the main function.', questions: [
        { qId: 'g1q1', text: 'Define package main', defaultCode: '', expectedPattern: /package\s*main/ },
        { qId: 'g1q2', text: 'Import "fmt"', defaultCode: '', expectedPattern: /import\s*["']fmt["']/ },
        { qId: 'g1q3', text: 'Define func main()', defaultCode: '', expectedPattern: /func\s*main\(\)/ },
        { qId: 'g1q4', text: 'Print "Hello"', defaultCode: '', expectedPattern: /fmt\.Println\(["']Hello["']\)/ },
        { qId: 'g1q5', text: 'Print 100', defaultCode: '', expectedPattern: /fmt\.Println\(100\)/ }
      ]},
      { id: 'g2', title: 'Variables', theory: 'Use var or the shorthand := operator.', questions: [
        { qId: 'g2q1', text: 'Declare var x int', defaultCode: '', expectedPattern: /var\s*x\s*int/ },
        { qId: 'g2q2', text: 'Shorthand y := 5', defaultCode: '', expectedPattern: /y\s*:=\s*5/ },
        { qId: 'g2q3', text: 'Set msg string', defaultCode: '', expectedPattern: /var\s*msg\s*string/ },
        { qId: 'g2q4', text: 'Assign shorthand msg', defaultCode: '', expectedPattern: /msg\s*:=\s*["'].*["']/ },
        { qId: 'g2q5', text: 'Declare multiple a, b := 1, 2', defaultCode: '', expectedPattern: /a,\s*b\s*:=\s*1,\s*2/ }
      ]},
      { id: 'g3', title: 'Types', theory: 'Go has bool, string, and numeric types.', questions: [
        { qId: 'g3q1', text: 'Declare float64', defaultCode: '', expectedPattern: /float64/ },
        { qId: 'g3q2', text: 'Declare bool', defaultCode: '', expectedPattern: /bool/ },
        { qId: 'g3q3', text: 'Create string literal', defaultCode: '', expectedPattern: /["'].*["']/ },
        { qId: 'g3q4', text: 'Type cast int to float', defaultCode: '', expectedPattern: /float64\(.*\)/ },
        { qId: 'g3q5', text: 'Check type (not easy in Go but regex for type)', defaultCode: '', expectedPattern: /int|string|bool/ }
      ]},
      { id: 'g4', title: 'Conditionals', theory: 'Use if/else for control flow.', questions: [
        { qId: 'g4q1', text: 'If x > 5', defaultCode: '', expectedPattern: /if\s*x\s*>\s*5\s*\{/ },
        { qId: 'g4q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'g4q3', text: 'Else if x < 0', defaultCode: '', expectedPattern: /else\s*if\s*x\s*<\s*0/ },
        { qId: 'g4q4', text: 'If with init statement', defaultCode: '', expectedPattern: /if\s*v\s*:=\s*.*;\s*v\s*<\s*x/ },
        { qId: 'g4q5', text: 'Simple if err != nil', defaultCode: '', expectedPattern: /if\s*err\s*!=\s*nil/ }
      ]}
    ],
    intermediate: [
      { id: 'g5', title: 'Loops', theory: 'Go only has one loop keyword: for.', questions: [
        { qId: 'g5q1', text: 'Basic for loop 0-9', defaultCode: '', expectedPattern: /for\s*i\s*:=\s*0;\s*i\s*<\s*10;\s*i\+\+\s*\{/ },
        { qId: 'g5q2', text: 'While-style for x < 5', defaultCode: '', expectedPattern: /for\s*x\s*<\s*5\s*\{/ },
        { qId: 'g5q3', text: 'Infinite for', defaultCode: '', expectedPattern: /for\s*\{/ },
        { qId: 'g5q4', text: 'Range over slice', defaultCode: '', expectedPattern: /for\s*\w+,\s*\w+\s*:=\s*range/ },
        { qId: 'g5q5', text: 'Break loop', defaultCode: '', expectedPattern: /break/ }
      ]},
      { id: 'g6', title: 'Slices', theory: 'Slices are dynamic arrays.', questions: [
        { qId: 'g6q1', text: 'Create slice of int', defaultCode: '', expectedPattern: /\[\]int/ },
        { qId: 'g6q2', text: 'Append 5 to slice s', defaultCode: '', expectedPattern: /append\(s,\s*5\)/ },
        { qId: 'g6q3', text: 'Slice from index 1 to 3', defaultCode: '', expectedPattern: /s\[1:3\]/ },
        { qId: 'g6q4', text: 'Make slice with len 5', defaultCode: '', expectedPattern: /make\(\[\]int,\s*5\)/ },
        { qId: 'g6q5', text: 'Get length len(s)', defaultCode: '', expectedPattern: /len\(s\)/ }
      ]},
      { id: 'g7', title: 'Structs', theory: 'Structs are collections of fields.', questions: [
        { qId: 'g7q1', text: 'Define struct "P"', defaultCode: '', expectedPattern: /type\s*P\s*struct\s*\{/ },
        { qId: 'g7q2', text: 'Field "X" as int', defaultCode: '', expectedPattern: /X\s*int/ },
        { qId: 'g7q3', text: 'Create P{1, 2}', defaultCode: '', expectedPattern: /P\{\s*1,\s*2\s*\}/ },
        { qId: 'g7q4', text: 'Pointer to struct &P{}', defaultCode: '', expectedPattern: /&P\{.*\}/ },
        { qId: 'g7q5', text: 'Access field p.X', defaultCode: '', expectedPattern: /p\.X/ }
      ]}
    ],
    expert: [
      { id: 'g8', title: 'Methods', theory: 'Go supports methods on types.', questions: [
        { qId: 'g8q1', text: 'Method receiver (p P)', defaultCode: '', expectedPattern: /func\s*\(p\s*P\)\s*Name\(\)/ },
        { qId: 'g8q2', text: 'Pointer receiver (*P)', defaultCode: '', expectedPattern: /func\s*\(p\s*\*P\)/ },
        { qId: 'g8q3', text: 'Interface "I"', defaultCode: '', expectedPattern: /type\s*I\s*interface\s*\{/ },
        { qId: 'g8q4', text: 'Method signature in interface', defaultCode: '', expectedPattern: /Run\(\)\s*string/ },
        { qId: 'g8q5', text: 'Empty interface{}', defaultCode: '', expectedPattern: /interface\{\}/ }
      ]},
      { id: 'g9', title: 'Goroutines', theory: 'Concurrency with go keyword.', questions: [
        { qId: 'g9q1', text: 'Start goroutine go f()', defaultCode: '', expectedPattern: /go\s*\w+\(.*\)/ },
        { qId: 'g9q2', text: 'Create channel make(chan int)', defaultCode: '', expectedPattern: /make\(chan\s*int\)/ },
        { qId: 'g9q3', text: 'Send to channel ch <- 1', defaultCode: '', expectedPattern: /ch\s*<-\s*1/ },
        { qId: 'g9q4', text: 'Receive from channel <-ch', defaultCode: '', expectedPattern: /<-\s*ch/ },
        { qId: 'g9q5', text: 'Close channel', defaultCode: '', expectedPattern: /close\(ch\)/ }
      ]},
      { id: 'g10', title: 'Select', theory: 'Wait on multiple channel operations.', questions: [
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
      { id: 't1', title: 'Types', theory: 'TS adds static types to JS.', questions: [
        { qId: 't1q1', text: 'Let x: number = 5', defaultCode: '', expectedPattern: /let\s*x:\s*number/ },
        { qId: 't1q2', text: 'Const s: string = "Hi"', defaultCode: '', expectedPattern: /const\s*s:\s*string/ },
        { qId: 't1q3', text: 'Array of strings string[]', defaultCode: '', expectedPattern: /string\[\]/ },
        { qId: 't1q4', text: 'Boolean type bool', defaultCode: '', expectedPattern: /:\s*boolean/ },
        { qId: 't1q5', text: 'Any type', defaultCode: '', expectedPattern: /:\s*any/ }
      ]},
      { id: 't2', title: 'Interfaces', theory: 'Interfaces define object shapes.', questions: [
        { qId: 't2q1', text: 'Define interface User', defaultCode: '', expectedPattern: /interface\s*User/ },
        { qId: 't2q2', text: 'Optional property id?', defaultCode: '', expectedPattern: /id\?\s*:/ },
        { qId: 't2q3', text: 'Readonly property', defaultCode: '', expectedPattern: /readonly\s*\w+/ },
        { qId: 't2q4', text: 'Method in interface', defaultCode: '', expectedPattern: /\w+\(.*\)\s*:\s*\w+/ },
        { qId: 't2q5', text: 'Extends interface', defaultCode: '', expectedPattern: /extends\s+\w+/ }
      ]},
      { id: 't3', title: 'Functions', theory: 'Type params and return types.', questions: [
        { qId: 't3q1', text: 'Return type string', defaultCode: '', expectedPattern: /fn\(.*\)\s*:\s*string/ },
        { qId: 't3q2', text: 'Void return', defaultCode: '', expectedPattern: /:\s*void/ },
        { qId: 't3q3', text: 'Arrow fn with types', defaultCode: '', expectedPattern: /const\s*\w+\s*=\s*\(.*\)\s*:\s*\w+\s*=>/ },
        { qId: 't3q4', text: 'Optional parameter p?', defaultCode: '', expectedPattern: /p\?\s*:/ },
        { qId: 't3q5', text: 'Default parameter d=1', defaultCode: '', expectedPattern: /d\s*:\s*number\s*=\s*1/ }
      ]},
      { id: 't4', title: 'Enums', theory: 'Enums allow for a set of named constants.', questions: [
        { qId: 't4q1', text: 'Define enum Color', defaultCode: '', expectedPattern: /enum\s*Color/ },
        { qId: 't4q2', text: 'String enum member', defaultCode: '', expectedPattern: /Red\s*=\s*["']RED["']/ },
        { qId: 't4q3', text: 'Numeric enum member', defaultCode: '', expectedPattern: /Up\s*=\s*1/ },
        { qId: 't4q4', text: 'Access Color.Red', defaultCode: '', expectedPattern: /Color\.Red/ },
        { qId: 't4q5', text: 'Const enum', defaultCode: '', expectedPattern: /const\s*enum/ }
      ]}
    ],
    intermediate: [
      { id: 't5', title: 'Unions', theory: 'Unions allow a value to be one of several types.', questions: [
        { qId: 't5q1', text: 'Union type string | number', defaultCode: '', expectedPattern: /string\s*\|\s*number/ },
        { qId: 't5q2', text: 'Literal union "A" | "B"', defaultCode: '', expectedPattern: /["']A["']\s*\|\s*["']B["']/ },
        { qId: 't5q3', text: 'Intersection type A & B', defaultCode: '', expectedPattern: /A\s*&\s*B/ },
        { qId: 't5q4', text: 'Type alias "MyType"', defaultCode: '', expectedPattern: /type\s*MyType\s*=/ },
        { qId: 't5q5', text: 'Nullable type T | null', defaultCode: '', expectedPattern: /\|\s*null/ }
      ]},
      { id: 't6', title: 'Generics', theory: 'Generics create reusable components.', questions: [
        { qId: 't6q1', text: 'Generic function <T>', defaultCode: '', expectedPattern: /<T>/ },
        { qId: 't6q2', text: 'Generic interface Box<T>', defaultCode: '', expectedPattern: /Box<T>/ },
        { qId: 't6q3', text: 'Generic constraint <T extends U>', defaultCode: '', expectedPattern: /T\s*extends\s*U/ },
        { qId: 't6q4', text: 'Default generic <T = string>', defaultCode: '', expectedPattern: /T\s*=\s*string/ },
        { qId: 't6q5', text: 'Generic class Store<T>', defaultCode: '', expectedPattern: /class\s*Store<T>/ }
      ]},
      { id: 't7', title: 'Casting', theory: 'Type assertions and guards.', questions: [
        { qId: 't7q1', text: 'Type assertion "as string"', defaultCode: '', expectedPattern: /as\s*string/ },
        { qId: 't7q2', text: 'Angle bracket cast <string>x', defaultCode: '', expectedPattern: /<string>x/ },
        { qId: 't7q3', text: 'Type guard "is string"', defaultCode: '', expectedPattern: /v\s*is\s*string/ },
        { qId: 't7q4', text: 'Non-null assertion x!', defaultCode: '', expectedPattern: /\w+!/ },
        { qId: 't7q5', text: 'typeof guard', defaultCode: '', expectedPattern: /typeof\s*\w+\s*===\s*["']string["']/ }
      ]}
    ],
    expert: [
      { id: 't8', title: 'Utility', theory: 'Partial, Readonly, Pick, Record.', questions: [
        { qId: 't8q1', text: 'Partial<User>', defaultCode: '', expectedPattern: /Partial<User>/ },
        { qId: 't8q2', text: 'Readonly<T>', defaultCode: '', expectedPattern: /Readonly<T>/ },
        { qId: 't8q3', text: 'Pick<T, "id">', defaultCode: '', expectedPattern: /Pick<.*,\s*["']id["']>/ },
        { qId: 't8q4', text: 'Record<string, number>', defaultCode: '', expectedPattern: /Record<string,\s*number>/ },
        { qId: 't8q5', text: 'Omit<T, "k">', defaultCode: '', expectedPattern: /Omit<.*,\s*["']k["']>/ }
      ]},
      { id: 't9', title: 'Advanced', theory: 'Conditional types and Infer.', questions: [
        { qId: 't9q1', text: 'Conditional T extends string ? A : B', defaultCode: '', expectedPattern: /T\s*extends\s*string\s*\?\s*A\s*:\s*B/ },
        { qId: 't9q2', text: 'Infer keyword', defaultCode: '', expectedPattern: /infer\s*U/ },
        { qId: 't9q3', text: 'Mapped types [K in keyof T]', defaultCode: '', expectedPattern: /\[\w+\s*in\s*keyof\s*T\]/ },
        { qId: 't9q4', text: 'Keyof operator', defaultCode: '', expectedPattern: /keyof\s*\w+/ },
        { qId: 't9q5', text: 'Template literal types', defaultCode: '', expectedPattern: /`.*\$\{.*\}.*`/ }
      ]},
      { id: 't10', title: 'Decorators', theory: 'Metadata and annotations.', questions: [
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
      { id: 'c1', title: 'Hello C++', theory: 'C++ uses iostream for input and output.', questions: [
        { qId: 'c1q1', text: 'Include iostream', defaultCode: '', expectedPattern: /#include\s*<iostream>/ },
        { qId: 'c1q2', text: 'Define int main()', defaultCode: '', expectedPattern: /int\s*main\(\)/ },
        { qId: 'c1q3', text: 'Print Hello with cout', defaultCode: '', expectedPattern: /std::cout\s*<<\s*["']Hello["']/ },
        { qId: 'c1q4', text: 'Use std::endl', defaultCode: '', expectedPattern: /<<\s*std::endl/ },
        { qId: 'c1q5', text: 'Return 0', defaultCode: '', expectedPattern: /return\s*0;/ }
      ]},
      { id: 'c2', title: 'Variables', theory: 'Declare variables with a specific type.', questions: [
        { qId: 'c2q1', text: 'Declare int x = 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'c2q2', text: 'Declare double d', defaultCode: '', expectedPattern: /double\s*d/ },
        { qId: 'c2q3', text: 'Declare bool b', defaultCode: '', expectedPattern: /bool\s*b/ },
        { qId: 'c2q4', text: 'Declare char c', defaultCode: '', expectedPattern: /char\s*c/ },
        { qId: 'c2q5', text: 'Constant const int x', defaultCode: '', expectedPattern: /const\s*int\s*x/ }
      ]},
      { id: 'c3', title: 'Logic', theory: 'Use if/else for conditional logic.', questions: [
        { qId: 'c3q1', text: 'If x is 10', defaultCode: '', expectedPattern: /if\s*\(x\s*==\s*10\)/ },
        { qId: 'c3q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'c3q3', text: 'Check x > 0', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*0\)/ },
        { qId: 'c3q4', text: 'Logical AND (&&)', defaultCode: '', expectedPattern: /&&/ },
        { qId: 'c3q5', text: 'Logical OR (||)', defaultCode: '', expectedPattern: /\|\|/ }
      ]},
      { id: 'c4', title: 'Loops', theory: 'Iterate using for, while, and do-while.', questions: [
        { qId: 'c4q1', text: 'For loop 0-9', defaultCode: '', expectedPattern: /for\s*\(int\s*i\s*=\s*0;\s*i\s*<\s*10;\s*i\+\+\)/ },
        { qId: 'c4q2', text: 'While loop x < 5', defaultCode: '', expectedPattern: /while\s*\(x\s*<\s*5\)/ },
        { qId: 'c4q3', text: 'Do while loop', defaultCode: '', expectedPattern: /do\s*\{.*\}\s*while/ },
        { qId: 'c4q4', text: 'Break loop', defaultCode: '', expectedPattern: /break;/ },
        { qId: 'c4q5', text: 'Continue loop', defaultCode: '', expectedPattern: /continue;/ }
      ]}
    ],
    intermediate: [
      { id: 'c5', title: 'Arrays', theory: 'Fixed-size collections of same-type items.', questions: [
        { qId: 'c5q1', text: 'Declare int arr[5]', defaultCode: '', expectedPattern: /int\s*arr\[5\]/ },
        { qId: 'c5q2', text: 'Set arr[0] to 1', defaultCode: '', expectedPattern: /arr\[0\]\s*=\s*1/ },
        { qId: 'c5q3', text: 'Init {1, 2, 3}', defaultCode: '', expectedPattern: /\{1,\s*2,\s*3\}/ },
        { qId: 'c5q4', text: 'Get array size sizeof', defaultCode: '', expectedPattern: /sizeof\(arr\)/ },
        { qId: 'c5q5', text: '2D array arr[2][2]', defaultCode: '', expectedPattern: /arr\[2\]\[2\]/ }
      ]},
      { id: 'c6', title: 'Pointers', theory: 'Store memory addresses.', questions: [
        { qId: 'c6q1', text: 'Declare int pointer *p', defaultCode: '', expectedPattern: /int\s*\*p/ },
        { qId: 'c6q2', text: 'Set p to address &x', defaultCode: '', expectedPattern: /p\s*=\s*&x/ },
        { qId: 'c6q3', text: 'Dereference *p', defaultCode: '', expectedPattern: /\*p/ },
        { qId: 'c6q4', text: 'Null pointer nullptr', defaultCode: '', expectedPattern: /nullptr/ },
        { qId: 'c6q5', text: 'New keyword', defaultCode: '', expectedPattern: /new\s*int/ }
      ]},
      { id: 'c7', title: 'References', theory: 'Alias to an existing variable.', questions: [
        { qId: 'c7q1', text: 'Declare reference &r', defaultCode: '', expectedPattern: /int\s*&r\s*=\s*x/ },
        { qId: 'c7q2', text: 'Const reference const int&', defaultCode: '', expectedPattern: /const\s*int\s*&/ },
        { qId: 'c7q3', text: 'Pass by reference func(int& x)', defaultCode: '', expectedPattern: /void\s*\w+\(int\s*&/ },
        { qId: 'c7q4', text: 'Return by reference int&', defaultCode: '', expectedPattern: /int\s*&\s*\w+\(\)/ },
        { qId: 'c7q5', text: 'Update through reference', defaultCode: '', expectedPattern: /r\s*=\s*10/ }
      ]}
    ],
    expert: [
      { id: 'c8', title: 'Classes', theory: 'OOP with classes and objects.', questions: [
        { qId: 'c8q1', text: 'Define class Box', defaultCode: '', expectedPattern: /class\s*Box\s*\{/ },
        { qId: 'c8q2', text: 'Public access specifier', defaultCode: '', expectedPattern: /public:/ },
        { qId: 'c8q3', text: 'Constructor Box()', defaultCode: '', expectedPattern: /Box\(\)/ },
        { qId: 'c8q4', text: 'Create object on stack', defaultCode: '', expectedPattern: /Box\s*b;/ },
        { qId: 'c8q5', text: 'Access member b.run()', defaultCode: '', expectedPattern: /b\.run\(\)/ }
      ]},
      { id: 'c9', title: 'STL', theory: 'Standard Template Library: vector, string, map.', questions: [
        { qId: 'c9q1', text: 'Vector std::vector<int>', defaultCode: '', expectedPattern: /std::vector<int>/ },
        { qId: 'c9q2', text: 'Push back value', defaultCode: '', expectedPattern: /push_back\(.*\)/ },
        { qId: 'c9q3', text: 'Map std::map<string, int>', defaultCode: '', expectedPattern: /std::map<.*,\s*.*>/ },
        { qId: 'c9q4', text: 'Iterate STL container', defaultCode: '', expectedPattern: /::iterator/ },
        { qId: 'c9q5', text: 'Sort using std::sort', defaultCode: '', expectedPattern: /std::sort\(/ }
      ]},
      { id: 'c10', title: 'Templates', theory: 'Generic programming with templates.', questions: [
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
      { id: 'v1', title: 'Hello Java', theory: 'Java is class-based and object-oriented.', questions: [
        { qId: 'v1q1', text: 'Define public class Main', defaultCode: '', expectedPattern: /public\s*class\s*Main/ },
        { qId: 'v1q2', text: 'Define main method', defaultCode: '', expectedPattern: /public\s*static\s*void\s*main\s*\(String\[\]\s*args\)/ },
        { qId: 'v1q3', text: 'Print Hello with println', defaultCode: '', expectedPattern: /System\.out\.println\(["']Hello["']\)/ },
        { qId: 'v1q4', text: 'Print boolean true', defaultCode: '', expectedPattern: /System\.out\.println\(true\)/ },
        { qId: 'v1q5', text: 'Use final keyword for const', defaultCode: '', expectedPattern: /final\s*int/ }
      ]},
      { id: 'v2', title: 'Variables', theory: 'Strongly typed: int, double, boolean, String.', questions: [
        { qId: 'v2q1', text: 'Set int x to 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'v2q2', text: 'Set double d to 1.5', defaultCode: '', expectedPattern: /double\s*d\s*=\s*1\.5;/ },
        { qId: 'v2q3', text: 'Set String s to "A"', defaultCode: '', expectedPattern: /String\s*s\s*=\s*["']A["']/ },
        { qId: 'v2q4', text: 'Set boolean b to false', defaultCode: '', expectedPattern: /boolean\s*b\s*=\s*false;/ },
        { qId: 'v2q5', text: 'Type cast (int) 4.5', defaultCode: '', expectedPattern: /\(int\)\s*4\.5/ }
      ]},
      { id: 'v3', title: 'Math', theory: 'Standard arithmetic and Math class.', questions: [
        { qId: 'v3q1', text: 'Add 10 + 20', defaultCode: '', expectedPattern: /10\s*\+\s*20/ },
        { qId: 'v3q2', text: 'Multiply 5 * 5', defaultCode: '', expectedPattern: /5\s*\*\s*5/ },
        { qId: 'v3q3', text: 'Math.sqrt(25)', defaultCode: '', expectedPattern: /Math\.sqrt\(25\)/ },
        { qId: 'v3q4', text: 'Math.random()', defaultCode: '', expectedPattern: /Math\.random\(\)/ },
        { qId: 'v3q5', text: 'Modulus 10 % 3', defaultCode: '', expectedPattern: /10\s*%\s*3/ }
      ]},
      { id: 'v4', title: 'Logic', theory: 'If, else, and switch statements.', questions: [
        { qId: 'v4q1', text: 'If x > 0', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*0\)/ },
        { qId: 'v4q2', text: 'Else if x < 0', defaultCode: '', expectedPattern: /else\s*if\s*\(x\s*<\s*0\)/ },
        { qId: 'v4q3', text: 'Switch statement', defaultCode: '', expectedPattern: /switch\s*\(.*\)\s*\{/ },
        { qId: 'v4q4', text: 'Case block', defaultCode: '', expectedPattern: /case\s*.*:/ },
        { qId: 'v4q5', text: 'Default block', defaultCode: '', expectedPattern: /default:/ }
      ]}
    ],
    intermediate: [
      { id: 'v5', title: 'Arrays', theory: 'Indexed collections of fixed size.', questions: [
        { qId: 'v5q1', text: 'Declare int[] arr', defaultCode: '', expectedPattern: /int\[\]\s*arr/ },
        { qId: 'v5q2', text: 'New array with size 10', defaultCode: '', expectedPattern: /new\s*int\[10\]/ },
        { qId: 'v5q3', text: 'Init array {1, 2}', defaultCode: '', expectedPattern: /\{1,\s*2\}/ },
        { qId: 'v5q4', text: 'Get length arr.length', defaultCode: '', expectedPattern: /arr\.length/ },
        { qId: 'v5q5', text: 'Access index arr[0]', defaultCode: '', expectedPattern: /arr\[0\]/ }
      ]},
      { id: 'v6', title: 'Lists', theory: 'ArrayList for dynamic size.', questions: [
        { qId: 'v6q1', text: 'Create ArrayList<String>', defaultCode: '', expectedPattern: /ArrayList<String>/ },
        { qId: 'v6q2', text: 'Add element .add()', defaultCode: '', expectedPattern: /\.add\(.*\)/ },
        { qId: 'v6q3', text: 'Get element .get(0)', defaultCode: '', expectedPattern: /\.get\(0\)/ },
        { qId: 'v6q4', text: 'Remove element .remove(0)', defaultCode: '', expectedPattern: /\.remove\(0\)/ },
        { qId: 'v6q5', text: 'Get size .size()', defaultCode: '', expectedPattern: /\.size\(\)/ }
      ]},
      { id: 'v7', title: 'Inherit', theory: 'Extend classes with inheritance.', questions: [
        { qId: 'v7q1', text: 'Class Dog extends Animal', defaultCode: '', expectedPattern: /class\s*Dog\s*extends\s*Animal/ },
        { qId: 'v7q2', text: 'Override method @Override', defaultCode: '', expectedPattern: /@Override/ },
        { qId: 'v7q3', text: 'Call super()', defaultCode: '', expectedPattern: /super\(\)/ },
        { qId: 'v7q4', text: 'Abstract class', defaultCode: '', expectedPattern: /abstract\s*class/ },
        { qId: 'v7q5', text: 'Final class', defaultCode: '', expectedPattern: /final\s*class/ }
      ]}
    ],
    expert: [
      { id: 'v8', title: 'Interfaces', theory: 'Define contracts with interfaces.', questions: [
        { qId: 'v8q1', text: 'Interface Run', defaultCode: '', expectedPattern: /interface\s*Run/ },
        { qId: 'v8q2', text: 'Dog implements Run', defaultCode: '', expectedPattern: /implements\s*Run/ },
        { qId: 'v8q3', text: 'Multiple interfaces', defaultCode: '', expectedPattern: /implements\s*A,\s*B/ },
        { qId: 'v8q4', text: 'Default method', defaultCode: '', expectedPattern: /default\s*void/ },
        { qId: 'v8q5', text: 'Static method in interface', defaultCode: '', expectedPattern: /static\s*void/ }
      ]},
      { id: 'v9', title: 'Exceptions', theory: 'Try-catch for error handling.', questions: [
        { qId: 'v9q1', text: 'Try block', defaultCode: '', expectedPattern: /try\s*\{/ },
        { qId: 'v9q2', text: 'Catch block', defaultCode: '', expectedPattern: /catch\s*\(.*\)\s*\{/ },
        { qId: 'v9q3', text: 'Finally block', defaultCode: '', expectedPattern: /finally\s*\{/ },
        { qId: 'v9q4', text: 'Throw exception', defaultCode: '', expectedPattern: /throw\s*new/ },
        { qId: 'v9q5', text: 'Throws in signature', defaultCode: '', expectedPattern: /throws\s*\w+/ }
      ]},
      { id: 'v10', title: 'Threads', theory: 'Concurrent execution with Threads.', questions: [
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
      { id: 'h1', title: 'Hello C#', theory: 'C# is a modern, object-oriented language from Microsoft.', questions: [
        { qId: 'h1q1', text: 'Using System', defaultCode: '', expectedPattern: /using\s*System;/ },
        { qId: 'h1q2', text: 'Namespace App', defaultCode: '', expectedPattern: /namespace\s*App/ },
        { qId: 'h1q3', text: 'Console.WriteLine("Hi")', defaultCode: '', expectedPattern: /Console\.WriteLine\(["']Hi["']\)/ },
        { qId: 'h1q4', text: 'Read line Console.ReadLine', defaultCode: '', expectedPattern: /Console\.ReadLine\(\)/ },
        { qId: 'h1q5', text: 'Main method static void Main', defaultCode: '', expectedPattern: /static\s*void\s*Main/ }
      ]},
      { id: 'h2', title: 'Variables', theory: 'Store data using types or "var" keyword.', questions: [
        { qId: 'h2q1', text: 'Int x = 5', defaultCode: '', expectedPattern: /int\s*x\s*=\s*5;/ },
        { qId: 'h2q2', text: 'String s = "A"', defaultCode: '', expectedPattern: /string\s*s\s*=\s*["']A["']/ },
        { qId: 'h2q3', text: 'Implicitly typed var y = 10', defaultCode: '', expectedPattern: /var\s*y\s*=\s*10;/ },
        { qId: 'h2q4', text: 'Boolean b = true', defaultCode: '', expectedPattern: /bool\s*b\s*=\s*true;/ },
        { qId: 'h2q5', text: 'Constant const int x', defaultCode: '', expectedPattern: /const\s*int\s*x/ }
      ]},
      { id: 'h3', title: 'Logic', theory: 'Use comparison and logical operators.', questions: [
        { qId: 'h3q1', text: 'If x is 0', defaultCode: '', expectedPattern: /if\s*\(x\s*==\s*0\)/ },
        { qId: 'h3q2', text: 'Logical AND (&&)', defaultCode: '', expectedPattern: /&&/ },
        { qId: 'h3q3', text: 'Logical OR (||)', defaultCode: '', expectedPattern: /\|\|/ },
        { qId: 'h3q4', text: 'Ternary operator ? :', defaultCode: '', expectedPattern: /\?\s*.*:/ },
        { qId: 'h3q5', text: 'Check null (??)', defaultCode: '', expectedPattern: /\?\?/ }
      ]},
      { id: 'h4', title: 'Conditionals', theory: 'If, else, and switch for flow control.', questions: [
        { qId: 'h4q1', text: 'If x > 100', defaultCode: '', expectedPattern: /if\s*\(x\s*>\s*100\)/ },
        { qId: 'h4q2', text: 'Else block', defaultCode: '', expectedPattern: /else\s*\{/ },
        { qId: 'h4q3', text: 'Switch block', defaultCode: '', expectedPattern: /switch\s*\(.*\)\s*\{/ },
        { qId: 'h4q4', text: 'Case block', defaultCode: '', expectedPattern: /case\s*.*:/ },
        { qId: 'h4q5', text: 'Break in switch', defaultCode: '', expectedPattern: /break;/ }
      ]}
    ],
    intermediate: [
      { id: 'h5', title: 'Arrays', theory: 'Fixed-size collections of items.', questions: [
        { qId: 'h5q1', text: 'Int array int[] a', defaultCode: '', expectedPattern: /int\[\]\s*a/ },
        { qId: 'h5q2', text: 'New array new int[3]', defaultCode: '', expectedPattern: /new\s*int\[3\]/ },
        { qId: 'h5q3', text: 'Init {1, 2}', defaultCode: '', expectedPattern: /\{1,\s*2\}/ },
        { qId: 'h5q4', text: 'Length a.Length', defaultCode: '', expectedPattern: /a\.Length/ },
        { qId: 'h5q5', text: 'Array.Sort', defaultCode: '', expectedPattern: /Array\.Sort\(/ }
      ]},
      { id: 'h6', title: 'Lists', theory: 'Generic dynamic lists List<T>.', questions: [
        { qId: 'h6q1', text: 'List<int> l', defaultCode: '', expectedPattern: /List<int>/ },
        { qId: 'h6q2', text: 'Add element .Add()', defaultCode: '', expectedPattern: /\.Add\(.*\)/ },
        { qId: 'h6q3', text: 'Remove element .Remove()', defaultCode: '', expectedPattern: /\.Remove\(.*\)/ },
        { qId: 'h6q4', text: 'Count property .Count', defaultCode: '', expectedPattern: /\.Count/ },
        { qId: 'h6q5', text: 'Clear list .Clear()', defaultCode: '', expectedPattern: /\.Clear\(\)/ }
      ]},
      { id: 'h7', title: 'Classes', theory: 'Classes with properties and methods.', questions: [
        { qId: 'h7q1', text: 'Class Person', defaultCode: '', expectedPattern: /class\s*Person/ },
        { qId: 'h7q2', text: 'Auto property { get; set; }', defaultCode: '', expectedPattern: /\{\s*get;\s*set;\s*\}/ },
        { qId: 'h7q3', text: 'Constructor Person()', defaultCode: '', expectedPattern: /Person\(\)/ },
        { qId: 'h7q4', text: 'Public method', defaultCode: '', expectedPattern: /public\s*void/ },
        { qId: 'h7q5', text: 'New instance new Person()', defaultCode: '', expectedPattern: /new\s*Person\(\)/ }
      ]}
    ],
    expert: [
      { id: 'h8', title: 'Linq', theory: 'Query data with Language Integrated Query.', questions: [
        { qId: 'h8q1', text: 'Use .Where()', defaultCode: '', expectedPattern: /\.Where\(.*\)/ },
        { qId: 'h8q2', text: 'Use .Select()', defaultCode: '', expectedPattern: /\.Select\(.*\)/ },
        { qId: 'h8q3', text: 'Use .First()', defaultCode: '', expectedPattern: /\.First\(\)/ },
        { qId: 'h8q4', text: 'Use .OrderBy()', defaultCode: '', expectedPattern: /\.OrderBy\(.*\)/ },
        { qId: 'h8q5', text: 'ToList() conversion', defaultCode: '', expectedPattern: /\.ToList\(\)/ }
      ]},
      { id: 'h9', title: 'Async', theory: 'Asynchronous tasks with async/await.', questions: [
        { qId: 'h9q1', text: 'Async method signature', defaultCode: '', expectedPattern: /async\s*Task/ },
        { qId: 'h9q2', text: 'Await task', defaultCode: '', expectedPattern: /await\s*\w+/ },
        { qId: 'h9q3', text: 'Task.Delay', defaultCode: '', expectedPattern: /Task\.Delay/ },
        { qId: 'h9q4', text: 'Task.Run', defaultCode: '', expectedPattern: /Task\.Run/ },
        { qId: 'h9q5', text: 'Return Task<int>', defaultCode: '', expectedPattern: /Task<int>/ }
      ]},
      { id: 'h10', title: 'Delegates', theory: 'Type-safe function pointers.', questions: [
        { qId: 'h10q1', text: 'Define delegate', defaultCode: '', expectedPattern: /delegate\s*void/ },
        { qId: 'h10q2', text: 'Use Action delegate', defaultCode: '', expectedPattern: /Action/ },
        { qId: 'h10q3', text: 'Use Func delegate', defaultCode: '', expectedPattern: /Func<.*>/ },
        { qId: 'h10q4', text: 'Lambda as delegate', defaultCode: '', expectedPattern: /=>/ },
        { qId: 'h10q5', text: 'Events using event keyword', defaultCode: '', expectedPattern: /event\s*Action/ }
      ]}
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
  { id: 'csharp', label: 'C#', icon: '🎮' }
];
