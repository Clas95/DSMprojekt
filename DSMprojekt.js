/**
 * Created by clasj on 03.05.2017.
 */


// Levelspezifische Daten
var levelShipStart = [865, 285, 246];  // [x, y, r]


var levelMapBlockerX1 = [35,40,95,179,243,277,304,317,342,398,436,454,488,542,615,694,765,837,885,904,920,954,955,950,926,858,787,710,646,591,536,499,422,400,361,352,
 601,607,652,720,738,705,660,612,
 757,737,765,804,835,838,803
 ];
var levelMapBlockerY1 = [552,17,25,49,74,102,155,201,230,238,194,143,84,66,59,71,102,155,216,288,334,365,416,454,469,474,484,501,491,454,422,415,428,439,502,546,
 397,380,385,417,436,447,445,421,
 370,351,342,344,370,394,398
 ];
var levelMapBlockerX2 = [40,95,179,243,277,304,317,342,398,436,454,488,542,615,694,765,837,885,904,920,954,955,950,926,858,787,710,646,591,536,499,422,400,361,352,35,
 607,652,720,738,705,660,612,601,
 737,765,804,835,838,803,757
 ];
var levelMapBlockerY2 = [17,25,49,74,102,155,201,230,238,194,143,84,66,59,71,102,155,216,288,334,365,416,454,469,474,484,501,491,454,422,415,428,439,502,546,552,
 380,385,417,436,447,445,421,397,
 351,342,344,370,394,398,370
 ];
 /*
var levelMapBlockerX1 = [];
var levelMapBlockerY1 = [];
var levelMapBlockerX2 = [];
var levelMapBlockerY2 = [];
*/
var relationXY  = [];
var blockedX = [];
var blockedY = [];
var laengeX = [];
var laengeY = [];
var canvas = document.getElementById("karteCan");
var isBlocked = 0;
var questDestination = [734, 139, 0, 0]; // [X, Y, ?Aktiv?, Destination#]
var destImg = document.getElementById("destBild");
var erfahrungspunkte = 0;
var stufe = 0;
var epBenotigt = [70, 100, 130, 170];
var lautstarke = 0.5;

var questPlus = 0;
var questFortschritt = 0;
var questZiel = 7;


// Startvariablen
// Startlevel
var currLvl = 0;
var finished = 0;
var activeEvents = false;

// Untertitelsprache 0=keine 1=deu 2=eng
var subLang = 0;



//Zufallszahlen Generator zwischen zwei Zahlen
function zahlZw(kleiner, groesser) {
    return Math.round(Math.random()*(groesser-kleiner)+kleiner);
}

//Timer jede Sekunde Zeit um 1 erhöhen
var levelTime = 0;
function timeActual() {
    if (activeEvents == true) {
        levelTime++;
    }
}


//      +++     Sound Einbinden     +++

var soundClick  = new Audio("sounds/soundClick.mp3");
var soundOpen  = new Audio("sounds/soundOpen1.mp3");
soundOpen.volume = 0.6;
var soundClose  = new Audio("sounds/soundOpen2.mp3");
soundClose.volume = 0.4;
var soundSammeln  = new Audio("sounds/soundSammeln.mp3");
var soundBackgroundMap  = new Audio("sounds/soundBackgroundMap.mp3");
soundBackgroundMap.loop = true;
soundBackgroundMap.volume = 0.1;
var soundFahrt2  = new Audio("sounds/soundFahrt2.mp3");
soundFahrt2.loop = true;
soundFahrt2.volume = 0;
var soundHarbour  = new Audio("sounds/soundHarbour.mp3");
soundHarbour.loop = true;
var soundCliff  = new Audio("sounds/soundKlippe.mp3");
soundCliff.loop = true;
var soundKiesbett  = new Audio("sounds/soundKiesbett.mp3");
soundKiesbett.loop = true;
var soundBump = new Audio("sounds/soundBump.mp3");
var soundLighthouse = new Audio("sounds/soundLighthouse.mp3")
soundLighthouse.loop = true;
var soundFinished = new Audio("sounds/soundFinished.mp3");
var soundKochenBG = new Audio("sounds/soundKochenBG.mp3");
soundKochenBG.loop = true;
var soundZutatPlus = new Audio("sounds/soundAdd.mp3");
var soundZutatMinus = new Audio("sounds/soundSubt.mp3");
var soundWocheWeiter = new Audio("sounds/soundKochenPress.mp3");
var soundDialog2 = new Audio("sounds/Dialog/dialogKochen.mp3");



function playMapSounds(){
    soundBackgroundMap.play();
    soundFahrt2.play();
    soundHarbour.play();
    soundCliff.play();
    soundLighthouse.play();
}


function stopMapSounds() {
    soundBackgroundMap.pause();
    soundFahrt2.pause();
    soundHarbour.pause();
    soundCliff.pause();
    soundLighthouse.pause();
}

function startKochenSounds() {
    soundKochenBG.play();
}

function stopKochenSounds() {
    soundKochenBG.pause();
}


// Questbalken ein/ausblenden

var questHidden = 0;
var navHidden = 0;
var disableHide = 0;

function questShowHide() {
    if (questHidden == 0) {
        questHidden = 1;
         $("#questFortsDiv").animate({ //Balken zurücksetzen
            left : "-=3vw",
            opacity : 0,
             width : "-=5vw",
        }, 1000)
         $("#questFortsText").animate({ //Balken zurücksetzen
            left : "-=3vw",
            opacity : 0,
        }, 1000)
         $("#questTextDiv").animate({ //Balken zurücksetzen
            left : "-=3vw",
            opacity : 0,
        }, 1000)
         $("#questFortsBalken").animate({ //Balken zurücksetzen
            opacity : 0,
        }, 1000)
         $("#questImg").delay(500).animate({ //Balken zurücksetzen
            opacity : 0,
        }, 1000)

    } else if (questHidden == 1) {
        questHidden = 0;
        $("#questFortsDiv").delay(500).animate({ //Balken zurücksetzen
            left : "+=3vw",
            opacity : 1,
            width : "+=5vw",
        }, 1000)
        $("#questFortsText").delay(500).animate({ //Balken zurücksetzen
            left : "+=3vw",
            opacity : 1,
        }, 1000)
        $("#questTextDiv").delay(500).animate({ //Balken zurücksetzen
            left : "+=3vw",
            opacity : 1,
        }, 1000)
        $("#questFortsBalken").delay(500).animate({ //Balken zurücksetzen
            opacity : 1,
        }, 1000)
        $("#questImg").animate({ //Balken zurücksetzen
            opacity : 1,
        }, 1000)
    }
}

