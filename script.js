const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz {
    constructor(type, questions, results) {
        this.type = type;
        this.questions = questions;
        this.results = results;
        this.score = 0;
        this.result = 0;
        this.current = 0;
    }

    Click(index) {
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;
        if (value >= 1) {
            correct = index;
        } else {
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();
        return correct;
    }

    Next() {
        this.current++;
        if (this.current >= this.questions.length) {
            this.End();
        }
    }

    End() {
        for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    Check(value) {
        return this.value <= value;
    }
}

const explanations = [
    "Есть два вида тегов. Парные и непарные. У парных всегда есть открывающий и закрывающий тег, а непарные существуют сами по себе, по типу тега br",
    "Интернет - всемирная паутина, связанных между собой компьютеров",
    "Вирус может запускаться произвольно и клонировать себя в другие файлы",
    "Необходимо использовать сложные пароли",
    "Тег <title> используется для определения заголовка документа.",
    "Первым всегда идет !DOCTYPE, дальше html-head-body.",
    "Тег <h1> используется для самого крупного заголовка.",
    "Тег <p> используется для создания абзаца.",
    "Тег <b> используется для выделения текста жирным шрифтом.",
    "Сервер - ПК или программа, которая предоставляет информацию клиенту",
    "Последняя буква S отвечает за безопастность сохранения ваших данных на этом сайте",
    "Вирус работал каждый год 26 апреля"
];

const userAnswers = [];

const results = [
    new Result("Ты большой молодец, но нужно повторить некоторые темы", 0),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко повторить", 2),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко закрепить некоторые темы и будет супер", 4),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко закрепить некоторые темы", 6)
];

const questions = [
    new Question("Какие есть теги? (html)", [
        new Answer("Парные и непарные", 1),
        new Answer("Блочные и строчные", 0),
        new Answer("Высокие и низкие", 0),
        new Answer("Асинхронные и синхронные", 0)
    ]),
    new Question("Что такое Интернет?", [
        new Answer("Всемирная паутина", 1),
        new Answer("Сеть компьютеров", 0),
        new Answer("Сеть коммутаторов и серверов", 0),
        new Answer("Огромный объем информации", 0)
    ]),
    new Question("Отличительными способностями компьютерно вируса являются?", [
        new Answer("Способность к самостоятельному запуску и многократному копирования кода", 1),
        new Answer("Значительный объем вируса", 0),
        new Answer("Необходимость запуска со стороны пользователя", 0),
        new Answer("Легкость распознавания", 0)
    ]),
    new Question("Для защиты от несанкционированного доступа к программам и данным используются?", [
        new Answer("Коды", 0),
        new Answer("Пароли", 1),
        new Answer("Ярлыки", 0),
        new Answer("Анкеты", 0)
    ]),
    new Question("Какой тег используется для определения заголовка документа?", [
        new Answer("&lt;header&gt;", 0),
        new Answer("&lt;title&gt;", 1),
        new Answer("&lt;head&gt;", 0),
        new Answer("&lt;meta&gt;", 0)
    ]),
    new Question("Какой элемент идет первым в структуре HTML документов?", [
        new Answer("&lt;!DOCTYPE&gt;", 1),
        new Answer("&lt;html&gt;", 0),
        new Answer("&lt;head&gt;", 0),
        new Answer("&lt;body&gt;", 0)
    ]),
    new Question("Какой тег используется для самого крупного заголовка?", [
        new Answer("&lt;h1&gt;", 1),
        new Answer("&lt;h2&gt;", 0),
        new Answer("&lt;h3&gt;", 0),
        new Answer("&lt;h4&gt;", 0)
    ]),
    new Question("Какой тег используется для создания абзаца?", [
        new Answer("&lt;div&gt;", 0),
        new Answer("&lt;span&gt;", 0),
        new Answer("&lt;p&gt;", 1),
        new Answer("&lt;section&gt;", 0)
    ]),
    new Question("Какой тег используется для выделения текста жирным шрифтом?", [
        new Answer("&lt;i&gt;", 0),
        new Answer("&lt;b&gt;", 1),
        new Answer("&lt;u&gt;", 0),
        new Answer("&lt;em&gt;", 0)
    ]),
    new Question("Что такое сервер?", [
        new Answer("Место для хранения данных", 0),
        new Answer("Компьютер или программа, которая предоставляет информацию клиенту", 1),
        new Answer("Телефон", 0),
        new Answer("Сайт", 0)
    ]),
    new Question("За что отвечает последняяя буква s в протоколе https?", [
        new Answer("Ваши данные на этом сайте будут в безопасности", 1),
        new Answer("Ваши данные на этом сайте не будут в безопасности", 0),
        new Answer("Ваши данные на этом сайте не будут сохраняться", 0),
        new Answer("Вы не сможете зайти на данный сайт", 0)
    ]),
    new Question("Как назывался вирус, разработанный в 1997 году и работающий раз в год?", [
        new Answer("Опасный", 0),
        new Answer("Чернобыль", 1),
        new Answer("Майнер", 0),
        new Answer("Крипер", 0)
    ])
];



const quiz = new Quiz(1, questions, results);

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    Update();
});

