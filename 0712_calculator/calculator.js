function back(){
    let exp = document.calc.txt.value;
    document.calc.txt.value = exp.substring(0,exp.length-1);
}

function equal(){
    let exp = document.calc.txt.value;
    try{ 
        document.calc.txt.value = eval(exp);

    }
    catch{
        document.calc.txt.value = "Syntax ERROR";
        setTimeout(() => {
            document.calc.txt.value = "";
        }, 800);
    }

}

/*魚，但在這塊不適用(因為無法判斷"每次"輸入的值)
function decimal(){
    if (!document.calc.txt.value.includes('.'))
        document.calc.txt.value += '.';
    else
    {document.calc.txt.value = document.calc.txt.value;}
}
*/