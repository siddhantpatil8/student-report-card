
let form = document.querySelector('.Myform');

let arrMarks = [];

function onLoad(){
  
  let table = document.querySelector('#MarksTable');


// delete rows
table.addEventListener("click", e => {
    
    if(e.target.classList.contains('delete')){
  
      let row = e.target.parentElement.parentElement;
      let Cells = row.getElementsByTagName("td");
      arrMarks = arrMarks.filter(function(item){ return item[0] != Cells[0].innerText })  
      row.remove();
    }
  })

 }
 
function onAdd() {
  const subjPattern = /^[a-zA-Z ]{4,15}$/;
  

  if(subjPattern.test(form.subject.value)==true && parseInt(form.outOf.value)>=parseInt(form.marks.value)){
  	
  let row = MarksTable.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  
  let subject = form.subject.value
  let marks = form.marks.value
  let outOf = form.outOf.value

  cell1.innerHTML = subject;
  cell2.innerHTML = marks;
  cell3.innerHTML = outOf; 
  cell4.innerHTML = '<i class="fa fa-trash delete lg" aria-hidden="true"></i>';
  cell4.className  = 'can';
    
  arrMarks.push([subject,marks,outOf]);
    
  form.subject.value = "";
  form.marks.value = "";
  }

}

function onSubmit() {
  const namePattern = /^[a-zA-Z ]{4,25}$/;
  const rollPattern = /^[A-Z]{4}[0-9]{3,6}$/;

  if(namePattern.test(form.name.value) !== true){
    alert('fill the name input as instructed');
  }else if (rollPattern.test(form.rollNo.value) !==true){
    alert('fill the roll no pattern as instructed');
  }else if(arrMarks.length == 0){
    let newLine = "\r\n";
    let message = "-----I know where you went wrong!!-----";
    message += newLine;
    message += "the table is kept empty";
    message += newLine;
    message += "OR";
    message += newLine;
    message += "just delete all the subjects having similar names and re-type the subject only once";
    alert(message);
  }else{
    localStorage.setItem("name",form.name.value);
    localStorage.setItem("rollno",form.rollNo.value);
    localStorage.setItem('marksArray', JSON.stringify(arrMarks));
    form.submit();
  }
  
}




function makeTableHTML(myArray) {
  let result = "<table border=1>";
  for(let i=0; i<myArray.length; i++) {
      result += "<tr>";
      for(let j=0; j<myArray[i].length; j++){
          result += "<td>"+myArray[i][j]+"</td>";
      }
      result += "</tr>";
  }
  result += "</table>";

  return result;
}

function onSecondLoad(){
  const report = document.querySelector(".report");
        report.innerHTML = localStorage.getItem("name");
    
        const repo = document.querySelector('.repo');
        repo.innerHTML= localStorage.getItem("rollno")

        const mark = document.querySelector('.mark');
        let result = JSON.parse(localStorage.getItem("marksArray"));
        mark.innerHTML= makeTableHTML(result)

        calculate(result);
        

 }

 function calculate(result){

  let totmarksObtain=0
  let totalSum=0;
  result.forEach(element => {
    totmarksObtain = totmarksObtain + parseInt(element[1]);
    totalSum = totalSum + parseInt(element[2]);
  });
  
  const marksObtain = document.querySelector('.marksObtain');
  marksObtain.innerHTML= totmarksObtain;

  const maxtotalSum = document.querySelector('.maxMarks');
  maxtotalSum.innerHTML= totalSum;

  totpercentage = totmarksObtain/totalSum * 100;
  const per = document.querySelector('.percentage');
  per.innerHTML= totpercentage;

  findGrade(totpercentage);
 }

 function findGrade(per)
 {
   let grade='';
   
    if(per < 35)
    grade = 'Fail';
    else if(per >= 35 && per < 60)
    grade = 'Pass';
    else if(per >= 60 && per < 75)
    grade = 'Pass with First class';
    else if(per >= 75)
    grade = 'Distinction';


    const gra = document.querySelector('.grade');
    gra.innerHTML= grade;

 }







