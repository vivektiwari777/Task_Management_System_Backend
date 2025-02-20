import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.error("❌ GOOGLE_API_KEY is missing! Check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateTaskSuggestion = async (userInput) => {
    try {
        console.log(`🔹 Generating task suggestion for: "${userInput}"`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const response = await model.generateContent(`Suggest a few tasks related to "${userInput}".`);
        const result = await response.response.text();

        return result.trim();
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        return "Error generating task suggestion.";
    }
};

export const generateTaskBreakdown = async (taskTitle, retries = 3) => {
    try {
        console.log(`🔹 Generating breakdown for: "${taskTitle}"`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const response = await model.generateContent(`
            Break down the task "${taskTitle}" into key steps. 
            Keep it concise and to the point.
        `);

        return response.response.text().trim();
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);

        // Retry logic for 503 errors
        if (retries > 0 && error.message.includes("503 Service Unavailable")) {
            console.log(`🔄 Retrying... (${4 - retries} attempt(s) left)`);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 sec before retry
            return generateTaskBreakdown(taskTitle, retries - 1);
        }

        return "Error generating task breakdown.";
    }
};
