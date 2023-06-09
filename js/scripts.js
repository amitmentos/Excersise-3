$(document).ready(function() {
    var startRecSize= 80, myCss = document.styleSheets[0], sectionCount = 0, flag=0, flag1=1, flag2=1, clickedLetters=[], clickedRecs=[];
    var charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //game script
    $('#topR-rec').click(function(){ 
        var pairsNum, recNum, newRec, newStyle, lastSection, lastSectionBottom, prevTop, newTop, pairsNum, lettersArr, randomLetter, randRec, temp;
        for (let index = 0; index < 3; index++) {
                recNum=$("#game-recs section").length;
                newRec = '<section id="game-rec' + recNum + '"></section>';
                $("#game-recs").append(newRec);   

                newStyle = '#game-recs #game-rec' + recNum + ' { ' +
                'width: ' + (startRecSize + 20 * recNum) + 'px; ' +
                'height: ' + (startRecSize + 20 * recNum) + 'px; ' +
                '}';
                myCss.insertRule(newStyle, myCss.cssRules.length);
                lastSection = $('#game-recs section:last');
                lastSectionBottom = lastSection.position().top + lastSection.outerHeight();

                if(recNum>7 && $(window).width() > 849){
                    $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
                    $("#main3").css('height',lastSectionBottom+300);
                    $("#footer-page3").css('top',465);
                    console.log(lastSection.outerHeight());
                }
                if(recNum>6&& $(window).width()<=849){
                    $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
                    $("#main3").css('height',lastSectionBottom+300);
                    $("#footer-page3").css('top',409 );
                }
                if(recNum>0){
                    prevTop = $('#game-rec' + (recNum - 1)).position().top;
                    newTop = $('#game-rec' + recNum).position().top;
                    if (newTop > prevTop || (recNum>9 && recNum-1%3==0)) {
                        $('#game-rec' + recNum).css('margin-left',0);
                    }
                }
                recNum=$("#game-recs section").length; 
                $('.error-message').hide();
        }

        pairsNum = Math.floor(recNum / 2);
        lettersArr = [];
        // choose random letters and add them to the array
        for (var i = 0; i < pairsNum; i++) {
            randomLetter = charArr[Math.floor(Math.random() * charArr.length)];
            lettersArr.push(randomLetter);
            lettersArr.push(randomLetter);
        }    
        // if there is an odd number of squares, add one random letter to the array
        if (recNum % 2 !== 0) {
            randomLetter = charArr[Math.floor(Math.random() * charArr.length)];
            lettersArr.push(randomLetter);
        }
        // shuffle the letters array
        for (var i = lettersArr.length - 1; i > 0; i--) {
            randRec = Math.floor(Math.random() * (i + 1));
            temp = lettersArr[i];
            lettersArr[i] = lettersArr[randRec];
            lettersArr[randRec] = temp;
        }
        //add letters to the recs
        for(var i = 0; i<recNum;i++){
            $('#game-rec'+i).html('<div>'+lettersArr[i]+'</div>');
        }  
    });


    $('#game-recs').on('click', 'section', function() {    
        var recNum=$("#game-recs section").length; 
        var clickedSection = $('#game-rec'+$(this).index()+' div');
        if(recNum%2!==0){
            $('.error-message').show();
        }
        else{
            clickedSection.css('display', 'block');
            flag+=1;
            if(flag==1){
                clickedLetters.push(clickedSection.text());
                clickedRecs.push(clickedSection.parent().index());
            }
            if(flag==2){
                if(clickedSection.text()!=clickedLetters[0]){    
                    setTimeout(() => {
                        clickedSection.css('display', 'none');
                        $('#game-rec' + clickedRecs[0] +' div').css('display', 'none');
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
    
    //resize the screen scrip
    var prevScreenWidth = $(window).width();

    $(window).on('resize', function() {
        var screenWidth = $(window).width();
        var recNum=$("#game-recs section").length; 
        if(recNum>1){
            var lastSection = $('#game-recs section:last');
            var lastSectionBottom = lastSection.position().top + lastSection.outerHeight();
        }
        if(prevScreenWidth < 850 && screenWidth >= 850 && recNum > 6 &&flag1) {
            lastSectionBottom = lastSection.position().top + lastSection.outerHeight();
            $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
            $("#main3").css('height',lastSectionBottom+300);
            $("#footer-page3").css('top',465 );
            flag1 = 0;
            flag2 = 1;
        }

        if(prevScreenWidth > 850 && screenWidth <= 850&& recNum >6 && flag2) {
            lastSectionBottom = lastSection.position().top + lastSection.outerHeight();
            $(".bottom-yellow-rec").css('top', lastSectionBottom+300);
            $("#main3").css('height',lastSectionBottom+300);
            $("#footer-page3").css('top',409);
            flag1 = 1;
            flag2 = 0;
        }

        prevScreenWidth = screenWidth;
    });

    //close error btn
    $('.close-btn').on('click', function(){
        $('.error-message').hide();
    });

    
    $('#topR-restart').on('click', function(){
        location.reload();
    });
});


