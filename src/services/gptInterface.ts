import axios from "axios";

interface GPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        text: string;
        index: number;
        logprobs: any;
        finish_reason: string;
    }>;
}

class GPTInterface {
    private apiKey: string;
    private endpoint: string;
    private model = "gpt-3.5-turbo-instruct";
    //   private model="gpt-4-0125-preview";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.endpoint =
            "https://api.openai.com/v1/engines/davinci-codex/completions";
    }

    async getResponse(
        prompt: string,
        temperature = 0.5,
        maxTokens = 100
    ): Promise<string> {
        try {
            const response = await axios.post<GPTResponse>(
                this.endpoint,
                {
                    prompt,
                    temperature,
                    model: this.model,
                    max_tokens: maxTokens,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );

            if (
                response.data.choices.length > 0 &&
                response.data.choices[0].text
            ) {
                return response.data.choices[0].text;
            } else {
                throw new Error("No response from GPT API");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Axios error:",
                    error.response?.data || error.message
                );
            } else {
                console.error("Unexpected error:", error);
            }
            throw error;
        }
    }
}

export default GPTInterface;
