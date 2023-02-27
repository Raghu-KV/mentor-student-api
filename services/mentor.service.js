import { client } from "../index.js";

export async function getAllMentor(query) {
  return await client
    .db("mentor-student")
    .collection("mentor")
    .find(query)
    .toArray();
}
export async function createMentor(data) {
  return await client.db("mentor-student").collection("mentor").insertOne(data);
}
