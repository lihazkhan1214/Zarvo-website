import { useMemo, useState } from "react";
import { IconButton } from "./IconButton";
import { Heart, Share2 } from "lucide-react";
import { NewsCard } from "./NewCard";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  likes: number;
  thumbnail?: string;
  excerpt: string;
  content?: string;
};

const INITIAL_NEWS: NewsItem[] = [
  {
    id: "mayjun",
    title: "Dev Diary – May & Jun",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/15/23/cryptocurrency-6850639_1280.jpg",
    excerpt:
      "Highlights from May & June: protocol upgrades, smoother payouts, and new analytics.",
    content:
      "We shipped performance improvements across the chain indexer, reduced payout latency, and added early-access analytics.",
  },
  {
    id: "apr2025",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/18/02/crypto-6851184_1280.jpg",
    excerpt:
      "Connecting all your platforms in one chain. Mine, earn, and redeem with one tap.",
    content:
      "Zarvo integrates seamlessly with apps and wallets. No switching platforms — manage everything in one place.",
  },
  {
    id: "apr2025",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/15/23/cryptocurrency-6850639_1280.jpg",
    excerpt:
      "Connecting all your platforms in one chain. Mine, earn, and redeem with one tap.",
    content:
      "Zarvo integrates seamlessly with apps and wallets. No switching platforms — manage everything in one place.",
  },
  {
    id: "apr2025",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/18/02/crypto-6851184_1280.jpg",
    excerpt:
      "Connecting all your platforms in one chain. Mine, earn, and redeem with one tap.",
    content:
      "Zarvo integrates seamlessly with apps and wallets. No switching platforms — manage everything in one place.",
  },
  {
    id: "apr2025",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/15/23/cryptocurrency-6850639_1280.jpg",
    excerpt:
      "Connecting all your platforms in one chain. Mine, earn, and redeem with one tap.",
    content:
      "Zarvo integrates seamlessly with apps and wallets. No switching platforms — manage everything in one place.",
  },
  {
    id: "apr2025",
    title: "Dev Diary April 2025",
    date: "Mar 26, 2025",
    likes: 404800,
    thumbnail:
      "https://cdn.pixabay.com/photo/2021/12/06/18/02/crypto-6851184_1280.jpg",
    excerpt:
      "Connecting all your platforms in one chain. Mine, earn, and redeem with one tap.",
    content:
      "Zarvo integrates seamlessly with apps and wallets. No switching platforms — manage everything in one place.",
  },
];

export const NewsSection: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>(INITIAL_NEWS);
  const [focusedId, setFocusedId] = useState<string | null>(INITIAL_NEWS[1].id);
  const focused = useMemo(
    () => items.find((n) => n.id === focusedId) ?? items[0],
    [items, focusedId]
  );
  const like = (id: string) =>
    setItems((arr) =>
      arr.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );

  return (
    <>
      <h2 className="text-xl font-semibold text-[#F5F7FA]">News</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((n) => (
          <NewsCard key={n.id} item={n} onLike={() => like(n.id)} />
        ))}
      </div>
    </>
  );
};
