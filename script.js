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
    "Для создания гиперссылок используется тег <a>. Ссылка в нем указывается атрибутом href",
    "Атрибуты тегов всегда прописываются внутри скобок тега <...атрибут...>",
    "Атрибут href используется для указания URL в теге <a>. <a href\"...\"></a>",
    "Тег <title> используется для определения заголовка документа.",
    "Первым всегда идет !DOCTYPE, дальше html-head-body.",
    "Тег <h1> используется для самого крупного заголовка.",
    "Тег <p> используется для создания абзаца.",
    "Тег <b> используется для выделения текста жирным шрифтом.",
    "Тег <span> можно вложить в тег <p>, так как <span> является строчным элементом, а <p> блочным.",
    "Атрибут src используется для указания пути к изображению в теге <img>. Можно запомнить как SouRCe.",
    "Тег <span> является строчным элементом.",
    "Тег <div> используется для создания контейнера, в который можно вложить другие теги.",
    "Тег <ol> используется для создания нумерованного списка.",
    "Атрибут target=\"_blank\" используется для открытия ссылки в новой вкладке.",
    "Атрибут id используется для создания якоря на странице.",
    "Тег <form> используется для создания формы.",
    "Тег <tr> используется для создания строки таблицы.",
    "В этом тесте не так важен результат, главное, что именно ты все равно большой молодец. Если что-то не получается - мы будем пробовать снова."
];

const userAnswers = [];

const results = [
    new Result("Ты большой молодец, но нужно повторить некоторые темы", 0),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко повторить", 2),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко закрепить некоторые темы и будет супер", 4),
    new Result("Ты большой молодец, все почти идеально, нужно немножечко закрепить некоторые темы", 6)
];

const questions = [
    new Question("Какие есть теги?", [
        new Answer("Парные и непарные", 1),
        new Answer("Блочные и строчные", 0),
        new Answer("Высокие и низкие", 0),
        new Answer("Асинхронные и синхронные", 0)
    ]),
    new Question("Какой тег используется для создания гиперссылки?", [
        new Answer("&lt;a&gt;", 1),
        new Answer("&lt;link&gt;", 0),
        new Answer("&lt;href&gt;", 0),
        new Answer("&lt;url&gt;", 0)
    ]),
    new Question("Где прописывается атрибут?", [
        new Answer("Внутри скобочек", 1),
        new Answer("Между открывающимся и закрывающимся тегом", 0),
        new Answer("link", 0),
        new Answer("url", 0)
    ]),
    new Question("Какой атрибут используется для указания URL в теге &lt;a&gt;?", [
        new Answer("src", 0),
        new Answer("href", 1),
        new Answer("link", 0),
        new Answer("url", 0)
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
    new Question("Какой из следующих тегов можно вложить в тег &lt;p&gt;?", [
        new Answer("&lt;div&gt;", 0),
        new Answer("&lt;span&gt;", 1),
        new Answer("&lt;section&gt;", 0),
        new Answer("&lt;header&gt;", 0)
    ]),
    new Question("Какой атрибут используется для указания пути к изображению в теге &lt;img&gt;?", [
        new Answer("src", 1),
        new Answer("href", 0),
        new Answer("path", 0),
        new Answer("link", 0)
    ]),
    new Question("Какой из следующих тегов является строчным элементом?", [
        new Answer("&lt;div&gt;", 0),
        new Answer("&lt;span&gt;", 1),
        new Answer("&lt;section&gt;", 0),
        new Answer("&lt;article&gt;", 0)
    ]),
    new Question("Какой тег используется для создания контейнера, в который можно вложить другие теги?", [
        new Answer("&lt;div&gt;", 1),
        new Answer("&lt;span&gt;", 0),
        new Answer("&lt;p&gt;", 0),
        new Answer("&lt;header&gt;", 0)
    ]),
    new Question("Какой тег используется для создания нумерованного списка?", [
        new Answer("&lt;ul&gt;", 0),
        new Answer("&lt;ol&gt;", 1),
        new Answer("&lt;li&gt;", 0),
        new Answer("&lt;dl&gt;", 0)
    ]),
    
    new Question("Какой атрибут используется для открытия ссылки в новой вкладке?", [
        new Answer("target=&quot;_blank&quot;", 1),
        new Answer("target=&quot;_self&quot;", 0),
        new Answer("target=&quot;_parent&quot;", 0),
        new Answer("target=&quot;_top&quot;", 0)
    ]),
    new Question("Какой атрибут используется для создания якоря на странице?", [
        new Answer("id", 1),
        new Answer("name", 0),
        new Answer("href", 0),
        new Answer("anchor", 0)
    ]),
    new Question("Какой тег используется для создания формы?", [
        new Answer("&lt;form&gt;", 1),
        new Answer("&lt;input&gt;", 0),
        new Answer("&lt;textarea&gt;", 0),
        new Answer("&lt;button&gt;", 0)
    ]),
    new Question("Какой тег используется для создания строки таблицы?", [
        new Answer("&lt;table&gt;", 0),
        new Answer("&lt;tr&gt;", 1),
        new Answer("&lt;td&gt;", 0),
        new Answer("&lt;th&gt;", 0)
    ]),
    new Question("Как я должен пройти этот тест?", [
        new Answer("Идеально", 1),
        new Answer("С парой ошибок", 1),
        new Answer("С большим количеством ошибок", 1),
        new Answer("Со всеми неправильными ответами", 1)
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