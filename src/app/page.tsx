'use client';
import { useState } from 'react';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');

  async function handleSubmit() {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setSummaryUrdu(data.summaryUrdu);
  }

  return (
    <main className="">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <div className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance">
            Welcome to the Blog Summarizer
          </div>
          <p className="leading-9 [&:not(:first-child)]:mt-8 text-gray-700 dark:text-gray-300 text-xl">
            This application allows you to summarize blog posts efficiently.
          </p>
        </div>
        <div className="flex w-full max-w-2xl items-center gap-4 flex-row mx-auto mt-20 mb-16">
          <Input
            type="url"
            placeholder="Enter URL"
            className="!text-2xl py-4 px-6 h-16 flex-grow rounded-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="text-lg py-4 px-6 h-16 rounded-full"
            onClick={handleSubmit}
          >
            Summarize
          </Button>
        </div>
        {summary && (
          <div className="space-y-2 mt-4">
            <h2 className="font-semibold">Summary (EN):</h2>
            <p>{summary}</p>
            <h2 className="font-semibold mt-2">Summary (Urdu):</h2>
            <p>{summaryUrdu}</p>
          </div>
        )}
      </div>
    </main>
  );
}
