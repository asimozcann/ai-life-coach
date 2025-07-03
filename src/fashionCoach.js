// src/api/fashionCoachAI.js
export const generateFashionSuggestions = async (form) => {
  const prompt = `
Sen kişisel bir moda koçusun. Kullanıcının verdiği bilgilere göre üst giyim, alt giyim ve ayakkabı için detaylı ve stil sahibi öneriler ver. Kullanıcının cinsiyetini göz önünde bulundur.

- Cinsiyet: ${form.gender || "Belirtilmemiş"}
- Vücut Tipi: ${form.bodyType}
- Renk Stili: ${form.colorStyle}
- Stil: ${form.style}
- Mevsim: ${form.season}

Her öneriyi 2-3 cümle ile detaylandır.`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://ai-life-coach-iota.vercel.app",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo-0613",
        messages: [
          {
            role: "system",
            content:
              "Sen deneyimli bir moda koçusun, cinsiyet ve diğer bilgilere göre öneri veriyorsun.",
          },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "API isteği başarısız oldu.");
  }

  return data.choices?.[0]?.message?.content;
};
