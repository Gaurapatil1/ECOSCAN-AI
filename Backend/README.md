# Create README.md content
@"
# EcoSync Backend

FastAPI backend for EcoScanAI - AI-powered environmental waste management system.

## Features

- Multi-agent AI analysis
- Image processing for waste identification
- Environmental impact assessment
- Sustainable alternatives recommendation

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Set up environment variables (create \`.env\` file):
\`\`\`env
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_environment
GROQ_API_KEY=your_groq_key
\`\`\`

3. Run the server:
\`\`\`bash
cd app
python main.py
\`\`\`

Or using uvicorn directly:
\`\`\`bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

\`\`\`
ecosync-backend/
├── app/
│   ├── main.py              # FastAPI app instance
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic
│   ├── ai/                 # AI models and agents
│   └── db/                 # Database configurations
└── requirements.txt
\`\`\`
"@ | Out-File -FilePath "README.md" -Encoding UTF8