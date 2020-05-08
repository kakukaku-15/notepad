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
    console.log(Data.length);
    list.innerHTML ='';
    for (var i = 0; i < Data.length; i++) {
        list.innerHTML += "<li id='" + i + "'>" + Data[i].data + "</li>";
        list.innerHTML += "<input type='button' value='変更' onclick=change(" + i + ")></input>";
        list.innerHTML += "<input type='button' value='削除' onclick=del(" + i + ")></input>";
    }
}