function navShow () {
    document.getElementById("tester4").innerHTML = navHidden;
    if (navHidden == 1) {
        soundOpen.play();
        navHidden = 2;
        $("#kreisDiv").animate({
            bottom: "+=20vh",
        }, 1000);
        setTimeout(function () {
            navHidden = 0;
        }, 700);
        $("#btnNavOpen").delay(1000).css({"z-index": "0"})
        $("#navButtonDiv").delay(1000).css({"z-index": "45"})
    }
    document.getElementById("buttonUp").disabled = false;
    document.getElementById("buttonLeft").disabled = false;
    document.getElementById("buttonRight").disabled = false;
    document.getElementById("buttonDown").disabled = false;
    document.getElementById("buttonShip").disabled = false;
}
function navHide () {
    document.getElementById("tester4").innerHTML = navHidden;
    if (navHidden == 0) {
        soundClose.play();
        navHidden = 2;
        $("#kreisDiv").animate({
            bottom : "-=20vh",
        }, 1000);
        setTimeout(function () {
            navHidden = 1;
        }, 700);
        $("#btnNavOpen").delay(1000).css({ "z-index" : "60" })
        $("#navButtonDiv").delay(1000).css({ "z-index" : "0" })
    }
    document.getElementById("buttonUp").disabled = true;
    document.getElementById("buttonLeft").disabled = true;
    document.getElementById("buttonRight").disabled = true;
    document.getElementById("buttonDown").disabled = true;
    document.getElementById("buttonShip").disabled = true;
}



//
// Map Blocker
//

var dauer;

window.recalcBlocker = function() {
    blockedX = [];
    blockedY = [];
    for (var r = 0; r < levelMapBlockerX1.length; r++) {
        laengeX[r] = ((levelMapBlockerX2[r]) - (levelMapBlockerX1[r]));
        laengeY[r] = ((levelMapBlockerY2[r]) - (levelMapBlockerY1[r]));


        if (Math.abs(laengeX[r]) >= Math.abs(laengeY[r])) { //wenn X länge
            if ((laengeY[r] > 0) && (laengeX[r] > 0)) {
                relationXY[r] = (laengeY[r] / laengeX[r]);
                for (var q = 0; q <= laengeX[r]; q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedX.push(levelMapBlockerX1[r] + q);
                    blockedY.push(levelMapBlockerY1[r] + (q * relationXY[r]));
                }
                ;
            } else if ((laengeY[r] < 0) && (laengeX[r] > 0)) {
                relationXY[r] = ((laengeY[r] / (-1)) / laengeX[r]); //relation berechnen
                for (var q = 0; q <= laengeX[r]; q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedX.push(levelMapBlockerX1[r] + q);
                    blockedY.push(levelMapBlockerY1[r] - (q * relationXY[r]));
                }
            } else if ((laengeY[r] < 0) && (laengeX[r] < 0)) {
                relationXY[r] = ((laengeY[r] / (-1)) / (laengeX[r] / (-1))); //relation berechnen
                for (var q = 0; q <= (laengeX[r] / (-1)); q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedX.push(levelMapBlockerX1[r] - q);
                    blockedY.push(levelMapBlockerY1[r] - (q * relationXY[r]));
                }
            } else if ((laengeY[r] > 0) && (laengeX[r] < 0)) {
                relationXY[r] = ((laengeY[r] / (-1)) / laengeX[r]); //relation berechnen
                for (var q = 0; q <= (Math.abs(laengeX[r])); q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedX.push(levelMapBlockerX1[r] - q);
                    blockedY.push(levelMapBlockerY1[r] + (q * relationXY[r]));
                }
            } else {
            }
        } else if (Math.abs(laengeX[r]) < Math.abs(laengeY[r])) { //wenn Y länger
            if ((laengeX[r] > 0) && (laengeY[r] > 0)) {
                relationXY[r] = (laengeX[r] / laengeY[r])
                for (var q = 0; q <= laengeY[r]; q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedY.push(levelMapBlockerY1[r] + q);
                    blockedX.push(levelMapBlockerX1[r] + (q * relationXY[r]));
                }
            } else if ((laengeX[r] < 0) && (laengeY[r] > 0)) {
                relationXY[r] = ((laengeX[r] / (-1)) / laengeY[r]); //relation berechnen
                for (var q = 0; q <= laengeY[r]; q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedY.push(levelMapBlockerY1[r] + q);
                    blockedX.push(levelMapBlockerX1[r] - (q * relationXY[r]));
                }
            } else if ((laengeX[r] < 0) && (laengeY[r] < 0)) {
                relationXY[r] = ((laengeX[r] / (-1)) / (laengeY[r] / (-1))); //relation berechnen
                for (var q = 0; q <= (laengeY[r] / (-1)); q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedY.push(levelMapBlockerY1[r] - q);
                    blockedX.push(levelMapBlockerX1[r] - (q * relationXY[r]));
                }
            } else if ((laengeX[r] > 0) && (laengeY[r] < 0)) {
                relationXY[r] = ((laengeX[r]) / (laengeY[r] / (-1))); //relation berechnen
                for (var q = 0; q <= (laengeY[r] / (-1)); q = q + 1 * 2) { //schleife zum setzen der Blocker
                    blockedY.push(levelMapBlockerY1[r] - q);
                    blockedX.push(levelMapBlockerX1[r] + (q * relationXY[r]));
                }
            } else {

            }
        }


        dauer = blockedX.length;
    }
}

// ep ausgeben
function epAusgabe (epbekommen) {
        if (erfahrungspunkte + epbekommen >= epBenotigt[stufe]) { //Stufe Hoch
            var naechsteStufe = stufe + 1;
            erfahrungspunkte = (erfahrungspunkte + epbekommen) - epBenotigt[stufe];
            var balkenLeft = epbekommen - epBenotigt[stufe];
            $("#erfahrungDiv").animate({
                width :  "100vw",
                opacity : 1,
            } , (1000)).animate({
                width :  "0vw",
                opacity : 1,
            }, 1).animate({
                width :  "+=" + ((balkenLeft / erfahrungspunkte[naechsteStufe])  * 100 ) + "vw",
                opacity : 1,
            }, (1500)).animate({
                opacity : 0.2,
            }, 1000);
            stufe ++;
            document.getElementById("lvlAnzeigeText").innerHTML = stufe + 1;
        } else {
            erfahrungspunkte = erfahrungspunkte + epbekommen;
            $("#erfahrungDiv").animate({
                width :  "+=" + (epbekommen/epBenotigt[stufe])*100 + "vw",
                opacity : 1,
            }, (((epbekommen) / epBenotigt[stufe]) * 2000)).animate({
                opacity : 0.2,
            }, 1000);

        }
    document.getElementById("epText").innerHTML = "+ " + Math.round(epbekommen) + "EP";
    $("#epText").animate({ top : "40vh", opacity : "0"}, 5000).animate({ top : "80vh", opacity : "1"}, 1);

}

