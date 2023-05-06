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
    const systemPrompt = `I would like you to take on the role of a writer creating content for a tabletop role-playing game (TRPG) story. Your task is to generate engaging, immersive, and detailed text based on the given input.`;
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

/** input, output 형태에 대한 고민이 필요하다.
 * input a. 유저가 텍스트로써 자유롭게 입력하게 둘 것 인지, input b. 유저가 선택지를 통해 입력하게 둘 것인지
 * output a. 출력된 캐릭터 배경을 문자열 형태로 저장해 둘 것 인지, output b. 출력된 캐릭터 배경을 객체에 key-value 형태로 각 속성들을 저장해 둘 것인지.
 * GPT Response가 자연스럽고, 다루기 쉬운 방향이여야 한다.
 */
/** Generate character(including NPC)'s background according input. */
exports.generateCharacterBackground = async (req, res) => {
  try {
    const prompt = "A human fighter with a noble background.";
    const systemPrompt = `I would like you to take on the role of a writer creating content for a tabletop role-playing game (TRPG) story. Your task is to generate engaging, immersive, and detailed text based on the given input. To help you understand better, here's an example:
    Input: "A human fighter with a noble background."
    Output: "A human fighter with a noble background. He is a member of the Knights of the Silver Hand, a group of paladins who serve the Light and protect the innocent. He is a devout follower of the Light, and believes that it is his duty to protect those who cannot protect themselves. He is a skilled swordsman, and is proficient in the use of a variety of weapons. He is also a skilled horseman, and is able to ride a horse with ease. He is a skilled archer, and is able to hit a target from a great distance. He is a skilled tracker, and is able to track a target for miles. He i
    `;
    const characterBackground = await generateText(prompt, systemPrompt);

    if (characterBackground) {
      res.status(200).json({ characterBackground });
    } else {
      res
        .status(500)
        .json({ message: "Error generating character background" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating character background", error });
  }
};

/** Generate character(including NPC)'s lines and actions according character's background and situation. */
exports.generateCharacterInteraction = async (req, res) => {
  try {
    const prompt = "";
    const systemPrompt = `As an TRPG Game Master, please generate dialogues and actions for a character, including NPCs, based on the provided background and situation information. Here is the format to follow:
    Background: ${req.characterBackground}
    Situation: ${req.content}`; //  // should use character's background and given input
    const characterInteraction = await generateText(prompt, systemPrompt);

    if (characterInteraction) {
      res.status(200).json({ characterInteraction });
    } else {
      res
        .status(500)
        .json({ message: "Error generating character interaction" });
    }
  } catch (error) {}
};
