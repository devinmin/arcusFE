const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface CampaignRequest {
  website: string;
  industry: string;
  brief: string;
}

export interface CampaignResult {
  success: boolean;
  campaignId: string;
  outputFolder: string;
  deliverables: {
    strategicBrief: string | null;
    socialMedia: string | null;
    emailSequence: string | null;
    blogArticle: string | null;
    adCopy: string | null;
    videoScript: string | null;
    images: string[];
  };
  error?: string;
}

export const generateCampaign = async (
  website: string,
  industry: string,
  brief: string
): Promise<CampaignResult> => {
  const response = await fetch(`${API_BASE_URL}/api/campaign/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ website, industry, brief }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Campaign generation failed' }));
    throw new Error(errorData.error || 'Campaign generation failed');
  }

  return response.json();
};
