const quizData = [
  {
    question: "1+1 bằng bao nhiêu?",
    options: [1, 2, 3, 4],
    answer: 2,
  },
  {
    question: "2+2 bằng bao nhiêu?",
    options: [3, 4, 5, 6],
    answer: 4,
  },
  {
    question: "3+3 bằng bao nhiêu?",
    options: [5, 6, 7, 8],
    answer: 6,
  },
];

//Câu hỏi hiện tại
let currentQuestionIndex = 0;
//Biến lưu điểm mỗi lần next
let score = 0;
//Selected option, save câu trả lời
let selectedOption = null;
//Save Selected option khi load câu hỏi để khi back tính điểm
let prevSeletedOption = null;

//Get question element
const questionElement = document.getElementById("question");
//Get submit button element
const submitElement = document.getElementById("submit");
//Get quiz container element
const quizContainerElement = document.getElementById("quiz-container");
//get option container
const optionsContainer = document.getElementById("options-container");
//Get submit button element
const backButtonElement = document.getElementById("back");

//Lấy element button và cho vào mảng để loop mảng .
const optionsButton = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4"),
];

//Load đề
const loadQuiz = () => {
  optionsContainer.classList.remove("hidden");
  const currentQuestion = quizData[currentQuestionIndex];
  submitElement.innerText = "Next";
  if (!currentQuestion) return;

  //Load câu hỏi
  questionElement.innerText = currentQuestion.question;
  //Load câu trả lời
  //Loop button và ứng với từng button sẽ add function hanlde và thay đổi text bên trong.
  optionsButton.forEach((button, index) => {
    //Thay đổi text
    button.innerText = currentQuestion.options[index];
    //Reset seleted option
    button.classList.remove("selected");
    //Gán handle click function cho button câu trả lời
    button.onclick = () => {
      selectedButton(button);
    };
  });

  //Ẩn nút submit
  submitElement.classList.add("hidden");
  //Ẩn back button
  if (currentQuestionIndex === 0) {
    backButtonElement.classList.add("hidden");
  } else {
    backButtonElement.classList.remove("hidden");
  }
  selectedOption = null;
};

const selectedButton = (button) => {
  //Reset background color cho tất cả các button
  optionsButton.forEach((btn) => {
    btn.classList.remove("selected");
  });
  //Display submit button
  submitElement.classList.remove("hidden");
  //Đổi màu background cho button vừa nhấn
  button.classList.add("selected");
  //Thay đổi height của quiz container
  quizContainerElement.classList.add("expanded");
  //update selected option
  selectedOption = button.innerText;
};

const showScore = () => {
  questionElement.innerText = `Bạn đã đúng ${score} / ${quizData.length} câu`;
  //Ẩn các button option khi hiển thị kết quả
  optionsContainer.classList.add("hidden");
  //Change text button thành thi lại
  submitElement.innerText = "Thi lại";
  quizContainerElement.classList.add("reset");
  backButtonElement.classList.add("hidden");
  resetState();
};

//Reset trạng thái của các var về trạng thái ban đầu
const resetState = () => {
  currentQuestionIndex = 0;
  selectedOption = null;
  score = 0;
};

submitElement.addEventListener("click", () => {
  //Check kết selected result
  // T/H có câu hỏi
  if (selectedOption) {
    if (selectedOption == quizData[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
      showScore();
    } else {
      prevSeletedOption = selectedOption;
      loadQuiz();
    }
  } else {
    //T/H thi lại
    loadQuiz();
  }
});

backButtonElement.addEventListener("click", () => {
  currentQuestionIndex -= 1;
  if (
    prevSeletedOption &&
    prevSeletedOption == quizData[currentQuestionIndex].answer
  ) {
    score -= 1;
  }
  loadQuiz();
});

// chỉ run 1 lần lúc khởi động app
loadQuiz();
