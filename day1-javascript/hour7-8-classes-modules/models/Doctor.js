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