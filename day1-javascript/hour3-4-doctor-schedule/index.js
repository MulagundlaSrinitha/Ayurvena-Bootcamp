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
    slots: [
      { time: "09:00", isBooked: false },
      { time: "09:30", isBooked: false },
      { time: "10:00", isBooked: false },
      { time: "10:30", isBooked: false },
      { time: "11:00", isBooked: false }
    ]
  },
  {
    id: 2,
    name: "Dr. Sharma",
    specialization: "Dermatology",
    hospital: "Apollo Hospital",
    fee: 700,
    availableDays: ["Monday", "Tuesday", "Thursday"],
    slots: [
      { time: "10:00", isBooked: false },
      { time: "10:30", isBooked: false },
      { time: "11:00", isBooked: false },
      { time: "11:30", isBooked: false },
      { time: "12:00", isBooked: false }
    ]
  },
  {
    id: 3,
    name: "Dr. Reddy",
    specialization: "Neurology",
    hospital: "Care Hospital",
    fee: 1000,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    slots: [
      { time: "14:00", isBooked: false },
      { time: "14:30", isBooked: false },
      { time: "15:00", isBooked: false },
      { time: "15:30", isBooked: false },
      { time: "16:00", isBooked: false }
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

  return doctor.slots
    .filter(slot => !slot.isBooked)
    .map(slot => ({
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

  const slot = doctor.slots.find(slot => slot.time === time);

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

  const bookedCount = doctor.slots.filter(
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

