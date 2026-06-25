// -------------------- Patients --------------------

const patients = [
  { id: 1, name: "Priya Sharma" },
  { id: 2, name: "Rahul Sharma" },
  { id: 3, name: "Amit Verma" }
];

// -------------------- Doctors --------------------

const doctors = [
  {
    id: 1,
    name: "Dr. Kumar",
    specialization: "Cardiology",
    fee: 500,
    availableSlots: [
      { date: "2026-06-27", time: "10:00", isBooked: false },
      { date: "2026-06-27", time: "11:00", isBooked: false }
    ]
  },
  {
    id: 2,
    name: "Dr. Sharma",
    specialization: "Neurology",
    fee: 700,
    availableSlots: [
      { date: "2026-06-27", time: "09:00", isBooked: false },
      { date: "2026-06-27", time: "10:00", isBooked: false }
    ]
  },
  {
    id: 3,
    name: "Dr. Reddy",
    specialization: "Dermatology",
    fee: 600,
    availableSlots: [
      { date: "2026-06-27", time: "02:00", isBooked: false },
      { date: "2026-06-27", time: "03:00", isBooked: false }
    ]
  }
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

  const today = "2026-06-27";

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

bookAppointment(1, 1, "2026-06-27", "10:00");
bookAppointment(2, 2, "2026-06-27", "09:00");
bookAppointment(3, 3, "2026-06-27", "02:00");

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