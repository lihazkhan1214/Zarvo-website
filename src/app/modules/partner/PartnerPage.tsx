import React, { useMemo, useState } from "react";
import { Card } from "../../../components/Card";
import { Link } from "react-router-dom";

/* -------------------- types + data -------------------- */
type Category = "Education" | "Business" | "Coaching";

type Partner = {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  featured?: boolean;
  logo?: string; // path to /public/assets/...
};

const PARTNERS: Partner[] = [
  {
    id: "success-pluse",
    name: "Success Pluse",
    subtitle: "Personal Development",
    category: "Education",
    featured: true,
    logo: "https://cdn.pixabay.com/photo/2022/08/30/18/14/school-7421663_1280.png",
  },
  {
    id: "elearning-course",
    name: "eLearning Course",
    subtitle: "Online Course",
    category: "Education",
    featured: true,
    logo: "https://cdn.pixabay.com/photo/2022/08/30/18/14/school-7421663_1280.png",
  },
  // more examples
  {
    id: "success-pluse-std",
    name: "Success Pluse",
    subtitle: "Personal Development",
    category: "Education",
    featured: true,
    logo: "https://cdn.pixabay.com/photo/2022/08/30/18/14/school-7421663_1280.png",
  },
  {
    id: "elearning-course-std",
    name: "eLearning Course",
    subtitle: "Online Course",
    category: "Education",
    featured: false,
    logo: "https://cdn.pixabay.com/photo/2022/08/30/18/14/school-7421663_1280.png",
  },
  {
    id: "elearning-course-std",
    name: "eLearning Course",
    subtitle: "Online Course",
    category: "Education",
    featured: false,
    logo: "https://cdn.pixabay.com/photo/2022/08/30/18/14/school-7421663_1280.png",
  },
];

/* -------------------- small ui bits ------------------- */
const Tabs: React.FC<{ value: Category; onChange: (c: Category) => void }> = ({
  value,
  onChange,
}) => {
  const items: Category[] = ["Education", "Business", "Coaching"];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`rounded-xl border px-4 py-2 text-sm transition ${
            value === c
              ? "border-[#F5C242] bg-[#F5C242] text-[#101014] font-semibold"
              : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

const OfferButton: React.FC<{ to?: string; onClick?: () => void }> = ({
  to,
  onClick,
}) => {
  const content = (
    <span className="inline-flex items-center justify-center rounded-xl bg-[#F5C242] px-4 py-2 text-sm font-semibold text-[#101014] hover:brightness-95">
      View Offers
    </span>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
};

const PartnerBadge: React.FC<{ src?: string }> = ({ src }) => (
  <div className="h-12 w-12 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
    {src ? (
      <img src={src} alt="" className="h-60 w-60 object-contain" />
    ) : (
      <div className="h-6 w-6 rounded bg-white/20" />
    )}
  </div>
);

/* -------------------- page ---------------------------- */
const PartnerPage: React.FC = () => {
  const [tab, setTab] = useState<Category>("Education");

  const list = useMemo(() => PARTNERS.filter((p) => p.category === tab), [tab]);
  const featured = list.filter((p) => p.featured);
  const regular = list.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-[#0F0F15] text-[#F5F7FA]">
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-6">
        <h1 className="text-xl font-semibold">Partner Marketplace</h1>
        <div className="mt-5">
          <Tabs value={tab} onChange={setTab} />
        </div>
      </div>

      {/* Featured */}
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-3 text-sm font-semibold text-[#F5C242]">
          Featured Partners
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <Card
              key={p.id}
              className="rounded-2xl ring-1 ring-white/10 bg-[#111119] p-5 hover:bg-white/5 transition"
            >
              <div className="flex items-start gap-4">
                <PartnerBadge src={p.logo} />
                <div className="min-w-0">
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="text-sm text-white/60">{p.subtitle}</div>
                </div>
              </div>
              <div className="mt-4">
                <OfferButton to={`/redeem`} />
              </div>
            </Card>
          ))}
          {featured.length === 0 && (
            <Card className="rounded-2xl ring-1 ring-white/10 bg-[#111119] p-8 text-white/60">
              No featured partners in this category yet.
            </Card>
          )}
        </div>
      </section>

      {/* Partners list */}
      <section className="mx-auto w-full max-w-7xl px-6 mt-10">
        <div className="mb-3 text-sm font-semibold">Partners</div>
        <div className="space-y-4">
          {regular.map((p) => (
            <Card
              key={p.id}
              className="rounded-2xl ring-1 ring-white/10 bg-[#111119] p-4"
            >
              <div className="flex items-center gap-4">
                <PartnerBadge src={p.logo} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="text-sm text-white/60">{p.subtitle}</div>
                </div>
                <OfferButton to={`/redeem`} />
              </div>
            </Card>
          ))}
          {regular.length === 0 && (
            <Card className="rounded-2xl ring-1 ring-white/10 bg-[#111119] p-8 text-white/60">
              No partners in this category yet.
            </Card>
          )}
        </div>
      </section>

      <div className="h-16" />
    </main>
  );
};

export default PartnerPage;
