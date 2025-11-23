const API_BASE_URL = 'http://localhost:5000/api';

export interface GenerateWebsiteRequest {
  type: string;
  description: string;
  theme: string;
}

export interface GenerateWebsiteResponse {
  success: boolean;
  website?: string;
  error?: string;
}

export async function generateWebsite(
  data: GenerateWebsiteRequest
): Promise<GenerateWebsiteResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate website',
    };
  }
}


