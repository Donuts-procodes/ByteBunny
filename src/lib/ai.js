/**
 * 🐰 ByteBunny AI Service Layer
 * Centralized logic for interacting with OpenRouter / Llama models.
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "meta-llama/llama-3.3-70b-instruct";

import { useAppStore } from "../stores/enhanced-appStore";

/**
 * Common headers for AI requests. 
 * Prioritizes user-provided key for security.
 */
const getHeaders = () => {
  const userKey = useAppStore.getState().userAIKey;
  const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const finalKey = userKey || envKey;

  if (!finalKey) {
    console.error("[ByteBunny Security] No OpenRouter API Key found! AI features will fail.");
  }

  return {
    "Authorization": `Bearer ${finalKey}`,
    "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'https://bytebunny.web.app',
    "Content-Type": "application/json"
  };
};

/**
 * Helper to strip markdown JSON formatting if the LLM includes it
 */
const parseAIResponse = (content) => {
  try {
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI JSON:", err, content);
    throw new Error("Invalid AI Response format");
  }
};

/**
 * Generates a test based on configuration
 */
export async function generateAITest(config) {
  const prompt = `Generate a ${config.difficulty} ${config.language} test with ${config.numQuestions} ${config.isMCQ ? 'Multiple Choice Questions' : 'coding problem statements'}.
      
  CRITICAL REQUIREMENTS:
  1. All questions MUST be unique and diverse.
  2. No two questions should cover the exact same concept or be similar in structure.
  3. Ensure topic diversity across the ${config.language} language for ${config.difficulty} level.
  4. Do NOT repeat any questions from common standard sets; create fresh scenarios.
  
  IMPORTANT: Return ONLY a valid JSON object. No extra text, no markdown code blocks.
  
  Format for MCQ (isMCQ=true):
  {
    "questions": [
      {
        "q": "Question text here",
        "opts": ["Option A", "Option B", "Option C", "Option D"],
        "ans": 0
      }
    ]
  }

  Format for Problem Statement (isMCQ=false):
  {
    "questions": [
      {
        "q": "Detailed problem description",
        "constraints": ["Constraint 1", "Constraint 2"],
        "snippet": "Initial code snippet for the user to start with",
        "testCases": [
          { "input": "example input", "output": "expected output" }
        ]
      }
    ]
  }`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are a coding instructor that only speaks in JSON." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error(`AI API error: ${response.status}`);

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) throw new Error("Empty AI response");

    const parsed = JSON.parse(data.choices[0].message.content);
    if (!parsed.questions || !Array.isArray(parsed.questions)) throw new Error("Invalid question format received");

    return parsed.questions;
  } catch (error) {
    console.error("[AI Service] Generation failed:", error);
    throw error;
  }
}

/**
 * Generates a new bonus course topic based on current curriculum
 */
export async function generateCourseTopic(lang, level, existingTitles) {
  const prompt = `Generate a new, unique teaching module for the ${lang} ${level} course. 
  
  Existing lesson titles: ${existingTitles.join(", ")}.
  The new lesson must NOT be one of these.
  
  STYLE REQUIREMENTS:
  - This is a TEACHING course, not just a task list.
  - The "theory" section should be educational, clear, and encouraging.
  - Use bunny puns and a high-energy tone.
  
  Return ONLY a valid JSON object in this format:
  {
    "id": "bonus_" + unique string,
    "title": "Topic Name",
    "theory": "A detailed educational explanation (3-5 sentences) teaching the concept.",
    "questions": [
      {
        "qId": "unique_id",
        "text": "A specific practice task or exercise based on the theory above.",
        "defaultCode": "optional starter code",
        "expectedPattern": "a valid JS Regex string for a quick local check (fallback)"
      }
    ]
  }
  
  Generate exactly 3-5 questions per topic.
  The expectedPattern must be a string that can be passed to new RegExp().`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are the ByteBunny AI, a helpful coding instructor. You only output valid JSON." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error(`AI API error: ${response.status}`);

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    
    // Convert string pattern back to RegExp object for the app
    if (parsed.questions) {
      parsed.questions = parsed.questions.map(q => ({
        ...q,
        expectedPattern: new RegExp(q.expectedPattern)
      }));
    }
    
    return parsed;
  } catch (error) {
    console.error("[AI Service] Topic generation failed:", error);
    throw error;
  }
}

/**
 * Validates user code using AI
 */
