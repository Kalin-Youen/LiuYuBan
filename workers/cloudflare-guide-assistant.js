export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: buildCorsHeaders(request, env) });
    }

    if (request.method !== "POST") {
      return json(
        { error: "Method not allowed. Use POST." },
        405,
        request,
        env,
      );
    }

    try {
      const body = await request.json();
      const question = sanitizeText(body?.question, 600);
      const history = Array.isArray(body?.history) ? body.history : [];
      const context = Array.isArray(body?.context) ? body.context : [];
      const stream = body?.stream !== false;

      if (!question) {
        return json({ error: "Question is required." }, 400, request, env);
      }

      const messages = buildMessages({
        question,
        history,
        context,
        systemPrompt: env.SYSTEM_PROMPT,
      });

      const model = env.AI_MODEL || "@cf/meta/llama-3.1-8b-instruct-fast";
      const options = {
        messages,
        max_tokens: clampNumber(env.MAX_TOKENS, 120, 1200, 720),
        temperature: clampNumber(env.TEMPERATURE, 0, 2, 0.35),
        stream,
      };

      const result = await env.AI.run(model, options);

      if (stream) {
        return new Response(result, {
          headers: {
            ...buildCorsHeaders(request, env),
            "content-type": "text/event-stream; charset=utf-8",
            "cache-control": "no-cache, no-transform",
            "x-content-type-options": "nosniff",
          },
        });
      }

      return json(result, 200, request, env);
    } catch (error) {
      return json(
        {
          error: "Worker failed to generate a response.",
          detail: error instanceof Error ? error.message : String(error),
        },
        500,
        request,
        env,
      );
    }
  },
};

function buildMessages({ question, history, context, systemPrompt }) {
  const safeHistory = history
    .filter((entry) => entry && (entry.role === "user" || entry.role === "assistant"))
    .slice(-6)
    .map((entry) => ({
      role: entry.role,
      content: sanitizeText(entry.content, entry.role === "user" ? 900 : 1500),
    }))
    .filter((entry) => entry.content);

  const safeContext = context
    .map((entry, index) => formatContextBlock(entry, index))
    .filter(Boolean)
    .slice(0, 5)
    .join("\n\n");

  const system = [
    systemPrompt
      || "你是“差结构学习法”站内的导读助手。你的工作不是替作者宣布最终结论，而是帮助读者先找到最相关的章节，再按差异、边界、反馈、稳态、结构、规则的顺序解释。",
    "回答要求：",
    "1. 优先使用提供的站内上下文，不要凭空扩写。",
    "2. 先给读者一条最短可走通的阅读线，再补原因。",
    "3. 如果上下文不足，要明确说“站内目前没有足够材料”，不要假装已经论证过。",
    "4. 回答尽量白话，不要把理论立场说得过满。",
    "5. 如果提到章节，尽量按“先白话卷，后主书稿/专题”的顺序组织。",
    safeContext ? `站内可用上下文：\n${safeContext}` : "站内可用上下文：当前请求没有附带章节摘录。",
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system", content: system },
    ...safeHistory,
    { role: "user", content: question },
  ];
}

function formatContextBlock(entry, index) {
  const title = sanitizeText(entry?.title, 120);
  const sectionTitle = sanitizeText(entry?.sectionTitle, 60);
  const excerpt = sanitizeText(entry?.excerpt, 680);
  const url = sanitizeText(entry?.url, 240);

  if (!title && !excerpt) return "";

  return [
    `[资料 ${index + 1}]`,
    title ? `标题：${title}` : "",
    sectionTitle ? `卷册：${sectionTitle}` : "",
    excerpt ? `摘录：${excerpt}` : "",
    url ? `站内链接：${url}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function sanitizeText(value, maxLength) {
  const normalized = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return "";
  return normalized.slice(0, maxLength);
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function buildCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = String(env.ALLOWED_ORIGIN || "").trim();
  const allowOrigin = allowedOrigin || origin || "*";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(payload, status, request, env) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...buildCorsHeaders(request, env),
      "content-type": "application/json; charset=utf-8",
    },
  });
}
