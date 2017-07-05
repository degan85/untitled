/**
 * Created by user on 2017-06-27.
 */
/**
 * Created by user on 2017-06-20.
 */

/**
 * save list.
 */
var activityData = function(){
    var saved_list = {};

    // private method

    // public method
    var _getData = function(key){
        if(key === undefined){
            return saved_list;
        }
        else{
            return saved_list[key];
        }
    };

    var _setData = function(key, val) {
        if(key === undefined && val === undefined) {
            saved_list[story] = [$running_object, started_position, written_text];
        }else if(val === undefined){
            saved_list = key;
        }
        else{
            saved_list[key] = val;
        }
    };
    var _addData = function(key, arr){
        saved_list[key] = saved_list[key].concat(arr);
    };

    var _removeData = function(key, index){
        data_public[key].splice(index, 1);
    };

    return {
        get_data		: _getData,
        set_data		: _setData,
        add_data	    : _addData,
        remove_data   : _removeData
    };
}();

var written_text2 = '';
var story = '0';
var written_text = '';
var programming = '';
var programmed_line = [];
var times_running = 0;
var started_position = {
    x : 0,
    y : 0
};
var current_position_x = 0;
var current_position_y = 0;
var target_position_x = 0;
var target_position_y = 0;
var activity = '';
var distance = 0;

var command = {
    left    : ['left', '왼쪽', '좌'],
    right   : ['right', '오른쪽', '우'],
    up      : ['up', '위쪽', '위'],
    down    : ['down', '아래쪽', '아래']
}

//todo 완료되면 저장하고 목록 불러오기 만들기
var $running_object;
var $container = $('#container');
var $girl = $('#girl');
var $fish = $('#fish');

var $run_button = $('#run_button');
var $test_button = $('#test_button');
var $play_button = $('#play_button');
var $refresh_button = $('#refresh_button');
var clicked_paly = false;

$ (function(){

    //todo 대상자랑 클릭으로 이동 후 처음 위치 저장하게
    $running_object = $girl;
    /*started_position.x = '0'; /!* $running_object.offset().left; *!/
    started_position.y = '0'; /!* $running_object.offset().top; *!/*/
    story = '0';

    $run_button.click(function(){
        set_init();
        $run_button.addClass("disabled");
        $run_button.prop( "disabled", true );
        clicked_run_button();
    });


    $test_button.click(function () {
        loopBoat();
    });

    $play_button.click(function () {
        clicked_paly = true;
        clicked_play_button();
    });

    $refresh_button.click(function() {
        location.reload();
    })

    $running_object.draggable({ cursor: "move", containment: $container, scroll: false, opacity: 0.7, helper: "clone"});
    $container.droppable({
        drop: function( event, ui ) {
            $( this );
            started_position.x = $running_object.offset().left;
            started_position.y = $running_object.offset().top;
        }
    });
});
function set_init() {
    $running_object.css({"left": started_position.x, "top": started_position.y });
    clicked_paly = false;
    $('#wrong_text_show').hide();
    distance = 0;
}

function loopBoat() {
    $fish.animate({ 'top' : '240px'}, 500)
        .animate({ 'top' : '250px'}, 500, loopBoat);
}

function clicked_run_button() {
    times_running    = 0;
    written_text = $('#command').val();

    set_programmed_line();
}
function set_programmed_line() {
    programming = written_text.replace(/[\r|\n]/g,"");
    programmed_line = programming.split(';');

    set_times_running();
}

function clicked_play_button() {
    times_running=0;
    $running_object.css({"left": started_position.x, "top": started_position.y });

    written_text = written_text2;
    // for(var key_story in activityData.get_data()){
    //     alert("story : "+key_story+", val : "+activityData.get_data(key_story)[2]);
    //     story = key_story;
    //     $running_object = activityData.get_data(key_story)[0];
    //     started_position.x = 0;
    //     started_position.y = 0;
    //     written_text = activityData.get_data(key_story)[2];
    //
    set_programmed_line();
    // }
}

function set_times_running() {
    if(times_running < programmed_line.length-1){
        var run_line = programmed_line[times_running];
        current_position_x = $running_object.offset().left;
        current_position_y = $running_object.offset().top;
        set_values(run_line);
    } else {
        finish_run();
    }
}

function finish_run() {
    if(!clicked_paly) {
        if (confirm("저장 하시겠습니까?") === true){
            confirm_save();
            $('#command').val('');
        }else{
            cancel_save();
        }
    }
    $run_button.prop( "disabled", false );
    $run_button.removeClass("disabled");
    clicked_paly = false;
}

function confirm_save() {
    activityData.set_data();
    written_text2 = written_text2 + written_text;
    ++story;
}

function cancel_save() {
    $running_object.css({"left": started_position.x, "top": started_position.y });
}

function set_values(run_line) {
    run_line = run_line.replace(/ /g,"");

    distance = run_line.replace(/[^0-9]/g,"");
    activity = run_line.replace(/[0-9]/g,"");

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
        if (command[key] === activity) {
            return true;
        }
    }
    return false;
}

function wrong_command() {
    $('#wrong_text').html(activity);
    $('#wrong_text_show').show();
    $run_button.removeClass("disabled");
    $run_button.prop( "disabled", false );
}

//todo frame 정리하기
function frame_left_move() {
    times_running++;
    target_position_x = parseInt(current_position_x) - parseInt(distance);

    if(target_position_x < 0) {
        $running_object.animate({left:0},set_moving_time(current_position_x),set_times_running);
    }else {
        $running_object.animate({left:target_position_x},set_moving_time(target_position_x),set_times_running);
    }
}


function frame_right_move() {
    times_running++;
    target_position_x = parseInt(current_position_x) + parseInt(distance);
    if(target_position_x > 350) {
        $running_object.animate({left:350},set_moving_time(320-current_position_x),set_times_running);
    }else {
        $running_object.animate({left:target_position_x},set_moving_time(target_position_x),set_times_running);
    }
}

function frame_up_move() {

    times_running++;
    target_position_y = parseInt(current_position_y) - parseInt(distance);
    if(target_position_y < 0) {
        $running_object.animate({top:0}, set_moving_time(current_position_y),set_times_running);
    }else {
        $running_object.animate({top:target_position_y}, set_moving_time(target_position_y),set_times_running);
    }
}


function frame_down_move() {

    times_running++;
    target_position_y = parseInt(current_position_y) + parseInt(distance);
    if(target_position_y > 350) {
        $running_object.animate({top:350}, set_moving_time(320-current_position_y), set_times_running);
    }else {
        $running_object.animate({top:target_position_y}, set_moving_time(target_position_y), set_times_running);
    }
}

function set_moving_time(distance){
    return distance*10;
}