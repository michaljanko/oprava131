# Carculator on Vercel

This repository contains a minimal demo of the **Carculator** application prepared for deployment on [Vercel](https://vercel.com) and GitHub.  The project consists of a statically served front‑end (in the `public` folder) and a serverless Python API (in the `api` folder) powered by FastAPI.  A JSON dataset (`data.json`) stores information about the 20 najpredávanejšie osobné automobily na Slovensku together with their versions and optional features.

## Quick Start (Local Development)

1. **Install Python dependencies**.  In the project root run:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # on Windows (for macOS/Linux: source venv/bin/activate)
   pip install -r requirements.txt
   ```
2. **Launch the API locally**:
   ```bash
   uvicorn api.main:app --reload
   ```
   This command tells Uvicorn to load the FastAPI `app` from `api/main.py`.  You can test the healthcheck at `http://localhost:8000/api/main` and the recommendation endpoint at `http://localhost:8000/api/main/recommend`.
3. **Open the front‑end**.  Simply open `public/index.html` in your web browser.  The page will make requests to `/api/main/recommend` on the same domain.  When running locally via Uvicorn you may need to adjust the fetch URL to `http://localhost:8000/api/main/recommend` in `public/index.html`.

## Deploying to Vercel

1. **Push to GitHub**.  Create a new repository on GitHub and commit the contents of this folder.  Ensure that `api`, `public`, `data.json`, `requirements.txt` and `vercel.json` are all at the root of the repository.

2. **Import the repository into Vercel**.  Go to the Vercel dashboard and click **New Project** → **Import Git Repository**.  Select your repository.  Vercel will detect the `api` and `public` folders automatically and select the Python runtime for the API.

3. **Deploy**.  You should not need to configure any special settings.  The static front‑end will be served from `public/` and the API will be available under `/api/main` (with the `/recommend` endpoint on `/api/main/recommend`).  Once the deployment is complete you can visit your Vercel domain (e.g. `https://your-project-name.vercel.app`) and interact with the Carculator.

## Dataset

The `data.json` file contains 20+ entries representing the best‑selling models in Slovakia along with their variants.  Each object has the following structure:

```
{
  "model": "Octavia",
  "version": "1.5 TSI DSG",
  "segment": "kompaktné",
  "body": "combi",
  "fuel": "benzín/hybrid",
  "gearbox": "automat",
  "four_wheel": false,
  "base_price": 26490,
  "discount": 0.02,
  "features": {
    "sensors": 0,
    "camera": 900,
    "navigation": 0,
    "acc": 600,
    "blind": 650
  }
}
```

Feel free to expand this file with additional models or more precise pricing.  The API will automatically load any updates at runtime when deployed on Vercel.
