// Doctor Schedule System
// Doctors Array
const doctors = [
  {
    id: 1,
    name: "Dr. Kumar",
    specialization: "Cardiology",
    hospital: "Medicare Hospital",
    fee: 500,
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: [
      { date: "2026-07-01", time: "09:00", isBooked: false },
      { date: "2026-07-01", time: "09:30", isBooked: false },
      { date: "2026-07-03", time: "10:00", isBooked: false },
      { date: "2026-07-03", time: "10:30", isBooked: false },
      { date: "2026-07-06", time: "11:00", isBooked: false }
    ]
  },
  {
    id: 2,
    name: "Dr. Sharma",
    specialization: "Dermatology",
    hospital: "Apollo Hospital",
    fee: 700,
    availableDays: ["Monday", "Tuesday", "Thursday"],
    availableSlots: [
      { date: "2026-07-02", time: "10:00", isBooked: false },
      { date: "2026-07-02", time: "10:30", isBooked: false },
      { date: "2026-07-04", time: "11:00", isBooked: false },
      { date: "2026-07-04", time: "11:30", isBooked: false },
      { date: "2026-07-07", time: "12:00", isBooked: false }
    ]
  },
  {
    id: 3,
    name: "Dr. Reddy",
    specialization: "Neurology",
    hospital: "Care Hospital",
    fee: 1000,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: [
      { date: "2026-07-05", time: "14:00", isBooked: false },
      { date: "2026-07-05", time: "14:30", isBooked: false },
      { date: "2026-07-08", time: "15:00", isBooked: false },
      { date: "2026-07-08", time: "15:30", isBooked: false },
      { date: "2026-07-10", time: "16:00", isBooked: false }
    ]
  }
];
// Booking Counter
let bookingCounter = 1;


// 1. Get Available Doctors

function getAvailableDoctors(day = "") {
  return doctors.filter(({ availableDays }) =>
    availableDays.includes(day)
  );
}


// 2. Get Available Slots

function getAvailableSlots(doctorId, day) {
  const doctor = doctors.find(({ id }) => id === doctorId);

  if (!doctor?.availableDays.includes(day)) {
    return [];
  }

  return doctor.availableSlots
  .filter(slot => !slot.isBooked)
  .map(slot => ({
    date: slot.date,
    time: slot.time,
    doctor: doctor.name
  }));

}

// 3. Book Slot

function bookSlot(doctorId, time, patientName = "Unknown") {
  const doctor = doctors.find(({ id }) => id === doctorId);

  if (!doctor) {
    return { error: "Doctor not found" };
  }

  const slot = doctor.availableSlots.find(slot => slot.time === time);

  if (!slot || slot.isBooked) {
    return { error: "Slot not available" };
  }

  slot.isBooked = true;

  return {
    bookingId: bookingCounter++,
    doctor: doctor.name,
    patient: patientName,
    time,
    fee: doctor.fee
  };
}

// 4. Get Doctor Earnings

function getDoctorEarnings(doctorId) {
  const doctor = doctors.find(({ id }) => id === doctorId);

  if (!doctor) {
    return { error: "Doctor not found" };
  }

  const bookedCount = doctor.availableSlots.filter(
    ({ isBooked }) => isBooked
  ).length;

  return {
    doctor: doctor.name,
    bookedSlots: bookedCount,
    totalEarnings: bookedCount * doctor.fee
  };
}

// 5. Add New Doctor (Spread Operator)

function addDoctor(newDoctor) {
  doctors.push({
    ...newDoctor
  });
}

// TEST CASES

console.log("Available Doctors Monday");
console.log(getAvailableDoctors("Monday"));

console.log("\nAvailable Doctors Saturday");
console.log(getAvailableDoctors("Saturday"));

console.log("\n Available Slots Dr. Kumar Monday");
console.log(getAvailableSlots(1, "Monday"));

console.log("\n Doctor Not Available That Day ");
console.log(getAvailableSlots(1, "Tuesday"));

console.log("\n Book Slot");
console.log(bookSlot(1, "09:00", "Rahul"));

console.log("\n Book Another Slot ");
console.log(bookSlot(1, "09:30", "Priya"));

