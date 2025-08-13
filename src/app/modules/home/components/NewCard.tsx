import { Heart, Share2 } from "lucide-react";
import { Card } from "../../../../components/Card";
type NewsItem = {
  id: string;
  title: string;
  date: string;
  likes: number;
  thumbnail?: string;
  excerpt: string;
  content?: string;
};

export const NewsCard: React.FC<{
  item: NewsItem;
  onOpen: () => void;
  onLike: () => void;
}> = ({ item, onOpen, onLike }) => (
  <Card className="overflow-hidden">
    {item.thumbnail && (
      <div
        className="h-40 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      />
    )}
    <div className="p-4">
      <div className="text-xs text-[#9AA0A6]">{item.date}</div>
      <h3 className="mt-1 text-lg font-semibold text-[#F5F7FA]">
        {item.title}
      </h3>
      <p className="mt-2 text-sm text-[#9AA0A6]">{item.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="flex items-center gap-1 text-sm text-[#9AA0A6]"
          onClick={onLike}
        >
          <Heart size={16} className="opacity-80" />{" "}
          {Intl.NumberFormat().format(item.likes)}
        </button>
        <button
          className="flex items-center gap-1 text-sm text-[#9AA0A6]"
          onClick={onOpen}
        >
          <Share2 size={16} className="opacity-80" /> Open
        </button>
      </div>
    </div>
  </Card>
);
