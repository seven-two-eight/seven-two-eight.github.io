/*
    开宗明义！
    把关键的参数提出来，方便动画调试。
*/
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
const nightColor = "#000000";
const initBkgd   = "#EEEEEE";
var eclipseSun  = document.getElementById("eclipseSun");
var eclipseMoon = document.getElementById("eclipseMoon");

/* 
    一个场景结束后就，等你点一下才开始下个场景。
    这样好歹也算产生了互动！
    如果是二周目的话，就直接播放，不用点，免得你烦。
    （贴心的我）
*/
function actionEnd() {
    console.log("action " + actionCount + " finished");
    actionCount = actionCount + 1;
    sequence.pause();
    inAction = false;
    if (autoPlay) {
        onTap(null);
    }
}
/*
    脚本结束后，重置场景，准备二周目！
*/
function sequenceEnd() {
    console.log("action " + actionCount + " finished");
    console.log("end of the sequence");
    if (!autoPlay){
        // 桌面端和移动端的点击事件竟然不统一！
        document.body.addEventListener("click", fire);
        document.body.addEventListener("touchstart", fire);
    }
    actionCount = 0;
    inAction    = false;
    autoPlay    = true;
    sequence.restart();
    console.log("sequence restarted");
}

/*
    主脚本！
    一个个的别偷懒！好好按剧本演出！
    我们的目标是跨平台兼容！
    管它是桌面端还是手机端！
    低端小米还是傲慢苹果！
*/
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
        backgroundColor: nightColor
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
        opacity: [{value: 1}, {value: 0}],
        duration: 2*phraseDur,
        delay: Math.round(0.5*phraseDur)
    })
    .add({
        targets: "#我在你的星空中绕圈",
        duration: phraseDur,
        opacity: 0,
        offset: "-=" + phraseDur
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
        easing: "easeOutQuad"
    })
    .add({
        targets: "#sphereLighting",
        duration: 2*sphereDur,
        opacity: [{value: 1}, {value: 0}],
        easing: "easeOutQuad"
    })
    .add({
        targets: "#忽明忽暗",
        duration: phraseDur,
        offset: "-=" + 2*sphereDur,
        opacity: 0
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
        targets: "#nightSky",
        opacity: 0,
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
            eclipseSun.classList.remove("paused");
            eclipseMoon.classList.remove("paused");
        },
        complete: function () {
            // hack to reset css animatioin
            eclipseSun.classList.add("paused");
            eclipseMoon.classList.add("paused");
        }
    })
    .add({
        targets: "#nightSky",
        opacity: [{value: 1}, {value: 0}],
        duration: eclipDur,
        offset: "-=" + eclipDur
    })
    .add({
        targets: "#也不够制造黑暗",
        opacity: [{value: 0}, {value: 1}, {value: 0}, {value: 0}],
        duration: eclipDur,
        offset: "-=" + Math.round(0.9*eclipDur)
    })
    .add({
        targets: "#eclipse",
        opacity: 0,
        duration: sunDur,
        easing: "easeOutQuad"
    })
    .add({
        targets: "#bkgd",
        backgroundColor: nightColor,
        duration: sunDur,
        offset: "-=" + sunDur,
        easing: "easeOutQuad"
    })
    .add({
        targets: "#却总希望你会想我, #nightSky",
        opacity: 1,
        duration: sunDur,
        offset: "-=" + Math.round(0.8*sunDur)
    })
    .add({
        targets: "#却总希望你会想我",
        opacity: 0,
        duration: phraseDur,
        delay: sunDur,
        easing: "easeOutQuad"
    })
    .add({
        targets: "#在没有月的夜晚",
        opacity: [{value: 1}, {value: 0}],
        duration: 5*phraseDur,
        easing: "easeInOutQuad"
    })
    .add({
        targets: ".shootingStar",
        left: "130%",
        opacity: [{value: 1}, {value: 1}, {value: 1}],
        duration: 3*phraseDur,
        offset: "-=" + (3*phraseDur),
        easing: "linear",
    })
    .add({
        targets: "#nightSky",
        opacity: 0,
        duration: bkgdDur,
        offset: "-=" + Math.round(0.5*phraseDur)
    })
    .add({
        targets: "#bkgd",
        backgroundColor: initBkgd,
        duration: bkgdDur,
        offset: "-=" + bkgdDur,
        easing: "easeInOutQuad"
    })
    .add({
        targets: "#title_728",
        opacity: [{value: 1}, {value: 1}, {value: 0}],
        duration: 3*bkgdDur,
        easing: "easeInOutQuad"
    })
    .add({
        targets: "#tapToContinue",
        opacity: 1,
        duration: bkgdDur,
        delay: bkgdDur,
        complete: sequenceEnd
    })

/*
    脚本准备完毕！final standby!
*/
sequence.pause();

/*
    象征性的互动。
    もとあなたと話すことが欲しい。
*/
function onTap (e) {
    if (inAction)
        return;
    console.log("in action " + actionCount);
    if (!autoPlay && 3 == actionCount)
        fire(e);
    inAction = true;
    sequence.play();
}

/*
    言ったでしょう！
    跨平台！！
*/
document.onclick = onTap;
document.ontouchstart = onTap;
