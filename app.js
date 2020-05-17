//  Тоглоочийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
var activePlayer = 0;

// Тоглочдын тоог цуглуулсан оноог хадгалах хувьсагч хэрэгтэй
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч хэрэгтэй
var roundScore = 0;
// Шооны аль талаараа буусаныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber = Math.floor(Math.random() * 6) + 1;

// <div class="player-score" id="score-0">43</div>
// window.document.querySelector("#score-0").textContent = dice;
// document.querySelector("#score-1").innerHTML = "<em>Yes!</em>";

// Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";
// шоог шидэх event listener
// Anonymous function нэг л удаа нэг л газар хэрэглэж байгаа учраас
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 доторх санамсаргүй нэг тоог гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";

  //Буусан тоо нь 1 ээс ялгаатай бол идэвхитэй Тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    // 1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    //  1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
    switchToNextPlayer(); //DRY
  }
});

// Hold button ий  event listener
document.querySelector(".btn-hold").addEventListener("click", function () {
  // уг тоглогчийн цуглуулсан ээлжний оноог глобал

  /*  if (activePlayer === 0) {
    scores[0] = scores[0] + roundScore;
  } else {
    scores[1] = scores[1] + roundScore;
  }  */ //доорх кодтой яг адилхан хураангуйлбайл доорх шиг

  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэц дээрх оноог нь өөрчилнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогч хожсон эсэхийг шалгах ( онол нь 100-с их эсэх ) шалгах
  if (scores[activePlayer] >= 20) {
    // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчын ээлжийг солино.
    switchToNextPlayer();
  }
});

// энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  // энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  // хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго.
  //үгүй бол идэвхитэй тоглогчийг 0 болго.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else {
  //   activePlayer = 0;
  // }

  // Улаан цэгийг хайж олох
  document.querySelector(" .player-0-panel").classList.toggle("active");
  document.querySelector(" .player-1-panel").classList.toggle("active");

  // Шоог түр алга болгох 1 гараад дараагын тоглогч эхлэхэд
  diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчны event listener
document.querySelector(".btn-new").addEventListener("click", function () {
  alert("clicked");
});
