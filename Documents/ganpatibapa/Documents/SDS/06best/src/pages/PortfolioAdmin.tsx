import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, Shield, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortfolioCMS from "../components/sections/PortfolioCMS";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PortfolioAdmin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showStats, setShowStats] = useState(true);

  // Simple password protection (in production, use proper authentication)
  const handleLogin = () => {
    if (password === "ShrushP") {
      setIsAuthenticated(true);
      localStorage.setItem("portfolio_admin_auth", "true");
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("portfolio_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("portfolio_admin_auth");
    setPassword("");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="elegant-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-beige/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-beige" />
              </div>
              <CardTitle className="text-2xl text-beige">
                Portfolio Admin
              </CardTitle>
              <p className="text-gray-400">Enter password to access the CMS</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <Button onClick={handleLogin} className="w-full elegant-button">
                Login to CMS
              </Button>
              <div className="text-center">
                <Button
                  onClick={() => navigate("/")}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-beige"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Admin Header */}
      <div className="border-b border-beige/20 bg-charcoal/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/work")}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-beige"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
              <div className="h-6 w-px bg-beige/20" />
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-beige" />
                <h1 className="text-xl font-bold text-beige">
                  Portfolio Admin
                </h1>
                <Badge variant="secondary" className="text-xs">
                  CMS
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowStats(!showStats)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-beige"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showStats ? "Hide" : "Show"} Stats
              </Button>

              <Button
                onClick={() => window.open("/work", "_blank")}
                variant="outline"
                size="sm"
                className="border-beige/20 text-beige hover:bg-beige/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Site
              </Button>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {showStats && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-b border-beige/10 bg-charcoal/30"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-charcoal/50 border-beige/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-beige mb-1">12</div>
                  <div className="text-sm text-gray-400">Total Projects</div>
                </CardContent>
              </Card>
              <Card className="bg-charcoal/50 border-beige/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    8
                  </div>
                  <div className="text-sm text-gray-400">Published</div>
                </CardContent>
              </Card>
              <Card className="bg-charcoal/50 border-beige/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    3
                  </div>
                  <div className="text-sm text-gray-400">Drafts</div>
                </CardContent>
              </Card>
              <Card className="bg-charcoal/50 border-beige/10">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    24
                  </div>
                  <div className="text-sm text-gray-400">
                    Before/After Images
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}

      {/* CMS Content */}
      <PortfolioCMS />

      {/* Footer */}
      <div className="border-t border-beige/20 bg-charcoal/50 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Portfolio CMS v1.0 - Manage your portfolio projects and before/after
            comparisons
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAdmin;
