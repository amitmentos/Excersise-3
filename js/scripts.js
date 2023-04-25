$(document).ready(function() {
    var startRecSize= 80;
    var myCss = document.styleSheets[0];
    var sectionCount = 0;
    var flag=0;
    var flag1=1;
    var flag2=1;
    var clickedLetters=[];
    var clickedRecs=[];
    var charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    $('#topR-rec').click(function(){       
        for (let index = 0; index < 3; index++) {
                var recNum=$("#game-recs section").length; 
                if(recNum<100){
                    var newRec = '<section id="game-rec' + recNum + '"></section>';
                    $("#game-recs").append(newRec);   

                    var newStyle = '#game-recs #game-rec' + recNum + ' { ' +
                    'width: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    'height: ' + (startRecSize + 20 * recNum) + 'px; ' +
                    '}';
                    myCss.insertRule(newStyle, myCss.cssRules.length);

                    var lastSection = $('#game-recs section:last');
                    var lastSectionBottom = lastSection.position().top + lastSection.outerHeight();

                    if(recNum>7 && $(window).width() > 849){
                        $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
                        $("#main3").css('height',lastSectionBottom+300);
                        console.log(lastSection.outerHeight());
                    }

                    if(recNum>6&& $(window).width()<=849){
                        $(".bottom-yellow-rec").css('top', parseFloat($(".bottom-yellow-rec").css('top'))+200);
                    }

                    if(recNum>0){
                        var prevTop = $('#game-rec' + (recNum - 1)).position().top;
                        var newTop = $('#game-rec' + recNum).position().top;
                        if (newTop > prevTop || (recNum>9 && recNum-1%3==0)) {
                            $('#game-rec' + recNum).css('margin-left',0);
                        }
                    }
                }
                recNum=$("#game-recs section").length; 
        }

        var pairsNum = Math.floor(recNum / 2); // number of pairs of letters
        var lettersArr = []; // array to store the letter
            // choose random letters and add them to the array
            for (var i = 0; i < pairsNum; i++) {
                var randomLetter = charArr[Math.floor(Math.random() * charArr.length)];
                lettersArr.push(randomLetter);
                lettersArr.push(randomLetter);
            }    
            // if there is an odd number of squares, add one random letter to the array
            if (recNum % 2 !== 0) {
                var randomLetter = charArr[Math.floor(Math.random() * charArr.length)];
                lettersArr.push(randomLetter);
            }
            // shuffle the letters array
            for (var i = lettersArr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = lettersArr[i];
                lettersArr[i] = lettersArr[j];
                lettersArr[j] = temp;
            }
            //add letters to the recs
            for(var i = 0; i<recNum;i++){
                $('#game-rec'+i).text(lettersArr[i]);
            }  
    });


    $('#game-recs').on('click', 'section', function() {
        var recNum=$("#game-recs section").length; 
        if(recNum%2!==0){
            $('.error-message').show();
        }
        else{
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
                    }, 250);       
                }
                else{
                    clickedLetters.splice(0);
                    clickedRecs.splice(0);
                    flag =0;
                }
            }
        }
    });

    var prevScreenWidth = $(window).width();
    $(window).on('resize', function() {
        var screenWidth = $(window).width();
        var recNum=$("#game-recs section").length; 
        if(recNum>1){
            var lastSection = $('#game-recs section:last');
            var lastSectionBottom = lastSection.position().top + lastSection.outerHeight();
        }
        if(prevScreenWidth < 850 && screenWidth >= 850 && recNum > 6 &&flag1) {

            $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
            $("#main3").css('height',lastSectionBottom+300);
            flag1 = 0;
            flag2 = 1;
        }

        if(prevScreenWidth > 850 && screenWidth <= 850&& recNum >6 && flag2) {
            $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
            flag1 = 1;
            flag2 = 0;
        }

        prevScreenWidth = screenWidth;
    });

    $('.close-btn').on('click', function(){
        $('.error-message').hide();
    });

    $('#topR-restart').on('click', function(){
        location.reload();
    });
});


