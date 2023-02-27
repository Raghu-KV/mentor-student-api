import express from "express";
import { ObjectId } from "mongodb";
import {
  createStudent,
  getAllStudent,
  assignMentorToMany,
  studentWithNoMentor,
  changeMentor,
  studentForParticularMentor,
} from "../services/student.service.js";
const router = express.Router();

//create students____________________________________________________________________________

router.post("/create-student", async (req, res) => {
  const data = req.body;
  const result = await createStudent(data);
  res.send(result);
});
//___________________________________________________________________________________________

//get all student____________________________________________________________________________
router.get("/", async (req, res) => {
  const query = req.query;
  const data = await getAllStudent(query);
  res.send(data);
});

//___________________________________________________________________________________________

// Add multiple student to a mentor _________________________________________________________
router.post("/assign-mentor-to-many", async (req, res) => {
  const { studentIds, mentorId } = req.body;
  const studentObjIds = studentIds.map((studentId) => new ObjectId(studentId));
  const conMentorId = new ObjectId(mentorId);
  const data = await assignMentorToMany(studentObjIds, conMentorId);

  res.send(data);
});
//___________________________________________________________________________________________

//Student with out mentor____________________________________________________________________
router.get("/no-mentor", async (req, res) => {
  const data = await studentWithNoMentor();
  res.send(data);
});
//___________________________________________________________________________________________

//Add or change Mentor_______________________________________________________________________
router.put("/change-or-add-mentor", async (req, res) => {
  const { mentorId, studentId } = req.body;
  const conStudentId = new ObjectId(studentId);
  const conMentorId = new ObjectId(mentorId);
  const result = await changeMentor(conStudentId, conMentorId);

  res.send(result);
});
//___________________________________________________________________________________________

//show student for particular mentor_________________________________________________________
router.get("/particular-mentor-for-students/:id", async (req, res) => {
  const params = req.params;
  const data = await studentForParticularMentor(params);

  res.send(data);
});
//___________________________________________________________________________________________

export default router;
