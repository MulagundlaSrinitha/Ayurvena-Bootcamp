// Appointment.js

class Appointment {
  constructor(id, patient, doctor, date, time) {
    this.id = id;
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.time = time;
    this.status = "scheduled";
    this.payment = doctor.fee;
  }

  // Cancel Appointment
  cancel() {
    this.status = "cancelled";

    // Free the doctor's slot
    for (const day in this.doctor.schedule) {
      const slot = this.doctor.schedule[day].find(
        slot => slot.time === this.time
      );

      if (slot) {
        slot.isBooked = false;
        break;
      }
    }
  }

  // Complete Appointment
  complete() {
    this.status = "completed";
  }

  // Generate Receipt
  generateReceipt() {
    return `
    Appointment ID : ${this.id}
    Patient        : ${this.patient.name}
    Doctor         : ${this.doctor.name}
    Specialization : ${this.doctor.specialization}
    Date           : ${this.date}
    Time           : ${this.time}
    Status         : ${this.status}
    Amount Paid    : ₹${this.payment}
`;
  }
}