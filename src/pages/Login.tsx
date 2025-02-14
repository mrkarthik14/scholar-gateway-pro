
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound, Building2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "admin">("student");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (username && password) {
        login(selectedRole);
        toast({
          title: "Success",
          description: "Welcome back! You've been successfully logged in.",
          className: "bg-success text-white",
        });
        navigate(selectedRole === "admin" ? "/admin/dashboard" : "/student/dashboard");
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-secondary mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary/60">
            Sign in to access your portal
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedRole("student")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                selectedRole === "student"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              <UserRound className="w-6 h-6 mx-auto mb-2 text-primary" />
              <span className="block text-sm font-medium text-secondary">
                Student
              </span>
            </button>
            <button
              onClick={() => setSelectedRole("admin")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                selectedRole === "admin"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
              <span className="block text-sm font-medium text-secondary">
                Admin
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-secondary mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
