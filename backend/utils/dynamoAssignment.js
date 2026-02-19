const db = require("../config/dynamo");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

exports.saveAssignmentToDynamo = async (assignment) => {
  await db.send(
    new PutCommand({
      TableName: "printit-assignments",
      Item: {
        id: assignment._id.toString(),
        studentId: assignment.student.toString(),
        title: assignment.assignmentTitle,
        status: assignment.status,
        deadline: assignment.deadline,
        files: assignment.uploadedFiles,
        createdAt: assignment.createdAt,
      },
    })
  );
};