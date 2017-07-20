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


var started_position = {
    x : 0,
    y : 0
};

var story = '0';
var written_text = '';
var distance = 0;
var cloud_position_y;

//todo 완료되면 저장하고 목록 불러오기 만들기
var $running_object;
var $container = $('#container');
var $girl = $('#girl');
var $cloud = $('#cloud');
var $background_img = $('#background_img');
var $run_button = $('#run_button');
/*var $save_button = $('#save_button');*/
var $refresh_button = $('#refresh_button');

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
var running_object_left_position;
var running_object_top_position;
var over_background_img_left;
var over_background_img_top;

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
        // onresize();
    }).resize();

    $run_button.click(function(){
        set_init();
        runCode();
    });

    $refresh_button.click(function() {
        location.reload();
    });

    $running_object.draggable({ cursor: "move", containment: $container, scroll: false});


    $container.droppable({
        drop: function( event, ui ) {
            started_position.x = $running_object.offset().left;
            started_position.y = $running_object.offset().top - running_object_top_fix;
        }
    });

});

function set_init() {
    $girl.css({"left": started_position.x, "top": started_position.y });
    $cloud.css({"left": background_size.current_width*0.20, "top": background_size.current_height*0.20 });
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
    /*cloud_position_y = background_size.current_width*0.20;*/
    $cloud.css({"left": background_size.current_width*0.20, "top": background_size.current_height*0.20 });
}

function check_running_object_position() {
    running_object_left_position = $running_object.offset().left;
    running_object_top_position = $running_object.offset().top - running_object_top_fix;

    over_background_img_left = ($background_img.width() < running_object_left_position + $running_object.width()) || (running_object_left_position < 0);
    over_background_img_top = ($background_img.height() < running_object_top_position + $running_object.height()) || (running_object_top_position < 0)

    if(over_background_img_left || over_background_img_top) {
        alert('이미지가 넘어갑니다.');
        $running_object.stop(true,false);
        $running_object.css({"left": started_position.x, "top": started_position.y });
        $cloud.css({"left": background_size.current_width*0.20, "top": background_size.current_height*0.20 });
    }
}