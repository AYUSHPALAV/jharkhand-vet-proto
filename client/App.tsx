import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Navigation } from "./components/ui/navigation";
import Index from "./pages/Index";
import ReportIssues from "./pages/ReportIssues";
import BookVisit from "./pages/BookVisit";
import ApplySchemes from "./pages/ApplySchemes";
import WildlifeReport from "./pages/WildlifeReport";
import DoctorPortal from "./pages/DoctorPortal";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/report-issues" element={<ReportIssues />} />
            <Route path="/book-visit" element={<BookVisit />} />
            <Route path="/schemes" element={<ApplySchemes />} />
            <Route path="/wildlife-report" element={<WildlifeReport />} />
            <Route path="/doctor-portal" element={<DoctorPortal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
