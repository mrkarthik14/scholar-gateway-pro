
import { supabase } from "@/integrations/supabase/client";

interface TCData {
  studentId: string;
  studentName: string;
  rollNumber: string;
  college: string;
  caste: string;
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

    // Store in local storage
    const localTCs = JSON.parse(localStorage.getItem('transfer_certificates') || '[]');
    localTCs.push({
      studentId: studentData.studentId,
      fileName,
      url: publicUrl,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('transfer_certificates', JSON.stringify(localTCs));

    return {
      fileName,
      url: publicUrl,
    };
  } catch (error) {
    console.error('Error generating TC:', error);
    throw error;
  }
};

export const getStoredTCs = () => {
  return JSON.parse(localStorage.getItem('transfer_certificates') || '[]');
};
