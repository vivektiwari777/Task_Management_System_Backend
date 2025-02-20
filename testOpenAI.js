import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const testAPI = async () => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: "List 5 steps to build a login system" }],
            max_tokens: 100
        });

        console.log("✅ OpenAI Test Response:", response.choices[0].message.content);
    } catch (error) {
        console.error("❌ OpenAI Test Error:", error.response ? error.response.data : error.message);
    }
};

testAPI();
