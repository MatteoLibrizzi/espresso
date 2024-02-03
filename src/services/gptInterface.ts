import axios from "axios";

export interface Interaction {
    role: string;
    content: string;
}

interface GPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        message: Interaction;
        index: number;
        logprobs: any;
        finish_reason: string;
    }>;
}

class GPTInterface {
    private apiKey: string;
    private endpoint: string;
    // private model = "gpt-3.5-turbo-instruct";
    private model = "gpt-3.5-turbo";

    // private model = "gpt-4-0125-preview";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.endpoint = "https://api.openai.com/v1/chat/completions";
    }

    async getResponse(
        messages: any,
        temperature = 0.5,
        maxTokens = 100
    ): Promise<Interaction> {
        try {
            const response = await axios.post<GPTResponse>(
                this.endpoint,
                {
                    messages,
                    temperature,
                    model: this.model,
                    max_tokens: maxTokens,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );
            console.log(response.data.choices);

            if (response.data.choices.length > 0) {
                return response.data.choices[0].message;
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
