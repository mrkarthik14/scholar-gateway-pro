
import { supabase } from "@/integrations/supabase/client";

interface TCData {
  studentId: string;
  studentName: string;
  rollNumber: string;
  college: string;
  caste: string;
}

interface TCRecord {
  id: string;
  student_id: string;
  admission_number: string;
  file_name: string;
  file_url: string;
  created_at: string;
}

export const generateAndStoreTC = async (studentData: TCData) => {
  try {
    // Generate TC content (this is a basic example - customize as needed)
    const tcContent = `
      TRANSFER CERTIFICATE
      ===================
      
      Student ID: ${studentData.studentId}
      Name: ${studentData.studentName}
      Roll Number: ${studentData.rollNumber}
      College: ${studentData.college}
      Caste: ${studentData.caste}
      
      Date of Issue: ${new Date().toLocaleDateString()}
    `;

    // Create a Blob from the TC content
    const tcBlob = new Blob([tcContent], { type: 'text/plain' });
    const fileName = `TC_${studentData.studentId}_${Date.now()}.txt`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('transfer_certificates')
      .upload(fileName, tcBlob);

    if (uploadError) {
      throw new Error(`Failed to upload TC: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('transfer_certificates')
      .getPublicUrl(fileName);

    // Store in database
    const { data: tcRecord, error: dbError } = await supabase
      .from('transfer_certificates')
      .insert({
        student_id: studentData.studentId,
        admission_number: studentData.rollNumber,
        file_name: fileName,
        file_url: publicUrl,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Failed to store TC record: ${dbError.message}`);
    }

    return {
      fileName,
      url: publicUrl,
    };
  } catch (error) {
    console.error('Error generating TC:', error);
    throw error;
  }
};

export const searchTC = async (admissionNumber: string, studentId: string): Promise<TCRecord | null> => {
  const { data, error } = await supabase
    .from('transfer_certificates')
    .select()
    .eq('admission_number', admissionNumber)
    .eq('student_id', studentId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch TC: ${error.message}`);
  }

  return data;
};
