'use strict';
{

  const words = [
    'heart',
    'yoga',
    'swimming',
    'sustainable',
    'meditation',
    'ecology',
  ];

  let word;
  let num;
  let score;
  let miss;
  const timeLimit = 3 * 1000; //ミリ秒
  let startTime;
  let isPlaying = false;


  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeOutId = setTimeout(() => {
      updateTimer();
    }, 10);//10ミリ秒後に

    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeOutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        showResult();
      }, 100);  //ブラウザの仕様により画面描画処理がalertによりブロックされるため、遅らせる
      target.textContent = 'Click to replay';
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(` GAME OVER\n\n ${score}letters, ${miss}misses, ${accuracy.toFixed(2)}% accuracy`);
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    num = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  function targetUpdate() {
    let space = '';
    for (let i = 0; i < num; i++) {
      space += '_';
    }
    target.textContent = space + word.substring(num);
  }

  window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[num]) {
      num++;
      if (num === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        num = 0;
      }
      targetUpdate();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}