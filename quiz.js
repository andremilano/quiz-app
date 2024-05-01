// Ambil elemen dari HTML
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const homeButton = document.getElementById('homeButton');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Ambil data soal dari file JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;

        // Fungsi untuk memuat pertanyaan ke layar
        function loadQuestion(questionIndex) {
            const currentQuestion = questions[questionIndex];
            questionElement.textContent = currentQuestion.question;

            // Kosongkan pilihan sebelumnya
            optionsElement.innerHTML = '';

            // Tambahkan pilihan jawaban
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('block', 'w-full', 'p-2', 'my-1', 'rounded-lg', 'border', 'text-left', 'border-[#BA955C]', 'hover:bg-blue-200', 'focus:outline-none');
                button.addEventListener('click', () => selectOption(index));
                optionsElement.appendChild(button);
            });
        }

        // Fungsi untuk memilih jawaban
        function selectOption(optionIndex) {
            if (answered) return; // Jangan izinkan pemilihan setelah jawaban diberikan
            const currentQuestion = questions[currentQuestionIndex];
            answered = true;
            if (optionIndex === currentQuestion.correctIndex) {
                score++;
                optionsElement.childNodes[optionIndex].classList.add('bg-green-200');
            } else {
                optionsElement.childNodes[optionIndex].classList.add('bg-red-200');
                optionsElement.childNodes[currentQuestion.correctIndex].classList.add('bg-green-200');
            }
        }
        // Fungsi untuk me-restart kuis
        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion(currentQuestionIndex);
            nextButton.style.display = 'inline-block';
        }

        // Fungsi untuk kembali ke halaman utama
        function goToHome() {
            window.location.href = 'index.html'; // Ganti index.html dengan halaman utama Anda
        }

        // Tambahkan event listener ke tombol Restart dan Home
        restartButton.addEventListener('click', restartQuiz);
        homeButton.addEventListener('click', goToHome);

        // Fungsi untuk menampilkan pertanyaan berikutnya
        function nextQuestion() {
            if (!answered) return; // Jangan izinkan lanjut jika jawaban belum diberikan
            answered = false;
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                // Jika tidak ada pertanyaan lagi, tampilkan skor
                questionElement.textContent = `Quiz Selesai! Skor Anda: ${score}/${questions.length}`;
                optionsElement.innerHTML = '';
                nextButton.style.display = 'none';
            }
        }

        // Tambahkan event listener ke tombol Next
        nextButton.addEventListener('click', nextQuestion);

        // Mulai dengan memuat pertanyaan pertama
        loadQuestion(currentQuestionIndex);
    });