function adminSkip() {
    document.getElementById("kochSpielSection").hidden = false;
    initKochen();
}



// Holz Spawnen
var holzX = [521, 197, 624, 700, 309, 669, 125];
var holzY = [100, 100, 447, 375, 465, 233, 396];
var holzActive = [1, 1, 1, 1, 1, 1, 1];
var holzQuestActive = false;
var holzImg = document.getElementById("holzBild");


function questActual() {
    if (currLvl !== 6) {
    if (questPlus > 0) {
        soundSammeln.play();
        questFortschritt ++;
        document.getElementById("questFortsText").innerHTML = questFortschritt + "/" + questZiel;
        questPlus--;
        $("#questFortsBalken").animate({
            width : (((questFortschritt / questZiel) * 100) * 0.2) + 5 + "vw",
        })
    }
    if (questFortschritt == questZiel) {
        $("#questFortsDiv").css({

        })
        questDestination[2] = 1;
    }
    } else if (currLvl == 6) {
        document.getElementById("questFortsText").innerHTML = questFortschritt + "/" + questZiel;
        $("#questFortsBalken").animate({
            width : (((questFortschritt / questZiel) * 100) * 0.2) + 5 + "vw",
        }).css("background-color", "rgba(" + Math.round(255 - (255 * (questFortschritt/questZiel))) + ", " + Math.round(255 * (questFortschritt/questZiel)) + ", 0, 1)");
    }
}



var zutatQnt = [3, 2, 3, 2, 5, 6, 4, 2, 7, 32];
var zutatHbk = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4];
var slotInht = ["frei", "frei", "frei", "frei"];
var currWoche = 1;
var recipeZutat1 = [0, 1, 5, 7, 8, 1, 7, 4];
var recipeZutat2 = [4, 8, 6, 5, 9, 5, 5, 5];
var recipeZutat3 = [3, 3, 0, 4, 9, 6, 6, 7];
var recipeZutat4 = [8, 2, 9, 2, 9, 3, 8, 9];
var recipeBonus =  [10, 8, 9,7, 5, 7, 8, 6];
var zustimmungPlus = 0;

var recipeChecker1 = [];
var recipeChecker2 = [];
var recipeChecker3 = [];
var recipeChecker4 = [];

function checkRecipes () {
for (k=0; k < 10; k++) {
    recipeChecker1[k] = false;
    recipeChecker2[k] = false;
    recipeChecker3[k] = false;
    recipeChecker4[k] = false;
};
    zustimmungPlus = (-4);
for (i=0; i < 10; i++) {
    for (j = 0; j < 4; j++){
        if (slotInht[j] == recipeZutat1[i]) {
            recipeChecker1[i] = true;
        };
        if (slotInht[j] == recipeZutat2[i]) {
            recipeChecker2[i] = true;
        };
        if (slotInht[j] == recipeZutat3[i]) {
            recipeChecker3[i] = true;
        };
        if (slotInht[j] == recipeZutat4[i]) {
            recipeChecker4[i] = true;
        };
    }
};
for (i=0; i < 10; i++) {
    if ((recipeChecker1[i] == true) && (recipeChecker2[i] == true) && (recipeChecker3[i] == true) && (recipeChecker4[i] == true)) {
        zustimmungPlus = zustimmungPlus + recipeBonus[i];
    }
}
    questFortschritt = questFortschritt + zustimmungPlus;
    if(questFortschritt < 0) {
        questFortschritt = 0;
    } else if (questFortschritt > 40) {
        questFortschritt = 40;
    }
};



function questDestReached() {
        if (questDestination[3] == 0) { //erste Destination
            activeEvents = false; //Map-Events deaktivieren
            questDestination[2] = 0;
            render();
            document.getElementById("textSkip").innerHTML = "Weiter";
            $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh orange",
                "background-color" : "darkorange"
            });
            soundFinished.play();
            currLvl = 5;
            var epBelohnung = 30 + (800 / levelTime);
            epAusgabe(epBelohnung);
            questShowHide();
        }
}

var blockerStart = [0];
var blockerEnd = [0];
var positionStorage = [0, 0];
var positionCounter = 0;

var blockerSegmentCounter = 0;
var blockerSegmentArray = [0];

    window.onload = function () {
        document.addEventListener("click", mPos);
    }
    function mPos() {
        var mouseX = Math.round((event.clientX - canvas.offsetLeft) * 10 / canvas.width * 100);
        var mouseY = Math.round((event.clientY) / canvas.width * 1000);
        // var mouseY = Math.round(((event.clientY)) / canvas.width) *1000;
        document.getElementById("tester1").innerHTML = "Maus: " + mouseX + " | " + mouseY;
        recalcBlocker();
    };



    window.mapClick = function(X, Y) {
        blockerStart[positionCounter] = X;
        blockerEnd[positionCounter] = Y;
        levelMapBlockerX1[positionCounter] = positionStorage[0];
        levelMapBlockerY1[positionCounter] = positionStorage[1];
        levelMapBlockerX2[positionCounter] = X;
        levelMapBlockerY2[positionCounter] = Y;


    }

    window.nextBlocker = function() {
        positionStorage = [levelMapBlockerX2[positionCounter], levelMapBlockerY2[positionCounter]];
        positionCounter++;
    }

window.nextBlockerSegment = function() {
    blockerSegmentArray[blockerSegmentCounter] = positionCounter;
    levelMapBlockerX1[blockerSegmentArray[blockerSegmentCounter -1]] = levelMapBlockerX2[blockerSegmentArray[blockerSegmentCounter]];
    levelMapBlockerY1[blockerSegmentArray[blockerSegmentCounter -1]] = levelMapBlockerY2[blockerSegmentArray[blockerSegmentCounter]];
    blockerSegmentCounter++;

    document.getElementById("tester4").innerHTML = blockerSegmentX;
}

    window.wertAusgebenX1 = function() {
        window.alert(levelMapBlockerX1);
        document.getElementById("tester2").innerHTML = levelMapBlockerX1;

    }

