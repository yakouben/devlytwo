// Update Seeker Profile
export async function updateSeekerProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('seeker_profiles')
    .update({
      headline: profileData.headline,
      bio: profileData.bio,
      skills: profileData.skills,
      experience_years: profileData.experienceYears,
      education: profileData.education,
      location: profileData.location,
      preferred_job_type: profileData.preferredJobType,
      linkedin_url: profileData.linkedinUrl
    })
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

// Update Company Profile
export async function updateCompanyProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('company_profiles')
    .update({
      company_name: profileData.companyName,
      industry: profileData.industry,
      size: profileData.size,
      website: profileData.website,
      location: profileData.location,
      description: profileData.description
    })
    .eq('user_id', userId);

  if (error) throw error;
  return data;
} 