function Update() {
    console.log("Функция Update() вызвана");
    if (quiz.current < quiz.questions.length) {
        headElem.innerHTML = quiz.questions[quiz.current].text;
        buttonsElem.innerHTML = "";

        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";
            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
            btn.setAttribute("index", i);
            buttonsElem.appendChild(btn);
        }

        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
        Init();
    } else {
        ShowResults();
    }
}



function Init() {
    console.log("Функция Init() вызвана");
    let btns = document.getElementsByClassName("button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            Click(e.target.getAttribute("index"));
            createRipple(e);
        });
    }
}

function Click(index) {
    console.log("Функция Click() вызвана с индексом: " + index);
    let correct = quiz.Click(index);
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        if (!btns[i].classList.contains("next-button")) {
            btns[i].className = "button button_passive";
            btns[i].disabled = true;
    }}

    if (quiz.type == 1) {
        if (correct >= 0) {
            btns[correct].className = "button button_correct";
        }

        if (index != correct) {
            btns[index].className = "button button_wrong";
        }
    } else {
        btns[index].className = "button button_correct";
    }

    userAnswers.push({
        question: quiz.questions[quiz.current - 1].text,
        selected: quiz.questions[quiz.current - 1].answers[index].text,
        correct: correct >= 0 ? quiz.questions[quiz.current - 1].answers[correct].text : "Нет правильного ответа"
    })

    // Показать объяснение и кнопку "Далее"
    document.getElementById("explanation-text").innerText = explanations[quiz.current - 1];
    document.getElementById("explanation").style.display = "block";
    document.getElementById("next-button").style.display = "block";
    document.getElementById("next-button").onclick = function() {
        document.getElementById("explanation").style.display = "none";
        Update();
    };
    document.getElementById("explanation").scrollIntoView({ behavior: 'smooth' });
}

function ShowResults() {
    document.getElementById("results").style.display = "block";
    document.getElementById("score").innerText = "Ваши очки: " + quiz.score;

    const answersList = document.getElementById("answers");
    answersList.innerHTML = "";

    userAnswers.forEach(answer => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong style="color: #fff; padding: 0px; font-size: 10px; ">Вопрос:</strong> <span style="font-size: 10px; padding: 0px; "> ${answer.question} </span><br>
                              <strong style="color: rgb(251, 153, 153); padding: 0px; font-size: 10px; ">Ваш ответ:</strong><span style="font-size: 10px; padding: 0px; ">${answer.selected}</span> <br>
                              <strong style="color: #5EB97D; padding: 0px;  font-size: 10px; ">Правильный ответ:</strong><span style="font-size: 10px; padding: 0px; ">${answer.correct}</span> <br>`;
        answersList.appendChild(listItem);
    });
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("mousemove", function(event) {
    createCursorTrail(event);
});

// Создаем элемент для следа за курсором
const cursorLine = document.createElement("div");
cursorLine.className = "cursor-line";
document.body.appendChild(cursorLine);

document.addEventListener("mousemove", function(event) {
    cursorLine.style.left = `${event.clientX}px`;
    cursorLine.style.top = `${event.clientY}px`;
});

function enableScrolling() {
    document.body.style.overflow = 'auto';
}