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

  // Cancel appointment
  cancel() {
    this.status = "cancelled";

    const day = new Date(this.date).toLocaleDateString("en-US", {
      weekday: "long"
    });

    if (this.doctor.schedule[day]) {
      const slot = this.doctor.schedule[day].find(
        slot => slot.time === this.time
      );

      if (slot) {
        slot.isBooked = false;
      }
    }
  }

  // Complete appointment
  complete() {
    this.status = "completed";
  }

  // Generate receipt
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

module.exports = Appointment;