document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentsTable tbody');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    const renderStudents = () => {
        tableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const validateForm = (name, id, email, contact) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            nameRegex.test(name) &&
            !isNaN(id) &&
            emailRegex.test(email) &&
            !isNaN(contact)
        );
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.studentName.value.trim();
        const id = form.studentID.value.trim();
        const email = form.emailID.value.trim();
        const contact = form.contactNo.value.trim();

        if (!validateForm(name, id, email, contact)) {
            alert('Invalid input. Please check the fields.');
            return;
        }

        students.push({ name, id, email, contact });
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
        form.reset();
    });

    window.editStudent = (index) => {
        const student = students[index];
        form.studentName.value = student.name;
        form.studentID.value = student.id;
        form.emailID.value = student.email;
        form.contactNo.value = student.contact;
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    renderStudents();
});
