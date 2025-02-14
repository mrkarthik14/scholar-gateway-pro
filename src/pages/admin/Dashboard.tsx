
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  BookOpen,
  FileText,
  BarChart,
  LogOut,
} from "lucide-react";
import StudentRegistrationForm from "@/components/students/StudentRegistrationForm";
import StudentList from "@/components/students/StudentList";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockStudents = [
  { id: "1", name: "John Doe", rollNumber: "001", college: "Engineering College", caste: "General" },
  { id: "2", name: "Jane Smith", rollNumber: "002", college: "Medical College", caste: "OBC" },
  { id: "3", name: "Alice Johnson", rollNumber: "003", college: "Engineering College", caste: "SC" },
  { id: "4", name: "Bob Wilson", rollNumber: "004", college: "Arts College", caste: "General" },
];

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<
    "registration" | "collegeList" | "casteList" | "analytics"
  >("registration");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGenerateTC = (studentId: string) => {
    // Simulate TC generation
    toast({
      title: "Success",
      description: `Transfer Certificate generated for student ID: ${studentId}`,
      className: "bg-success text-white",
    });
  };

  const renderContent = () => {
    switch (activeView) {
      case "registration":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-display font-bold text-secondary mb-6">
              Student Registration
            </h2>
            <StudentRegistrationForm />
          </div>
        );
      case "collegeList":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-secondary">
              College-wise Student List
            </h2>
            <StudentList
              students={mockStudents}
              groupBy="college"
              onGenerateTC={handleGenerateTC}
            />
          </div>
        );
      case "casteList":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-secondary">
              Caste-wise Student List
            </h2>
            <StudentList
              students={mockStudents}
              groupBy="caste"
              onGenerateTC={handleGenerateTC}
            />
          </div>
        );
      default:
        return null;
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            onClick={() => setActiveView("registration")}
            className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in cursor-pointer ${
              activeView === "registration" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Students</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Registration
                </h3>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveView("collegeList")}
            className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in cursor-pointer ${
              activeView === "collegeList" ? "ring-2 ring-success" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-success/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">College-wise</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Student List
                </h3>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveView("casteList")}
            className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in cursor-pointer ${
              activeView === "casteList" ? "ring-2 ring-error" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-error/10 rounded-lg">
                <BarChart className="w-6 h-6 text-error" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary/60">Caste-wise</p>
                <h3 className="text-lg font-semibold text-secondary">
                  Student List
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
                  Certificates
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
