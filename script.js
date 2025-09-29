document.addEventListener('DOMContentLoaded', () => {
    // Input Section Elements
    const instituteNameInput = document.getElementById('instituteNameInput');
    const examNameInput = document.getElementById('examNameInput');
    const questionInput = document.getElementById('questionInput');
    const generateButton = document.getElementById('generateButton');
    const printButton = document.getElementById('printButton');

    // Paper Preview Elements
    const paperInstituteName = document.getElementById('paperInstituteName');
    const paperExamName = document.getElementById('paperExamName');
    const mainContainer = document.getElementById('question-paper-main');

    // --- HEADING PERSISTENCE ---

    // Function to load saved headers from localStorage
    function loadHeaders() {
        const savedInstitute = localStorage.getItem('instituteName') || 'Rajasthan High Court, Jodhpur';
        const savedExam = localStorage.getItem('examName') || 'Assistant Stamp Reporter Exam-2025';

        instituteNameInput.value = savedInstitute;
        paperInstituteName.textContent = savedInstitute;

        examNameInput.value = savedExam;
        paperExamName.textContent = savedExam;
    }

    // Load headers when the page loads
    loadHeaders();

    // Add event listeners to update headers and save to localStorage
    instituteNameInput.addEventListener('input', () => {
        paperInstituteName.textContent = instituteNameInput.value;
        localStorage.setItem('instituteName', instituteNameInput.value);
    });

    examNameInput.addEventListener('input', () => {
        paperExamName.textContent = examNameInput.value;
        localStorage.setItem('examName', examNameInput.value);
    });


    // --- QUESTION GENERATION ---

    generateButton.addEventListener('click', function() {
        const inputText = questionInput.value.trim();
        mainContainer.innerHTML = '';
        printButton.disabled = true;

        if (inputText === '') {
            alert('Please enter at least one question.');
            return;
        }

        const questions = inputText.split('..').filter(q => q.trim() !== '');

        questions.forEach(q => {
            const questionText = q.trim();
            let marks = '';
            const marksMatch = questionText.match(/\((\d+)\)$/);
            let cleanQuestionText = questionText;
            
            if (marksMatch) {
                marks = marksMatch[0];
                cleanQuestionText = questionText.substring(0, questionText.lastIndexOf('(')).trim();
            }

            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';

            const questionP = document.createElement('p');
            questionP.className = 'question';
            questionP.textContent = cleanQuestionText;
            
            const marksSpan = document.createElement('span');
            marksSpan.className = 'marks';
            marksSpan.textContent = marks;

            questionBlock.appendChild(questionP);
            questionBlock.appendChild(marksSpan);
            mainContainer.appendChild(questionBlock);
        });

        if (questions.length > 0) {
            printButton.disabled = false;
        }
    });

    printButton.addEventListener('click', () => {
        window.print();
    });
});
