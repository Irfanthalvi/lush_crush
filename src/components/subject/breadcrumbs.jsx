import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { creamyRangeData } from "@/components/subject/creamy-range-data";
import { icyRangeData } from "@/components/subject/icy-range-data";
import { cakePopsiclesData } from "@/components/subject/cake-popsicles-data";
import { greekYogurtData } from "@/components/subject/greek-yogurt-data";
import { fruityBlitzData } from "@/components/subject/fruity-blitz-data";
import { sugarFreeData } from "@/components/subject/sugar-free-data";
import { probioticsData } from "@/components/subject/probiotics-data";
import { cupForOneData } from "@/components/subject/cup-for-one-data";
import { tubsData } from "@/components/subject/tubs-data";
import { jarsData } from "@/components/subject/jars-data";
import { sandwichData } from "@/components/subject/sandwich-data";
import { iceCreamCakesData } from "@/components/subject/ice-cream-cakes-data";
import { boxesData } from "@/components/subject/boxes-data";
import { dealsForAllData } from "@/components/subject/deals-for-all-data";

const subjectsData = [
  ...creamyRangeData,
  ...icyRangeData,
  ...cakePopsiclesData,
  ...greekYogurtData,
  ...fruityBlitzData,
  ...sugarFreeData,
  ...probioticsData,
  ...cupForOneData,
  ...tubsData,
  ...jarsData,
  ...sandwichData,
  ...iceCreamCakesData,
  ...boxesData,
  ...dealsForAllData,
];

export default function Breadcrumbs() {
  const location = useLocation();
  const { id, subject, chapterId } = useParams();
  const [chapterTitle, setChapterTitle] = useState("");

  useEffect(() => {
    if (id) {
      const matched = subjectsData.find((s) => s.id === `/chapter/${id}`);
      setChapterTitle(matched?.title || `Chapter: ${id}`);
    }
  }, [id]);

  // Generate breadcrumb items
  const items = [];

  if (location.pathname.includes("/assessment/") && subject) {
    items.push({
      label: subject.charAt(0).toUpperCase() + subject.slice(1),
      link: `/chapter/${subject}`,
    });
  }

  if (location.pathname.includes("/assessment/") && chapterId) {
    items.push({
      label: chapterId.replace("chapter", "Chapter "),
      link: null,
    });
  }

  if (location.pathname.includes("/assessment/")) {
    items.push({
      label: "Assessment",
      link: null,
    });
  }

  if (location.pathname.startsWith("/chapter/") && id && chapterTitle) {
    items.push({
      label: chapterTitle,
      link: null,
    });
  }
  if (location.pathname === "/create-assessment") {
    items.push({
      label: "Create Assessment",
      link: null,
    });
  }

  if (location.pathname === "/assessment-page") {
    items.push({
      label: "Assessment Page",
      link: null,
    });
  }

  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList className="flex items-center gap-1 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
        {/* Desktop: full breadcrumb */}
        <div className="hidden sm:flex items-center gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="text-muted-foreground">Subjects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-1">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.link ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.link} className="text-muted-foreground">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground font-medium">
                    {item.label}
                  </span>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </div>

        {/* Mobile: only last item */}
        <div className="sm:hidden block font-medium text-sm text-muted-foreground truncate">
          {items.length > 0 ? items[items.length - 1].label : "Home"}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
