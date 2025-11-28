// src/services/api.ts
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export interface AnalysisRequest {
  description: string;
  image_data?: string;
}

export interface AnalysisResponse {
  material: string;
  disposal: string;
  impact: string;
  alternative: string;
  analysis_time?: number;
  backend_version?: string;
  ai_engine?: string;
  // Add the new optional fields from enhanced backend
  recycling_code?: string;
  special_notes?: string;
  category?: string;
  confidence?: string;
  timestamp?: string;
}

export interface HealthResponse {
  status: string;
  service?: string;
  error?: string;
}

export interface DemoResponse extends AnalysisResponse {
  backend_version: string;
  ai_engine: string;
}

export interface StatisticsResponse {
  total_analyses: number;
  categories_analyzed: number;
  service_uptime: string;
  ai_engine: string;
}

export interface HistoryItem {
  description: string;
  result: AnalysisResponse;
  timestamp: string;
}

class ApiService {
  // Analyze waste item
  async analyzeWaste(description: string): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<HealthResponse> {
    try {
      const response = await fetch(`http://127.0.0.1:8000/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Demo analysis
  async demoAnalysis(itemType: string): Promise<DemoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/demo/${itemType}`);
      if (!response.ok) {
        throw new Error(`Demo analysis failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Demo analysis error:', error);
      throw error;
    }
  }

  // Get supported items
  async getSupportedItems(): Promise<{
    supported_categories: string[];
    ai_capabilities: string[];
    features: string[];
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`Items fetch failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Items fetch error:', error);
      throw error;
    }
  }

  // Get statistics
  async getStatistics(): Promise<StatisticsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/statistics`);
      if (!response.ok) {
        throw new Error(`Statistics fetch failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Statistics fetch error:', error);
      throw error;
    }
  }

  // Get history
  async getHistory(): Promise<HistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      if (!response.ok) {
        throw new Error(`History fetch failed: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('History fetch error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();