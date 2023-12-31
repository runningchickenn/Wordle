// const answer = 'APPLE';

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement('div');
    div.innerText = '게임이 종료되었웅~';
    div.style =
      'display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:white; width:200px; height:100px';

    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener('keydown', handleKeydown);

    displayGameover();

    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts++;
    index = 0;
  };

  const handleEnterKey = async () => {
    let rightAnswer = 0;

    // 서버의 정답을 받아오기. 비동기로 받아오기 async await
    const response = await fetch('/answer');

    //객체형태 받아온 정답. 만약 서버에서 문자열 형태로 온다면 이 과정이 필요 없음. 바로 정답으로 받으면 됨.
    const answer_obj = await response.json();

    //객체형태의 정답에서 정답 문자열만 뽑아준다.
    const answer = answer_obj.answer;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerText;
      const answerLetter = answer[i];

      if (inputLetter === answerLetter) {
        rightAnswer++;
        block.style.backgroundColor = '#6aaa64';
      } else if (answer.includes(inputLetter)) {
        block.style.backgroundColor = '#c9b458';
      } else block.style.backgroundColor = 'gray';

      block.style.color = 'white';
    }

    if (rightAnswer === 5) gameOver();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = '';
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === 'Backspace') handleBackspace();
    else if (index === 5) {
      if (event.key === 'Enter') handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const elapsedTime = new Date(currentTime - startTime);
      const minutes = elapsedTime.getMinutes().toString().padStart(2, '0');
      const sec = elapsedTime.getSeconds().toString().padStart(2, '0');
      const timeDiv = document.querySelector('#timer');
      timeDiv.innerText = `time: ${minutes}:${sec}`;
    }

    //setInterval의 아이디가 저장이 됨.
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener('keydown', handleKeydown);
}

appStart();
