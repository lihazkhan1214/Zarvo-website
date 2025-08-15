// src/pages/NewsDetailPage.tsx
import React from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";

// ---- STATIC CONTENT (ID -> POST) ----
type Section = { h: string; p: string };
type Post = {
  id: string;
  title: string;
  date: string; // display-ready (e.g., "Mar 26, 2025")
  heroUrl: string; // /public or imported asset
  likes: string; // display string "404.8k"
  sections: Section[];
};

const POSTS: Record<string, Post> = {
  "1": {
    id: "1",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    heroUrl:
      "https://cdn.pixabay.com/photo/2021/12/06/18/02/crypto-6851184_1280.jpg", // put your image in /public/assets
    likes: "404.8k",
    sections: [
      {
        h: "Connecting All Your Platforms in One Chain",
        p: "Zarvoo integrates seamlessly with apps, and wallets. No switching platforms—manage everything in one place. Perfect for developers, users, and businesses alike.",
      },
      {
        h: "Mine, Earn, and Redeem with Just One Tap",
        p: "With Zarvoo’s smart app, users can mine tokens in real‑time. Send, receive, buy, and even redeem currency easily. All actions are fast, secure, and fully blockchain‑powered.",
      },
    ],
  },
  // Add more posts here:
  // "dev-diary-may-jun-2025": { ... }
};

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? POSTS[id] : undefined;

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0F0F15] text-[#F5F7FA]">
        <header className="mx-auto w-full max-w-6xl px-6 py-6">
          <BackButton to="/news" />
        </header>
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-2xl bg-[#15151E] p-8 ring-1 ring-white/10">
            <h1 className="text-2xl font-semibold">Post not found</h1>
            <p className="mt-2 text-white/60">
              The post ID “{id}” doesn’t exist. Please go back to News.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { title, date, heroUrl, likes, sections } = post;

  return (
    <main className="min-h-screen bg-[#0F0F15] text-[#F5F7FA]">
      {/* Top Bar */}
      <header className="mx-auto w-full max-w-6xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 transition px-3 py-2"
            aria-label="Back to news"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline text-sm">Back</span>
          </Link>
          <span className="text-sm text-white/60">{date}</span>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 transition px-3 py-2"
          onClick={() => {
            const url = window.location.href;
            if (navigator.share)
              navigator.share({ title, url }).catch(() => {});
            else navigator.clipboard.writeText(url);
          }}
          aria-label="Share"
        >
          <Share2 size={18} />
          <span className="hidden sm:inline text-sm">Share</span>
        </button>
      </header>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* HERO */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
            <img
              src={heroUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
            {/* Floating like pill (mobile) */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 backdrop-blur md:hidden">
              <Heart size={16} className="opacity-80" />
              <span className="text-sm">{likes}</span>
            </div>
          </div>

          {/* Sticky actions (desktop) */}
          <div className="mt-4 hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80">
              <Heart size={18} />
              <span className="text-sm">{likes}</span>
            </div>
            <div className="text-xs text-white/40">Image: Placeholder</div>
          </div>
        </div>

        {/* ARTICLE */}
        <article className="lg:col-span-7">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            {title}
          </h1>
          <p className="mt-1 text-sm text-white/60">{date}</p>

          <div className="mt-6 space-y-8 rounded-2xl bg-[#15151E] p-6 ring-1 ring-white/10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-lg font-semibold">{s.h}</h2>
                <p className="mt-3 text-white/80 leading-7">{s.p}</p>
              </section>
            ))}

            {/* CTA (optional) */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#14141B] to-[#1A1A25] p-5">
              <p className="text-sm text-white/70">
                Want updates like this in your inbox?
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 placeholder:text-white/40"
                />
                <button className="rounded-lg bg-[#F5C242] px-5 py-2 font-semibold text-[#101014]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom actions (mobile) */}
          <div className="mt-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2 text-white/80">
              <Heart size={18} />
              <span className="text-sm">{likes}</span>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2"
              onClick={() => {
                const url = window.location.href;
                if (navigator.share)
                  navigator.share({ title, url }).catch(() => {});
                else navigator.clipboard.writeText(url);
              }}
            >
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </article>
      </section>

      {/* Subtle footer curve */}
      <div className="mx-auto mt-auto w-full max-w-6xl px-6 pb-8">
        <div className="h-4 rounded-b-2xl bg-white/5"></div>
      </div>
    </main>
  );
};

export default NewsDetailPage;
