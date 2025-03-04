// // services/llmService.js
// const axios = require("axios");
// const config = require("../config/default");
// const logger = require("../utils/logger");

// class LLMService {
//   constructor() {
//     this.apiKey = config.llmApiKey;
//     this.baseUrl = "https://api.anthropic.com/v1/messages"; // Change this based on your LLM provider
//   }

//   async generateResponse(prompt) {
//     try {
//       const response = await axios.post(
//         this.baseUrl,
//         {
//           model: "claude-3-sonnet-20240229", // Use your preferred model
//           max_tokens: 1000,
//           messages: [{ role: "user", content: prompt }],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": this.apiKey,
//             "anthropic-version": "2023-06-01",
//           },
//         }
//       );

//       return response.data.content[0].text;
//     } catch (error) {
//       logger.error("Error generating LLM response:", error);
//       throw new Error("Failed to generate response from language model");
//     }
//   }
// }

// module.exports = new LLMService();
// services/llmService.js
const axios = require("axios");
const config = require("../config/default");
const logger = require("../utils/logger");

class LLMService {
  constructor() {
    this.apiKey = config.llmApiKey; // Ensure you store the OpenAI API key in config
    this.baseUrl = "https://api.openai.com/v1/chat/completions";
  }

  async generateResponse(prompt) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: "gpt-4o", // Use OpenAI's latest model
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      logger.error("Error generating LLM response:", error);
      throw new Error("Failed to generate response from language model");
    }
  }
}

module.exports = new LLMService();
