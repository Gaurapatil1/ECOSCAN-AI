from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.ai.analysis import ai_service
import time

router = APIRouter()

class AnalysisRequest(BaseModel):
    description: str
    image_data: Optional[str] = None

class AnalysisResponse(BaseModel):
    material: str
    disposal: str
    impact: str
    alternative: str
    recycling_code: Optional[str] = None
    special_notes: Optional[str] = None
    category: Optional[str] = None
    confidence: Optional[str] = None
    analysis_time: Optional[str] = None
    timestamp: Optional[str] = None

class StatisticsResponse(BaseModel):
    total_analyses: int
    categories_analyzed: int
    service_uptime: str
    ai_engine: str

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_waste(request: AnalysisRequest):
    """Enhanced waste analysis with categorization"""
    start_time = time.time()
    
    try:
        result = ai_service.analyze_waste(request.description)
        return AnalysisResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/demo/{item_type}")
async def demo_analysis(item_type: str):
    """Enhanced demo endpoint"""
    result = ai_service.analyze_waste(item_type)
    return {
        **result,
        "backend_version": "2.0",
        "ai_engine": "Enhanced AI + Smart Categorization"
    }

@router.get("/items")
async def get_supported_items():
    """Get enhanced supported items list"""
    return {
        "supported_categories": [
            "Plastics (all types)",
            "Paper & Cardboard", 
            "Electronics & Batteries",
            "Glass Containers",
            "Metal Cans & Foil",
            "Organic Waste",
            "Hazardous Materials",
            "Textiles & Clothing"
        ],
        "ai_capabilities": [
            "Material identification & categorization",
            "Proper disposal guidance", 
            "Environmental impact assessment",
            "Sustainable alternatives",
            "Recycling code identification",
            "Special handling notes"
        ],
        "features": [
            "Smart categorization",
            "Real-time AI analysis",
            "Historical tracking",
            "Statistics & analytics"
        ]
    }

@router.get("/statistics")
async def get_statistics():
    """Get service statistics"""
    return ai_service.get_statistics()

@router.get("/history")
async def get_recent_history():
    """Get recent analysis history"""
    return ai_service.get_analysis_history()