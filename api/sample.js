export default function handler(req, res) {
  res.status(200).json({
    address: "123 Main St",
    city: "Sampleville",
    state: "CA",
    message: "Fetched mock property data successfully!"
  });
}