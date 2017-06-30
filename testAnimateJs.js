/**
 * Created by user on 2017-06-27.
 */
/**
 * Created by user on 2017-06-20.
 */
var programming = '';
var programmed_line = [];
var times_running = 0;
var current_position_x = 0;
var current_position_y = 0;
var target_position_x = 0;
var target_position_y = 0;
var direction = '';
var distance = 0;

var command = {
    left    : ['left', '왼쪽', '좌'],
    right   : ['right', '오른쪽', '우'],
    up      : ['up', '위쪽', '위'],
    down    : ['down', '아래쪽', '아래']
}

//todo 대상 정리하기
//todo 완료되면 저장하고 목록 불러오기 만들기
var red = $('#animate1');
var blue = $('#animate2');
var id;

$(document).ready(function(){

    $('#button').click(function(){
        set_init();
        $('#button').addClass("disabled");
        clicked_run_button();
    });


   $('#button2').click(function () {
       loopBoat();
   })
});
function set_init() {
    $('#animate1').css({"top": "0", "left": "0"});
    $('#wrong_text_show').hide();
    distance = 0;
}

function loopBoat() {
    $('#animate2').animate({ 'top' : '140px'}, 500)
        .animate({ 'top' : '120px'}, 500, loopBoat);
}

function clicked_run_button() {
    times_running    = 0;
    programming = $('#comment').val().replace(/[\r|\n]/g,"");
    programmed_line = programming.split(';');

    set_times_running();
}

function set_times_running() {
    if(times_running < programmed_line.length-1){
        var run_line = programmed_line[times_running];
        current_position_x = $('#animate1').offset().left;
        current_position_y = $('#animate1').offset().top;
        set_values(run_line);
    } else {
        alert('끝~');
        $('#button').removeClass("disabled");
    }
}

function set_values(run_line) {
    run_line = run_line.replace(/ /g,"");

    distance = run_line.replace(/[^0-9]/g,"");
    direction = run_line.replace(/[0-9]/g,"");

    frame();
}

function frame() {

    if(select_frame(command.left)) {
        frame_left_move();
    }else if(select_frame(command.right)){
        frame_right_move();
    }else if(select_frame(command.up)) {
        frame_up_move();
    }else if(select_frame(command.down)) {
        frame_down_move();
    }else {
        wrong_command();
    }

}

function select_frame(command) {
    for (var key in command) {
        if (command[key] === direction) {
            return true;
        }
    }
    return false;
}

function wrong_command() {
    $('#wrong_text').html(direction);
    $('#wrong_text_show').show();
    $('#button').removeClass("disabled");
}

function frame_left_move() {
    times_running++;
    target_position_x = parseInt(current_position_x) - parseInt(distance);

    if(target_position_x < 0) {
        $('#animate1').animate({left:0},set_moving_time(current_position_x),set_times_running);
    }else {
        $('#animate1').animate({left:target_position_x},set_moving_time(target_position_x),set_times_running);
    }
}


function frame_right_move() {
    times_running++;
    target_position_x = parseInt(current_position_x) + parseInt(distance);
    if(target_position_x > 350) {
        $('#animate1').animate({left:350},set_moving_time(350-current_position_x),set_times_running);
    }else {
        $('#animate1').animate({left:target_position_x},set_moving_time(target_position_x),set_times_running);
    }
}

function frame_up_move() {

    times_running++;
    target_position_y = parseInt(current_position_y) - parseInt(distance);
    if(target_position_y < 0) {
        $('#animate1').animate({top:0}, set_moving_time(current_position_y),set_times_running);
    }else {
        $('#animate1').animate({top:target_position_y}, set_moving_time(target_position_y),set_times_running);
    }
}


function frame_down_move() {

    times_running++;
    target_position_y = parseInt(current_position_y) + parseInt(distance);
    if(target_position_y > 350) {
        $('#animate1').animate({top:350}, set_moving_time(350-current_position_y), set_times_running);
    }else {
        $('#animate1').animate({top:target_position_y}, set_moving_time(target_position_y), set_times_running);
    }
}

function set_moving_time(distance){
    return distance*10;
}