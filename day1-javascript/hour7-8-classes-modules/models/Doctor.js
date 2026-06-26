class Doctor {
  constructor(id, name, specialization, fee) {
    this.id = id;
    this.name = name;
    this.specialization = specialization;
    this.fee = fee;

    this.schedule = {
      "2026-07-01": [
        { time: "09:00", isBooked: false },
        { time: "09:30", isBooked: false },
        { time: "10:00", isBooked: false },
        { time: "10:30", isBooked: false },
        { time: "11:00", isBooked: false }
      ]
    };
  }

  // Check if a slot is available
  isAvailable(day, time) {
    const slots = this.schedule[day];

    if (!slots) {
      return false;
    }

    const slot = slots.find(slot => slot.time === time);

    return slot && !slot.isBooked;
  }

  // Book a slot
  bookSlot(day, time) {
    const slots = this.schedule[day];

    if (!slots) {
      return false;
    }

    const slot = slots.find(slot => slot.time === time);

    if (!slot || slot.isBooked) {
      return false;
    }

    slot.isBooked = true;
    return true;
  }

  // Free a booked slot (used when cancelling an appointment)
  freeSlot(day, time) {
    const slots = this.schedule[day];

    if (!slots) {
      return false;
    }

    const slot = slots.find(slot => slot.time === time);

    if (slot) {
      slot.isBooked = false;
      return true;
    }

    return false;
  }

  // Calculate total earnings
  getEarnings() {
    let bookedSlots = 0;

    for (const day in this.schedule) {
      bookedSlots += this.schedule[day].filter(
        slot => slot.isBooked
      ).length;
    }

    return bookedSlots * this.fee;
  }
}

module.exports = Doctor;

//const Doctor = require("./Doctor");

const doctor1 = new Doctor(
  1,
  "Dr. Kumar",
  "Cardiology",
  500
);

console.log("Doctor Profile:");
console.log(doctor1);

// ------------------ Check Availability ------------------
console.log("\nCheck Availability:");
console.log("09:00 on 2026-07-01:", doctor1.isAvailable("2026-07-01", "09:00"));
console.log("09:30 on 2026-07-01:", doctor1.isAvailable("2026-07-01", "09:30"));

// ------------------ Book Slots ------------------
console.log("\nBook Slot:");
console.log("Booking 09:00:", doctor1.bookSlot("2026-07-01", "09:00"));
console.log("Booking 09:30:", doctor1.bookSlot("2026-07-01", "09:30"));

// Try booking same slot again (should fail)
console.log("Booking 09:00 again:", doctor1.bookSlot("2026-07-01", "09:00"));

// ------------------ Check Schedule After Booking ------------------
console.log("\nSchedule After Booking:");
console.log(doctor1.schedule);

// ------------------ Earnings ------------------
console.log("\nEarnings:");
console.log("Total Earnings:", doctor1.getEarnings());

// ------------------ Free Slot ------------------
console.log("\nFree Slot:");
doctor1.freeSlot("2026-07-01", "09:00");
console.log(doctor1.schedule["2026-07-01"]);

// ------------------ Earnings After Freeing Slot ------------------
console.log("\nEarnings After Freeing Slot:");
console.log("Total Earnings:", doctor1.getEarnings());