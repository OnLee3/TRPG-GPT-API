const openai = require("../gpt");

async function generateText(prompt, systemPrompt, options = {}) {
  const defaultOptions = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: prompt },
    ],
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
    const systemPrompt = `I would like you to take on the role of a writer creating content for a tabletop role-playing game (TRPG) story. Your task is to generate engaging, immersive, and detailed text based on the given input. To help you understand better, here's an example:
    Input: "A group of adventurers stumbles upon a hidden underground city."
    Output: "A group of intrepid adventurers, weary from their long journey, stumbles upon the entrance to a hidden underground city. As they cautiously venture inside, they are met with a sprawling network of ancient tunnels and chambers, filled with mysterious artifacts and remnants of a forgotten civilization. In the depths of the city, the adventurers must solve perplexing puzzles, face dangerous foes, and uncover the secrets of this lost metropolis in order to survive and escape with their discoveries intact."`;
    const storyEvent = await generateText(prompt, systemPrompt);

    if (storyEvent) {
      res.status(200).json({ storyEvent });
    } else {
      res.status(500).json({ message: "Error generating story event" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error generating story event", error });
  }
};
