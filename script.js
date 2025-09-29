document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const printButton = document.getElementById('printButton');
    const questionInput = document.getElementById('questionInput');
    const mainContainer = document.getElementById('question-paper-main');

    generateButton.addEventListener('click', function() {
        const inputText = questionInput.value.trim();

        // Clear previous questions
        mainContainer.innerHTML = '';
        printButton.disabled = true; // Disable print button on new generation

        if (inputText === '') {
            alert('Please enter at least one question.');
            return;
        }

        // Split the input text into questions using ".." as the delimiter
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

        // Enable the print button if questions were generated
        if (questions.length > 0) {
            printButton.disabled = false;
        }
    });

    printButton.addEventListener('click', function() {
        // Trigger the browser's print functionality
        window.print();
    });
});