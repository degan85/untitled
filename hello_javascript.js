/**
 * Created by user on 2017-06-20.
 */
var val=0;
var vals;
var time=0;
var pos=0;
var animate_left = 0;
var str='';
var num='';
var elem = document.getElementById("animate");

$(document).ready(function(){

    // alert('sss');

    $('#button').click(function(){

        var id = setInterval(frame, 20);
        var animate_top = $('#animate').offset().top;
        animate_left = $('#animate').offset().left;

        val = $('#input1').val();
        vals = val.split(';');
        time=0;

        move(id,time);

    });
});

function move(id, time) {
    alert(time+' 밖에');
    if(time < vals.length-1){
        alert(time+' 안에');
        var va = vals[time];
        pos = $('#animate').offset().left;

        set_values(id, va);
    } else {
        alert('끝~');
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
    frame(id);
}

function frame(id) {

    if('left'=== str) {
        frame_left_move(id);
    }else if('right'=== str){
        frame_right_move(id);
    }

}

function frame_left_move(id) {

    if (pos === (parseInt(animate_left)) - parseInt(num)) {
        clearInterval(id);
        time = time+1;
        animate_left = $('#animate').offset().left;
        move(id, time);
    }else if (pos < 10) {
        clearInterval(id);
    }else {
        pos--;
        elem.style.left = pos + 'px';
    }
}


function frame_right_move(id) {

    if (pos === (parseInt(animate_left))+ parseInt(num)) {
        clearInterval(id);
        time = time+1;
        animate_left = $('#animate').offset().left;
        move(id, time);
    }else if (pos > 350) {
        clearInterval(id);
    }else {
        pos++;
        elem.style.left = pos + 'px';
    }
}