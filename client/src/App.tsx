/* ============================================================
   AdvanseIT App — "Fluid Intelligence" Design System
   Light theme (white sections) with dark navy accents
   ============================================================ */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CookieConsent from "./components/CookieConsent";
import BackToTop from "./components/BackToTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
// Lazy-loaded: pulls in the Tiptap rich text editor, which is only needed
// on this one admin route — keeps it out of the public site's main bundle.
const PostEditor = lazy(() => import("./pages/admin/PostEditor"));
import WebDesignPage from "./pages/services/WebDesign";
import AppDevelopmentPage from "./pages/services/AppDevelopment";
import CustomSoftwarePage from "./pages/services/CustomSoftware";
import AISolutionsPage from "./pages/services/AISolutions";
import TestingPage from "./pages/services/Testing";
import ITStaffingPage from "./pages/services/ITStaffing";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import SecurityCompliance from "./pages/SecurityCompliance";

function Router() {
  return (
    <>
    <ScrollToTop />
    <Analytics />
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/posts/new"}>
        <Suspense fallback={null}><PostEditor /></Suspense>
      </Route>
      <Route path={"/admin/posts/:id/edit"}>
        <Suspense fallback={null}><PostEditor /></Suspense>
      </Route>
      <Route path={"/services/web-design"} component={WebDesignPage} />
      <Route path={"/services/app-development"} component={AppDevelopmentPage} />
      <Route path={"/services/custom-software"} component={CustomSoftwarePage} />
      <Route path={"/services/ai-solutions"} component={AISolutionsPage} />
      <Route path={"/services/testing"} component={TestingPage} />
      <Route path={"/services/it-staffing"} component={ITStaffingPage} />
      <Route path={"/terms"} component={TermsAndConditions} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/cookies"} component={CookiePolicy} />
      <Route path={"/security"} component={SecurityCompliance} />
      <Route path={"/training"}>
        {() => { window.location.replace("https://training.advanseit.com.au"); return null; }}
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* Cookie consent banner — shown on first visit */}
          <CookieConsent />
          {/* Back-to-top floating button — appears after 400px scroll */}
          <BackToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
