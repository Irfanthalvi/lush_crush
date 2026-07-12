import { Suspense, lazy, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import NotFound from "@/components/subject/not-found";

// Lazy loaded components
const AuthLayout = lazy(() => import("@/layouts/auth-layout.jsx"));
const DashboardLayout = lazy(() => import("@/layouts/dashboard-layout.jsx"));
const LoginPage = lazy(() => import("@/Auth-layout/layout.jsx"));
const CreamyRangePopsicles = lazy(() => import("@/student-layout/creamy-range-popsicles.jsx"));
const IcyRangePopsicles = lazy(() => import("@/student-layout/icy-range-popsicles.jsx"));
const CakePopsicles = lazy(() => import("@/student-layout/cake-popsicles.jsx"));
const GreekYogurtPopsicles = lazy(() => import("@/student-layout/greek-yogurt-popsicles.jsx"));
const FruityBlitzPopsicles = lazy(() => import("@/student-layout/fruity-blitz-popsicles.jsx"));
const SugarFreePopsicles = lazy(() => import("@/student-layout/sugar-free-popsicles.jsx"));
const ProbioticsPopsicles = lazy(() => import("@/student-layout/probiotics-popsicles.jsx"));
const CupForOne = lazy(() => import("@/student-layout/cup-for-one.jsx"));
const Tubs = lazy(() => import("@/student-layout/tubs.jsx"));
const Jars = lazy(() => import("@/student-layout/jars.jsx"));
const Sandwich = lazy(() => import("@/student-layout/sandwich.jsx"));
const IceCreamCakes = lazy(() => import("@/student-layout/ice-cream-cakes.jsx"));
const Boxes = lazy(() => import("@/student-layout/boxes.jsx"));
const DealsForAll = lazy(() => import("@/student-layout/deals-for-all.jsx"));

// 📌 Centralized Titles + Descriptions
const titlesConfig = [
  {
    path: "/",
    title: "Login",
    description: "Login to access your School System dashboard.",
  },
  {
    path: "/login",
    title: "Login",
    description: "Login to access your School System dashboard.",
  },
  {
    path: "/register",
    title: "Register",
    description: "Create your School System account.",
  },
  {
    path: "/forget",
    title: "Forgot Password",
    description: "Recover your School System account.",
  },
  {
    path: "/otp",
    title: "Verify OTP",
    description: "Verify your identity using OTP.",
  },
  {
    path: "/creamy-range-popsicles",
    title: "Creamy Range Popsicles",
    description: "Browse all Creamy Range Popsicles.",
  },
  {
    path: "/icy-range-popsicles",
    title: "Icy Range Popsicles",
    description: "Browse all Icy Range Popsicles.",
  },
  {
    path: "/cake-popsicles",
    title: "Cake Popsicles",
    description: "Browse all Cake Popsicles.",
  },
  {
    path: "/greek-yogurt-popsicles",
    title: "Greek Yogurt Popsicles",
    description: "Browse all Greek Yogurt Popsicles.",
  },
  {
    path: "/fruity-blitz-popsicles",
    title: "Fruity Blitz Popsicles",
    description: "Browse all Fruity Blitz Popsicles.",
  },
  {
    path: "/sugar-free-popsicles",
    title: "Sugar Free Popsicles",
    description: "Browse all Sugar Free Popsicles.",
  },
  {
    path: "/probiotics-popsicles",
    title: "Probiotics Popsicles",
    description: "Browse all Probiotics Popsicles.",
  },
  {
    path: "/cup-for-one",
    title: "Cup For One",
    description: "Browse all Cups For One.",
  },
  {
    path: "/tubs",
    title: "Tubs",
    description: "Browse all Tubs.",
  },
  {
    path: "/jars",
    title: "Jars",
    description: "Browse all Jars.",
  },
  {
    path: "/sandwich",
    title: "Sandwich",
    description: "Browse all Sandwich ice creams.",
  },
  {
    path: "/ice-cream-cakes",
    title: "Ice Cream Cakes",
    description: "Browse all Ice Cream Cakes.",
  },
  {
    path: "/boxes",
    title: "Boxes",
    description: "Browse all Boxes.",
  },
  {
    path: "/deals-for-all",
    title: "Deals For All",
    description: "Browse all Deals For All.",
  },
];

// 📌 Title Manager Component
function TitleManager() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const path = location.pathname;
    let title = "School System";
    let description = "School System dashboard and learning platform.";

    // Exact matches first
    const found = titlesConfig.find((item) => item.path === path);
    if (found) {
      title = found.title;
      description = found.description;
    }



    // ✅ Set document.title
    document.title = title;

    // ✅ Update meta description
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [location, params]);

  return null;
}

// 📌 Route Change Loading Bar
function RouteChangeLoader({ loadingBarRef }) {
  const location = useLocation();

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const timeout = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 400);
    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}

// 📌 App Router Wrapper
function AppRoutes({ loadingBarRef }) {
  return (
    <>
      <RouteChangeLoader loadingBarRef={loadingBarRef} />
      <TitleManager />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-xl">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginPage activeForm="login" />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <LoginPage activeForm="register" />
              </AuthLayout>
            }
          />
          <Route
            path="/forget"
            element={
              <AuthLayout>
                <LoginPage activeForm="forget" />
              </AuthLayout>
            }
          />
          <Route
            path="/otp"
            element={
              <AuthLayout>
                <LoginPage activeForm="otp" />
              </AuthLayout>
            }
          />
          <Route
            path="/subjects"
            element={<Navigate to="/creamy-range-popsicles" replace />}
          />
          <Route
            path="/creamy-range-popsicles"
            element={
              <DashboardLayout>
                <CreamyRangePopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/icy-range-popsicles"
            element={
              <DashboardLayout>
                <IcyRangePopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/cake-popsicles"
            element={
              <DashboardLayout>
                <CakePopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/greek-yogurt-popsicles"
            element={
              <DashboardLayout>
                <GreekYogurtPopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/fruity-blitz-popsicles"
            element={
              <DashboardLayout>
                <FruityBlitzPopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/sugar-free-popsicles"
            element={
              <DashboardLayout>
                <SugarFreePopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/probiotics-popsicles"
            element={
              <DashboardLayout>
                <ProbioticsPopsicles />
              </DashboardLayout>
            }
          />
          <Route
            path="/cup-for-one"
            element={
              <DashboardLayout>
                <CupForOne />
              </DashboardLayout>
            }
          />
          <Route
            path="/tubs"
            element={
              <DashboardLayout>
                <Tubs />
              </DashboardLayout>
            }
          />
          <Route
            path="/jars"
            element={
              <DashboardLayout>
                <Jars />
              </DashboardLayout>
            }
          />
          <Route
            path="/sandwich"
            element={
              <DashboardLayout>
                <Sandwich />
              </DashboardLayout>
            }
          />
          <Route
            path="/ice-cream-cakes"
            element={
              <DashboardLayout>
                <IceCreamCakes />
              </DashboardLayout>
            }
          />
          <Route
            path="/boxes"
            element={
              <DashboardLayout>
                <Boxes />
              </DashboardLayout>
            }
          />
          <Route
            path="/deals-for-all"
            element={
              <DashboardLayout>
                <DealsForAll />
              </DashboardLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

// ✅ Final App component
function App() {
  const loadingBarRef = useRef(null);

  return (
    <Router>
      <LoadingBar
        color="var(--primary)"
        ref={loadingBarRef}
        height={2}
        shadow={true}
      />
      <AppRoutes loadingBarRef={loadingBarRef} />
    </Router>
  );
}

export default App;
