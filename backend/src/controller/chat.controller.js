import prisma from "../lib/prisma.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)// important! use v1 to access gemini-1.5-flash);


function stripCodeFences(str) {
  return str
    .replace(/```sql/gi, "")
    .replace(/```/g, "")
    .trim();
}

export const chat = async (req, res) => {
  console.log(process.env.DATABASE_URL);


  const { text } = req.body;
  // const model = genAI.ListModels();
  // console.log(model);


  // ---------- 1️⃣ Prompt for SQL only ----------
  const queryPrompt = `
You are an expert in PostgreSQL and oceanographic data analysis.

Table:
floatchat_allprofiles(
  profile_id INTEGER,
  depth_lev INTEGER,
  pressure REAL,
  temperature REAL,
  salinity REAL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  time_col TIMESTAMP,
  id INTEGER PRIMARY KEY
)

Rules for this step:
- If the user’s request can be answered with data from this table, return only a valid PostgreSQL query (no explanations or code blocks).
- Always include the following columns in the SELECT clause:
  latitude,
  longitude,
  ROUND(salinity::NUMERIC, 1) AS salinity,
  ROUND(temperature::NUMERIC, 1) AS temperature,
  ROUND(pressure::NUMERIC, 1) AS pressure,
  depth_lev
- When filtering by pressure, temperature, or salinity, apply the same ROUND(column::NUMERIC, 1) in the WHERE clause.
- If the question is not about this table, return "NO_QUERY".

User query: ${text}
`;



  //   const queryPrompt =  `
  // You are an expert in PostgreSQL and oceanographic data analysis.

  // Table:
  // floatchat_allprofiles(
  //   profile_id INTEGER,
  //   depth_lev INTEGER,
  //   pressure REAL,
  //   temperature REAL,
  //   salinity REAL,
  //   latitude DOUBLE PRECISION,
  //   longitude DOUBLE PRECISION,
  //   time_col TIMESTAMP,
  //   id INTEGER PRIMARY KEY
  // )

  // Rules for this step:
  // - If the user’s request can be answered with data from this table, return only a valid PostgreSQL query (no explanations or code blocks).
  // - Always include the following columns in the SELECT clause: latitude, longitude, salinity, temperature, pressure, depth_lev.
  //   • For pressure, temperature, or salinity, cast to NUMERIC before rounding, e.g. ROUND(column::NUMERIC, 1).  
  //   • Use BETWEEN or = only after rounding.
  // - If the question is not about this table, return "NO_QUERY".

  // User query: ${text}
  // `;


  //   const queryPrompt = `
  // You are an expert in PostgreSQL and oceanographic data analysis.

  // Table:
  // floatchat_allprofiles(
  //   profile_id INTEGER,
  //   depth_lev INTEGER,
  //   pressure REAL,
  //   temperature REAL,
  //   salinity REAL,
  //   latitude DOUBLE PRECISION,
  //   longitude DOUBLE PRECISION,
  //   time_col TIMESTAMP,
  //   id INTEGER PRIMARY KEY
  // )

  // Rules for this step:
  // - If the user’s request can be answered with data from this table, return only a valid PostgreSQL query (no explanations or code blocks).
  //   • For pressure, temperature, or salinity, cast to NUMERIC before rounding, e.g. ROUND(column::NUMERIC, 1).  
  //   • Use BETWEEN or = only after rounding.
  // - If the question is not about this table, return "NO_QUERY".

  // User query: ${text}
  // `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // --- Call 1: get SQL
    const sqlResp = await model.generateContent(queryPrompt);
    let sql = stripCodeFences(sqlResp.response.text());

    if (sql.toUpperCase().includes("NO_QUERY")) {
      return res.json({ sql: null, chat: "That question isn’t about the data table — try something else!" });
    }

    console.log("=> SQL TO EXECUTE:", JSON.stringify(sql));

    // ---------- 2️⃣ Execute SQL ----------
    let rows = [];
    try {
      rows = await prisma.$queryRawUnsafe(sql);
    } catch (err) {
      return res.status(400).json({ msg: "SQL execution error", sql, error: err.message });
    }

    // ---------- 3️⃣ Prompt for conversational reply ----------
    const resultSample = JSON.stringify(rows.slice(0, 50)); // limit size
    const chatPrompt = `
You are an expert in PostgreSQL and oceanographic data analysis.

The user asked: ${text}

The SQL that was executed:
${sql}

Here are up to 50 rows of the result (JSON):
${resultSample}

Write a clear, friendly explanation of what this query returns or what the data shows.
Keep it concise (2–3 sentences). Output ONLY the explanation text, nothing else.
`;

    const chatResp = await model.generateContent(chatPrompt);
    const chatText = chatResp.response.text().trim();

    // ---------- 4️⃣ Send back both ----------
    res.json({ sql, data: rows, msg: chatText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error occurred", error: error.message });
  }
};
