import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cakePopsiclesData } from "@/components/subject/cake-popsicles-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchFilterSubject from "@/components/subject/searchfilter-subject";
import ItemDrawer from "@/components/subject/item-drawer";

const CakePopsicles = () => {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
    setCartItems((prev) => {
      if (!prev[item.id]) return { ...prev, [item.id]: { item, count: 1 } };
      return prev;
    });
  };

  const handleIncrement = (item) => {
    const target = item || selectedItem;
    if (!target) return;
    setCartItems((prev) => ({ ...prev, [target.id]: { item: target, count: (prev[target.id]?.count || 0) + 1 } }));
  };

  const handleDecrement = (item) => {
    const target = item || selectedItem;
    if (!target) return;
    setCartItems((prev) => {
      const current = prev[target.id]?.count || 0;
      if (current <= 1) { const next = { ...prev }; delete next[target.id]; return next; }
      return { ...prev, [target.id]: { item: target, count: current - 1 } };
    });
  };

  const handleRemove = (item) => {
    setCartItems((prev) => { const next = { ...prev }; delete next[item.id]; return next; });
  };

  const filteredSubjects = cakePopsiclesData.filter((subject) => {
    const matchesSearch = subject.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || subject.title.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const visibleSubjects = filteredSubjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSubjects.length;

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-4 sm:px-6 md:px-8 py-10 max-w-[1440px] mx-auto">
      <SearchFilterSubject search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} subjects={cakePopsiclesData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl h-72 flex flex-col">
              <Skeleton className="h-32 w-full rounded-t-md" />
              <div className="p-4 flex flex-col flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" /><Skeleton className="h-3 w-full mb-2" /><Skeleton className="h-3 w-5/6 mb-4" /><Skeleton className="h-9 w-28 mt-auto" />
              </div>
            </div>
          ))
          : visibleSubjects.map((subject, index) => (
            <div key={index} onClick={() => handleCardClick(subject)}
              className={`group bg-card text-card-foreground border rounded-md flex flex-col transition-all duration-300 overflow-hidden cursor-pointer ${cartItems[subject.id]?.count > 0 ? "border-primary ring-1 ring-primary" : "border-border"}`}>
              <div className="h-48 w-full overflow-hidden flex-shrink-0 relative">
                <img src={subject.img} alt={subject.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/fallback-image.png"; }} />
                {cartItems[subject.id]?.count > 0 && (
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">{cartItems[subject.id].count}</span>
                )}
              </div>
              <div className="p-3">
                <Button className="w-full inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md transition">{subject.title} <ArrowRight size={16} /></Button>
              </div>
            </div>
          ))}
      </div>
      {!loading && hasMore && (
        <div className="flex justify-center mt-8"><Button onClick={handleLoadMore} className="bg-muted text-muted-foreground hover:bg-muted/80 transition">Load More</Button></div>
      )}
      <ItemDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} item={selectedItem} cartItems={cartItems} onIncrement={handleIncrement} onDecrement={handleDecrement} onRemove={handleRemove} onDone={() => setDrawerOpen(false)} onCancel={() => setDrawerOpen(false)} />
    </div>
  );
};

export default CakePopsicles;
