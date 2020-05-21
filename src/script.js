//localStorage.removeItem('MemoData');
show();

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
        "data": addData
    }
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
    //console.log(Data.length);
    list.innerHTML ='';
    for (var i = 0; i < Data.length; i++) {
        list.innerHTML += "<p id='" + i + "'>" +
            "<input type ='checkbox' onclick=changeLineThrough("+ i +")></input>" +
            Data[i].data + "</p>";
        list.innerHTML += "<input type='button' value='変更' onclick=change(" + i + ")></input>";
        list.innerHTML += "<input type='button' value='削除' onclick=del(" + i + ")></input>";
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