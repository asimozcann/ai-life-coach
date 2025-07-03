export const analyzeStyle = async (base64Image) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "HTTP-Referer": "https://ai-life-coach-iota.vercel.app",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Sen bir stil danışmanısın. Yüz, saç, sakal, gözlük ve kıyafet önerileri veriyorsun.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Aşağıdaki görsele göre kısa cümlelerle saç modeli, sakal, gözlük tipi ve kıyafet tarzı öner.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `OpenAI error: ${data.error?.message || response.statusText}`
    );
  }

  return data.choices[0]?.message?.content;
};
