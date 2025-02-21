export const generateBreakdown = async (req, res) => {
    try {
        console.log("Request Body for Breakdown:", req.body); // Debugging

        const { title } = req.body; // Fixing key name
        if (!title) {
            return res.status(400).json({ message: "Task title is required" });
        }

        // Dummy AI Response (Replace with OpenAI API call)
        const breakdown = `1. Research about ${title}\n2. Plan and design\n3. Implement the solution\n4. Test and debug\n5. Deploy and monitor`;

        res.json({ message: "Breakdown generated", breakdown });
    } catch (error) {
        console.error("Error in generateBreakdown:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const generateSuggestion = async (req, res) => {
    try {
        console.log("Request Body for Suggestion:", req.body); // Debugging

        const { title } = req.body; // Fixing key name
        if (!title) {
            return res.status(400).json({ message: "Task title is required" });
        }

        // Dummy AI Suggestion (Replace with OpenAI API call)
        const suggestion = `To complete "${title}", focus on research, proper planning, and iteration.`;

        res.json({ message: "Suggestion generated", suggestion });
    } catch (error) {
        console.error("Error in generateSuggestion:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
