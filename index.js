const form = document.getElementById('student-form');

const studentTable = document.getElementById('student-table').querySelector("tbody");

// Retrive students data from localstroge
const students = JSON.parse(localStorage.getItem("students")) || [];

// function to display table 
function showTable(){
              studentTable.innerHTML = "";
              for(let i = 0; i<students.length;i++){
                            let student = students[i];

                            let row = document.createElement("tr");


                            // created  table cell for each student property
                            row.innerHTML = `<td>${student.name}</td>
                                             <td>${student.id}</td>
                                             <td>${student.email}</td>
                                             <td>${student.contact}</td>
                                             <td class="actions">
                                             <button class="edit" data-index="${i}">Edit</button>
                                             <button class="delete" data-index="${i}">Delete</button>
                                             </td>`;

                                        studentTable.appendChild(row);     
              }
}

//function for adding students

function addStudent(event){
              event.preventDefault();

              let name = form["student-name"].value.trim();
              let id = form["student-id"].value.trim();
              let email = form["email"].value.trim();
              let contact = form["contact-number"].value.trim();

              if(name && id && email && contact){
                            students.push({name,id,email,contact});
                            localStorage.setItem("students",JSON.stringify(students));
                            showTable();
                            form.reset();
              }
              else{
                            alert("All fields are required.");
              }
}

 // function of editing student information
function editStudent(event){
              if(event.target.classList.contains("edit")){
                            const index = event.target.dataset.index;
                            const student = students[index];

                            form["student-name"].value = student.name;
                            form["student-id"].value = student.id;
                            form["email"].value = student.email;
                            form["contact-number"].value = student.contact;

                            students.splice(index, 1);
                            localStorage.setItem("students", JSON.stringify(students));
                            showTable();
              
              }
}

// function for deleting a student from the list
function deleteStudent(event){
              if(event.target.classList.contains("delete")){
                            const index = event.target.dataset.index;
                            students.splice(index, 1);
                            localStorage.setItem("students",JSON.stringify(students));
                            showTable();
              }
}

// function for adding new student when the form is submitted
form.addEventListener("submit",addStudent);


studentTable.addEventListener("click",function(event){
              editStudent(event);
              deleteStudent(event);
})