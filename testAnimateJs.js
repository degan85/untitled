/**
 * Created by user on 2017-06-27.
 */
/**
 * Created by user on 2017-06-20.
 */
var val=0;
var vals=[];
var time=0;
var pos_x=0;
var pos_y=0;
var animate_left = 0;
var animate_top = 0;
var str='';
var num='';
var red = $('#animate1');
var blue = $('#animate2');
var id;

$(document).ready(function(){

    // alert('sss');

    $('#button').click(function(){

        time=0;
        val = $('#input1').val();
        val = val.replace(/[\r|\n]/g,"");
        vals = val.split(';');

        set_time();

    });

   $('#button2').click(function () {

       // $('#animate2').animate({left:150},1000);
       loopBoat();
   })
});

function loopBoat() {
    $('#animate2').animate({ 'bottom' : '140px'}, 500)
        .animate({ 'bottom' : '120px'}, 500, loopBoat);
}

function set_time() {
    if(time < vals.length-1){
        var va = vals[time];
        animate_left = $('#animate1').offset().left;
        animate_top = $('#animate1').offset().top;
        set_values(va);
    } else {
        alert('끝~');
    }
}

function set_values(va) {

    va = va.replace(/ /g,"");

    num = va.replace(/[^0-9]/g,"");
    str = va.replace(/[0-9]/g,"");

    frame();
}

function frame() {

    if('left'=== str||'왼쪽'==str) {
        frame_left_move();
    }else if('right'=== str||'오른쪽'==str){
        frame_right_move();
    }else if('up'==str||'위쪽'==str) {
        frame_up_move();
    }else if('down'==str||'아래쪽'==str) {
        frame_down_move();
    }

}

function frame_left_move() {
    time++;
    pos_x = parseInt(animate_left) - parseInt(num);

    if(pos_x < 0) {
        $('#animate1').animate({left:0},set_moving_time(animate_left),set_time);
    }else {
        $('#animate1').animate({left:pos_x},set_moving_time(pos_x),set_time);
    }
}


function frame_right_move() {
    time++;
    pos_x = parseInt(animate_left) + parseInt(num);
    if(pos_x > 350) {
        $('#animate1').animate({left:350},set_moving_time(350-animate_left),set_time);
    }else {
        $('#animate1').animate({left:pos_x},set_moving_time(pos_x),set_time);
    }
}

function frame_up_move() {

    time++;
    pos_y = parseInt(animate_top) - parseInt(num);
    if(pos_y < 0) {
        $('#animate1').animate({top:0}, set_moving_time(animate_top),set_time);
    }else {
        $('#animate1').animate({top:pos_y}, set_moving_time(pos_y),set_time);
    }
}


function frame_down_move() {

    time++;
    pos_y = parseInt(animate_top) + parseInt(num);
    if(pos_y > 350) {
        $('#animate1').animate({top:350}, set_moving_time(350-animate_top),set_time);
    }else {
        $('#animate1').animate({top:pos_y}, set_moving_time(pos_y), set_time);
    }
}

function set_moving_time(distance){
    return distance*10;
}