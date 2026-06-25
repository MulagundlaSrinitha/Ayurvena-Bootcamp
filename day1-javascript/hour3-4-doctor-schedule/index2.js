const patients = [
    {id: 1, name: "Priya Sharma"},
    {id: 2, name: "Rahul Sharma"},
    {id: 3, name: "Amit Verma"}
];

const doctors = [
    {Doctorid: 1, name: "Dr. Kumar"},
    {Doctorid: 2, name: "Dr. Sharma"},
    {Doctorid: 3, name: "Dr. Reddy"}
];

const appointments = [];
let appointmentId = 1;

//Book Appointment
const bookAppointment = (
    Id,
    doctorId,
    date,
    time
) => {
    // Check Patient
    const patient = patients.find(
        patient => patient.id === patientId
    );
    if (!patient) {
        return { error: "Patient not found" };
    }

// Check Doctor
    const doctor = doctors.find(
        doctor => doctor.id === doctorId
    );
    if (!doctor) {
        return { error: "Doctor not found" };
    }
    // Check Slot
    const slot = doctor.slots.find(
        slot => slot.time === time
    );
    if (!slot || slot.isBooked) {
        return { error: "Slot not available" };
    }

    // Book Slot 
    slot.isBooked = true;
    const appointment = {
        id: appointmentId++,
        Id,
        doctorId,
        date,
        time,
        status: "scheduled"
    };
    appointments.push(appointment);
    return appointment;
};