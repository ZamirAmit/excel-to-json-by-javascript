let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            json_obj = {};
            workbook.SheetNames.forEach(sheet => {
                json_obj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                json_exam = BuildingJSON(json_obj);
                console.log(json_exam);
                //console.log(rowObject);
                //document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
            });

        }
    }
});




function BuildingJSON(values) {
    var obj = {};
    data = {};
    subjects = {};
    questions = {};
    data = {};
    subject = {};
    var question = {};

    // Setting banks:
    for (i = 1; i < values.length; i++) {
        if (Object.values(values[i])[2].length > 0) {

            bank_id = "bank_" + values[i].bank_id;
            data[bank_id] = {};

        }
    }

    // Setting subjects:
    for (i = 1; i < values.length; i++) {
        if (Object.values(values[i])[2].length > 0) {

            bank_id = "bank_" + values[i].bank_id;
            subject_id = "subject_" + values[i].subject_id;
            subject.subject_id = {};

            data[bank_id][subject_id] = {};


        }
    }

    // Setting questions:
    for (i = 1; i < values.length; i++) {
        if (Object.values(values[i])[2].length > 0) {

            bank_id = "bank_" + values[i].bank_id;
            subject_id = "subject_" + values[i].subject_id;
            question_id = "question_option_" + values[i].question_id;
            subject[subject_id] = {};

            data[bank_id][subject_id][question_id] = {};


        }
    }

    // Setting details of questions subjects:
    for (i = 1; i < values.length; i++) {
        RecordIsNotEmpty = Object.values(values[i])[2].length > 0;
        if (RecordIsNotEmpty) {

            bank_id = "bank_" + values[i].bank_id;
            subject_id = "subject_" + values[i].subject_id;
            question_id = "question_option_" + values[i].question_id;
            subject_body = values[i].subject_body;
            subject[subject_id] = {};
            question.question_body = values[i].question_body;
            question.true_answer = values[i].true_answer;
            question.fail_answer1 = values[i].fail_answer1;
            question.fail_answer2 = values[i].fail_answer2;
            question.fail_answer3 = values[i].fail_answer3;
            question.question_title = values[i].question_title;
            question.chapter_body = values[i].chapter_body;

            question.acronym = values[i][11];
            //Logger.log(question.acronym);
            data[bank_id][subject_id]["subject_body"] = subject_body;
            data[bank_id][subject_id][question_id] = question;

            question = {};

        }
    }


    obj.data = data;
    return obj;

}