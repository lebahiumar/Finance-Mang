
"use client";

import { useState, useMemo, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import DashboardCard from "@/components/DashboardCard";
import TransactionForm from "@/components/TransactionForm";
import FinancialAdvice from "@/components/FinancialAdvice";
import { TrendingUp, TrendingDown, PiggyBank, Briefcase, PlusCircle, LayoutGrid, Trash2 } from "lucide-react";
import { type Transaction, type TransactionFormData } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import CategoryIcon from "@/components/CategoryIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTransactions = localStorage.getItem("finTrackTransactions");
      return savedTransactions ? JSON.parse(savedTransactions, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
      }) : [];
    }
    return [];
  });
  
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isResetExpenseDialogOpen, setIsResetExpenseDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("finTrackTransactions", JSON.stringify(transactions));
  }, [transactions]);


  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const savings = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  const handleAddTransaction = (data: TransactionFormData, type: 'income' | 'expense') => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      ...data,
    };
    setTransactions((prev) => [...prev, newTransaction].sort((a,b) => b.date.getTime() - a.date.getTime()));
  };
  
  const recentTransactions = useMemo(() => transactions.slice(0, 10), [transactions]);

  const handleResetExpenses = () => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.type !== 'expense'));
    setIsResetExpenseDialogOpen(false);
    toast({
      title: "Expenses Cleared",
      description: "All your expense transactions have been successfully reset.",
      variant: "default",
    });
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        
        <div className="md:hidden mb-4">
          <Select defaultValue={currentTab} onValueChange={setCurrentTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard"><LayoutGrid className="inline-block mr-2 h-4 w-4"/>Dashboard</SelectItem>
              <SelectItem value="addTransaction"><PlusCircle className="inline-block mr-2 h-4 w-4"/>Add Transaction</SelectItem>
              <SelectItem value="aiAdvisor"><Briefcase className="inline-block mr-2 h-4 w-4"/>AI Advisor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column / Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Dashboard Section (visible on mobile via tab) */}
            <section className={cn("space-y-6", currentTab !== 'dashboard' && 'hidden md:block')}>
              <h2 className="text-2xl font-headline font-semibold text-foreground">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <DashboardCard
                  title="Total Income"
                  value={totalIncome}
                  icon={<TrendingUp className="h-5 w-5" />}
                  variant="default"
                />
                <DashboardCard
                  title="Total Expenses"
                  value={totalExpenses}
                  icon={<TrendingDown className="h-5 w-5" />}
                  variant="default"
                />
                <DashboardCard
                  title="Net Savings"
                  value={savings}
                  icon={<PiggyBank className="h-5 w-5" />}
                  variant={savings >= 0 ? "positive" : "negative"}
                />
              </div>

              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Recent Transactions</CardTitle>
                  <CardDescription>Your last 10 transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTransactions.length === 0 ? (
                     <p className="text-muted-foreground text-center py-4">No transactions yet. Add one to get started!</p>
                  ) : (
                  <ScrollArea className="h-[300px]">
                    <ul className="space-y-3">
                      {recentTransactions.map(transaction => (
                        <li key={transaction.id} className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            {transaction.type === 'expense' && transaction.category && (
                              <CategoryIcon category={transaction.category} className={cn("h-5 w-5", transaction.type === 'income' ? 'text-accent' : 'text-destructive')} />
                            )}
                             {transaction.type === 'income' && (
                              <TrendingUp className="h-5 w-5 text-accent" />
                            )}
                            <div>
                              <p className="font-medium text-sm">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{format(new Date(transaction.date), "MMM d, yyyy")}</p>
                            </div>
                          </div>
                          <p className={cn("font-semibold text-sm", transaction.type === 'income' ? 'text-accent' : 'text-destructive')}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* AI Advisor Section (visible on mobile via tab) */}
            <section className={cn(currentTab !== 'aiAdvisor' && 'hidden md:block')}>
               <FinancialAdvice income={totalIncome} expenses={totalExpenses} />
            </section>
          </div>

          {/* Right Column / Add Transaction Area */}
          <div className="md:col-span-1">
             <section className={cn("space-y-6", currentTab !== 'addTransaction' && 'hidden md:block')}>
              <Card className="shadow-lg rounded-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Add Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="income" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="income">Income</TabsTrigger>
                      <TabsTrigger value="expense">Expense</TabsTrigger>
                    </TabsList>
                    <TabsContent value="income" className="pt-4">
                      <TransactionForm
                        type="income"
                        onSubmit={(data) => handleAddTransaction(data, "income")}
                      />
                    </TabsContent>
                    <TabsContent value="expense" className="pt-4 space-y-4">
                      <TransactionForm
                        type="expense"
                        onSubmit={(data) => handleAddTransaction(data, "expense")}
                      />
                      <Button 
                        variant="destructive" 
                        onClick={() => setIsResetExpenseDialogOpen(true)} 
                        className="w-full"
                        disabled={transactions.filter(t => t.type === 'expense').length === 0}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Reset All Expenses
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        © {typeof window !== 'undefined' ? new Date().getFullYear() : ''} FinTrack. All rights reserved.
      </footer>

      <AlertDialog open={isResetExpenseDialogOpen} onOpenChange={setIsResetExpenseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your expense entries.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetExpenses}>
              Yes, delete expenses
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

// Minimal Select component for mobile navigation
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}
function Select({ value, onValueChange, defaultValue, children }: SelectProps) {
  return (
    <select 
      value={value} 
      defaultValue={defaultValue} 
      onChange={(e) => onValueChange?.(e.target.value)}
      className="block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  );
}

function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  // This is a conceptual representation for the select wrapper, actual styling is on the select itself.
  return <div className={className}>{children}</div>;
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  // Placeholder is handled by the select element itself if no value is selected initially.
  // This component doesn't render anything specific in this minimal setup.
  return null;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  // Options are direct children of the select element.
  return <>{children}</>;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}
function SelectItem({ value, children }: SelectItemProps) {
  return <option value={value}>{children}</option>;
}
