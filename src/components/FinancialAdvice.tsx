"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { getFinancialAdvice, type FinancialAdviceInput, type FinancialAdviceOutput } from "@/ai/flows/financial-advice";
import { useToast } from "@/hooks/use-toast";

interface FinancialAdviceProps {
  income: number;
  expenses: number;
}

const adviceFormSchema = z.object({
  savingsGoal: z.coerce.number().optional(),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

type AdviceFormValues = z.infer<typeof adviceFormSchema>;

export default function FinancialAdvice({ income, expenses }: FinancialAdviceProps) {
  const [advice, setAdvice] = useState<FinancialAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdviceFormValues>({
    resolver: zodResolver(adviceFormSchema),
    defaultValues: {
      savingsGoal: undefined,
      riskTolerance: "medium",
    },
  });

  const onSubmit = async (data: AdviceFormValues) => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const input: FinancialAdviceInput = {
        income,
        expenses,
        savingsGoal: data.savingsGoal,
        riskTolerance: data.riskTolerance,
      };
      const result = await getFinancialAdvice(input);
      setAdvice(result);
    } catch (error) {
      console.error("Error getting financial advice:", error);
      toast({
        title: "Error",
        description: "Failed to get financial advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Financial Advisor
        </CardTitle>
        <CardDescription>
          Get personalized financial advice based on your income, expenses, and goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="savingsGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optional: Savings Goal ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Tolerance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your risk tolerance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Advice...
                </>
              ) : (
                "Get Advice"
              )}
            </Button>
          </form>
        </Form>
        {advice && (
          <div className="mt-6 p-4 border border-primary/20 rounded-md bg-primary/5">
            <h4 className="font-semibold text-lg text-primary mb-2 font-headline">Your Personalized Advice:</h4>
            <p className="text-sm whitespace-pre-wrap">{advice.advice}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