window.wertAusgebenY1 = function() {
    window.alert(levelMapBlockerY1);
    document.getElementById("tester2").innerHTML = levelMapBlockerY1;

}

window.wertAusgebenX2 = function() {
    window.alert(levelMapBlockerX2);
    document.getElementById("tester2").innerHTML = levelMapBlockerX2;

}

window.wertAusgebenY2 = function() {
    window.alert(levelMapBlockerY2);
    document.getElementById("tester2").innerHTML = levelMapBlockerY2;

}

    $(document).ready(function () {


        window.wocheWeiter = function () {
            if(zustimmungPlus < 0) {
                document.getElementById("epText").innerHTML = "- " + Math.round(Math.abs(zustimmungPlus)) + " Zustimmung";
            } else {
                document.getElementById("epText").innerHTML = "+ " + Math.round(Math.abs(zustimmungPlus)) + " Zustimmung";
            }

            $("#epText").animate({ top : "40vh", opacity : "0"}, 5000).animate({ top : "80vh", opacity : "1"}, 1);
            currWoche++;
            $("#wocheNadelDiv").animate({
                left : "+=4.25vw",
            }, 3000);
            soundWocheWeiter.play();
            if (currWoche == 2) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Gruen laeuft naechste Runde ab!";
            } else if (currWoche == 3) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Gruen laeuft diese Runde ab!";
            } else if (currWoche == 4) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Blau laeuft naechste Runde ab!";
            } else if (currWoche == 5) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Blau laeuft diese Runde ab!";
            } else if (currWoche == 6) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Rot laeuft naechste Runde ab!";
            } else if (currWoche == 7) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Rot laeuft diese Runde ab!";
            } else if (currWoche == 8) {
                document.getElementById("haltbkWarnerDiv").innerHTML = "Letzte Runde!";
            }

            if(currWoche == 4) {
                for (i=0; i<10; i++) {
                    if(zutatHbk[i] < 2) {
                        zutatQnt[i] = 0;
                    }
                }
            } else if(currWoche == 6) {
                for (i=0; i<10; i++) {
                    if(zutatHbk[i] < 3) {
                        zutatQnt[i] = 0;
                    }
                }
            } else if(currWoche == 8) {
                for (i = 0; i < 10; i++) {
                    if (zutatHbk[i] < 4) {
                        zutatQnt[i] = 0;
                    }
                }
            }
            for (i=0; i<10; i++) {
                if (zutatQnt[i] == 0) {
                    document.getElementById("zutat" + i).style["boxShadow"] = "0px 0px 0px 0.3vh grey";
                    document.getElementById("zutat" + i + "Text").style["boxShadow"] = "0px 0px 0px 0.3vh grey";
                    document.getElementById("zutat" + i + "Text").innerHTML = "x" + zutatQnt[i];
                    document.getElementById("zutat" + i).style.backgroundImage = "url('images/zutatBad.png')";
                }
            }
            for(i=0; i<4; i++){
                slotInht[i] = "frei";
                document.getElementById("slot" + (i + 1)).style.backgroundImage = "url('images/slot" + (i + 1) + ".png')";
                document.getElementById("buttonSkip").disabled = true;
                document.getElementById("textSkip").style.color = "grey";
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh transparent",
                    "background-color" : "transparent"
                });
            }
            if(currWoche == 9) {
                document.getElementById("buttonSkip").disabled = false;
                document.getElementById("textSkip").style.color = "white";
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh orange",
                    "background-color" : "darkorange"
                });
                document.getElementById("textSkip").innerHTML = "Weiter";
                document.getElementById("haltbkWarnerDiv").innerHTML = "Geschafft!";
                zutatQnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                document.getElementById("zutat8Text").innerHTML = "x" + zutatQnt[8];
                document.getElementById("zutat9Text").innerHTML = "x" + zutatQnt[9];
                currLvl = 7;
                epAusgabe(30 + questFortschritt * 1.5);
            }
        }

        window.initKochen = function() {
            currWoche = 1;
            for (i=0; i < 10; i++){
                document.getElementById("zutat" + i + "Text").innerHTML = "x" + zutatQnt[i];

                if(zutatHbk[i] == 1){
                    document.getElementById("zutat" + i).style["boxShadow"] = "0px 0px 1vh 0.5vh darkolivegreen";
                    document.getElementById("zutat" + i + "Text").style["boxShadow"] = "0px 0px 1vh 0.5vh darkolivegreen";
                } else if(zutatHbk[i] == 2){
                    document.getElementById("zutat" + i).style["boxShadow"] = "0px 0px 1vh 0.5vh steelblue";
                    document.getElementById("zutat" + i + "Text").style["boxShadow"] = "0px 0px 1vh 0.5vh steelblue";
                } else if(zutatHbk[i] == 3){
                    document.getElementById("zutat" + i).style["boxShadow"] = "0px 0px 1vh 0.5vh darkred";
                    document.getElementById("zutat" + i + "Text").style["boxShadow"] = "0px 0px 1vh 0.5vh darkred";
                } else if(zutatHbk[i] == 4){
                    document.getElementById("zutat" + i).style["boxShadow"] = "0px 0px 1vh 0.5vh rebeccapurple";
                    document.getElementById("zutat" + i + "Text").style["boxShadow"] = "0px 0px 1vh 0.5vh rebeccapurple";
                }

            }
        };


        window.pressZutat = function (zutatNr) {
            if (zutatQnt[zutatNr] > 0) {
                soundZutatPlus.play();
                if (slotInht[0] == "frei") {
                    slotInht[0] = zutatNr;
                    document.getElementById("slot1").style.backgroundImage = "url('images/zutat" + zutatNr + ".png')";
                } else if (slotInht[1] == "frei") {
                    slotInht[1] = zutatNr;
                    document.getElementById("slot2").style.backgroundImage = "url('images/zutat" + zutatNr + ".png')";
                } else if (slotInht[2] == "frei") {
                    slotInht[2] = zutatNr;
                    document.getElementById("slot3").style.backgroundImage = "url('images/zutat" + zutatNr + ".png')";
                } else if (slotInht[3] == "frei") {
                    slotInht[3] = zutatNr;
                    document.getElementById("slot4").style.backgroundImage = "url('images/zutat" + zutatNr + ".png')";
                    document.getElementById("buttonSkip").disabled = false;
                    document.getElementById("textSkip").style.color = "white";
                    $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh cyan",
                        "background-color" : "darkcyan"
                    });
                    document.getElementById("textSkip").innerHTML = "Kochen";
                } else {
                    zutatQnt[zutatNr]++;
                }
                zutatQnt[zutatNr]--;
                document.getElementById("zutat" + zutatNr + "Text").innerHTML = "x" + zutatQnt[zutatNr];
            } else {

            }
        }

        window.removeZutat = function (slotNr) {
            soundZutatMinus.play();
            slotNr --;
            var slotInhtZutat = slotInht[slotNr];
            if(slotInht[slotNr] !== "frei") {
                zutatQnt[slotInhtZutat] ++;
                document.getElementById("zutat" + slotInhtZutat + "Text").innerHTML = "x" + zutatQnt[slotInhtZutat];
                slotInht[slotNr] = "frei";
                document.getElementById("slot" + (slotNr + 1)).style.backgroundImage = "url('images/slot" + (slotNr + 1) + ".png')";
                for (i=1; i < (4 - slotNr); i++) {
                    if (slotInht[(slotNr + i)] !== "frei") {
                        slotInht[(slotNr + i - 1)] = slotInht[(slotNr + i)];
                        document.getElementById("slot" + (slotNr + i)).style.backgroundImage = "url('images/zutat" + slotInht[(slotNr + i)] + ".png')";
                        slotInht[(slotNr + i)] = "frei";
                        document.getElementById("slot" + (slotNr + i + 1)).style.backgroundImage = "url('images/slot" + (slotNr + i + 1) + ".png')";
                    } else {}
                }
                slotInht[3] = "frei";
                document.getElementById("slot4").style.backgroundImage = "url('images/slot4.png')";
                document.getElementById("buttonSkip").disabled = true;
                document.getElementById("textSkip").style.color = "grey";
            }
        }







        questShowHide();
        navHide();
        //Startfunktionen
        $(window).resize(function () {
            resize();
        });


        $("#volumeRange").on("change", function () {
            lautstarke = (Math.round($("#volumeRange").val())) / 100;
            introVid.volume = lautstarke;
            soundOpen.volume = lautstarke;
            soundClose.volume = lautstarke;
            soundBackgroundMap.volume = lautstarke;
            soundSammeln.volume = lautstarke;
            soundClick.volume = lautstarke;
            soundBump.volume = lautstarke;
            soundFinished.volume = lautstarke;
            soundKochenBG.volume = lautstarke;
            soundZutatMinus.volume = lautstarke;
            soundZutatPlus.volume = lautstarke;
            soundWocheWeiter.volume = lautstarke;
            soundDialog2.volume = lautstarke;
        })


        var volBarExt = 0;
        var langBarExt = 0;

        $("#btnVolOpen").click(function () {
            soundClick.play();
            if (volBarExt == 0) {
            $("#volumeBar").animate({
                width : "40vh",
            })
                volBarExt = 1;

                $("#volumeRange").delay(0).show(0);

        } else {
                $("#volumeBar").animate({
                    width: "0vh",
                })
                volBarExt = 0;
                $("#volumeRange").delay(0).hide(0);
            }

        });

        $("#btnLangOpen").click(function () {
            soundClick.play();
            if (langBarExt == 0) {

                $("#languageBar").animate({
                    width : "27vh",
                })
                langBarExt = 1;

                $("#btnNoLang").delay(300).fadeIn(200);
                $("#btnEng").delay(300).fadeIn(200);
                $("#btnGer").delay(300).fadeIn(200);

            } else {

                $("#languageBar").delay(300).animate({
                    width: "0vh",
                })
                langBarExt = 0;
                $("#btnNoLang").delay(0).fadeOut(200);
                $("#btnEng").delay(0).fadeOut(200);
                $("#btnGer").delay(0).fadeOut(200);
            }

        });

        $("#btnNoLang").click(function () {
            document.getElementById("btnNoLang").disabled = true;
            document.getElementById("btnEng").disabled = false;
            document.getElementById("btnGer").disabled = false;
            subLang = 0;
            changeSubtitles();
            document.getElementById("untertitelDiv").style.opacity = "0";
            soundClick.play();
        })
        $("#btnGer").click(function () {
            document.getElementById("btnGer").disabled = true;
            document.getElementById("btnEng").disabled = false;
            document.getElementById("btnNoLang").disabled = false;
            subLang = 1;
            changeSubtitles();
            document.getElementById("untertitelDiv").style.opacity = "1";
            soundClick.play();
        })
        $("#btnEng").click(function () {
            document.getElementById("btnEng").disabled = true;
            document.getElementById("btnNoLang").disabled = false;
            document.getElementById("btnGer").disabled = false;
            subLang = 2;
            changeSubtitles();
            document.getElementById("untertitelDiv").style.opacity = "1";
            soundClick.play();
        })


        var introVid = document.getElementById("introVideo");

        $("#buttonSkip").click(function () {
            skipFunction();
        });


        


        function skipFunction() {
            soundClick.play();
            if ((currLvl == 6) && (currWoche !== 9)){
                checkRecipes();
                wocheWeiter();
                questActual();

                if (questFortschritt >= 30){
                    $("#zustimmungSmileyDiv").css({"background-image" : " url('images/zus1.png')"});
                } else if (questFortschritt <= 10) {
                    $("#zustimmungSmileyDiv").css({"background-image" : " url('images/zus3.png')"});
                } else {
                    $("#zustimmungSmileyDiv").css({"background-image" : " url('images/zus2.png')"});}
            } else if (currLvl == 5) {
                stopMapSounds();
                startKochenSounds();
                currLvl = 6;
                questFortschritt = 20;
                questZiel = 40;
                document.getElementById("questFortsText").innerHTML = questFortschritt + "/" + questZiel;
                $("#weltkarteSection").fadeOut(1000);
                $("#kochSpielSection").fadeIn(1000);
                resize();
                $("#textSkip").css({"color" : "grey"});
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh transparent",
                    "background-color" : "transparent"
                });
                document.getElementById("buttonSkip").disabled = true;
                document.getElementById("textSkip").innerHTML = "Kochen";
                document.getElementById("textSkip").style.color = "grey";
                initKochen();
                questShowHide();
                questActual();
                $("#zustimmungSmileyDiv").animate({
                    "opacity" : "1"
                }, 500);
                disableHide = 0;
                navHide();
            } else if (currLvl == 4) { // Weiter
                playMapSounds();
                currLvl = 3;
                activeEvents = true;
                holzQuestActive = true;
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh transparent",
                    "background-color" : "transparent"
                });
                document.getElementById("textSkip").innerHTML = "Pause";
            } else if (currLvl == 3) { // Pause
                stopMapSounds();
                activeEvents = false ;
                holzQuestActive = false;
                currLvl = 4;
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh cyan",
                    "background-color" : "darkcyan"
                });
                document.getElementById("textSkip").innerHTML = "Resume";
            }else if (currLvl == 2) {
                document.getElementById("textSkip").innerHTML = "Pause";
                playMapSounds();
                setInterval(fahren, 50);
                setInterval(buttoncheck, 100);
                levelTime = 0;
                setInterval(timeActual, 1000);
                currLvl = 3;
                activeEvents = true;
                holzQuestActive = true;
                document.getElementById("questFortsText").innerHTML = questFortschritt + "/" + questZiel;
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh transparent",
                    "background-color" : "transparent"
                });
                questShowHide();
                disableHide = 1;
                navShow();
            } else if (currLvl == 1) {
                introVid.pause();
                $("#introSection").fadeOut(1000);
                $("#weltkarteSection").delay(1000).css({opacity: 1});
                document.getElementById("textSkip").innerHTML = "Start";
                currLvl = 2;
                resize();
                setInterval("render()", 50);
                $("#buttonSkip").css({"box-shadow" : "0vh -0.75vh 0vh 0vh cyan",
                    "background-color" : "darkcyan"
                });
            } else if (currLvl == 0) {
                currLvl = 1;
            }
        }
        $("#btnNavOpen").on("mouseover",  function () {
            if (navHidden == 1){
                navShow();
            }
        });

        $("#navButtonDiv").mouseleave(function () {
            if (disableHide == 0) {
                navHide();
            }
        });

        window.initGame = function () {
            function autoSkipVideo() {
                if (currLvl < 2) {
                    document.getElementById("buttonSkip").click();
                }
            }
            initSubtitles();
            setTimeout(autoSkipVideo, 57000);
            introVid.currentTime = 0;
            introVid.play();
            document.getElementById("textSkip").innerHTML = "Skip";
            currLvl = 1;
            $("#buttonSkip").css({"box-shadow" : "0vh 0vh 0vh 0vh transparent",
                "background-color" : "transparent"
            });

            $("#finalStartBtn").animate({
                "left":"+=50vw"
            }, 800);
            $("#startDiv").delay(500).fadeOut(1500);
        }
    })




    function resize() {
        canvas = document.getElementById("karteCan");
        var scrX = window.innerWidth;
        var scrY = window.innerHeight * 0.9;
        canvas.width = scrX * 1.77;
        canvas.height = scrY;
        $("#karteCan").css({height: scrY});
        $("#karteCan").css({width: scrY * 1.77});
        $("#weltkarteSection").css({left: (window.innerWidth - (scrY * 1.77)) / 2});
        $("#karteBGimg").css({height: window.innerHeight});
        $("#karteBGimg").css({width: "auto"});
        var bgImgBreite = document.getElementById("karteBGimg").width;
        $("#karteBGimg").css({left: (window.innerWidth - bgImgBreite) / 2});
        var kochenBreite = document.getElementById("kochSpielBgImg").width;
        $("#kochSpielBgImg").css({left: (window.innerWidth - kochenBreite) / 2});
        document.getElementById("karteCan").setAttribute("width", scrY * 1.77);
        document.getElementById("karteCan").setAttribute("height", scrY)
        
        // Buttons
        //up
        $("#buttonUp").css({width: scrX * 0.10});
        $("#buttonUp").css({height: scrX * 0.038});
        $("#buttonUp").css({left: (scrX / 2 - (scrX * 0.1 / 2))});
        $("#buttonUp").css({top: (window.innerHeight) - (scrX * 0.155)});
        //left
        $("#buttonLeft").css({width: scrX * 0.0375});
        $("#buttonLeft").css({height: scrX * 0.1});
        $("#buttonLeft").css({left: (scrX - (scrX * 0.15)) / 2});
        $("#buttonLeft").css({top: (window.innerHeight) - (scrX * 0.127)});
        //ship
        $("#buttonShip").css({width: scrX * 0.085});
        $("#buttonShip").css({height: scrX * 0.085});
        $("#buttonShip").css({left: (scrX / 2 - (scrX * 0.085 / 2))});
        $("#buttonShip").css({top: (window.innerHeight) - (scrX * 0.118)});
        //right
        $("#buttonRight").css({width: scrX * 0.0375});
        $("#buttonRight").css({height: scrX * 0.1});
        $("#buttonRight").css({left: scrX * 0.5375});
        $("#buttonRight").css({top: (window.innerHeight) - (scrX * 0.127)});
        // down
        $("#buttonDown").css({width: scrX * 0.1});
        $("#buttonDown").css({height: scrX * 0.0375});
        $("#buttonDown").css({left: (scrX / 2 - (scrX * 0.1 / 2))});
        $("#buttonDown").css({top: (window.innerHeight) - (scrX * 0.038)});

    }


