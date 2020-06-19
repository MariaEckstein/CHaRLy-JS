/*Functions and variables for saving data with PHP
Taken from https://kywch.github.io/jsPsych-in-Qualtrics/save-php/ */


var task_name = "CHaRLy";
var sbj_id;//jsPsych.data.getURLVariable("ID") -- won't work rn
console.log(sbj_id);

// you must put your save_data php url here.
var save_url = "http://149.165.168.81/CHaRLy-JS/save_data.php";
var data_dir = "data";

// my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id;

function save_data_json() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.json', // the file type should be added
            exp_data: jsPsych.data.get().json()
        }
    });
}

function save_data_csv() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: jsPsych.data.get().csv()
        }
    });
}
