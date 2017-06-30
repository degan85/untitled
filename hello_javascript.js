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
var elem = document.getElementById("animate");
var id;

$(document).ready(function(){

    // alert('sss');

    $('#button').click(function(){


        animate_top = $('#animate').offset().top;
        animate_left = $('#animate').offset().left;


        time=0;
        val = $('#input1').val();
        val = val.replace(/[\r|\n]/g,"");
        vals = val.split(';');

        set_time(time);

    });
});



function set_time(time) {
    // alert("길이? : "+programmed_line.length);
    // alert(times_running+' 밖에');
    if(time < vals.length-1){
        // alert(times_running+' 안에');
        var va = vals[time];
        pos_x = $('#animate').offset().left;
        pos_y = $('#animate').offset().top;
        set_values(va);
    } else {
        alert('끝~');
        clearInterval(id);
        return false;
    }
}

function set_values(va) {
    id = setInterval(frame, 20);

    va = va.replace(/ /g,"");
    num = va.replace(/[^0-9]/g,"");
    str = va.replace(/[0-9]/g,"");
    // alert('distance : '+distance+', activity : '+activity);
    if(str === 'left') {
        // target_position_x = target_position_x - 8;
    }
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

    if (pos_x <= (parseInt(animate_left)) - parseInt(num)) {
        clearInterval(id);
        time++;
        animate_left = parseInt($('#animate').offset().left)-8;
        set_time(time);
    }else if (pos_x < 10) {
        clearInterval(id);
    }else {
        pos_x--;
        elem.style.left = pos_x + 'px';
    }
}


function frame_right_move() {

    if (pos_x >= (parseInt(animate_left))+ parseInt(num)) {
        clearInterval(id);
        time++;
        animate_left = parseInt($('#animate').offset().left)-8;
        set_time(time);
    }else if (pos_x > 350) {
        clearInterval(id);
    }else {
        pos_x++;
        elem.style.left = pos_x + 'px';
    }
}

function frame_up_move() {

    if (pos_y <= (parseInt(animate_top)) - parseInt(num)) {
        clearInterval(id);
        time++;
        animate_top = parseInt($('#animate').offset().top);
        set_time(time);
    }else if (pos_y < 10) {
        clearInterval(id);
    }else {
        pos_y--;
        elem.style.top = (pos_y) + 'px';
    }
}


function frame_down_move() {

    if (pos_y >= (parseInt(animate_top))+ parseInt(num)) {
        clearInterval(id);
        time++;
        animate_top = parseInt($('#animate').offset().top);
        set_time(time);
    }else if (pos_y > 350) {
        clearInterval(id);
    }else {
        pos_y++;
        elem.style.top = (pos_y) + 'px';
    }
}