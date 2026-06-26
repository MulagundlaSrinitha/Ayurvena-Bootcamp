const patients = [
    {
        id: 1,
        name: "Priya Sharma",
        age: 32,
        phone: "9708922701",
        bloodGroup: "O+",
        allergies: ["Dust"],
        isActive: true,
    },
    {
        id: 2,
        name: "Rahul Sharma",
        age: 28,
        phone: "9876543211",
        bloodGroup: "B+",
        allergies: ["Pollen"],
        isActive: true,
    },
    {
        id: 3,
        name: "Amit Verma",
        age: 45,
        phone: "9876543212",
        bloodGroup: "A+",
        allergies: [],
        isActive: false,
    },
    {
        id: 4,
        name: "Sneha Reddy",
        age: 25,
        phone: "9876543213",
        bloodGroup: "AB+",
        allergies: ["Peanuts"],
        isActive: true,
    },
    {
        id: 5,
        name: "Kiran Rao",
        age: 38,
        phone: "9876543214",
        bloodGroup: "O-",
        allergies: [],
        isActive: true,
    },
];

// Register Patient
function registerPatient(name, age, phone, bloodGroup) {
  const newPatient = {
    id: patients.length + 1,
    name,
    age,
    phone,
    bloodGroup,
    allergies: [],
    isActive: true,
  };

  patients.push(newPatient);
  return newPatient;
}
// FindPatientByPhone
function findPatientByPhone(phone) {
  const patient = patients.find(
    (p) => p.phone === phone
  );

  if (patient) {
    return patient;
  }

  return "Not found";
}

// List Active Patients
function listActivePatients() {
  return patients.filter(
    (p) => p.isActive === true
  );
}

// Bonus: Deactivate Patient
function deactivatePatient(id) {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return "Patient not found";
  }

  patient.isActive = false;
  return patient;
}

// Test 1: Register Patient
const patient1 = registerPatient(
  "Ramesh Kumar",
  30,
  "9999999999",
  "B-"
);

console.log("Test 1 - Register Patient:");
console.log(
  patient1.name === "Ramesh Kumar" ? "PASS" : "FAIL",
  patient1
);

// Test 2: Find Existing Paitent
const found = findPatientByPhone("9876543211");
console.log("\n Test 2 - find Existing Patient:");
console.log(
    found.name === "Rahul Sharma" ? "PASS" : "FAIL",
    found
);

// Test 3: Find Non-Existing Paitent
const notFound = findPatientByPhone("0000000000");

console.log("\nTest 3 - Find Non-Existing Patient:");
console.log(
    notFound === "Not found" ? "PASS" : "FAIL",
    notFound
);

// Test 4: Active Patients
const activePatients = listActivePatients();
console.log("\n Test 4 - Active Patients:");
console.log(
    activePatients.every((p)=>p.isActive) ? "PASS" : "FAIL",
    activePatients
);

//Test 5: Deactivate Patient
deactivatePatient(2);
console.log("\nTest 5 - Deactivate Patient:");
console.log(
    patients.find((p) => p.id==2).isActive ===false ? "PASS" : "FAIL"
);

// Patient Search Engine

// 1. Search Patients
function searchPatients(query) {
  return patients.filter(patient =>
    patient.name.toLowerCase().includes(query.toLowerCase())
  );
}

// 2. Filter by Blood Group
function filterByBloodGroup(group) {
  return patients.filter(patient => patient.bloodGroup === group);
}

// 3. Patient Statistics
function getPatientStats() {
  const total = patients.length;

  const active = patients.filter(patient => patient.isActive).length;

  const avgAge =
    patients.reduce((sum, patient) => sum + patient.age, 0) / total;

  const bloodGroups = patients.reduce((count, patient) => {
    count[patient.bloodGroup] = (count[patient.bloodGroup] || 0) + 1;
    return count;
  }, {});

  return {
    total,
    active,
    avgAge,
    bloodGroups
  };
}

// 4. Sort Patients
function sortPatients(field, order) {
  const sortedPatients = [...patients];

  sortedPatients.sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (order === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return sortedPatients;
}

// 5. Patient Summary
function getPatientSummary(id) {
  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    return "Patient not found";
  }

  const allergyList =
    patient.allergies.length > 0
      ? patient.allergies.join(", ")
      : "None";

  return `${patient.name} | Age: ${patient.age} | Blood: ${patient.bloodGroup} | Allergies: ${allergyList}`;
}

// ======================
// TESTS
// ======================

// searchPatients
console.log("Search Test 1");
console.log(searchPatients("rah"));

console.log("Search Test 2");
console.log(searchPatients("RAH"));

// filterByBloodGroup
console.log("Blood Group Test 1");
console.log(filterByBloodGroup("O+"));

console.log("Blood Group Test 2");
console.log(filterByBloodGroup("B+"));

// getPatientStats
console.log("Stats Test 1");
console.log(getPatientStats());

console.log("Stats Test 2");
console.log(getPatientStats().bloodGroups);

// sortPatients
console.log("Sort Test 1");
console.log(sortPatients("age", "desc"));

console.log("Sort Test 2");
console.log(sortPatients("name", "asc"));

// getPatientSummary
console.log("Summary Test 1");
console.log(getPatientSummary(1));

console.log("Summary Test 2");
console.log(getPatientSummary(2));