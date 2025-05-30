
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface StudentData {
  courses: string;
  admissionNo: string;
  uniqueId: string;
  studentName: string;
  surname: string;
  fatherName: string;
  motherName: string;
  address1: string;
  address2: string;
  address3: string;
  town: string;
  state: string;
  dateOfBirth: string;
  phoneNumber: string;
  emailId: string;
  caste: string;
  subcaste: string;
  nationality: string;
  religion: string;
  gender: string;
  college: string;
  dateOfAdmission: string;
  dateOfLeaving: string;
  oldTcNo: string;
  aadharNumber: string;
  numberOfTcIssued: string;
  dateOfTcIssued: string;
  remarks: string;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const CASTE_OPTIONS = ["General", "OBC", "SC", "ST"];
const SUBCASTE_OPTIONS = ["N/A", "A", "B", "C", "D", "E"];
const NATIONALITY_OPTIONS = ["Indian", "Other"];
const RELIGION_OPTIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const STATE_OPTIONS = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
const TOWN_OPTIONS = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", 
  "Ahmedabad", "Surat", "Jaipur", "Other"
];
const COURSES_OPTIONS = [
  "Computer Science", "Mechanical Engineering", "Electrical Engineering",
  "Civil Engineering", "Electronics Engineering", "Information Technology",
  "Chemical Engineering", "Biotechnology"
];

const StudentRegistrationForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StudentData>({
    courses: "",
    admissionNo: "",
    uniqueId: "",
    studentName: "",
    surname: "",
    fatherName: "",
    motherName: "",
    address1: "",
    address2: "",
    address3: "",
    town: "",
    state: "",
    dateOfBirth: "",
    phoneNumber: "",
    emailId: "",
    caste: "",
    subcaste: "",
    nationality: "",
    religion: "",
    gender: "",
    college: "",
    dateOfAdmission: "",
    dateOfLeaving: "",
    oldTcNo: "",
    aadharNumber: "",
    numberOfTcIssued: "",
    dateOfTcIssued: "",
    remarks: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const admissionDate = new Date(formData.dateOfAdmission);
    const leavingDate = formData.dateOfLeaving ? new Date(formData.dateOfLeaving) : null;
    
    if (leavingDate && leavingDate <= admissionDate) {
      toast({
        title: "Error",
        description: "Date of leaving must be after date of admission",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Success",
        description: "Student registration completed successfully",
        className: "bg-success text-white",
      });
      
      // Reset form
      setFormData({
        courses: "",
        admissionNo: "",
        uniqueId: "",
        studentName: "",
        surname: "",
        fatherName: "",
        motherName: "",
        address1: "",
        address2: "",
        address3: "",
        town: "",
        state: "",
        dateOfBirth: "",
        phoneNumber: "",
        emailId: "",
        caste: "",
        subcaste: "",
        nationality: "",
        religion: "",
        gender: "",
        college: "",
        dateOfAdmission: "",
        dateOfLeaving: "",
        oldTcNo: "",
        aadharNumber: "",
        numberOfTcIssued: "",
        dateOfTcIssued: "",
        remarks: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register student",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "dateOfTcIssued") {
      const currentDate = new Date().toISOString().split('T')[0];
      setFormData((prev) => ({
        ...prev,
        dateOfTcIssued: currentDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      dateOfTcIssued: currentDate,
    }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="admissionNo">Admission No</Label>
          <Input
            id="admissionNo"
            name="admissionNo"
            value={formData.admissionNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uniqueId">Unique ID</Label>
          <Input
            id="uniqueId"
            name="uniqueId"
            value={formData.uniqueId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="courses">Courses</Label>
          <select
            id="courses"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Course</option>
            {COURSES_OPTIONS.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's Name</Label>
          <Input
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motherName">Mother's Name</Label>
          <Input
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailId">Email ID</Label>
          <Input
            id="emailId"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address1">Address Line 1</Label>
          <Input
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address3">Address Line 3</Label>
          <Input
            id="address3"
            name="address3"
            value={formData.address3}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="town">Town</Label>
          <select
            id="town"
            name="town"
            value={formData.town}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Town</option>
            {TOWN_OPTIONS.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select State</option>
            {STATE_OPTIONS.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <select
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Nationality</option>
            {NATIONALITY_OPTIONS.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <select
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Religion</option>
            {RELIGION_OPTIONS.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="caste">Caste</Label>
          <select
            id="caste"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Caste</option>
            {CASTE_OPTIONS.map((caste) => (
              <option key={caste} value={caste}>
                {caste}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcaste">Subcaste</Label>
          <select
            id="subcaste"
            name="subcaste"
            value={formData.subcaste}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Subcaste</option>
            {SUBCASTE_OPTIONS.map((subcaste) => (
              <option key={subcaste} value={subcaste}>
                {subcaste}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Input
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfAdmission">Date of Admission</Label>
          <Input
            id="dateOfAdmission"
            name="dateOfAdmission"
            type="date"
            value={formData.dateOfAdmission}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfLeaving">Date of Leaving</Label>
          <Input
            id="dateOfLeaving"
            name="dateOfLeaving"
            type="date"
            value={formData.dateOfLeaving}
            onChange={handleChange}
            min={formData.dateOfAdmission}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Number</Label>
          <Input
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="oldTcNo">Old TC Number</Label>
          <Input
            id="oldTcNo"
            name="oldTcNo"
            value={formData.oldTcNo}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfTcIssued">Number of TC Issued</Label>
          <Input
            id="numberOfTcIssued"
            name="numberOfTcIssued"
            value={formData.numberOfTcIssued}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfTcIssued">Date of TC Issued</Label>
          <Input
            id="dateOfTcIssued"
            name="dateOfTcIssued"
            type="date"
            value={formData.dateOfTcIssued}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="space-y-2 md:col-span-3">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          "Register Student"
        )}
      </Button>
    </form>
  );
};

export default StudentRegistrationForm;
