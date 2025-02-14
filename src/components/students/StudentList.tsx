
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                  {onGenerateTC && <TableHead>Actions</TableHead>}
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
                    {onGenerateTC && (
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onGenerateTC(student.id)}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Generate TC
                        </Button>
                      </TableCell>
                    )}
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
