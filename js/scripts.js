$(document).ready(function() {
    var startRecSize= 80;
    var myCss = document.styleSheets[0];
    var sectionCount = 0;
    var flag=0;
    var clickedLetters=[];
    var clickedRecs=[];
    var charArr = ['a','b','a','d','d','b','e','e','f','g','f','g']

    $('#topR-rec').click(function(){
        for (let index = 0; index < 3; index++) {
                var recNum=$("#game-recs section").length; 
                if(recNum<12){
                    var newRec = '<section id="game-rec' + recNum + '">' + charArr[recNum] + '</section>';
                    $("#game-recs").append(newRec);   

                    var newStyle = '#game-recs #game-rec' + recNum + ' { ' +
                    'width: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    'height: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    '}';
                    
                    if(recNum>7){
                        $(".bottom-yellow-rec").css('top', parseFloat($(".bottom-yellow-rec").css('top'))+300);
                        $(".right-blue-rec").css('height', parseFloat($(".right-blue-rec").css('height'))+300);
                        $(".left-grey-rec").css('height', parseFloat($(".left-grey-rec").css('height'))+300);
                    }

                    if(recNum>0){
                        var prevTop = $('#game-rec' + (recNum - 1)).position().top;
                        var newTop = $('#game-rec' + recNum).position().top;
                        if (newTop > prevTop || (recNum>9 && recNum-1%3==0)) {
                            $('#game-rec' + recNum).css('margin-left',0);
                        }
                    }
                    myCss.insertRule(newStyle, myCss.cssRules.length);
                }
            
        }
    });
    $('#game-recs').on('click', 'section', function() {
        var clickedSection = $('#game-rec'+$(this).index());
        clickedSection.css('color', 'white');
        flag+=1;
        if(flag==1){
            clickedLetters.push(clickedSection.text());
            clickedRecs.push(clickedSection.index());
        }
        if(flag==2){
            if(clickedSection.text()!=clickedLetters[0]){    
                setTimeout(() => {
                    clickedSection.css('color', 'black');
                    $('#game-rec' + clickedRecs[0] ).css('color', 'black');
                    clickedLetters.splice(0);
                    clickedRecs.splice(0);
                    flag=0;
                }, 1000);       
            }
            else{
                clickedLetters.splice(0);
                clickedRecs.splice(0);
                flag =0;
            }
        }
    });
});