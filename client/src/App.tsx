import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/not-found";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostJob from "./pages/PostJob";
import JoinAsEditor from "./pages/JoinAsEditor";
import About from "./pages/About";
import JobsList from "./pages/JobsList";
import JobDetails from "./pages/JobDetails";
import EditorsList from "./pages/EditorsList";
import EditorProfile from "./pages/EditorProfile";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/post-job" component={PostJob} />
      <Route path="/join-as-editor" component={JoinAsEditor} />
      <Route path="/about" component={About} />
      <Route path="/jobs" component={JobsList} />
      <Route path="/jobs/:id" component={JobDetails} />
      <Route path="/editors" component={EditorsList} />
      <Route path="/editors/:id" component={EditorProfile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
