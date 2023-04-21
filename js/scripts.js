$(document).ready(function() {
    var startRecSize= 80;
    var myCss = document.styleSheets[0];
    var sectionCount = 0;
    var flag1=1; var flag2=1;
    $('#topR-rec').click(function(){
        for (let index = 0; index < 3; index++) {
            if(flag2){
                debugger
                var recNum=$("#game-recs section").length; 
                var newRec ='<section id="game-rec'+recNum +'"></section>'
                $("#game-recs").append(newRec);   

                var prevWidth = startRecSize + 20 * (recNum - 1);
                var prevLeft = parseFloat($('#game-rec' + (recNum - 1)).css('left'));
                var newLeft = prevLeft + prevWidth + 132;
                if(recNum<4){
                var newStyle = '#game-recs #game-rec' + recNum + ' { ' +
                'position:'+ 'absolute;'+
                'width: ' + (startRecSize + 20 * recNum) + 'px; ' +
                'height: ' + (startRecSize + 20 * recNum) + 'px; ' +
                // 'left: ' + (parseFloat($('#game-rec' + recNum).c ss('left'))+sectionCount) + 'px; ' +'}';
                'left: ' + newLeft + 'px; ' +
                '}';
                }
                else{
                    if(flag1){newLeft=64; sectionCount=0; flag1=0}
                    var newStyle = '#game-recs #game-rec' + recNum + ' { ' +
                    'position:'+ 'absolute;'+
                    'width: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    'height: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    // 'left: ' + (parseFloat($('#game-rec' + recNum).c ss('left'))+sectionCount) + 'px; ' +'}';
                    'left: ' + newLeft + 'px; ' +
                    'top:' + 433 +'px;'
                    '}';
                }
                if(recNum==6)   flag2=0;
                sectionCount+= prevWidth+ 132;
                myCss.insertRule(newStyle, myCss.cssRules.length);
            }
        }
    });
});