export async function validateCourseCode(lang, topic, task, code) {
  const prompt = `Act as a code validator for the ${lang} language.
  
  Topic: ${topic}
  Task: ${task}
  User's Code:
  \`\`\`${lang}
  ${code}
  \`\`\`
  
  Evaluate if the code correctly solves the task.
  
  Return ONLY a valid JSON object:
  {
    "success": true/false,
    "feedback": "A short, encouraging bunny-themed response explaining why it passed or failed. Keep it under 100 characters."
  }`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are ByteBunny, an expert code reviewer who only speaks JSON." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error("Validation failed");
    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
  } catch (error) {
    console.error("[AI Validation] Error:", error);
    return { success: false, feedback: "My logic ears are twitching... I couldn't check that! 🐰🔌" };
    }
    }

    /**
    * Validates test coding problems with complexity and test cases
    */
    export async function validateTestCode(lang, question, code, testCases) {
      const prompt = `Act as an expert competitive programming judge and code architect for ${lang}.

      PROBLEM DESCRIPTION:
      ${question}

      USER SUBMISSION:
      \`\`\`${lang}
      ${code}
      \`\`\`

      REQUIRED TEST CASES:
      ${JSON.stringify(testCases)}

      CRITICAL EVALUATION PARAMETERS:
      1. Functional Correctness: Does it solve the problem described?
      2. Edge Case Handling: Does it handle null, empty, large, or unusual inputs?
      3. Logic Efficiency: Is the algorithm optimal?
      4. Code Quality: Syntax errors, naming, and idiomatic ${lang} usage.
      5. Test Case Pass Rate: Check against the provided test cases.

      YOUR TASK:
      - Run the code mentally against the test cases.
      - Grade the submission from 0 to 100 based on your own expert parameters.
      - If there are errors (syntax or logic), explain them clearly.

      Return ONLY a valid JSON object:
      {
        "success": true/false (true only if passes visible cases and logic is sound),
        "score": 0-100 (your expert grade),
        "complexity": "O(...) time, O(...) space",
        "testResults": [
          { "input": "...", "expected": "...", "actual": "...", "passed": true/false, "status": "..." }
        ],
        "feedback": "Comprehensive feedback in bunny persona",
        "errors": "Detailed error log if any, otherwise null"
      }`;
    try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are ByteBunny, an expert test engine who only speaks JSON." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error("Validation failed");
    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
    } catch (error) {
    console.error("[AI Test Validation] Error:", error);
    return { 
      success: false, 
      complexity: "Unknown", 
      testResults: testCases.map(tc => ({ ...tc, passed: false, status: "Burrow connection lost 🔌" })),
      feedback: "My logic ears are twitching... I couldn't check that! 🐰🔌" 
    };
    }
    }

    /**
    * Handles chat assistance in the coding environment
 */
export async function getAICodingAssistance(context, messages) {
  const { lang, topic, question, code } = context;
  
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { 
            role: "system", 
            "content": `You are the ByteBunny AI, a high-energy, fun, and brilliant coding rabbit! 
            Your goal is to help users learn to code with "carrot-tastic" advice.
            
            Personality Traits:
            - Energetic & Encouraging: Use bunny puns (hop to it, ears open, burrow deep, carrot-tastic).
            - Expert but Friendly: You know your code, but you never talk down to users.
            - Guiding, Not Gifting: Don't just paste the solution! Give hints that lead them to the "Aha!" moment.
            
            Current Context:
            - Language: ${lang}
            - Topic: ${topic}
            - Task: ${question}
            - User's Current Code: \`\`\`${lang}\n${code}\n\`\`\`
            
            Keep your responses concise. Use emojis like 🐰, 🥕, 💻, ⚡️, and ✨. 
            If they succeed, celebrate with a "HOPPY CODING!" flair.` 
          },
          ...messages
        ]
      })
    });

    if (!response.ok) throw new Error(`AI API error: ${response.status}`);

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I'm a bit lost in the burrow, could you rephrase that? 🐰🥕";
  } catch (error) {
    console.error("[AI Service] Chat failed:", error);
    throw error;
  }
}

/**
 * Generates a daily coding tip
 */
export async function generateAITip() {
  const prompt = "Generate a short, fun, and highly practical coding tip or fact for a student. Use a bunny persona (ByteBunny). Keep it under 150 characters. Use emojis.";
  
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are ByteBunny, a helpful and energetic coding rabbit instructor." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) throw new Error("AI Tip fetch failed");
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Always keep your ears up and your code clean! 🐰✨";
  } catch (error) {
    return "Carrots are good for eyes, and comments are good for code! 🥕💻";
  }
}
