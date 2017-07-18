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
        remove_data     : _removeData
    };
}();

var frame = function(){
    var width_limit;
    var height_limit;
    var _left_move = function() {
        times_running++;
        distance = move_block * block_width_size;
        target_position_x = parseInt(current_position_x) - parseInt(distance);

        if (target_position_x < 0) {
            $running_object.animate({left: 0}, set_moving_time(move_block), selected_easing, set_times_running);
        } else {
            $running_object.animate({left: target_position_x}, set_moving_time(move_block), selected_easing, set_times_running);
        }
    };

    var _right_move = function() {
        width_limit = background_size.current_width - $running_object.width();
        times_running++;
        distance = move_block * block_width_size;
        target_position_x = parseInt(current_position_x) + parseInt(distance);
        if(target_position_x > width_limit) {
            $running_object.animate({left:width_limit},set_moving_time(move_block), selected_easing, set_times_running);
        }else {
            $running_object.animate({left:target_position_x},set_moving_time(move_block), selected_easing, set_times_running);
        }
    };

    var _up_move = function () {
        times_running++;
        distance = move_block * block_height_size;
        target_position_y = parseInt(current_position_y) - parseInt(distance);
        if(target_position_y < 0) {
            $running_object.animate({top:0}, set_moving_time(move_block),selected_easing, set_times_running);
        }else {
            $running_object.animate({top:target_position_y}, set_moving_time(move_block),selected_easing, set_times_running);
        }
    };

    var _down_move = function () {
        height_limit = background_size.current_height - $running_object.height();
        times_running++;
        distance = move_block * block_height_size;
        target_position_y = parseInt(current_position_y) + parseInt(distance);
        if(target_position_y > height_limit) {
            $running_object.animate({top:height_limit}, set_moving_time(move_block), selected_easing, set_times_running);
        }else {
            $running_object.animate({top:target_position_y}, set_moving_time(move_block), selected_easing, set_times_running);
        }
    };

    return {
        left_move   : _left_move,
        right_move  : _right_move,
        up_move     : _up_move,
        down_move   : _down_move
    };
}();

var started_position = {
    x : 0,
    y : 0
};

var written_text2 = '';
var story = '0';
var written_text = '';
var programming = '';
var programmed_line = [];
var times_running = 0;
var current_position_x = 0;
var current_position_y = 0;
var target_position_x = 0;
var target_position_y = 0;
var activity = '';
var distance = 0;
var move_block = 0;
var cloud_position_y;
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
var $cloud = $('#cloud');
var $background_img = $('#background_img');
var $run_button = $('#run_button');
var $test_button = $('#test_button');
var $save_button = $('#save_button');
var $refresh_button = $('#refresh_button');

var li_selected;
var li_input;
var selected_easing;
var selected_speed;

var block_width_count = 12;
var block_height_count = 6;

var background_size = {
    current_width : 0,
    current_height : 0,
    before_width : 0,
    before_height :0
};

var block_width_size;
var block_height_size;
var running_object_top_fix = $('#table_head')[0].offsetHeight;

var run_flag = false;
//todo change image
/*var d = new Date
$('#imgg').attr("src", "/fish.png?"+d.getTime());*/

