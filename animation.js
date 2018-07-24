var actionCount = 0;
var inAction    = false;
var autoPlay    = false;
const baseDur   = 4000;
const title7Dur = 3000;
const title2Dur = 3000;
const title8Dur = 4000;
const phraseDur = baseDur;
const bkgdDur   = baseDur;
const sphereDur = baseDur;
const sunDur    = Math.round(1.5*baseDur);
const eclipDur  = 8*baseDur;
const lightingOpa = 0.5;
const sunnyColor = "#479EE1";
const eclipseColor = "#262728";
var eclipseSun  = document.getElementById("eclipseSun");
var eclipseMoon = document.getElementById("eclipseMoon");

function actionEnd() {
    console.log("action " + actionCount + " finished");
    actionCount = actionCount + 1;
    sequence.pause();
    inAction = false;
    if (autoPlay) {
        onTap(null);
    }
}
function sequenceEnd() {
    console.log("action " + actionCount + " finished");
    console.log("end of the sequence");
    if (!autoPlay)
        document.body.addEventListener("click", fire);
    actionCount = 0;
    inAction    = false;
    autoPlay    = true;
    sequence.restart();
    console.log("sequence restarted");
}

var sequence = anime
    .timeline({easing: "easeInQuad"})
    .add({
        targets: "#tapToContinue",
        opacity: 0,
        duration: bkgdDur
    })
    .add({
        targets: "#title_7",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: title7Dur,
        delay: bkgdDur
    })
    .add({
        targets: "#title_2",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: title2Dur,
        delay: Math.round(title2Dur/2)
    })
    .add({
        targets: "#title_8",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: title8Dur,
        delay: Math.round(title8Dur/2),
        complete: actionEnd     // action end
    })

    .add({
        targets: "#title_728",
        duration: bkgdDur,
        opacity: 0
    })
    .add({
        targets: "#bkgd",
        duration: bkgdDur,
        backgroundColor: "#000",
    })
    .add({
        targets: "#我是月球",
        duration: phraseDur,
        opacity: 1
    })
    .add({
        targets: "#sphereLighting",
        duration: sphereDur,
        opacity: 1
    })
    .add({
        targets: "#单调而黑白",
        duration: phraseDur,
        opacity: 1,
        complete: actionEnd     // action end
    })

    .add({
        targets: "#我是月球, #单调而黑白",
        duration: phraseDur,
        opacity: 0
    })
    .add({
        targets: "#你是地球",
        duration: phraseDur,
        delay: phraseDur,
        opacity: 1
    })
    .add({
        targets: "#sphereLighting",
        duration: sphereDur,
        opacity: lightingOpa
    })
    .add({
        targets: "#sphereEarth",
        duration: sphereDur,
        opacity: 1,
        offset: "-=" + sphereDur
    })
    .add({
        targets: "#复杂而多彩",
        duration: phraseDur,
        opacity: 1,
        complete: actionEnd     // action end
    })

    .add({
        targets: "#你是地球, #复杂而多彩",
        duration: phraseDur,
        opacity: 0
    })
    .add({
        targets: "#sphereEarth",
        duration: sphereDur,
        opacity: 0,
    })
    .add({
        targets: "#nightSky",
        duration: bkgdDur,
        opacity: 1
    })
    .add({
        targets: "#我在你的星空中绕圈",
        duration: phraseDur,
        opacity: 1,
    })
    .add({
        targets: "#sphereMoon",
        duration: sphereDur,
        opacity: 1,
    })
    .add({
        targets: "#阴晴圆缺",
        duration: phraseDur,
        delay: phraseDur,
        opacity: 1,
    })
    .add({
        targets: "#我在你的星空中绕圈, #阴晴圆缺",
        duration: phraseDur,
        opacity: 0
    })
    .add({
        targets: "#忽明忽暗",
        duration: phraseDur,
        opacity: 1,
        offset: "-=" + Math.round(phraseDur*0.7),
        complete: actionEnd     // action end
    })

    .add({
        targets: "#sphereMoon",
        duration: sphereDur,
        opacity: 0,
    })
    .add({
        targets: "#sphereLighting",
        duration: 2*sphereDur,
        opacity: [{value: 1}, {value: 0}]
    })
    .add({
        targets: "#忽明忽暗",
        duration: phraseDur,
        offset: "-=" + 2*sphereDur,
        opacity: 0,
    })

    .add({
        targets: "#我不能生产阳光",
        opacity: [{value: 1}, {value: 1}, {value: 0}],
        duration: phraseDur + sunDur
    })
    .add({
        targets: "#eclipse",
        opacity: 1,
        duration: sunDur,
        offset: "-=" + sunDur
    })
    .add({
        targets: "#bkgd",
        backgroundColor: sunnyColor,
        duration: sunDur,
        offset: "-=" + sunDur
    })
    .add({
        targets: "#bkgd",
        backgroundColor: [{value: eclipseColor}, {value: sunnyColor}],
        duration: eclipDur,
        easing: "linear",
        begin: function () {
            eclipseSun.style.animationPlayState = "running";
            eclipseMoon.style.animationPlayState = "running";
        },
        complete: function () {
            // hack to reset css animatioin
            eclipseSun.classList.remove("eclipseSun");
            eclipseMoon.classList.remove("eclipseMoon");
            eclipseSun.offsetWidth;
            eclipseMoon.offsetWidth;
            eclipseSun.classList.add("eclipseSun");
            eclipseMoon.classList.add("eclipseMoon");
            eclipseSun.style.animationPlayState = "paused";
            eclipseMoon.style.animationPlayState = "paused";
        }
    })
    .add({
        targets: "#也不够制造黑暗",
        opacity: [{value: 0}, {value: 1}, {value: 0}, {value: 0}],
        duration: eclipDur,
        offset: "-=" + eclipDur,
        complete: sequenceEnd                   // action end
    });

sequence.pause();

function onTap (e) {
    if (inAction)
        return;
    console.log("in action " + actionCount);
    if (!autoPlay && 3 == actionCount)
        fire(e);
    inAction = true;
    sequence.play();
}
document.onclick = onTap;
document.onTap   = onTap;
