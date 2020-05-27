//localStorage.removeItem('MemoData');
//show();
var myWindow;    // 子window

function load() {
    var MemoData = "";
    if (!localStorage.getItem('MemoData')) {
        MemoData = "メモは登録されていません";
    } else {
        MemoData = localStorage.getItem('MemoData');
    }
    document.form1.Memo.value = MemoData;
}

function save() {
    var MemoData = [{"data": "さんぷる"}];
    var addData = document.form1.Memo.value;
    var datalist = {
        "data": addData,
        "deadline": document.form1.Deadline.value
    }
    //console.log(document.form1.deadline.value);
    
    if (localStorage.getItem('MemoData')) {
        MemoData = JSON.parse(localStorage.getItem('MemoData'));
        MemoData.push(datalist);
    } else {
        MemoData = [{"data": addData}];
    }
    localStorage.setItem('MemoData', JSON.stringify(MemoData));
    console.log(JSON.stringify(MemoData));
    show();
}

function del(key_pos) {
    var MemoData = JSON.parse(localStorage.getItem('MemoData'));
    console.log("消すデータ: " + MemoData[key_pos].data);
    MemoData.splice(key_pos, 1);

    localStorage.setItem('MemoData', JSON.stringify(MemoData));
    show();
}

function show() {
    var list = document.getElementById("List");
    var Data = JSON.parse(localStorage.getItem('MemoData'));
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    console.log(nowDate);
    
    //console.log(Data.length);
    list.innerHTML ='';
    for (var i = 0; Data != null && i < Data.length; i++) {
        console.log(Data[i].deadline);        
        var Deadline = Data[i].deadline.date;
        var targetDate = new Date(Deadline.substr(0, 4), Deadline.substr(5, 2) - 1, Deadline.substr(8, 2));
        var dnumTarget = targetDate.getTime();
        var diffMSec = dnumTarget - dnumNow;
        var diffDays = diffMSec / (1000 * 60 * 60 * 24);
        var showDays = Math.ceil(diffDays);

        list.innerHTML += "<p id='" + i + "'>" +
            "<label class='checkbox-inline'><input type ='checkbox' onclick=changeLineThrough("+ i +")></input>" +
            Data[i].data + "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>あと" + showDays + "日です。" + "</p>";
        list.innerHTML += "<input type='button' value='変更' onclick=openPopup(" + i + ")></input>";
    }
}

function change(key_pos) {
    var MemoData = JSON.parse(localStorage.getItem('MemoData'));
    var newData = window.prompt("内容を変更して下さい", MemoData[key_pos].data);
    if (newData == "" || newData == null) {
        window.alert("キャンセルしました");
    } else {
        MemoData[key_pos].data = newData;
        localStorage.setItem('MemoData', JSON.stringify(MemoData));
        window.alert("データを更新しました");
        console.log("更新後のデータ: " + newData);
        show();
    }
}

function changeLineThrough(idname){
    var obj = document.getElementById(idname);
  
    console.log(obj);
  
    if(obj.style.textDecoration == "line-through"){
      obj.style.textDecoration = "none";
    }else{
      obj.style.textDecoration = "line-through";
    }
}

function openPopup(key_pos) {
    myWindow = window.open("popup.html?" + key_pos, "myWindow", "width=500, height=400");
}

function showClock1() {
    var nowTime = new Date();
    var nowHour = nowTime.getHours();
    var nowMin = nowTime.getMinutes();
    var nowSec = nowTime.getSeconds();
    var msg;

    if (nowHour < 10) { nowHour = "0" + nowHour; }
    if (nowMin < 10) { nowMin = "0" + nowMin; }
    if (nowSec < 10) { nowSec = "0" + nowSec; }
    
    //msg = "現在時刻 ▶️ " + nowHour + ":" + nowMin + ":" + nowSec;
    msg = nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("RealtimeClockArea").innerHTML = msg;
}
setInterval("showClock1()", 1000);

function showClock2() {
    var now = new Date();
    var myDay = new Array("日", "月", "火", "水", "木", "金", "土");
    var Year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var msg = "🌸" + Year + "年" + month + "月" + date + "日（" + myDay[day] + "曜日）";
    document.getElementById("RealDayClock").innerHTML = msg;
}
