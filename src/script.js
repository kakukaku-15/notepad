//localStorage.removeItem('MemoData');
var myWindow;    // 子window

// データを読み込みデフォルト値として表示
function load(formId, key_pos) {
    // データの読み込み
    var MemoData = JSON.parse(localStorage.getItem('MemoData'));  
    if (MemoData != null && MemoData.length > 0) {    // データが存在するとき
        console.log(MemoData.length);
        var form = document.getElementById(formId);
        form.Memo.value = MemoData[key_pos].data;
        form.Date.value =  MemoData[key_pos].deadline.date;
        form.Time.value =  MemoData[key_pos].deadline.time;
    }
}

function save(newData) {
    if (localStorage.getItem('MemoData')) {
        var MemoData = JSON.parse(localStorage.getItem('MemoData'));
        MemoData.push(newData);
    } else {
        var MemoData = [newData];
    }
    localStorage.setItem('MemoData', JSON.stringify(MemoData));
    console.log(JSON.stringify(MemoData));
}

function del(key_pos) {
    var MemoData = JSON.parse(localStorage.getItem('MemoData'));
    console.log("消すデータ: " + MemoData[key_pos].data);
    MemoData.splice(key_pos, 1);
    localStorage.setItem('MemoData', JSON.stringify(MemoData));
}

// データの一覧をすべて表示
function showList(id) {
    var list = document.getElementById(id);
    var Data = JSON.parse(localStorage.getItem('MemoData'));
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    console.log(nowDate);
    
    //console.log(Data.length);
    list.innerHTML ='';
    for (var i = 0; Data != null && i < Data.length; i++) {
        console.log(Data[i].deadline);        
        var dDate = Data[i].deadline.date;
        var dTime = Data[i].deadline.time;
        var targetDate = new Date(dDate.substr(0, 4), dDate.substr(5, 2) - 1, dDate.substr(8, 2), dTime.substr(0, 2), dTime.substr(3, 2));
        var dnumTarget = targetDate.getTime();
        var diffMSec = dnumTarget - dnumNow;
        var diffDays = diffMSec / (1000 * 60 * 60 * 24);
        var showDays = Math.ceil(diffDays);
        //console.log(diffMSec);        

        list.innerHTML += "<p id='" + i + "'>" +
            "<label class='checkbox-inline'><input type ='checkbox' onclick=changeLineThrough("+ i +")></input>" +
            Data[i].data + "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>あと" + showDays + "日です。" + "</p>";
        list.innerHTML += "<input type='button' value='変更' onclick=openPopup(" + i + ")></input>";
    }
}

function show2(id) {
    var list = document.getElementById(id);
    var Data = JSON.parse(localStorage.getItem('MemoData'));
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();
    console.log(nowDate);

    list.innerHTML ='';
    for (var i = 0; Data != null && i < Data.length; i++) {
        console.log(Data[i].deadline);        
        var dDate = Data[i].deadline.date;
        var dTime = Data[i].deadline.time;
        var targetDate = new Date(dDate.substr(0, 4), dDate.substr(5, 2) - 1, dDate.substr(8, 2), dTime.substr(0, 2), dTime.substr(3, 2));
        var dnumTarget = targetDate.getTime();
        var diffMSec = dnumTarget - dnumNow;
        var diffDays = diffMSec / (1000 * 60 * 60 * 24);
        var showDays = Math.ceil(diffDays);
        
        if (showDays < 0) {
            list.innerHTML += "<p>" + Data[i].data + 
            "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>期限を過ぎています</p>";
        } else if (showDays >= 0 && showDays < 7) { // 一週間以内    
            list.innerHTML += "<p>" + Data[i].data + 
            "<br>締切：" + Data[i].deadline.date + " " + Data[i].deadline.time +
            "<br>あと" + showDays + "日</p>";
        }
    }
}

function change(key_pos, formId) {
    var newData = {
        "data": document.getElementById(formId).Memo.value,
        "deadline": {
            "date": document.getElementById(formId).Date.value,
            "time": document.getElementById(formId).Time.value
        }
    }
    if (newData.data == "") {
        window.alert("入力してください");
    } else {
        if (key_pos == -1) {
            save(newData);
        } else {
            MemoData[key_pos] = newData;
            localStorage.setItem('MemoData', JSON.stringify(MemoData));
            //window.alert("データを更新しました");
            console.log("更新後のデータ: " + newData);
        }
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
    // XMLHttpRequest生成
    var req = new XMLHttpRequest();
    
    // REST-APIのステータス取得処理
    req.onreadystatechange = function()
    {
        if ( 4 == this.readyState && 200 == this.status ) {
            if( this.response ) {
                // 読み込んだjsonデータをパース
                var dat = JSON.parse( this.response );
    
                // １日分のhtmlを作成
                function makeDateHtml( day ) {
                    // var queryChanImg   = [ "query_chan_osaka.png", "query_chan_kagawa.png", "query_chan_kyoto.png" ];
                    // var pronamaChanImg = [ "201312_SD.png", "sd04.png", "201503_SD.png" ];
                    var html = "<div class='balloon1-left' style=''>";
                    html += dat.title;
                    html += "<br/>";
                    html += day.date;
                    html += "(" + day.telop + ")";
                    html += "<br/>";
                    // html += "<img height='96px' src='./img/" + queryChanImg[ i % 3 ] + "'/>";
                    html += "　<img width='64px' src='" + day.image.url + "'/>";
                    // html += "　<img height='96px' src='./img/" + pronamaChanImg[ i % 3 ] + "'/>";
                    html += "</div>";
                    return( html );
                }
                
                var html = "";
            
                // １日分のデータを取得
                var day = dat.forecasts[ 0 ];
                if ( null != day ) {

                    // １日分のhtmlを作成
                    html += makeDateHtml( dat.forecasts[ 0 ] ) + "<br/>";
                }
    
                // 詳細情報の追加
                // html += "<div class='box'>" + dat.description.text.replace(/¥r?¥n/g, '<br/>') + "</div>";
    
                // 作成したhtmlを流し込む
                document.getElementById( "news" ).innerHTML = html;
            }
        }
    }
    
    /*
        地域コード(以下を参照)
            http://weather.livedoor.com/forecast/rss/primary_area.xml
    */
    var cityCode = "370000"; //香川県高松市
    
    // REST-API呼び出し
    req.open( "GET", "https://www.wabiapp.com/Test/get_weather.php?city=" + cityCode, true );
    req.send();
}