console.log("\n Book Already Booked Slot ");
console.log(bookSlot(1, "09:00", "Amit"));

console.log("\n Invalid Doctor ");
console.log(bookSlot(99, "09:00", "Test"));

console.log("\n Available Slots After Booking ");
console.log(getAvailableSlots(1, "Monday"));

console.log("\n Doctor Earnings ");
console.log(getDoctorEarnings(1));

console.log("\nEarnings With Zero Bookings ");
console.log(getDoctorEarnings(3));

//Appointment Booking Engine

// -------------------- Patients --------------------

const patients = [
  { id: 1, name: "Priya Sharma" },
  { id: 2, name: "Rahul Sharma" },
  { id: 3, name: "Amit Verma" }
];

// -------------------- Appointments --------------------

const appointments = [];

// -------------------- Book Appointment --------------------

const bookAppointment = (patientId, doctorId, date, time) => {

  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    console.log("Patient not found");
    return;
  }

  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    console.log("Doctor not found");
    return;
  }

  const slot = doctor.availableSlots.find(
    s => s.date === date && s.time === time
  );

  if (!slot) {
    console.log("Slot not available");
    return;
  }

  if (slot.isBooked) {
    console.log("Slot already booked");
    return;
  }

  slot.isBooked = true;

  const appointment = {
    id: appointments.length + 1,
    patientId,
    doctorId,
    date,
    time,
    status: "scheduled"
  };

  appointments.push(appointment);

  console.log("Appointment booked successfully");

  return appointment;
};

// -------------------- Patient Appointments --------------------

const getPatientAppointments = patientId => {

  return appointments
    .filter(a => a.patientId === patientId)
    .map(a => {

      const doctor = doctors.find(d => d.id === a.doctorId);

      return {
        ...a,
        doctorName: doctor.name,
        specialization: doctor.specialization
      };

    });

};

// -------------------- Doctor Appointments --------------------

const getDoctorAppointments = (doctorId, date) => {

  return appointments.filter(a =>
    a.doctorId === doctorId &&
    a.date === date
  );

};

// -------------------- Cancel Appointment --------------------

const cancelAppointment = appointmentId => {

  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) {
    console.log("Appointment not found");
    return;
  }

  if (appointment.status === "cancelled") {
    console.log("Already cancelled");
    return;
  }

  appointment.status = "cancelled";

  const doctor = doctors.find(d => d.id === appointment.doctorId);

  const slot = doctor.availableSlots.find(
    s =>
      s.date === appointment.date &&
      s.time === appointment.time
  );

  if (slot) {
    slot.isBooked = false;
  }

  console.log("Appointment cancelled");

};

// -------------------- Appointment Summary --------------------

const getAppointmentSummary = () => {

  const today = "2026-07-03";

  return {

    total: appointments.length,

    scheduled: appointments.filter(
      a => a.status === "scheduled"
    ).length,

    cancelled: appointments.filter(
      a => a.status === "cancelled"
    ).length,

    todayCount: appointments.filter(
      a => a.date === today
    ).length,

    revenueTotal: appointments
      .filter(a => a.status === "scheduled")
      .reduce((total, appointment) => {

        const doctor = doctors.find(
          d => d.id === appointment.doctorId
        );

        return total + doctor.fee;

      }, 0)

  };

};

// -------------------- TESTS --------------------

console.log("----- Booking Appointments -----");

bookAppointment(1, 1, "2026-07-03", "10:00");
bookAppointment(2, 2, "2026-07-02", "10:00");
bookAppointment(3, 3, "2026-07-05", "14:00");

console.log("\n----- Cancel Appointment -----");

cancelAppointment(2);

console.log("\n----- Patient Appointments -----");

console.log(getPatientAppointments(1));

console.log("\n----- Doctor Appointments -----");

console.log(getDoctorAppointments(1, "2026-06-27"));

console.log("\n----- Summary -----");

console.log(getAppointmentSummary());

console.log("\n----- Already Booked Slot -----");

bookAppointment(2, 1, "2026-06-27", "10:00");

console.log("\n----- Non-existent Patient -----");

bookAppointment(10, 1, "2026-06-27", "11:00");