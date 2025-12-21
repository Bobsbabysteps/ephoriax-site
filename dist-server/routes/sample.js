import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.json({
        address: "123 Main St",
        city: "Sampleville",
        state: "CA",
        message: "Fetched mock property data successfully!",
    });
});
export default router;
