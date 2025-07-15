import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { summarizeText } from '@/utils/summarize';
import { translateToUrdu } from '@/urdu-dictionary';
import { saveToMongo } from '@/lib/mongo';
import { saveToSupabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    // Remove HTML tags and clean text
    const cleanedText = text.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim();

    // Generate summaries
    const summary = summarizeText(cleanedText);

    // Enhance Urdu translation with more words
    const summaryUrdu = translateToUrdu(summary);

    await saveToMongo(url, cleanedText);
    await saveToSupabase(url, summary, summaryUrdu);

    return NextResponse.json({ summary, summaryUrdu });
  } catch {
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 });
  }
}
