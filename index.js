import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

import studentsRouter from "./routes/student.routes.js";
import mentorRouter from "./routes/mentor.routes.js";

dotenv.config();

//connect mongo
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb connected");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    studentRoutes: {
      view_all_students: "students/",
      to_create_student: "students/create-student",
      Add_multiple_student_to_mentor: "students/assign-mentor-to-many",
      to_check_student_without_mentor: "students/no-mentor",
      to_add_or_change_mentor_for_student: "students/change-or-add-mentor",
      student_of_particular_mentor:
        "students/particular-mentor-for-students/:id",
    },
    mentorRoutes: {
      to_create_mentor: "mentors/create-mentor",
      view_all_mentors: "mentors/",
    },
  });
});

app.use("/mentors", mentorRouter);

app.use("/students", studentsRouter);

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
