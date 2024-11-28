import express from "express";
import { Exercise } from "../models/Exercise.js";
import { validateSchema } from "../middleware/validate.js";
import { exerciseSchema } from "../validation/schemas.js";

const router = express.Router();

router.post("/:userId", validateSchema(exerciseSchema), async (req, res) => {
  try {
    console.log(req.body);
    const exercise = await Exercise.create({
      ...req.body,
      userId: req.params.userId,
    });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
