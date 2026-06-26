class Patient {
  constructor(id, name, age, phone, bloodGroup, allergies = [], isActive = true) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.bloodGroup = bloodGroup;
    this.allergies = allergies;
    this.isActive = isActive;
  }

  addAllergy(allergy) {
    this.allergies.push(allergy);
  }

  removeAllergy(allergy) {
    this.allergies = this.allergies.filter(a => a !== allergy);
  }

  deactivate() {
    this.isActive = false;
  }

  getProfile() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      phone: this.phone,
      bloodGroup: this.bloodGroup,
      allergies: this.allergies,
      isActive: this.isActive
    };
  }
}

module.exports = Patient;

// TESTS

const patient1 = new Patient(
  6,
  "Abhay",
  32,
  "9876543244",
  "O-"
);

console.log("Patient Profile:");
console.log(patient1.getProfile());

console.log("\nAdd Allergies");
patient1.addAllergy("Penicillin");
patient1.addAllergy("Dust");
console.log(patient1.getProfile());

console.log("\nRemove Allergy");
patient1.removeAllergy("Dust");
console.log(patient1.getProfile());

console.log("\nDeactivate Patient");
patient1.deactivate();
console.log(patient1.getProfile());