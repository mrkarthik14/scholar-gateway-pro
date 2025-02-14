
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  BookOpen,
  FileText,
  BarChart,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-display font-bold text-secondary">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-secondary/60 hover:text-secondary transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Students</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Manage Students
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 bg-success/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Courses</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Course Management
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 bg-error/10 rounded-lg">
                <BarChart className="w-6 h-6 text-error" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Analytics</p>
                <h3 className="text-lg font-semibold text-secondary">
                  View Reports
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Documents</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Manage Files
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
