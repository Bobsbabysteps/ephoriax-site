export default function handler(req, res) {
  return res.json({
    address: "123 Main St",
    city: "Sampleville",
    state: "CA",
    message: "Fetched mock property data successfully!",
  });
}