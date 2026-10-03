// Small Markdown-to-HTML converter for blog content pasted into the admin editor.
// Covers what blog drafts use: ## and ### headings, paragraphs, bullet and numbered
// lists, > quotes, **bold**, *italic* and [links](url). Anything else stays as text.

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const inline = (text: string) =>
  escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");

/** True when pasted text is clearly Markdown rather than ordinary prose. */
export const looksLikeMarkdown = (text: string) => /^(#{1,3} |[-*] |\d+\. |> )/m.test(text) && text.includes("\n");

export const markdownToHtml = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let list: "ul" | "ol" | null = null;
  let paragraph: string[] = [];

  const closeParagraph = () => {
    if (paragraph.length) html.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (list) html.push(`</${list}>`);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    const heading = line.match(/^(#{1,3}) (.+)$/);
    const bullet = line.match(/^[-*] (.+)$/);
    const numbered = line.match(/^\d+\. (.+)$/);
    const quote = line.match(/^> ?(.*)$/);

    if (!line) {
      closeParagraph();
      closeList();
    } else if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (bullet || numbered) {
      closeParagraph();
      const type = bullet ? "ul" : "ol";
      if (list !== type) {
        closeList();
        html.push(`<${type}>`);
        list = type;
      }
      html.push(`<li>${inline((bullet || numbered)![1])}</li>`);
    } else if (quote) {
      closeParagraph();
      closeList();
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`);
    } else {
      closeList();
      paragraph.push(line);
    }
  }
  closeParagraph();
  closeList();
  return html.join("");
};
