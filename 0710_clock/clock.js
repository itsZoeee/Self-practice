function updateClock(){
    var now = new Date(); // Sat Jul 10 2021 22:28:35 GMT+0800 (台北標準時間)
    var dname = now.getDay(), //星期6
        mo = now.getMonth(),
        dnum = now.getDate(), //10號
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM"; 

        /*以下控制12小時制*/
        if(hou == 0){
            hou = 12;
        }
        if(hou>12){
            hou -= 12;
            pe = "PM";
        }

        /* 以下控制數字保持兩個數字*/
        Number.prototype.pad = function(digits){  
            for(var n = this.toString(); n.length < digits; n = 0 + n){}; 
            //n.length計算出目前數字有幾位(因為n是字串所以可以這樣做) ex."50".length = 2
            //0+"50"="050"
            return n;  
            
        }
        /*Number.prototype.pad(2)="00"*/

    var months=["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
    var week =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var ids = ["dayname", "month", "daynum","year","hour","minutes","seconds","period"];
    var values = [week[dname],months[mo],dnum.pad(2),yr.pad(2),hou.pad(2),min.pad(2),sec.pad(2),pe]
    //// dname和mo都是拿到0以上的數字，所以意思等同week[0]

    for(var i=0; i<ids.length; i++){
        document.getElementById(ids[i]).firstChild.nodeValue = values[i]; //將函式抓取到的值(values[])放入HTML中的ids[i]
    }
}

function initClock(){
    updateClock();
    window.setInterval('updateClock()',1);
}

