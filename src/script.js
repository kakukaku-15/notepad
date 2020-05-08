//localStorage.removeItem('MemoData');

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
}