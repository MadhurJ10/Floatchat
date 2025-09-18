import prisma from "../lib/prisma.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chat = async (req, res) => {
  const { text } = req.body;

  const prompt = `You are a SQL assistant.
Here is my table:

floatchat_profiles(
  profile_id INT,
  depth_lev FLOAT,
  pressure FLOAT,
  temperature FLOAT,
  salinity FLOAT,
  latitude FLOAT,
  longitude FLOAT,
  time_col TIMESTAMP
)

Write a Postgres query that answers:
"${text}"
Only return the SQL.`;

  try {
    // 1) Ask Gemini to generate SQL
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent(prompt);
    // const sql = result.response.text();

    // 2) (Example) fetch rows via Prisma
    const rows = await prisma.FloatchatAllProfiles.findMany({
      where: { salinity: 34.425 },
      select: { pressure: true, temperature: true, latitude: true },
    });

    res.json({
      msg: "success",
    //   generatedSQL: sql,
      sampleRows: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error occurred",
      error: error.message,
    });
  }
};
