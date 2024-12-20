"use client";

import { getChatCompletion } from "@/api/chat";
import { useRef, useState } from "react";
import { messages as messageStore } from "@/store/chat";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const messageRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getChatCompletion(prompt);
      setResponses([
        ...responses,
        { role: "user", content: prompt },
        { role: "assistant", content: response.choices[0].message.content },
      ]);
      messageStore.push({
        role: "assistant",
        content: response.choices[0].message.content,
      });
      setPrompt("");
      messagesRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    } catch (error) {
      console.log("error >> ", error);
    }
  };
  return (
    <main className="max-w-screen-xl mx-auto container p-6">
      <h1 className="text-center text-2xl font-semibold">ELEM</h1>
      <div className="h-[70vh] bg-gray-300 w-full overflow-auto">
        {responses?.map((response, index) => (
          <div
            className={` flex flex-col p-2 w-full my-5 ${
              response?.role === "assistant" ? "justify-start" : "justify-end"
            }`}
            key={index}
          >
            <span
              className={`w-[90%] rounded-lg ${
                response?.role === "assistant"
                  ? "  text-black"
                  : "ml-auto text-right text-black"
              }`}
            >
              {response?.role === "assistant" ? "AI: " : "You: "}
            </span>
            <div
              ref={messageRef}
              className={`w-[90%] p-2 rounded-lg ${
                response?.role === "assistant"
                  ? " bg-black text-white"
                  : "ml-auto text-right bg-purple-500 text-white"
              }`}
            >
              {response?.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          className="w-full border border-gray-300 text-black p-2 rounded-lg mt-5"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Masukkan prompt here"
        />
      </form>
    </main>
  );
}
