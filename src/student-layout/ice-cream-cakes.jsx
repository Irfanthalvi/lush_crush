import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { iceCreamCakesData } from "@/components/subject/ice-cream-cakes-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchFilterSubject from "@/components/subject/searchfilter-subject";
import ProductCard from "@/components/subject/product-card";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, setSelectedItem } from "@/lib/drawerSlice";
import { addItem } from "@/lib/cartSlice";
import { useIsMobile } from "@/lib/useIsMobile";

const IceCreamCakes = () => {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  const handleCardClick = (item) => {
    if (!cartItems[item.id]) {
      dispatch(addItem({ item }));
    }
    if (isMobile) {
      dispatch(setSelectedItem(item));
    } else {
      dispatch(openDrawer(item));
    }
  };

  const filteredSubjects = iceCreamCakesData.filter((subject) => {
    const matchesSearch = subject.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || subject.title.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const visibleSubjects = filteredSubjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSubjects.length;

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-4 sm:px-6 md:px-8 py-10 max-w-[1440px] mx-auto">
      <SearchFilterSubject search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} subjects={iceCreamCakesData} />
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
            <ProductCard key={subject.id || index} subject={subject} />
          ))}
      </div>
      {!loading && hasMore && (
        <div className="flex justify-center mt-8"><Button onClick={handleLoadMore} className="bg-muted text-muted-foreground hover:bg-muted/80 transition">Load More</Button></div>
      )}
    </div>
  );
};

export default IceCreamCakes;
