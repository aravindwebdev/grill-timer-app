
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimerProvider } from "./contexts/TimerContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TimerDashboard from "./pages/TimerDashboard";
import PresetSelection from "./pages/PresetSelection";
import CustomTimer from "./pages/CustomTimer";
import GrillingGuide from "./pages/GrillingGuide";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <SettingsProvider>
          <TimerProvider>
            <Toaster />
            <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/timers" element={<TimerDashboard />} />
                <Route path="/presets" element={<PresetSelection />} />
                <Route path="/custom" element={<CustomTimer />} />
                <Route path="/guide" element={<GrillingGuide />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TimerProvider>
      </SettingsProvider>
    </TooltipProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
