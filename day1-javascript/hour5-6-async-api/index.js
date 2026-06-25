// ===================== DATA =====================

const patients = [
  { id: 1, name: "Priya Sharma", phone: "9708922701" },
  { id: 2, name: "Rahul Sharma", phone: "9876543211" },
  { id: 3, name: "Amit Verma", phone: "9876543212" }
];

const doctors = [
  { id: 1, name: "Dr. Kumar", specialization: "Cardiology" },
  { id: 2, name: "Dr. Sharma", specialization: "Dermatology" },
  { id: 3, name: "Dr. Reddy", specialization: "Neurology" }
];

let appointments = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    date: "2026-07-01",
    time: "09:00",
    status: "upcoming"
  },
  {
    id: 2,
    patientId: 1,
    doctorId: 2,
    date: "2026-06-20",
    time: "10:00",
    status: "completed"
  },
  {
    id: 3,
    patientId: 2,
    doctorId: 3,
    date: "2026-07-03",
    time: "11:00",
    status: "upcoming"
  }
];

// ===================== FAKE API FUNCTIONS =====================

// Fetch Patient

function fetchPatient(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patient = patients.find(patient => patient.id === id);

      if (patient) {
        resolve(patient);
      } else {
        reject("Patient not found");
      }
    }, 500);
  });
}

// Fetch Doctor

function fetchDoctor(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const doctor = doctors.find(doctor => doctor.id === id);

      if (doctor) {
        resolve(doctor);
      } else {
        reject("Doctor not found");
      }
    }, 500);
  });
}

// Fetch Appointments

function fetchAppointments(patientId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const patientAppointments = appointments.filter(
        appointment => appointment.patientId === patientId
      );

      resolve(patientAppointments);
    }, 500);
  });
}

// Create Appointment

function createAppointment(data) {
  return new Promise((resolve) => {
    setTimeout(() => {

      const newAppointment = {
        id: appointments.length + 1,
        ...data,
        status: "upcoming"
      };

      appointments.push(newAppointment);

      resolve(newAppointment);

    }, 500);
  });
}

// ===================== PATIENT DASHBOARD =====================

async function getPatientDashboard(patientId) {

  const patient = await fetchPatient(patientId);

  const patientAppointments =
    await fetchAppointments(patientId);

  const dashboardAppointments = await Promise.all(

    patientAppointments.map(async appointment => {

      const doctor = await fetchDoctor(
        appointment.doctorId
      );

      return {
        date: appointment.date,
        time: appointment.time,
        doctor: {
          name: doctor.name,
          specialization: doctor.specialization
        },
        status: appointment.status
      };

    })

  );

  const stats = {

    total: dashboardAppointments.length,

    upcoming: dashboardAppointments.filter(
      appointment => appointment.status === "upcoming"
    ).length,

    completed: dashboardAppointments.filter(
      appointment => appointment.status === "completed"
    ).length

  };

  return {

    patient: {
      name: patient.name,
      phone: patient.phone
    },

    appointments: dashboardAppointments,

    stats

  };

}

// ===================== BOOK AND CONFIRM =====================

async function bookAndConfirm(
  patientId,
  doctorId,
  date,
  time
) {

  try {

    const patient = await fetchPatient(patientId);

    const doctor = await fetchDoctor(doctorId);

    const slotBooked = appointments.find(

      appointment =>
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time

    );

    if (slotBooked) {
      throw new Error("Slot already booked");
    }

    const appointment = await createAppointment({

      patientId,
      doctorId,
      date,
      time

    });

    return {

      message: "Appointment Booked Successfully",

      patient: patient.name,

      doctor: doctor.name,

      appointment

    };

  }

  catch (error) {

    return {

      error: error.message || error

    };

  }

}

// ===================== MULTIPLE DASHBOARDS =====================

async function getDashboardForMultiplePatients(patientIds) {

  return Promise.all(

    patientIds.map(id =>
      getPatientDashboard(id)
    )

  );

}

// ===================== TESTS =====================

async function runTests() {

  console.log("===== TEST 1: Existing Patient =====");

  try {

    const patient = await fetchPatient(1);

    console.log(patient);

  } catch (error) {

    console.log(error);

  }

  console.log("\n===== TEST 2: Non Existing Patient =====");

  try {

    const patient = await fetchPatient(10);

    console.log(patient);

  } catch (error) {

    console.log(error);

  }

  console.log("\n===== TEST 3: Book Appointment =====");

  console.log(

    await bookAndConfirm(
      2,
      2,
      "2026-07-10",
      "09:00"
    )

  );

  console.log("\n===== TEST 4: Invalid Booking =====");

  console.log(

    await bookAndConfirm(
      20,
      2,
      "2026-07-10",
      "09:00"
    )

  );

  console.log("\n===== TEST 5: Multiple Dashboards =====");
  const dashboards = await getDashboardForMultiplePatients([1, 2]);
  console.log(JSON.stringify(dashboards, null, 2));

}

runTests();