/**
 * Created by user on 2017-06-20.
 */
var val=0;
var vals=[];
var time=0;
var pos=0;
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

        set_time(time);

    });
});

function set_time(time) {
    alert(val.length);
    alert(time+' 밖에');
    val = $('#input1').val();
    vals = val.split(';');
    if(time < vals.length-1){
        id = setInterval(frame, 20);
        alert(time+' 안에');
        var va = vals[time];
        pos = $('#animate').offset().left;

        set_values(id, va);
    } else {
        alert('끝~');
        clearInterval(id);
        return false;
    }
}

function set_values(id, va) {
    va = va.replace(/ /g,"");
    num = va.replace(/[^0-9]/g,"");
    str = va.replace(/[0-9]/g,"");
    // alert('num : '+num+', str : '+str);
    if(str === 'left') {
        pos = pos - 8;
    }
    frame();
}

function frame() {

    if('left'=== str) {
        frame_left_move();
    }else if('right'=== str){
        frame_right_move();
    }

}

function frame_left_move() {

    if (pos <= (parseInt(animate_left)) - parseInt(num)) {
        clearInterval(id);
        time = time+1;
        animate_left = parseInt($('#animate').offset().left)-8;
        set_time(id, time);
    }else if (pos < 10) {
        clearInterval(id);
    }else {
        pos--;
        elem.style.left = pos + 'px';
    }
}


function frame_right_move() {

    if (pos >= (parseInt(animate_left))+ parseInt(num)) {
        clearInterval(id);
        time = time+1;
        animate_left = parseInt($('#animate').offset().left)-8;
        set_time(time);
    }else if (pos > 350) {
        clearInterval(id);
    }else {
        pos++;
        elem.style.left = pos + 'px';
    }
}