$(function(){
    $running_object = $girl;
    story = '0';

    background_size.before_width = $background_img.width();
    background_size.before_height = $background_img.height();
    background_size.current_width = $background_img.width();
    background_size.current_height = $background_img.height();

    $(window).resize(function(){
        set_position_resize();
        draw_line();
    }).resize();

    $run_button.click(function(){
        set_init();
        clicked_run_button();
        loopBoat();
    });


    $test_button.click(function () {
        loopBoat();
    });

    $save_button.click(function () {
        clicked_save_button();
    });

    $refresh_button.click(function() {
        location.reload();
    });

    $running_object.draggable({ cursor: "move", containment: $container, scroll: false});
    /*$cloud.draggable({ cursor: "move", containment: $container, scroll: false});*/

    $container.droppable({
        drop: function( event, ui ) {
            started_position.x = $running_object.offset().left;
            started_position.y = $running_object.offset().top - running_object_top_fix;
            /*cloud_position_x = $cloud.offset().top;*/
        }
    });

    $( "#sortable" ).sortable({
        revert: true,
        items: "li:not(.ui-state-disabled)"
    });

    $( ".draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });

    $( "ul, li" ).disableSelection();

});

function draw_line() {

}

function set_position_resize() {
    background_size.before_width = background_size.current_width;
    background_size.before_height = background_size.current_height;

    background_size.current_width = $background_img.width();
    background_size.current_height = $background_img.height();

    block_width_size = (background_size.current_width-$running_object.width()) / (block_width_count);
    block_height_size = (background_size.current_height-$running_object.height()) / (block_height_count);

    started_position.x = background_size.current_width*started_position.x/background_size.before_width;
    started_position.y = background_size.current_height*started_position.y/background_size.before_height;
    $running_object.css({"left": started_position.x, "top": started_position.y });
    cloud_position_y = background_size.current_width*0.20;
    $cloud.css({"left": background_size.current_width*0.20, "top": background_size.current_height*0.20 });
}

function number_key_ckeck(event) {
    var keyValue = event.keyCode;
    if (((keyValue >= 48) && (keyValue <= 57))){
        return true;
    }else{
        return false;
    }
}

function set_init() {
    $running_object.css({"left": started_position.x, "top": started_position.y });
    written_text='';
    $('#wrong_text_show').hide();
    distance = 0;
}

function loopBoat() {
    if(run_flag){
        $cloud.animate({ 'top' : cloud_position_y}, 500)
            .animate({ 'top' : cloud_position_y-30}, 500, loopBoat);
    }
}

function clicked_run_button() {

    set_container();

    if(validation_check()){
        run_flag = true;
        selected_easing = $('#effectTypes').val();
        selected_speed = $('#speed').val();

        $run_button.addClass("disabled");
        $run_button.prop( "disabled", true );
        times_running    = 0;
        remove_class_running_line();

        for(var i=0; i<li_selected.length; i++) {
            written_text += li_selected.eq(i).val() + li_input.eq(i).val() + ';';
        }
        set_programmed_line();
    }

}
function set_container() {
    li_selected = $('ul.ul_container li option:selected');
    li_input = $('ul.ul_container li input');
}

function validation_check() {
    for(var i=0; i<li_input.length;i++) {
        if(li_input.eq(i).val() === '') {
            alert('please check value');
            return false;
        }
    }
    return true;
}
function remove_class_running_line() {
    li_selected.parent().parent().parent().removeClass("running_line");
}

function set_programmed_line() {
    programming = written_text.replace(/[\r|\n]/g,"");
    programmed_line = programming.split(';');

    set_times_running();
}

function set_times_running() {
    if(times_running < programmed_line.length-1){
        var run_line = programmed_line[times_running];

        running_line_color();

        current_position_x = $running_object.offset().left;
        current_position_y = $running_object.offset().top - $('#table_head')[0].offsetHeight;
        set_values(run_line);
    } else {
        finish_run();
    }
}
function running_line_color() {
    remove_class_running_line();
    li_selected.eq(times_running).parent().parent().parent().addClass("running_line");
    $run_button.removeClass("disabled");
}
function finish_run() {
    $run_button.prop( "disabled", false );
    $run_button.removeClass("disabled");
    remove_class_running_line();
    run_flag = false;
}

function cancel_save() {
    $running_object.css({"left": started_position.x, "top": started_position.y });
}

function set_values(run_line) {
    run_line = run_line.replace(/ /g,"");

    /*distance = run_line.replace(/[^0-9]/g,"");*/
    move_block = run_line.replace(/[^0-9]/g,"");
    activity = run_line.replace(/[0-9]/g,"");

    set_frame();
}

function set_frame() {

    if(select_frame(command.left)) {
        frame.left_move();
    }else if(select_frame(command.right)){
        frame.right_move();
    }else if(select_frame(command.up)) {
        frame.up_move();
    }else if(select_frame(command.down)) {
        frame.down_move();
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

function set_moving_time(move_block){
    return parseInt(selected_speed*move_block);
}

function clicked_save_button() {
    if (confirm("저장 하시겠습니까?") === true){
        //todo 저장 작업
        /*confirm_save();
         $('#command').val('');*/
    }else{
        cancel_save();
    }

    times_running=0;
    $running_object.css({"left": started_position.x, "top": started_position.y });

    // written_text = written_text2;
    // for(var key_story in activityData.get_data()){
    //     alert("story : "+key_story+", val : "+activityData.get_data(key_story)[2]);
    //     story = key_story;
    //     $running_object = activityData.get_data(key_story)[0];
    //     started_position.x = 0;
    //     started_position.y = 0;
    //     written_text = activityData.get_data(key_story)[2];
    //
    // set_programmed_line();
    // }
}

function confirm_save() {
    activityData.set_data();
    written_text2 = written_text2 + written_text;
    ++story;
}