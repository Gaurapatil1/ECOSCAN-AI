from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from typing import Optional, Dict, Any
import io
import logging
from datetime import datetime
import uuid

app = FastAPI(title="Carbon Emission Verifier API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CarbonAnalyzer:
    def __init__(self):
        self.industry_standards = {
            "manufacturing": 45000,  # tons CO2/year
            "technology": 15000,
            "energy": 250000,
            "transportation": 80000,
            "retail": 30000,
            "construction": 60000,
            "agriculture": 50000,
            "default": 40000
        }
    
    def analyze_report(self, df: pd.DataFrame, company_name: str, industry: str = "default") -> Dict[str, Any]:
        """Analyze carbon emission report and return verification results"""
        
        try:
            # Calculate total emissions from the data
            total_emissions = self.calculate_total_emissions(df)
            industry_standard = self.industry_standards.get(industry.lower(), self.industry_standards["default"])
            
            # Calculate compliance percentage
            compliance_percentage = max(0, min(100, (1 - abs(total_emissions - industry_standard) / industry_standard) * 100))
            
            # Determine status based on compliance
            if compliance_percentage >= 85:
                status = "verified"
                details = "Report meets industry standards with high accuracy. Emissions data is consistent with expected ranges."
            elif compliance_percentage >= 70:
                status = "warning"
                details = f"Some inconsistencies found. Reported emissions ({total_emissions:,.0f} tons) differ from industry standard ({industry_standard:,.0f} tons). Manual review recommended."
            else:
                status = "rejected"
                details = "Significant discrepancies detected. Reported emissions show major deviations from industry standards. Further investigation required."
            
            return {
                "status": status,
                "percentage": round(compliance_percentage, 1),
                "details": details,
                "total_emissions": total_emissions,
                "industry_standard": industry_standard,
                "analysis_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Analysis error: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Error analyzing report: {str(e)}")
    
    def calculate_total_emissions(self, df: pd.DataFrame) -> float:
        """Calculate total emissions from the dataframe"""
        
        # Look for common emission column names
        emission_columns = ['emissions', 'co2', 'carbon', 'co2_emissions', 'carbon_emissions']
        
        for col in emission_columns:
            if col in df.columns:
                return df[col].sum()
        
        # If no specific emission columns, try to sum numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            return df[numeric_cols].sum().sum()
        
        raise ValueError("No suitable emission data columns found in the uploaded file")

@app.post("/verify-carbon-report")
async def verify_carbon_report(
    company_name: str = Form(...),
    industry: str = Form("default"),
    file: UploadFile = File(...)
):
    """Verify carbon emission report"""
    
    try:
        # Validate file type
        allowed_extensions = ['.csv', '.xlsx', '.xls']
        file_extension = '.' + file.filename.split('.')[-1].lower() if '.' in file.filename else ''
        
        if file_extension not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")
        
        # Read file content
        content = await file.read()
        
        if file_extension == '.csv':
            df = pd.read_csv(io.BytesIO(content))
        else:  # Excel files
            df = pd.read_excel(io.BytesIO(content))
        
        # Analyze the report
        analyzer = CarbonAnalyzer()
        result = analyzer.analyze_report(df, company_name, industry)
        
        logger.info(f"Analysis completed for {company_name}: {result['status']} ({result['percentage']}%)")
        
        return JSONResponse(content=result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)