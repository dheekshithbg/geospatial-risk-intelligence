# Puvi Intel - Geospatial Risk Intelligence Platform

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18+-blue.svg)

## Overview

**Puvi Intel** is an intelligent geospatial risk analysis platform that transforms unstructured text (news articles, reports, incident logs) into actionable geographic intelligence. Using advanced NLP, machine learning, and geospatial analysis, the platform extracts locations, identifies risks, generates predictive insights, and provides decision-makers with a comprehensive risk dashboard.

**Why "Puvi Intel"?**

**Puvi** (புவி) is the Tamil word for “Earth🌍,” symbolizing the focus on geospatial intelligence grounded in real-world location data. “Intel” represents Intelligence -  the transformation of raw information into actionable insights.

---

### Key Capability
**Raw Text → Entity Extraction → Geocoding → Risk Analysis → Spatial Intelligence → LLM Story → Dashboard JSON → Interactive UI**

---

## Data Flow Architecture

```
┌─────────────────┐
│   Raw Text      │  (News articles, incident reports, etc.)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ NLP Extractor   │  (Extract locations, organizations, risks)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Geocoder       │  (Convert names → coordinates)
│  (Nominatim)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Risk Classifier │  (Identify risk types & confidence)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Spatial Engine  │  (Clustering, distances, zones)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LLM Generator  │  (Generate narrative story)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  JSON Parser    │  (Structure dashboard + narrative)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   React UI      │  (Interactive dashboard)
└─────────────────┘
```

---

## Features

### Core Capabilities
- **NLP Entity Extraction**: Automatically identify locations, organizations, and entities from unstructured text
- **Risk Classification**: AI-powered risk detection (flood, infrastructure, security, etc.)
- **Geospatial Analysis**: 
  - Location geocoding with coordinate accuracy
  - Spatial clustering of risk zones
  - Distance calculations and proximity analysis
  - Risk radius mapping
- **Intelligent Storytelling**: LLM-powered narrative generation with structured JSON dashboards
- **Interactive Visualization**: Leaflet-based map with risk-colored markers
- **Comprehensive Analytics**: Risk scoring, city-level summaries, severity interpretation

### Dashboard Features
- **Interactive Map**: Real-time location visualization with risk indicators
- **Risk Metrics**: Risk scores, confidence levels, severity interpretation
- **Impact Zones**: Predicted affected areas with reasoning
- **Event Summaries**: AI-generated narrative breakdowns
- **Action Items**: Recommended immediate actions
- **Spatial Insights**: Geographic pattern analysis

---

## Architecture

### Technology Stack

**Backend:**
- **Framework**: FastAPI (Python)
- **NLP**: Custom entity extraction engine
- **Geospatial**: Nominatim (OpenStreetMap) for geocoding
- **ML/Analytics**: Scikit-learn, clustering algorithms
- **LLM Integration**: LLM Foundry API for narrative generation
- **API**: RESTful with OpenAPI/Swagger documentation

**Frontend:**
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Mapping**: Leaflet + react-leaflet
- **Styling**: CSS3 
- **Build Tool**: Vite

## Quick Start

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm
- Internet connection (for LLM API)
- Environment variables for API keys

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   ```bash
   export LLMFOUNDRY_TOKEN=your_llm_api_key
   # On Windows: set LLMFOUNDRY_TOKEN=your_llm_api_key
   ```

5. **Run FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   API will be available at `http://localhost:8000`
   
   Swagger docs: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:5173`

---


## 💡 Usage 

### Home Page
1. Navigate to `http://localhost:5173`
2. Paste a news article or incident report in the textarea
3. Click "Analyze Text" or click "Try Example" to load sample data
4. Backend will process the text through the entire pipeline

### Dashboard
- View interactive map with color-coded location markers
- Read AI-generated event summary and narrative sections
- Review risk interpretation with severity levels
- Check predicted impact zones and reasoning
- Follow recommended actions checklist
- Explore spatial insights and analysis metadata

---

## 🛠️ Configuration

### CORS Settings
Frontend runs on `http://localhost:5173` by default. Backend CORS is configured to accept requests from:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`

Modify in [backend/app/main.py](backend/app/main.py) to add more origins.

### Environment Variables

**Backend:**
```
LLMFOUNDRY_TOKEN=<your_llm_foundry_api_key>
```

**Frontend:**
Backend API URL is hardcoded to `http://localhost:8000` in `pages/Home.jsx`. Modify if deploying to a different server.

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---
