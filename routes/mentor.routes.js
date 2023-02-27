import express from "express";
import { createMentor, getAllMentor } from "../services/mentor.service.js";

const router = express.Router();

//create Mentor
router.post("/create-mentor", async (req, res) => {
  const data = req.body;
  console.log(data);
  const result = await createMentor(data);

  res.send(result);
});

// Get all mentor
router.get("/", async (req, res) => {
  const query = req.query;

  const data = await getAllMentor(query);
  res.send(data);
});

export default router;
