import { Heart, Share2 } from "lucide-react";
import { Card } from "../../../../components/Card";
import { Link } from "react-router-dom";

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
  onLike: () => void;
}> = ({ item, onLike }) => (
  <Link
    to={`/news/1`} // <-- Navigate to the detail page
    className="block group"
  >
    <Card className="overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-150">
      {item.thumbnail && (
        <div
          className="h-40 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        />
      )}
      <div className="p-4">
        <div className="text-xs text-[#9AA0A6]">{item.date}</div>
        <h3 className="mt-1 text-lg font-semibold text-[#F5F7FA] group-hover:underline">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-[#9AA0A6]">{item.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#9AA0A6] z-10"
            onClick={(e) => {
              e.preventDefault(); // prevent navigation
              onLike();
            }}
          >
            <Heart size={16} className="opacity-80" />
            {Intl.NumberFormat().format(item.likes)}
          </button>
          <div className="flex items-center gap-1 text-sm text-[#9AA0A6]">
            <Share2 size={16} className="opacity-80" />
            Open
          </div>
        </div>
      </div>
    </Card>
  </Link>
);
