class Student {
        constructor(id, name, age, course) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.course = course;
        }

        introduce() {
            return `Hello, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
        }
    }

    class Instructor {
        constructor(id, name, subject) {
            this.id = id;
            this.name = name;
            this.subject = subject;
        }
        teach() {
            return `Hello, my name is ${this.name}, and I teach ${this.subject}.`;
        }
    }

    function fetchDataThen() {
        return fetch("data.json")
            .then (response => response.json())
            .then (data => {
               console.log("Promise version:",data);
               return data;
            });
    }
    
    async function fetchDataAsync() {
            const response = await fetch("data.json");
            const data = await response.json();
            console.log("Asycn/Await version:",data);
            return data; 
    }

    function renderData(data) {
        const outputDiv = document.getElementById("output");

        let studentHTML = "<h2>Students</h2>";
        data.students.forEach(st => {
            const student = new Student(st.id, st.name, st.age, st.course);
            const highlightClass = st.age > 21 ? "highlight" : "";
            studentHTML += `<div class="student ${highlightClass}">${student.name} (${student.age}) - ${student.course}</div>`;
        });

        let courseHTML = "<h2>Courses</h2>";
        data.courses.forEach(crs => {
            courseHTML += `<div>${crs.title} - ${crs.description}</div>`;
        });

        let instructorHTML = "<h2>Instructors</h2>";
        data.instructors.forEach(ins => {
            const instructor = new Instructor(ins.id, ins.name, ins.subject);
            instructorHTML += `<div>${instructor.name} - ${instructor.subject}</div>`;
        });

        let matchStudentCourse = "<h2>Student → Course → Description</h2>";
        data.students.forEach(st => {
            const course = data.courses.find(crs => crs.title === st.course);
            matchStudentCourse += `<div>${st.name} → ${st.course} → ${course.description}</div>`;
        });

        let matchCourseInstructor = "<h2>Course → Instructor</h2>";
        data.courses.forEach(crs => {
            const instructor = data.instructors.find(ins => ins.subject.includes(crs.title));
            if (instructor) {
                matchCourseInstructor += `<div>${crs.title} → taught by ${instructor.name}</div>`;
            }
        });

        outputDiv.innerHTML = studentHTML + courseHTML + instructorHTML + matchStudentCourse + matchCourseInstructor;
    }
    fetchDataThen().then(data => renderData(data));
    fetchDataAsync().then(data => console.log("Async data rendered seperately."));