//
// ++
// Weltkarte spiel
// ++
//


    function buttoncheck() {
        //
        // Steuerung nach rechts
        //
        if (activeEvents == true) {
            $('#buttonRight').on('mousedown', function () {
                keysActive[3] = 1;
            }).on("mouseup mouseleave", function () {
                keysActive[3] = 0;
            });
        $("body").on("keydown", function (dreiKey) {
            if (dreiKey.which == 39 || dreiKey.which == 68) {
                keysActive[3] = 1;
            } else if (dreiKey.which == 40 || dreiKey.which == 83) {
                keysActive[4] = 1;
            } else if (dreiKey.which == 37 || dreiKey.which == 65) {
                keysActive[2] = 1;
            } else if (dreiKey.which == 38 || dreiKey.which == 87) {
                keysActive[1] = 1;
            }


        }).on("keyup", function (dreiKey) {
            if (dreiKey.which == 39 || dreiKey.which == 68) {
                keysActive[3] = 0;
            } else if (dreiKey.which == 37 || dreiKey.which == 65) {
                keysActive[2] = 0;
            } else if (dreiKey.which == 38 || dreiKey.which == 87) {
                keysActive[1] = 0;
            } else if (dreiKey.which == 40 || dreiKey.which == 83) {
                keysActive[4] = 0;
            }
        })


        // Leftkey
        $('#buttonLeft').on('mousedown', function () {
            keysActive[2] = 1;
        }).on("mouseup mouseleave", function () {
            keysActive[2] = 0;
        });

        // Upkey
        $('#buttonUp').on('mousedown', function () {
            keysActive[1] = 1;
        }).on("mouseup mouseleave", function () {
            keysActive[1] = 0;
        });

        // Upkey
        $('#buttonDown').on('mousedown', function () {
            keysActive[4] = 1;
        }).on("mouseup mouseleave", function () {
            keysActive[4] = 0;
        });

    } else {
        }
    }



    var shipR = levelShipStart[2]; //zwischen 0 und 360
    var shipX = levelShipStart[0]; //relativ zu Fenstergrösse
    var shipXRelative;
    var shipY = levelShipStart[1]; // relativ zu Fenstergröße
    var shipYRelative;
    var keysActive = [0, 0, 0, 0];
    keysActive[1] = 0;
    keysActive[4] = 0;
    var shipSpeed = 0; // max 100
    var i = 0;



    function fahren() {
        if (activeEvents == true) {
        if ((keysActive[3] == 1) && (keysActive[2] == 1)) {
        } else if (keysActive[3] == 1) {
            shipR = (shipR + 0.5) + 0.5 * (Math.abs(shipSpeed) * 0.01);
        } else if (keysActive [2] == 1) {
            shipR = (shipR - 0.5) - 0.5 * (Math.abs(shipSpeed) * 0.01);
        }

        if ((keysActive[4] == 1) && (keysActive[1] == 1)) {
        } else if (keysActive[1] == 1) {
            shipSpeed = shipSpeed + 3;
            moveShip();
        } else if (keysActive[4] == 1) {
            shipSpeed = shipSpeed - 1;
            if ((shipSpeed > 0) && (isBlocked == 0)) {
                shipSpeed = shipSpeed - 20;
            }
            moveShip();
        }
        if (shipSpeed > 200) {
            shipSpeed = 199;
        } else if (shipSpeed < (-75)) {
            shipSpeed = -74;
        }

        function unblock() {
            isBlocked = 0;
        }
        for (var b = 0; b <= dauer; b++) {
            if (((Math.round(blockedX[b] * canvas.width * 0.001) + (canvas.width * 0.01)) > shipXRelative)
                && ((Math.round(blockedX[b] * canvas.width * 0.001) - (canvas.width * 0.01)) < shipXRelative)
                && ((Math.round(blockedY[b] * canvas.width * 0.001) + (canvas.width * 0.01)) > shipYRelative)
                && ((Math.round(blockedY[b] * canvas.width * 0.001) - (canvas.width * 0.01)) < shipYRelative)
                && (isBlocked == 0)) {
                if (shipSpeed > 0) {
                    soundBump.play();
                    shipSpeed = -75;
                    isBlocked = 1;
                    setTimeout(unblock, 500)

                } else if (shipSpeed < 0) {
                    shipSpeed = 75;
                    isBlocked = 1;
                    setTimeout(unblock, 500)
                }
            }
        }
            for (k=0; k < holzActive.length; k++){
            if ((((Math.round(holzX[k] * canvas.width * 0.001) + (canvas.width * 0.04)) > shipXRelative)
                    && ((Math.round(holzX[k] * canvas.width * 0.001) - (canvas.width * 0.01)) < shipXRelative)
                    && ((Math.round(holzY[k] * canvas.width * 0.001) + (canvas.width * 0.04)) > shipYRelative)
                    && ((Math.round(holzY[k] * canvas.width * 0.001) - (canvas.width * 0.01)) < shipYRelative)
                    && (holzActive[k] == 1)
                    && (holzQuestActive == true))) {
                holzActive[k] = 0;
                questPlus ++;
                questActual();
            }
                }

                if ((((Math.round(questDestination[0] * canvas.width * 0.001) + (canvas.width * 0.035)) > shipXRelative)
                    && ((Math.round(questDestination[0] * canvas.width * 0.001) - (canvas.width * 0.005)) < shipXRelative)
                    && ((Math.round(questDestination[1] * canvas.width * 0.001) + (canvas.width * 0.035)) > shipYRelative)
                    && ((Math.round(questDestination[1] * canvas.width * 0.001) - (canvas.width * 0.005)) < shipYRelative)
                    && (questDestination[2] == 1)
                    )) {
                    questDestReached()
                }



        // bei keiner besschleunigung Beschleunigungsverringerung
        if ((keysActive[1] == 0) || (keysActive[4] == 0)) {
            if ((keysActive[1] == 0) && (keysActive[4] == 0) && (i <= 100)) {
                i++;
                if (shipSpeed > 0) {
                    shipSpeed = Math.round(shipSpeed - (shipSpeed * ((i * i) / 10000)));
                    moveShip();
                } else if (shipSpeed < 0) {
                    shipSpeed = Math.round((shipSpeed * (-1)) - ((shipSpeed * (-1)) * ((i * i) / 10000))) * (-1);
                    moveShip();
                } else {
                    i = 0;
                }
            } else {
                i = 0;
            }
        }


            // X 833     Y 80
        var harbDiffX = Math.abs(833 - shipX);
        var harbDiffY = Math.abs(80 - shipY);
        var harbourVol;
        if (harbDiffX > harbDiffY) {
            harbourVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffY / harbDiffX * (harbDiffY + harbDiffX)));
        } else if (harbDiffX < harbDiffY) {
            harbourVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
        } else {
            harbourVol = 1 - 3 * ((harbDiffY + harbDiffX) - (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
        };
        if (harbourVol > 0) {
            soundHarbour.volume = (lautstarke * harbourVol);
        }   else {
            soundHarbour.volume = 0;
        }

        harbDiffX = Math.abs(655 - shipX);
        harbDiffY = Math.abs(470 - shipY);
            var cliffVol;
            if (harbDiffX > harbDiffY) {
                cliffVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffY / harbDiffX * (harbDiffY + harbDiffX)));
            } else if (harbDiffX < harbDiffY) {
                cliffVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
            } else {
                cliffVol = 1 - 3 * ((harbDiffY + harbDiffX) - (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
            };
            document.getElementById("tester3").innerHTML = cliffVol;
            if (cliffVol > 0) {
                document.getElementById("tester3").innerHTML = cliffVol;
                soundCliff.volume = (lautstarke * cliffVol);
            }   else {
                document.getElementById("tester3").innerHTML = "False";
                soundCliff.volume = 0;
            }

            harbDiffX = Math.abs(381 - shipX);
            harbDiffY = Math.abs(183 - shipY);
            var lihoVol;
            if (harbDiffX > harbDiffY) {
                lihoVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffY / harbDiffX * (harbDiffY + harbDiffX)));
            } else if (harbDiffX < harbDiffY) {
                lihoVol = 1.3 - 0.005 * ((harbDiffY + harbDiffX) - 0.3 * (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
            } else {
                lihoVol = 1 - 3 * ((harbDiffY + harbDiffX) - (harbDiffX / harbDiffY * (harbDiffY + harbDiffX)));
            };
            document.getElementById("tester3").innerHTML = lihoVol;
            if (lihoVol > 0) {
                document.getElementById("tester3").innerHTML = lihoVol;
                soundLighthouse.volume = (lautstarke * lihoVol);
            }   else {
                document.getElementById("tester3").innerHTML = "False";
                soundLighthouse.volume = 0;
            }


            soundFahrt2.volume = lautstarke * (shipSpeed * 0.005);






        function moveShip() {
            shipX = shipX + Math.cos(shipR / 180 * Math.PI) * (shipSpeed / 100);
            shipY = shipY + Math.sin(shipR / 180 * Math.PI) * (shipSpeed / 100);
        }
    } }


