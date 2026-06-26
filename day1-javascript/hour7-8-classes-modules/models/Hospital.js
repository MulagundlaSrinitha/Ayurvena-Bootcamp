const Patient = require("./Patient");
const Doctor = require("./Doctor");
const Appointment = require("./Appointment");

class Hospital {
  constructor(name) {
    this.name = name;
    this.patients = [];
    this.doctors = [];
    this.appointments = [];
  }

  registerPatient(data) {
    const patient = new Patient(
      this.patients.length + 1,
      data.name,
      data.age,
      data.phone,
      data.bloodGroup
    );

    this.patients.push(patient);
    return patient;
  }

  addDoctor(data) {
    const doctor = new Doctor(
      this.doctors.length + 1,
      data.name,
      data.specialization,
      data.fee,
      data.schedule
    );

    this.doctors.push(doctor);
    return doctor;
  }

  bookAppointment(patientId, doctorId, date, time) {

    const patient = this.patients.find(
      p => p.id === patientId
    );

    const doctor = this.doctors.find(
      d => d.id === doctorId
    );

    if (!patient) {
      return "Patient not found";
    }

    if (!doctor) {
      return "Doctor not found";
    }

    const day = new Date(date).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    );

    if (!doctor.isAvailable(day, time)) {
      return "Slot not available";
    }

    doctor.bookSlot(day, time);

    const appointment = new Appointment(
      this.appointments.length + 1,
      patient,
      doctor,
      date,
      time
    );

    this.appointments.push(appointment);

    return appointment;
  }

  cancelAppointment(appointmentId) {

    const appointment = this.appointments.find(
      a => a.id === appointmentId
    );

    if (appointment) {
      appointment.cancel();
    }

    return appointment;
  }

  getPatientHistory(patientId) {

    return this.appointments.filter(
      appointment => appointment.patient.id === patientId
    );

  }

  getDoctorSchedule(doctorId, date) {

    return this.appointments.filter(
      appointment =>
        appointment.doctor.id === doctorId &&
        appointment.date === date
    );

  }

  getDashboard() {

    return {
      totalPatients: this.patients.length,

      totalDoctors: this.doctors.length,

      todayAppointments: this.appointments.filter(
        appointment => appointment.status === "scheduled"
      ).length,

      revenue: this.appointments
        .filter(
          appointment => appointment.status === "completed"
        )
        .reduce(
          (total, appointment) =>
            total + appointment.payment,
          0
        )
    };
  }
}

module.exports = Hospital;

//const Hospital = require("./Hospital");

/*const hospital = new Hospital("Ayurvena Hospital");

// ------------------ REGISTER PATIENTS ------------------
console.log("\n=== REGISTER PATIENTS ===");

const patient1 = hospital.registerPatient({
  name: "Rahul",
  age: 32,
  phone: "9876543210",
  bloodGroup: "O+"
});

const patient2 = hospital.registerPatient({
  name: "Priya",
  age: 28,
  phone: "9876500000",
  bloodGroup: "A+"
});

console.log(patient1);
console.log(patient2);

// ------------------ ADD DOCTORS ------------------
console.log("\n=== ADD DOCTORS ===");

const doctor1 = hospital.addDoctor({
  name: "Dr. Kumar",
  specialization: "Cardiology",
  fee: 500
});

const doctor2 = hospital.addDoctor({
  name: "Dr. Reddy",
  specialization: "Neurology",
  fee: 700
});

console.log(doctor1);
console.log(doctor2);

// ------------------ BOOK APPOINTMENTS ------------------
console.log("\n=== BOOK APPOINTMENTS ===");

const appointment1 = hospital.bookAppointment(
  patient1.id,
  doctor1.id,
  "2026-07-01",
  "09:00"
);

const appointment2 = hospital.bookAppointment(
  patient2.id,
  doctor2.id,
  "2026-07-01",
  "09:30"
);

console.log("Appointment 1:", appointment1);
console.log("Appointment 2:", appointment2);

// ------------------ INVALID BOOKING TEST ------------------
console.log("\n=== INVALID BOOKING TEST ===");

const invalidAppointment = hospital.bookAppointment(
  999, // invalid patient
  doctor1.id,
  "2026-07-01",
  "10:00"
);

console.log("Invalid booking result:", invalidAppointment);

// ------------------ PATIENT HISTORY ------------------
console.log("\n=== PATIENT HISTORY ===");

console.log("Rahul History:");
console.log(hospital.getPatientHistory(patient1.id));

// ------------------ DOCTOR SCHEDULE ------------------
console.log("\n=== DOCTOR SCHEDULE ===");

console.log("Doctor 1 schedule:");
console.log(hospital.getDoctorSchedule(doctor1.id, "2026-07-01"));

// ------------------ DASHBOARD BEFORE COMPLETION ------------------
console.log("\n=== DASHBOARD BEFORE COMPLETION ===");

console.log(hospital.getDashboard());

// ------------------ COMPLETE APPOINTMENTS ------------------
console.log("\n=== COMPLETE APPOINTMENTS ===");

appointment1.complete();
appointment2.complete();

// ------------------ DASHBOARD AFTER COMPLETION ------------------
console.log("\n=== DASHBOARD AFTER COMPLETION ===");

console.log(hospital.getDashboard());

// ------------------ CANCEL APPOINTMENT TEST ------------------
console.log("\n=== CANCEL APPOINTMENT TEST ===");

const appointment3 = hospital.bookAppointment(
  patient1.id,
  doctor1.id,
  "2026-07-01",
  "10:00"
);

console.log("Before cancel:", appointment3.status);

hospital.cancelAppointment(appointment3.id);

console.log("After cancel:", appointment3.status);

// ------------------ FINAL DASHBOARD ------------------
console.log("\n=== FINAL DASHBOARD ===");

console.log(hospital.getDashboard());*/