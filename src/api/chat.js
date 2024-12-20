import { groq } from "@/lib/groq";
import { messages as messageStore } from "@/store/chat";

export async function getChatCompletion(prompt) {
  messageStore.push({ role: "user", content: prompt });
  return groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: messageStore,
    max_tokens : 128
  });
}