var zielImg = document.getElementById("destBild");
    function render() {
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shipXRelative = Math.round(shipX * 0.01 * canvas.width) / 10;
            shipYRelative = Math.round(shipY * 0.01 * canvas.width) / 10;
            ctx.translate(shipXRelative, shipYRelative);
            var img = document.getElementById("imgShip");
            var shadow = document.getElementById("imgShadow");
            ctx.rotate(Math.round(shipR) * Math.PI / 180);
            ctx.drawImage(shadow, Math.sin((shipR -70) / 180 * Math.PI) * (canvas.width * 0.008) - (canvas.width /2 * 0.07), Math.cos((shipR -70)/ 180 * Math.PI) * (canvas.width * 0.008) - ((canvas.width /2 * 0.03)), (canvas.width * 0.07), (canvas.width) * 0.03);
            ctx.drawImage(img, (((canvas.width * 0.07) / 2) * (-1)), (((canvas.width * 0.03) / 2) * (-1)), (canvas.width * 0.07), (canvas.width) * 0.03);
            ctx.rotate((Math.round(shipR) * Math.PI / 180) * (-1));
            ctx.translate((shipXRelative) * (-1), (shipYRelative) * (-1));


            for (var u = 0; u <= dauer; u = u + 1) { // rend// er Blocker
                ctx.fillStyle = "rgba(0, 0, 255, 0)";
                ctx.fillRect(Math.round(blockedX[u] * canvas.width * 0.001), Math.round(blockedY[u] * canvas.width * 0.001), (canvas.width * 0.003), (canvas.width * 0.003));
            }
            for (j=0; j < holzActive.length; j++) {
                if (holzActive[j] == 1) {
                    ctx.drawImage(holzImg, holzX[j] * canvas.width * 0.001, holzY[j] * canvas.width * 0.001, (canvas.width * 0.03), (canvas.width * 0.03));
                }
            }

        if (questDestination[2] == 1) {
            ctx.drawImage(destImg, questDestination[0] * canvas.width * 0.001, questDestination[1] * canvas.width * 0.001, (canvas.width * 0.05), (canvas.width * 0.05));
        }
        
            ctx.restore();
            if (shipR > 360) {
                shipR = shipR - 360;
            }


    }



