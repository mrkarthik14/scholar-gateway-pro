
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchTC } from "@/utils/tcGenerator";
import { useToast } from "@/hooks/use-toast";
import { Download, Search } from "lucide-react";

const TCSearch = () => {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tc = await searchTC(admissionNumber, studentId);
      
      if (!tc) {
        toast({
          title: "Not Found",
          description: "No transfer certificate found with the provided details.",
          variant: "destructive",
        });
        return;
      }

      // Download the TC
      const link = document.createElement('a');
      link.href = tc.file_url;
      link.download = tc.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success",
        description: "Transfer certificate downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch TC",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Download Transfer Certificate</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Admission Number
          </label>
          <Input
            id="admissionNumber"
            type="text"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            placeholder="Enter admission number"
            required
          />
        </div>

        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <Input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            "Searching..."
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search & Download TC
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TCSearch;
