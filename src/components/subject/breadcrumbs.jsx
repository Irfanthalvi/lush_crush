import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeLabels = {
  "/creamy-range-popsicles": "Creamy Range Popsicles",
  "/icy-range-popsicles": "Icy Range Popsicles",
  "/cake-popsicles": "Cake Popsicles",
  "/greek-yogurt-popsicles": "Greek Yogurt Popsicles",
  "/fruity-blitz-popsicles": "Fruity Blitz Popsicles",
  "/sugar-free-popsicles": "Sugar Free Popsicles",
  "/probiotics-popsicles": "Probiotics Popsicles",
  "/cup-for-one": "Cup For One",
  "/tubs": "Tubs",
  "/jars": "Jars",
  "/sandwich": "Sandwich",
  "/ice-cream-cakes": "Ice Cream Cakes",
  "/boxes": "Boxes",
  "/deals-for-all": "Deals For All",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const items = [];
  if (routeLabels[pathname]) {
    items.push({
      label: routeLabels[pathname],
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
              <Link to="/creamy-range-popsicles" className="text-muted-foreground">Home</Link>
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
