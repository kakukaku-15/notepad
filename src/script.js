//localStorage.removeItem('MemoData');
var myWindow;    // 子window

// データを読み込みデフォルト値として表示
function load(formId, key_pos) {
    var form = document.getElementById(formId);
    if (key_pos == -1) {
        // 日付の初期値を今日に
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        form.Date.value =  year + "-" + ("00" + month).slice(-2) + "-" + ("00" + date).slice(-2);
    } else {
        // データの読み込み
        var MemoData = JSON.parse(localStorage.getItem("MemoData"));  
        if (MemoData != null && MemoData.length > 0) {    // データが存在するとき
            console.log(MemoData.length);
            form.Memo.value = MemoData[key_pos].data;
            form.Date.value =  MemoData[key_pos].deadline.date;
            form.Time.value =  MemoData[key_pos].deadline.time;
        }
    }
}

function save(newData) {
    if (localStorage.getItem('MemoData')) {
        var MemoData = JSON.parse(localStorage.getItem("MemoData"));
        MemoData.push(newData);
    } else {
        var MemoData = [newData];
    }
    localStorage.setItem("MemoData", JSON.stringify(MemoData));
    console.log(JSON.stringify(MemoData));
}

function del(key_pos) {
    var MemoData = JSON.parse(localStorage.getItem("MemoData"));
    console.log("消すデータ: " + MemoData[key_pos].data);
    MemoData.splice(key_pos, 1);
    localStorage.setItem("MemoData", JSON.stringify(MemoData));
}

// データの一覧をすべて表示
function showList(id) {
    var list = document.getElementById(id);
    var Data = JSON.parse(localStorage.getItem("MemoData"));
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    console.log(nowDate);
    
    //console.log(Data.length);
    list.innerHTML ="";
    for (var i = 0; Data != null && i < Data.length; i++) {
        console.log(Data[i].deadline);        
        var dDate = Data[i].deadline.date;
        var targetDate = new Date(dDate.substr(0, 4), dDate.substr(5, 2) - 1, dDate.substr(8, 2));
        var dnumTarget = targetDate.getTime();
        var diffMSec = dnumTarget - dnumNow;
        var diffDays = diffMSec / (1000 * 60 * 60 * 24);
        var showDays = Math.ceil(diffDays);
        //console.log(diffMSec);    
        var check = "";    
        var line = "";    
        if (Data[i].check == true) {
            check = "checked='checked'";
            line = "style='text-decoration: line-through;'";
        } 

        list.innerHTML += "<p id='" + i + "'" + line + ">" +
            "<label class='checkbox-inline'><input type ='checkbox' " + check + "onclick=changeLineThrough("+ i +")></input>" +
            Data[i].data + "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>あと" + showDays + "日です。" + "</p>";
        list.innerHTML += "<input type='button' class='fuwauki_btn_red' value='変更' onclick=openPopup(" + i + ")></input>";
    }
}

function show2(id) {
    var list = document.getElementById(id);
    var Data = JSON.parse(localStorage.getItem("MemoData"));
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    console.log(nowDate);

    list.innerHTML ='';
    for (var i = 0; Data != null && i < Data.length; i++) {
        console.log(Data[i].deadline);  
        if(Data[i].check == true) {
            continue;
        }      
        var dDate = Data[i].deadline.date;
        var dTime = Data[i].deadline.time;
        var targetDate = new Date(dDate.substr(0, 4), dDate.substr(5, 2) - 1, dDate.substr(8, 2), dTime.substr(0, 2), dTime.substr(3, 2));
        var dnumTarget = targetDate.getTime();
        var diffMSec = dnumTarget - dnumNow;
        var diffDays = diffMSec / (1000 * 60 * 60 * 24);
        var showDays = Math.ceil(diffDays);
        
        if (showDays > 7) {
            continue;
        } else if (showDays < 0) {
            list.innerHTML += "<p>" + Data[i].data + 
            "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>期限を過ぎています</p>";
        } else { // 一週間以内    
            list.innerHTML += "<p>" + Data[i].data + 
            "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>あと" + showDays + "日だよぉ</p>";
        }
        list.innerHTML += "<hr>";
    }
}

function change(key_pos, formId) {
    var newData = {
        "data": document.getElementById(formId).Memo.value,
        "deadline": {
            "date": document.getElementById(formId).Date.value,
            "time": document.getElementById(formId).Time.value
        },
        "check": false
    }
    if (newData.data == "") {
        window.alert("入力してください");
    } else {
        if (key_pos == -1) {
            save(newData);
        } else {
            var MemoData = JSON.parse(localStorage.getItem("MemoData"));
            MemoData[key_pos] = newData;
            localStorage.setItem("MemoData", JSON.stringify(MemoData));
            //window.alert("データを更新しました");
            console.log("更新後のデータ: " + newData);
        }
    }
    pReload();
}

function changeLineThrough(idname){
    var obj = document.getElementById(idname);
    var MemoData = JSON.parse(localStorage.getItem("MemoData"));
    console.log(obj);
  
    if(MemoData[idname].check == true){
        MemoData[idname].check = false;
        obj.style.textDecoration = "none";
    } else {
        MemoData[idname].check = true;
        obj.style.textDecoration = "line-through";
    }
    localStorage.setItem("MemoData", JSON.stringify(MemoData));
}

function openPopup(key_pos) {
    var w = 300;
    var h = 100;
    var t = window.screenTop + h / 2;
    var l = window.screenLeft + w / 2;

    myWindow = window.open("popup.html?" + key_pos, "myWindow", 
        "width=" + w + ", height=" + h + ", top=" + t + ", left=" + l);
}

// 親ウィンドウを更新して閉じる
function pReload() {
    window.opener.location.reload();
    window.close();
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

function readText() {
    document.getElementById("news").innerHTML = "<div id='news' class='telop2' style='top: 0px; left:20px;'>天気予報！取ってきますんで！</div>";

    // XMLHttpRequest生成
    var req = new XMLHttpRequest();
    
    // REST-APIのステータス取得処理
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.response) {
                // 読み込んだjsonデータをパース
                var dat = JSON.parse(this.response);
    
                // １日分のhtmlを作成
                function makeDateHtml(day) {
                    var html = "<div class='telop' style=''>";
                    html += dat.title;
                    html += day.date;
                    html += "(" + day.telop + ")";
                    html += "　<img width='28px' src='" + day.image.url + "'/>";
                    html += "</div>";
                    return(html);
                }
                
                var html = "";
            
                // １日分のデータを取得
                var day = dat.forecasts[0];
                if (day != null) {
                    // １日分のhtmlを作成
                    html += makeDateHtml(dat.forecasts[0]) + "<br/>";
                }
    
                // 詳細情報の追加
                // html += "<div class='box'>" + dat.description.text.replace(/¥r?¥n/g, '<br/>') + "</div>";
    
                // 作成したhtmlを流し込む
                document.getElementById("news").innerHTML = html;
            }
        }
    }
    
    /*
        地域コード(以下を参照)
            http://weather.livedoor.com/forecast/rss/primary_area.xml
    */
    var cityCode = "370000"; //香川県高松市
    
    // REST-API呼び出し
    req.open("GET", "https://www.wabiapp.com/Test/get_weather.php?city=" + cityCode, true);
    req.send();
}