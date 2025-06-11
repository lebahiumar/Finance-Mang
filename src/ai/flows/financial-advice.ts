// src/ai/flows/financial-advice.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized financial advice to users based on their tracked income and expenses.
 *
 * - getFinancialAdvice - A function that triggers the financial advice flow.
 * - FinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - FinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  income: z.number().describe('The total income of the user.'),
  expenses: z.number().describe('The total expenses of the user.'),
  savingsGoal: z
    .number()
    .optional()
    .describe('The user savings goal, if they have one.'),
  riskTolerance: z
    .enum(['low', 'medium', 'high'])
    .describe(
      'The risk tolerance of the user. Can be low, medium, or high.'
    ),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized financial advice for the user.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(
  input: FinancialAdviceInput
): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are a personal finance advisor. A user has provided their income, expenses, savings goal (if any), and risk tolerance. Provide personalized financial advice to the user, tailored to their specific situation.

Income: {{income}}
Expenses: {{expenses}}
Savings Goal: {{savingsGoal}}
Risk Tolerance: {{riskTolerance}}

Provide actionable advice to the user.
`,
});

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
