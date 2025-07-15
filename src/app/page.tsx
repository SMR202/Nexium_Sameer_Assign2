'use client';
import { useState } from 'react';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setSummaryUrdu(data.summaryUrdu);
    setLoading(false);
  }

  return (
    <main className="bg-gradient-to-r from-gray-200 via-gray-500 to-gray-800 min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <br />
        <div className="scroll-m-20 text-center text-7xl font-extrabold tracking-tight text-balance text-white">
        Welcome to the Blog Summarizer
        </div>
        <p className="leading-9 [&:not(:first-child)]:mt-8 text-gray-100 text-2xl">
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
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      {summary && (
        <div className="space-y-4 mt-8 max-w-3xl mx-auto mb-5">
        <div className="p-6 shadow-2xl rounded-4xl elevation-8 bg-transparent">
          <h2 className="font-bold text-3xl mb-2 text-gray-800 dark:text-gray-200">
          Summary (EN):
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl">
          {summary}
          </p>
        </div>
        <div className="p-6 shadow-2xl rounded-4xl elevation-8 bg-transparent">
          <h2 className="font-bold text-3xl mb-2 text-gray-800 dark:text-gray-200">
          Summary (Urdu):
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-xl">
          {summaryUrdu}
          </p>
        </div>
        </div>
      )}
      </div>
    </main>
  );
}
