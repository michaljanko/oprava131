const fs = require('fs');
const path = require('path');

// Load the vehicle dataset.  We synchronously read the JSON file once at
// module load time since the dataset is relatively small (≈100 entries).
// The file lives alongside this function under the `api/` directory.
const dataPath = path.join(__dirname, 'data.json');
let vehicles = [];
try {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed.cars)) {
    vehicles = parsed.cars;
  }
} catch (err) {
  console.error('Failed to load dataset:', err);
}

// Helper to safely parse JSON bodies.  Vercel will automatically parse
// JSON into req.body if content‑type is application/json, but as a
// safeguard we handle string bodies here too.
function parseBody(req) {
  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {
      body = {};
    }
  }
  return body;
}

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const body = parseBody(req);

  const {
    model,
    segment,
    body: bodyType,
    fuel,
    gearbox,
    four_wheel,
    budget,
    sensors = false,
    camera = false,
    navigation = false,
    acc = false,
    blind = false,
  } = body;

  const featureKeys = ['sensors', 'camera', 'navigation', 'acc', 'blind'];
  const requestedFeatures = { sensors, camera, navigation, acc, blind };

  const results = [];
  for (const car of vehicles) {
    // Filter by optional criteria
    if (model && car.model && car.model.toLowerCase() !== model.toLowerCase()) continue;
    if (segment && car.segment && car.segment.toLowerCase() !== segment.toLowerCase()) continue;
    if (bodyType && car.body && car.body.toLowerCase() !== bodyType.toLowerCase()) continue;
    if (fuel && car.fuel && car.fuel.toLowerCase() !== fuel.toLowerCase()) continue;
    if (gearbox && car.gearbox && car.gearbox.toLowerCase() !== gearbox.toLowerCase()) continue;
    if (typeof four_wheel === 'boolean' && car.four_wheel != null) {
      if (car.four_wheel !== four_wheel) continue;
    }
    // Compute total price including requested features
    let total = car.base_price;
    let meetsAll = true;
    for (const key of featureKeys) {
      if (requestedFeatures[key]) {
        const value = car.features ? car.features[key] : null;
        if (value == null) {
          meetsAll = false;
          break;
        }
        total += value;
      }
    }
    if (!meetsAll) continue;
    // Apply discount
    const discount = car.discount || 0;
    const finalPrice = Math.round(total * (1 - discount) * 100) / 100;
    // Budget check
    if (budget != null && finalPrice > budget) continue;
    results.push({
      model: car.model,
      version: car.version,
      price: finalPrice,
      base_price: car.base_price,
      features: car.features,
      discount: discount,
      segment: car.segment,
      body: car.body,
      fuel: car.fuel,
      gearbox: car.gearbox,
      four_wheel: car.four_wheel,
    });
  }

  results.sort((a, b) => a.price - b.price);
  res.status(200).json({ results });
};