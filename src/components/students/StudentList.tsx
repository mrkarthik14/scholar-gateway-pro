
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAndStoreTC } from "@/utils/tcGenerator";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  college: string;
  caste: string;
}

interface StudentListProps {
  students: Student[];
  groupBy?: "college" | "caste";
  onGenerateTC?: (studentId: string) => void;
}

const StudentList = ({ students, groupBy, onGenerateTC }: StudentListProps) => {
  const { toast } = useToast();

  const handleGenerateTC = async (student: Student) => {
    try {
      const result = await generateAndStoreTC({
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        college: student.college,
        caste: student.caste,
      });

      toast({
        title: "Success",
        description: "Transfer Certificate generated and stored successfully.",
        className: "bg-success text-white",
      });

      // Download the TC
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Call the parent handler if provided
      if (onGenerateTC) {
        onGenerateTC(student.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate TC",
        variant: "destructive",
      });
    }
  };

  const groupedStudents = groupBy
    ? students.reduce((acc, student) => {
        const key = student[groupBy];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(student);
        return acc;
      }, {} as Record<string, Student[]>)
    : { All: students };

  return (
    <div className="space-y-6">
      {Object.entries(groupedStudents).map(([group, groupStudents]) => (
        <div key={group} className="rounded-lg border bg-white">
          <div className="p-4 border-b">
            <h3 className="font-semibold">
              {groupBy ? `${groupBy === 'college' ? 'College' : 'Caste'}: ${group}` : 'All Students'}
            </h3>
            <p className="text-sm text-secondary/60">
              {groupStudents.length} student(s)
            </p>
          </div>
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  {!groupBy || groupBy === "caste" ? (
                    <TableHead>College</TableHead>
                  ) : null}
                  {!groupBy || groupBy === "college" ? (
                    <TableHead>Caste</TableHead>
                  ) : null}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    {!groupBy || groupBy === "caste" ? (
                      <TableCell>{student.college}</TableCell>
                    ) : null}
                    {!groupBy || groupBy === "college" ? (
                      <TableCell>{student.caste}</TableCell>
                    ) : null}
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateTC(student)}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Generate TC
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
