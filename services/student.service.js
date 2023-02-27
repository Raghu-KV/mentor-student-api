import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function studentForParticularMentor(params) {
  return await client
    .db("mentor-student")
    .collection("student")
    .find({ mentorId: new ObjectId(params) })
    .toArray();
}
export async function changeMentor(conStudentId, conMentorId) {
  return await client
    .db("mentor-student")
    .collection("student")
    .updateOne({ _id: conStudentId }, { $set: { mentorId: conMentorId } });
}
export async function studentWithNoMentor() {
  return await client
    .db("mentor-student")
    .collection("student")
    .find({ mentorId: null })
    .toArray();
}
export async function assignMentorToMany(studentObjIds, conMentorId) {
  return await client
    .db("mentor-student")
    .collection("student")
    .updateMany(
      { _id: { $in: studentObjIds } },
      { $set: { mentorId: conMentorId } }
    );
}
export async function getAllStudent(query) {
  return await client
    .db("mentor-student")
    .collection("student")
    .find(query)
    .toArray();
}
export async function createStudent(data) {
  return await client
    .db("mentor-student")
    .collection("student")
    .insertOne(data);
}