//      +++           Untertitel           +++

    var untertitelDe = [
        'Ahoi, und herzlich willkommen auf unserer Reise in die Geschichte der Seute Deern!',
        'Wir schreiben das Jahr 1919. In Gulfport, nahe der Mississippi-Mündung wurde der Viermast-Gaffelschoner "Elisabeth Bandi,',
        'welcher uns heute als die Seute Deern bekannt ist, fertig gestellt.',
        'Die Elisabeth Bandi war für die Holzfahrt bestimmt und führte am Bug des Schiffes zwei Pforten zur Einführung von Langhölzern in dem Laderaum. ',
        'Damit kommen wir auch zur ersten Aufgabe: Auf der folgenden Karte wirst du verschiedene Markierungen finden, an denen Langhölzer hinterlegt sind.',
        'Steuere mithilfe der Pfeiltasten die Elisabeth Bandi geschickt durch das Meer und sammle so schnell wie möglich alle Hölzer ein!',
        'Und vergiss nicht: Die Hölzer müssen am Ende alle in deinem Ursprungshafen ausgeladen werden. Das Spiel beginnst du mit dem Start-Button unten rechts. ',
        'Mit jedem Spiel sammelst du Erfahrungspunkte, die auf deinem Konto gutgeschrieben werden. ',
        'Je mehr du dich anstrengst, desto besser schneiest du am Ende in der Highscore-Liste ab. ',
        'Wie weit du dich in der Geschichte der Seute Deern befindest, erkennst du an der farblich hinterlegten Menüleiste. ',
        'Nun aber genug geredet, viel Erfolg und Leinen los!',
        '...'
    ];
    var untertitelEn = [
        'Ahoi, and very welcome to our journey through the history of the Seute Deern!',
        'It was 1919, when in Gulfport near Mississippi river the Elisabeth Bandi,',
        'today knows as the Seute Deern was built. ',
        'The Elisabeth Bandi was designed as a wood carrier and had two gates in its bow to load the wood piles. ',
        'With that in mind, here is the first task: On the following map there are marked wood piles.',
        'Steer the Elisabeth Bandi through the map to collect all of them. ',
        'When finished, you have to bring the load back to harbour to unload. Start the game with the button on the bottom right. ',
        'With every game you finish you collect experience points. ',
        'The more you get, the better you will be ranked in the score list at the end of the story. ',
        'You can see in which level you are at the colored menu point. ',
        'Enough talk, good luck!',
        '...'
    ];

    var untertitelTrigger = [
        3, 7 ,4, 6, 7, 7, 6, 4, 4, 5, 7
    ];

    var untertitelZahler = -1;

    function initSubtitles () {
        if (currLvl < 2) {
            untertitelZahler++;
            changeSubtitles();
            setTimeout("initSubtitles()", untertitelTrigger[untertitelZahler] * 1000);
            document.getElementById("tester4").innerHTML = untertitelZahler;
        }
    }

    function changeSubtitles () {
        if (subLang == 1) { // Deutsch
        document.getElementById("untertitelText").innerHTML = untertitelDe[untertitelZahler];
    }   else if (subLang == 2) { // Englisch
            document.getElementById("untertitelText").innerHTML = untertitelEn[untertitelZahler];
        } else {
            document.getElementById("untertitelText").innerHTML = " ";
        }
}
