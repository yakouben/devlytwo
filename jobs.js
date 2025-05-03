// Create Job Listing
export async function createJob(companyId, jobData) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      company_id: companyId,
      title: jobData.title,
      description: jobData.description,
      requirements: jobData.requirements,
      skills_required: jobData.skills,
      job_type: jobData.jobType,
      location: jobData.location,
      salary_range: jobData.salaryRange,
      expires_at: jobData.expiresAt
    }]);

  if (error) throw error;
  return data;
}

// Apply for Job
export async function applyForJob(jobId, seekerId) {
  const { data, error } = await supabase
    .from('applications')
    .insert([{
      job_id: jobId,
      seeker_id: seekerId,
      status: 'pending'
    }]);

  if (error) throw error;
  return data;
} 