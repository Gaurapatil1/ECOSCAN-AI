# app.py - UPDATED TO CONNECT WITH BACKEND
import streamlit as st
from PIL import Image
import requests
import json
import time

st.set_page_config(
    page_title="EcoScanAI - Hackathon Winner",
    page_icon="🌍",
    layout="centered"
)

# Backend API URL
BACKEND_URL = "http://127.0.0.1:8000/api/v1"

st.title("🌍 EcoScanAI")
st.subheader("AI-Powered Environmental Companion")
st.markdown("**Snap → Analyze → Act** - Win Your Hackathon!")

# Initialize session state
if 'test_item' not in st.session_state:
    st.session_state.test_item = ""
if 'last_picture' not in st.session_state:
    st.session_state.last_picture = None
if 'auto_analyze' not in st.session_state:
    st.session_state.auto_analyze = False

def analyze_with_backend(description):
    """Call backend API for analysis"""
    try:
        response = requests.post(
            f"{BACKEND_URL}/analyze",
            json={"description": description},
            timeout=30
        )
        if response.status_code == 200:
            return response.json()
        else:
            st.error(f"Backend error: {response.status_code}")
            return None
    except requests.exceptions.ConnectionError:
        st.error("⚠️ Backend server not running! Start the backend first.")
        return None
    except Exception as e:
        st.error(f"Connection error: {str(e)}")
        return None

def demo_analysis(description):
    """Fallback demo analysis"""
    demo_data = {
        "plastic bottle": {
            "material": "Plastic (PET)",
            "disposal": "Recycling", 
            "impact": "Reduces ocean pollution and saves energy",
            "alternative": "Use a reusable water bottle"
        },
        "pizza box": {
            "material": "Cardboard (greasy)",
            "disposal": "Compost",
            "impact": "Prevents recycling contamination", 
            "alternative": "Remove clean lid for recycling"
        },
        "battery": {
            "material": "Electronic waste",
            "disposal": "E-waste facility",
            "impact": "Prevents toxic soil contamination",
            "alternative": "Use rechargeable batteries"
        }
    }
    
    description_lower = description.lower()
    for item, analysis in demo_data.items():
        if item in description_lower:
            return analysis
    
    return {
        "material": "Various",
        "disposal": "Check local guidelines",
        "impact": "Proper disposal helps environment", 
        "alternative": "Reduce, reuse, recycle"
    }

# Main App Interface
st.markdown("### 📸 Step 1: Scan Your Item")

# Camera input
picture = st.camera_input("Take a photo of any item - analysis starts automatically!")

# Check if new picture was taken
if picture is not None:
    if st.session_state.last_picture != picture:
        st.session_state.last_picture = picture
        st.session_state.auto_analyze = True

# Description input
description = st.text_input(
    "**Describe what you're scanning:**",
    placeholder="e.g., plastic water bottle, pizza box, battery, glass jar, etc.",
    value=st.session_state.test_item,
    key="description_input"
)

# Auto-trigger analysis when new picture is taken
if st.session_state.auto_analyze and picture and description:
    st.session_state.auto_analyze = False
    
    with st.spinner("🔍 Connecting to AI Agents..."):
        # Try backend first, fallback to demo
        result = analyze_with_backend(description)
        
        if result is None:
            st.warning("Using demo mode - backend not available")
            result = demo_analysis(description)
        
        # Display results
        st.markdown("### 🎯 EcoScanAI Analysis")
        
        st.info(f"📦 **Material:** {result['material']}")
        st.warning(f"🗑️ **Disposal:** {result['disposal']}")
        st.error(f"🌱 **Environmental Impact:** {result['impact']}")
        st.success(f"💡 **Sustainable Alternative:** {result['alternative']}")
    
    st.balloons()
    st.success("✅ Analysis complete! You're making a positive environmental impact!")

# Manual analyze button
if picture and description and not st.session_state.auto_analyze:
    if st.button("🚀 Analyze with EcoScanAI", type="primary"):
        with st.spinner("🔍 AI Agents analyzing..."):
            result = analyze_with_backend(description)
            
            if result is None:
                st.warning("Using demo mode - backend not available")
                result = demo_analysis(description)
            
            st.markdown("### 🎯 EcoScanAI Analysis")
            
            st.info(f"📦 **Material:** {result['material']}")
            st.warning(f"🗑️ **Disposal:** {result['disposal']}")
            st.error(f"🌱 **Environmental Impact:** {result['impact']}")
            st.success(f"💡 **Sustainable Alternative:** {result['alternative']}")
        
        st.balloons()
        st.success("✅ Analysis complete!")

# Demo section
st.markdown("---")
st.markdown("### 🎯 Quick Test Items (Click to try):")

col1, col2, col3 = st.columns(3)
with col1:
    if st.button("🧴 Plastic Bottle", use_container_width=True):
        st.session_state.test_item = "plastic water bottle"
        st.session_state.auto_analyze = True
        st.rerun()
with col2:
    if st.button("🍕 Pizza Box", use_container_width=True):
        st.session_state.test_item = "greasy pizza box" 
        st.session_state.auto_analyze = True
        st.rerun()
with col3:
    if st.button("🔋 Battery", use_container_width=True):
        st.session_state.test_item = "AA battery"
        st.session_state.auto_analyze = True
        st.rerun()

# Backend status
st.markdown("---")
try:
    health_response = requests.get("http://127.0.0.1:8000/health", timeout=5)
    if health_response.status_code == 200:
        st.success("✅ Backend connected successfully!")
    else:
        st.warning("⚠️ Backend has issues")
except:
    st.error("❌ Backend not running - using demo mode only")

st.markdown("**🌐 Multi-Agent Architecture:** Frontend + Backend + AI API")