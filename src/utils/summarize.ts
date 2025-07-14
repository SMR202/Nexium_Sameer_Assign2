export function summarizeText(text: string): string {
  const sentences = text.split('. ').filter(sentence => sentence.length > 20).slice(0, 5); // Select meaningful sentences
  const summary = sentences.map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
  return summary + '.';
}
