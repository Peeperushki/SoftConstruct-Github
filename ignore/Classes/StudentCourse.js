export class Student {
    constructor(name, id, email, phoneNumber) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    
    // Optional getters
    getName() { return this.name; }
    getId() { return this.id; }
    getEmail() { return this.email; }
    getPhoneNumber() { return this.phoneNumber; }
}
