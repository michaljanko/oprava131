"""
FastAPI backend for Carculator deployed on Vercel.

This file exposes a single POST endpoint at `/recommend` via FastAPI. When
deployed on Vercel the complete endpoint will be available under
`/api/main/recommend`, because this file lives under the `api/` directory.

The backend reads a JSON dataset of vehicle information and calculates
recommendations based on user criteria for segment, body type, powertrain,
gearbox, four‑wheel drive requirement, budget and requested optional
features. It then returns a sorted list of matching vehicles with the
computed price (including any requested extras and brand‑specific
discounts).

The dataset lives in the adjacent `data.json` file. If this file is not
found or is malformed the server will fail to start so that deployment
errors are surfaced quickly.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from pathlib import Path
from typing import Optional


class FeatureRequest(BaseModel):
    """Schema describing the incoming recommendation request.

    Attributes mirror the requirements described in the project brief.
    All fields are optional so that users may specify only what they care
    about. Optional fields use `None` as the sentinel value.
    """

    model: Optional[str] = None
    segment: Optional[str] = None
    body: Optional[str] = None
    fuel: Optional[str] = None
    gearbox: Optional[str] = None
    four_wheel: Optional[bool] = None
    budget: Optional[float] = None
    sensors: bool = False
    camera: bool = False
    navigation: bool = False
    acc: bool = False
    blind: bool = False


app = FastAPI(title="Carculator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Determine the path to the dataset relative to this file. On Vercel the
# working directory is the project root so we resolve based off __file__.
DATA_PATH = Path(__file__).resolve().parent / ".." / "data.json"
with DATA_PATH.open("r", encoding="utf-8") as f:
    DATA = json.load(f)
    VEHICLES = DATA["cars"]


@app.get("/")
def read_root() -> dict[str, str]:
    """Simple healthcheck endpoint."""
    return {"message": "Carculator API running"}


@app.post("/recommend")
def recommend(request: FeatureRequest) -> dict[str, list[dict]]:
    """Return a list of vehicles matching the user's criteria.

    The client sends a JSON body validated by `FeatureRequest`. We iterate
    through the vehicles, applying each filter in turn. If a requested
    optional feature is not available on a vehicle we skip that vehicle.
    When a feature is available its cost is added to the base price.
    A brand‑specific discount is then applied and the final price is
    rounded to two decimals. If a budget is provided vehicles above this
    threshold are excluded. Results are returned sorted by final price.
    """
    feature_keys = ["sensors", "camera", "navigation", "acc", "blind"]
    results: list[dict] = []
    for car in VEHICLES:
        # Optional model filter
        if request.model and car["model"].lower() != request.model.lower():
            continue
        # Vehicle size filter
        if request.segment and car.get("segment") and car["segment"].lower() != request.segment.lower():
            continue
        # Body type filter
        if request.body and car.get("body") and car["body"].lower() != request.body.lower():
            continue
        # Fuel type filter
        if request.fuel and car.get("fuel") and car["fuel"].lower() != request.fuel.lower():
            continue
        # Gearbox filter
        if request.gearbox and car.get("gearbox") and car["gearbox"].lower() != request.gearbox.lower():
            continue
        # Four‑wheel drive filter
        if request.four_wheel is not None and car.get("four_wheel") is not None:
            if car["four_wheel"] != request.four_wheel:
                continue
        # Base price and working price
        base_price = car["base_price"]
        total_price = base_price
        # Track whether vehicle meets all requested optional features
        meets_all = True
        for key in feature_keys:
            requested = getattr(request, key)
            if requested:
                value = car["features"].get(key)
                # If the feature is not defined it is unavailable
                if value is None:
                    meets_all = False
                    break
                total_price += value
        if not meets_all:
            continue
        # Apply discount
        discount = car.get("discount", 0.0)
        final_price = round(total_price * (1 - discount), 2)
        # Budget check
        if request.budget is not None and final_price > request.budget:
            continue
        results.append({
            "model": car["model"],
            "version": car["version"],
            "price": final_price,
            "base_price": base_price,
            "features": car["features"],
            "discount": discount,
            "segment": car.get("segment"),
            "body": car.get("body"),
            "fuel": car.get("fuel"),
            "gearbox": car.get("gearbox"),
            "four_wheel": car.get("four_wheel")
        })
    # Sort ascending by final price
    results.sort(key=lambda x: x["price"])
    return {"results": results}
