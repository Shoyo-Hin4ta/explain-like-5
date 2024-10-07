import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateExplanation(topic: string): Promise<string> {
  try {
    const { text: explanation } = await generateText({
      model: anthropic('claude-3-haiku-20240307'),
      system: "You are an AI assistant that explains topics as if to a 5-year-old child. Provide clear, simple explanations using age-appropriate language and relatable analogies. Give direct explanations without any introductory phrases or meta-commentary.",
      prompt: `Explain '${topic}' in simple terms that a 5-year-old would understand. Start your explanation immediately without any prefacing statements.`
    });

    return explanation.trim();

  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to generate explanation');
  }
}