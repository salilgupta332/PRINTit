module.exports = function mapAssignmentToDynamo(a) {

  // convert mongoose doc → pure JSON
  const plain = a.toObject({ depopulate: true });

  return {
    assignmentId: plain._id.toString(),

    studentId: plain.student?.toString(),
    subjectName: plain.subjectName,
    assignmentTitle: plain.assignmentTitle,
    academicLevel: plain.academicLevel,
    status: plain.status,
    deadline: plain.deadline ? new Date(plain.deadline).toISOString() : null,

    assignmentType: plain.assignmentType,
    language: plain.language,

    // IMPORTANT: stringify nested objects safely
    printPreferences: JSON.parse(JSON.stringify(plain.printPreferences || {})),
    frontPageRequired: plain.frontPageRequired,

    uploadedFiles: JSON.parse(JSON.stringify(plain.uploadedFiles || [])),
    layoutFiles: JSON.parse(JSON.stringify(plain.layoutFiles || [])),

    createdAt: plain.createdAt ? new Date(plain.createdAt).toISOString() : null,
    updatedAt: new Date().toISOString()
  };
};