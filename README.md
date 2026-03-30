# MySmile – AI‑Powered Oral Health Screening

**MySmile** is a web application that empowers individuals to perform self‑dental health screenings using an AI model, receive immediate feedback, and find nearby dental clinics. The project is built with a React frontend and a FastAPI backend, using a fine‑tuned MobileNetV2 model hosted on Hugging Face.

## Project Documentation
- **SRS Document**: [View SRS](https://docs.google.com/document/d/16tbjuzb_IOR086nlAgrhZcDq20SUb-vNsHXszgtHRQI/edit?usp=sharing)  
- **Live Demo**: [http://my-smile.vercel.app/](http://my-smile.vercel.app/)


## Problem Statement
Oral diseases affect over 3.7 billion people globally, with low‑income countries facing the greatest burden due to limited access to dental care. In Rwanda, more than 70% of the population has never visited an oral health provider, leading to late detection and severe outcomes. MySmile aims to bridge this gap by providing a free, accessible, and private self‑screening tool that offers early risk assessment and preventive guidance.

## Features
- **AI Screening**: Upload or capture an oral cavity image; the model returns a prediction (Normal / Oral Cancer) with confidence and personalised advice.
- **Educational Resources**: A blog with articles and videos about oral health, managed through an admin dashboard.
- **Nearby Clinics**: Find dental clinics using your current location or manual search (powered by OpenStreetMap).
- **Admin Panel**: Secure login to manage blog posts (articles and videos).
- **Zero‑Data Collection**: No user registration; all screening results are ephemeral and never stored.


## Tech Stack
### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Supabase (authentication, database)

### Backend
- Python 3.12
- FastAPI
- PyTorch (CPU‑only)
- Pillow
- Hugging Face (model hosting)


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/albertniyo/MySmile.git
cd MySmile
```

### 2. Set Up the Backend
1. Pip Users:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```
1. Uv Users:

```bash
cd backend
uv venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
uv sync
```

Create a `.env` file (optional, no API keys needed):
```env
MODEL_PATH=model/UmlomoV1.pth
```

Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The API will be available at `http://localhost:8000`. Swagger docs at `http://localhost:8000/docs`.

### 3. Set Up the Frontend
```bash
cd ../MySmile
npm install
```

Create a `.env` file and add your credentials:
```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Start the React development server:
```bash
npm run dev
```
Open `http://localhost:5173` to see the app.

### 4. Supabase Setup (Optional, for blog & admin)
If you want to use the blog features, set up Supabase as described in the [Supabase Setup Guide](https://github.com/albertniyo/MySmile/wiki/Supabase-Setup). The required SQL scripts are in `supabase/schema.sql`.


## Environment Variables

- Backend (`.env` in `backend/`)

| Variable      | Description                                          | Default           |
|---------------|------------------------------------------------------|-------------------|
| `HF_API_TOKEN`  | HuggingFace Token for auth      | *(from HuggingFace)* |

- Frontend (`.env` in `MySmile/`)

| Variable          | Description                   | Default               |
|-------------------|-------------------------------|-----------------------|
| `VITE_SUPABASE_URL` | Supabase project URL       | *(from Supabase)*      |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | *(from Supabase)*      |


## Model Details
- **Architecture**: MobileNetV2 (pre‑trained on ImageNet)
- **Fine‑tuned**: on a curated dataset of oral images (normal and cancerous)
- **Input size**: 224×224 RGB
- **Output**: `Normal` or `Oral Cancer` with a confidence score
- **Hosting**: The model file is stored on Hugging Face at [Al04ni/Umlomo](https://huggingface.co/Al04ni/Umlomo). The backend downloads it automatically at first startup.

For more information about the model see [Model documentation](./backend/model/README.md).


## Deployment

### Backend (Render.com)
1. Push your code to GitHub.
2. Create a new **Web Service** on Render.
3. Connect your repository.
4. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables if needed.
6. Deploy. The model will be downloaded during the first start.

### Frontend (Vercel)
- Connect your GitHub repository.
- Deploy. The app will be available at a public URL.


## Project Structure
```
MySmile/
├── backend/                # FastAPI backend
│   ├── components/         # Model loading, prediction, feedback
│   ├── model/              # (created at runtime) model file
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── docs/                   # Additional documentation
├── MySmile/                # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/            # Supabase client, utilities
│   │   └── ...
│   ├── .env.example
│   └── package.json
├── LICENSE  
└── README.md
```

## Testing
- **Backend**: Run `pytest` (if tests are written) or manually test with `curl`:
  ```bash
  curl -X POST http://localhost:8000/api/predict -F "file=@test_image.jpg"
  ```
- **Frontend**: `npm run test` (if tests are present).


## Additional Documentation
- [SRS Document](https://docs.google.com/document/d/16tbjuzb_IOR086nlAgrhZcDq20SUb-vNsHXszgtHRQI/edit?usp=sharing)
- [Supabase Setup](./docs/Supabase.md)


## License
This project is licensed under the GNU GENERAL PUBLIC LICENSE– see the [LICENSE](./LICENSE) file for details.


**Disclaimer**: This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition.

<br>
<hr>
<div align="center">
  Built with ❤️ for your smile.
</div>

