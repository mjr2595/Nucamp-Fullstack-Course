class Student {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    getInfo() {
        console.log(`${this.name}'s email address is ${this.email}.`);
    }
}

class Bootcamp {
    constructor(name, level, students = []) {
        this.name = name;
        this.level = level;
        this.students = students;
    }

    getInfo() {
        console.log(`Bootcamp Information: The ${this.name} bootcamp is ${this.level} level. Good luck!`);
    }

    registerStudent(studentToRegister) {
        if (studentToRegister.name !== undefined && studentToRegister.email !== undefined) {
            // go through the students and check if email we're registering with already exists
            for (let i = 0; i < this.students.length; i++) {
                const currStudent = this.students[i];
                if (currStudent.email === studentToRegister.email) {
                    // student with same email found
                    console.log(`The email address ${studentToRegister.email} is already registered!`);
                    return false;
                }
            }
            // no student with same email found
            this.students.push(studentToRegister);
            console.log(`Registering ${studentToRegister.name} to the ${this.name} bootcamp.`);
            return true;
        } else {
            console.log("Invalid name or email");
            return false;
        }
        // Alt. method using find()
        // if (this.students.find((student) => student.email === studentToRegister.email)) {
        //     console.log("Email is already registered");
        //     return false;
        // }
    }

    removeStudent(studentToRemove) {
        const index = this.students.indexOf(studentToRemove);
        if (index !== -1) {
            // Student is in camp, remove!
            this.students.splice(index, 1);
            console.log(`${studentToRemove.name} has been removed from the ${this.name} bootcamp.`);
            return true;
        } else {
            console.log(`${studentToRemove.name} is not in the ${this.name} bootcamp. Can't remove.`);
            return false;
        }
    }

    listStudents() {
        if (this.students.length === 0) {
            console.log(`No students are registered to the ${this.name} bootcamp.`);
            return false;
        } else {
            console.log(`The students registered in ${this.name} are:`);
            this.students.forEach((student) => {
                console.log(`Name: ${student.name} Email: ${student.email}`);
            });
            return true;
        }
    }
}

testStudent = new Student("Bugs Bunny", "bugs@bunny.com");
console.log(testStudent);
if (testStudent.name === "Bugs Bunny" && testStudent.email === "bugs@bunny.com") {
    console.log("TASK 1: PASS");
}

reactBootcamp = new Bootcamp("React", "Advanced");
console.log(reactBootcamp);
if (reactBootcamp.name === "React" && reactBootcamp.level === "Advanced" && Array.isArray(reactBootcamp.students) && reactBootcamp.students.length === 0) {
    console.log("TASK 2: PASS");
}

const runTest = (bootcamp, student) => {
    const attemptOne = bootcamp.registerStudent(student);
    const attemptTwo = bootcamp.registerStudent(student);
    const attemptThree = bootcamp.registerStudent(new Student("Babs Bunny"));
    if (attemptOne && !attemptTwo && !attemptThree) {
        console.log("TASK 3: PASS");
    }

    bootcamp.registerStudent(new Student("Babs Bunny", "babs@bunny.com"));
    if (bootcamp.listStudents()) {
        console.log("TASK 4: PASS 1/2");
    }

    bootcamp.students = [];
    if (!bootcamp.listStudents()) {
        console.log("TASK 4: PASS 2/2");
    }
};

runTest(reactBootcamp, testStudent);

// Bonus Tasks
console.log("--- Bonus Task Tests ---");

bonusCamp = new Bootcamp("Bonus", "EXTRA Advanced");
bonusCamp.registerStudent(new Student("Michael Jordan", "michael23@goat.com"));
bonusCamp.registerStudent(new Student("Bill Murray", "bill@murray.com"));
newman = new Student("Newman", "newman@jurassicpark.com");
bonusCamp.registerStudent(newman);

if (bonusCamp.getInfo()) {
    console.log("Bonus TASK 1: PASS 1/2");
}

if (bonusCamp.students[0].getInfo()) {
    console.log("Bonus TASK 1: PASS 2/2");
}

bonusCamp.removeStudent(newman);
if (bonusCamp.listStudents()) {
    console.log("Bonus TASK 2: PASS");
}
