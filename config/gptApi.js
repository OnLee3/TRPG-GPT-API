const openai = require("../gpt");

async function generateText(prompt, options = {}) {
  const defaultOptions = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  };

  const requestOptions = { ...defaultOptions, ...options };

  try {
    const response = await openai.createChatCompletion(requestOptions, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
    });
    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
}

exports.generateStoryEvent = async (req, res) => {
  try {
    const prompt =
      "A group of adventurers enters a mysterious cave. What happens next?";
    const storyEvent = await generateText(prompt);

    if (storyEvent) {
      res.status(200).json({ storyEvent });
    } else {
      res.status(500).json({ message: "Error generating story event" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error generating story event", error });
  }
};
