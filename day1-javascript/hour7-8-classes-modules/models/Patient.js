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