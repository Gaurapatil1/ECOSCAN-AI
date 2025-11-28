from typing import Dict, Any, List
import requests
import os
import json
from datetime import datetime

class EnhancedAIService:
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY", "your_groq_api_key_here")
        self.analysis_history: List[Dict] = []
    
    def analyze_waste(self, description: str) -> Dict[str, Any]:
        """Enhanced waste analysis with better categorization"""
        start_time = datetime.now()
        
        try:
            # First, try to categorize the item
            category = self._categorize_item(description)
            
            # Get detailed analysis based on category
            if self.groq_api_key and self.groq_api_key != "your_groq_api_key_here":
                result = self._ai_analysis(description, category)
            else:
                result = self._smart_demo_analysis(description, category)
            
            # Add metadata
            result.update({
                "category": category,
                "confidence": "high",
                "analysis_time": f"{(datetime.now() - start_time).total_seconds():.2f}s",
                "timestamp": datetime.now().isoformat()
            })
            
            # Store in history
            self.analysis_history.append({
                "description": description,
                "result": result,
                "timestamp": datetime.now().isoformat()
            })
            
            return result
            
        except Exception as e:
            return self._fallback_analysis(description, str(e))
    
    def _categorize_item(self, description: str) -> str:
        """Categorize item into waste types"""
        desc_lower = description.lower()
        
        categories = {
            "plastic": ["plastic", "bottle", "container", "packaging", "wrapper", "bag"],
            "paper": ["paper", "cardboard", "box", "newspaper", "magazine", "carton"],
            "electronic": ["battery", "electronic", "phone", "laptop", "cable", "charger", "device"],
            "glass": ["glass", "jar", "bottle", "container"],
            "metal": ["metal", "can", "aluminum", "tin", "foil", "container"],
            "organic": ["food", "fruit", "vegetable", "compost", "organic", "leftover"],
            "hazardous": ["chemical", "paint", "oil", "aerosol", "cleaner", "toxic"],
            "textile": ["cloth", "fabric", "clothing", "textile", "garment"]
        }
        
        for category, keywords in categories.items():
            if any(keyword in desc_lower for keyword in keywords):
                return category
        
        return "general"
    
    def _ai_analysis(self, description: str, category: str) -> Dict[str, Any]:
        """Enhanced AI analysis with better prompting"""
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""As an environmental waste management expert, analyze this item: "{description}"
Category: {category}

Provide comprehensive analysis in this EXACT JSON format:
{{
    "material": "detailed material composition",
    "disposal": "specific disposal instructions", 
    "impact": "environmental impact analysis",
    "alternative": "practical sustainable alternative",
    "recycling_code": "if applicable",
    "special_notes": "any important warnings or tips"
}}

Be precise, practical, and environmentally conscious."""
        
        data = {
            "messages": [{"role": "user", "content": prompt}],
            "model": "llama3-8b-8192",
            "temperature": 0.2,
            "max_tokens": 600
        }
        
        response = requests.post(url, headers=headers, json=data, timeout=30)
        
        if response.status_code == 200:
            result_text = response.json()["choices"][0]["message"]["content"]
            return self._parse_ai_response(result_text, category)
        else:
            raise Exception(f"API call failed: {response.status_code}")
    
    def _smart_demo_analysis(self, description: str, category: str) -> Dict[str, Any]:
        """Smart demo analysis with category-based responses"""
        base_response = {
            "material": "Various materials",
            "disposal": "Check local guidelines",
            "impact": "Proper disposal reduces environmental harm",
            "alternative": "Reduce consumption and choose reusable options",
            "recycling_code": "N/A",
            "special_notes": "Consult local waste management authority"
        }
        
        category_responses = {
            "plastic": {
                "material": "Plastic polymer (check recycling symbols 1-7)",
                "disposal": "Recycling bin if clean, otherwise general waste",
                "impact": "Reduces petroleum consumption and ocean pollution",
                "alternative": "Use reusable containers and bags",
                "recycling_code": "♳ ♴ ♵ ♶ ♷ ♸ ♹",
                "special_notes": "Rinse containers before recycling"
            },
            "paper": {
                "material": "Cellulose fibers from wood pulp",
                "disposal": "Recycling bin if dry and clean",
                "impact": "Saves trees and reduces landfill methane",
                "alternative": "Digital documents and reusable notebooks",
                "recycling_code": "PAP",
                "special_notes": "No food contamination for recycling"
            },
            "electronic": {
                "material": "Mixed metals, plastics, and chemicals",
                "disposal": "E-waste recycling facility only",
                "impact": "Prevents heavy metal soil contamination",
                "alternative": "Repair, upgrade, or donate when possible",
                "recycling_code": "WEEE",
                "special_notes": "Never dispose in regular trash - contains toxins"
            },
            "glass": {
                "material": "Silica sand, soda ash, limestone",
                "disposal": "Glass recycling bin",
                "impact": "Infinitely recyclable without quality loss",
                "alternative": "Reuse jars for storage or crafts",
                "recycling_code": "GL",
                "special_notes": "Rinse and remove lids before recycling"
            }
        }
        
        return {**base_response, **category_responses.get(category, {})}
    
    def _parse_ai_response(self, response: str, category: str) -> Dict[str, Any]:
        """Parse AI response with error handling"""
        try:
            if "{" in response and "}" in response:
                json_start = response.find("{")
                json_end = response.rfind("}") + 1
                json_str = response[json_start:json_end]
                result = json.loads(json_str)
                
                # Validate required fields
                required = ["material", "disposal", "impact", "alternative"]
                if all(field in result for field in required):
                    # Ensure optional fields have defaults
                    result.setdefault("recycling_code", "N/A")
                    result.setdefault("special_notes", "")
                    return result
            
            return self._smart_demo_analysis(response, category)
        except:
            return self._smart_demo_analysis(response, category)
    
    def _fallback_analysis(self, description: str, error: str) -> Dict[str, Any]:
        """Comprehensive fallback analysis"""
        return {
            "material": "Unable to determine - manual inspection needed",
            "disposal": "Consult local waste management guidelines",
            "impact": "Proper identification ensures correct disposal",
            "alternative": "Contact local environmental agency for guidance",
            "recycling_code": "Unknown",
            "special_notes": f"Analysis error: {error}",
            "category": "unknown",
            "confidence": "low"
        }
    
    def get_analysis_history(self) -> List[Dict]:
        """Get analysis history"""
        return self.analysis_history[-10:]  # Last 10 analyses
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get service statistics"""
        return {
            "total_analyses": len(self.analysis_history),
            "categories_analyzed": len(set(
                item['result'].get('category', 'unknown') 
                for item in self.analysis_history
            )),
            "service_uptime": "100%",
            "ai_engine": "Groq LLM + Enhanced Categorization"
        }

# Global instance
ai_service = EnhancedAIService()