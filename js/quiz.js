/* ============================================
   PALMPAY AGGREGATOR TOWN HALL TRAINING GUIDE
   Knowledge Assessment (25 Questions)
   ============================================ */

const Quiz = {
  questions: [
    {
      type: 'multiple',
      question: 'What is the Aggregator Share for Card Withdrawal transactions under the new policy?',
      options: ['35%', '45%', '55%', '70%'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the charge cap for Transfer transactions?',
      options: ['₦15 - ₦20', '₦50 - ₦60', '₦80 - ₦100', '₦100 - ₦120'],
      correct: 0
    },
    {
      type: 'truefalse',
      question: 'Under the new policy, Aggregators earn fixed commissions like the old MMO model.',
      options: ['True', 'False'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the cost of the MF960 Android POS under the new policy?',
      options: ['₦40,000', '₦32,000', '₦25,000', '₦35,000'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'How many times higher is PalmPay income compared to other MMOs?',
      options: ['3.5x', '5.2x', '6.8x', '8.1x'],
      correct: 2
    },
    {
      type: 'multiple',
      question: 'What is the minimum daily Card transaction volume for a Quality Agent?',
      options: ['₦150,000', '₦220,000', '₦300,000', '₦360,000'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the expected monthly commission for a Quality Agent?',
      options: ['₦8,000+', '₦10,000+', '₦12,500+', '₦15,000+'],
      correct: 2
    },
    {
      type: 'multiple',
      question: 'What is the Aggregator Share for Pay With Transfer (PWT) transactions?',
      options: ['45%', '50%', '60%', '70%'],
      correct: 3
    },
    {
      type: 'truefalse',
      question: 'Under the new policy, you do NOT own the POS terminal.',
      options: ['True', 'False'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the charge cap for Card Withdrawal transactions?',
      options: ['₦50 - ₦70', '₦80 - ₦100', '₦100 - ₦120', '₦60 - ₦80'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the charge cap for Pay With Transfer (PWT) transactions?',
      options: ['₦50', '₦80', '₦100', '₦120'],
      correct: 2
    },
    {
      type: 'truefalse',
      question: 'The TA rate of 60% affects new policy profit sharing commissions.',
      options: ['True', 'False'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'If an agent is not interested in switching, what should you do?',
      options: ['Force them to switch', 'Unbind POS and retrieve it', 'Ignore them', 'Report to manager'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the first step in claiming an agent from the POS Pool?',
      options: ['Contact the agent', 'Search location', 'Open POS Pool', 'Claim the agent'],
      correct: 2
    },
    {
      type: 'multiple',
      question: 'What minimum PWT count should a Quality Agent have daily?',
      options: ['5+', '7+', '10+', '4+'],
      correct: 1
    },
    {
      type: 'truefalse',
      question: 'The Self Check feature tests Card Detection, Printing, Screen, Camera, and Network.',
      options: ['True', 'False'],
      correct: 0
    },
    {
      type: 'multiple',
      question: 'What is the minimum daily Transfer count for a Quality Agent?',
      options: ['3+', '4+', '5+', '6+'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What Aggregator role involves recovering dormant POS terminals?',
      options: ['Recruit agents', 'Deploy POS', 'Recover inactive POS', 'Drive TPV growth'],
      correct: 2
    },
    {
      type: 'truefalse',
      question: 'Commissions are settled on a D+1 (next day) basis.',
      options: ['True', 'False'],
      correct: 0
    },
    {
      type: 'multiple',
      question: 'What is the minimum daily PWT volume for a Quality Agent?',
      options: ['₦100,000', '₦120,000', '₦140,000', '₦160,000'],
      correct: 2
    },
    {
      type: 'multiple',
      question: 'If a POS is faulty, where should you escalate?',
      options: ['Another Aggregator', 'Service Center', 'The agent', 'PalmPay HQ'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'What is the Aggregator Share for Transfer transactions?',
      options: ['25%', '35%', '45%', '55%'],
      correct: 1
    },
    {
      type: 'multiple',
      question: 'How many Self Check steps are there?',
      options: ['2', '3', '4', '5'],
      correct: 1
    },
    {
      type: 'truefalse',
      question: 'The passing score for the Knowledge Assessment is 80%.',
      options: ['True', 'False'],
      correct: 0
    },
    {
      type: 'multiple',
      question: 'What is the minimum daily Transfer volume for a Quality Agent?',
      options: ['₦250,000', '₦300,000', '₦360,000', '₦400,000'],
      correct: 2
    }
  ],

  state: {
    currentQuestion: 0,
    answers: [],
    answered: false,
    completed: false,
    shuffledQuestions: []
  },

  init() {
    this.cacheDOM();
    this.bindEvents();
  },

  cacheDOM() {
    this.container = document.getElementById('quiz-container');
    this.intro = document.getElementById('quiz-intro');
    this.active = document.getElementById('quiz-active');
    this.results = document.getElementById('quiz-results');
    this.questionEl = document.getElementById('quiz-question');
    this.optionsEl = document.getElementById('quiz-options');
    this.feedbackEl = document.getElementById('quiz-feedback');
    this.progressFill = document.getElementById('quiz-progress-fill');
    this.counterEl = document.getElementById('quiz-counter');
    this.progressText = document.getElementById('quiz-progress-text');
    this.prevBtn = document.getElementById('quiz-prev');
    this.nextBtn = document.getElementById('quiz-next');
    this.scoreValue = document.getElementById('quiz-score-value');
    this.passStatus = document.getElementById('quiz-pass-status');
    this.correctCount = document.getElementById('quiz-correct-count');
    this.startBtn = document.getElementById('start-quiz');
    this.retryBtn = document.getElementById('quiz-retry');
    this.reviewBtn = document.getElementById('quiz-review');
  },

  bindEvents() {
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.startQuiz());
    }
    if (this.retryBtn) {
      this.retryBtn.addEventListener('click', () => this.resetQuiz());
    }
    if (this.reviewBtn) {
      this.reviewBtn.addEventListener('click', () => this.reviewAnswers());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextQuestion());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevQuestion());
    }
  },

  startQuiz() {
    this.state.shuffledQuestions = this.shuffleArray([...this.questions]);
    this.state.currentQuestion = 0;
    this.state.answers = new Array(this.questions.length).fill(null);
    this.state.answered = false;
    this.state.completed = false;

    this.intro.style.display = 'none';
    this.active.style.display = 'block';
    this.results.style.display = 'none';

    this.showQuestion();
  },

  showQuestion() {
    const q = this.state.shuffledQuestions[this.state.currentQuestion];
    const total = this.state.shuffledQuestions.length;
    const idx = this.state.currentQuestion;

    this.questionEl.textContent = q.question;
    this.counterEl.textContent = `Question ${idx + 1} of ${total}`;
    this.progressFill.style.width = `${((idx + 1) / total) * 100}%`;
    this.progressText.textContent = `${idx + 1}/${total}`;

    // Options
    this.optionsEl.innerHTML = q.options.map((opt, i) => {
      const selected = this.state.answers[idx] === i ? 'selected' : '';
      return `<button class="quiz-option ${selected}" data-index="${i}" ${this.state.answered ? 'disabled' : ''}>${opt}</button>`;
    }).join('');

    this.feedbackEl.style.display = 'none';

    // Prev/Next buttons
    this.prevBtn.disabled = idx === 0;
    this.nextBtn.textContent = idx === total - 1 ? 'Finish' : 'Next';

    // Re-bind option clicks
    this.optionsEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => this.selectAnswer(parseInt(opt.dataset.index)));
    });

    // Restore previous answer state
    if (this.state.answers[idx] !== null && this.state.answered) {
      this.lockAnswer(idx);
    }
  },

  selectAnswer(index) {
    if (this.state.answered) return;
    const idx = this.state.currentQuestion;
    const q = this.state.shuffledQuestions[idx];

    this.state.answers[idx] = index;
    this.state.answered = true;
    this.nextBtn.disabled = false;

    // Highlight selected
    this.optionsEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.disabled = true;
      const optIdx = parseInt(opt.dataset.index);
      if (optIdx === q.correct) {
        opt.classList.add('correct');
      } else if (optIdx === index && index !== q.correct) {
        opt.classList.add('wrong');
      }
      if (optIdx === index) {
        opt.classList.add('selected');
      }
    });

    // Show feedback
    const isCorrect = index === q.correct;
    this.feedbackEl.textContent = isCorrect ? '✓ Correct!' : '✕ Incorrect. The correct answer was: ' + q.options[q.correct];
    this.feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    this.feedbackEl.style.display = 'block';
  },

  lockAnswer(idx) {
    const q = this.state.shuffledQuestions[idx];
    const answer = this.state.answers[idx];
    if (answer === null) return;

    this.optionsEl.querySelectorAll('.quiz-option').forEach(opt => {
      opt.disabled = true;
      const optIdx = parseInt(opt.dataset.index);
      if (optIdx === q.correct) {
        opt.classList.add('correct');
      } else if (optIdx === answer && answer !== q.correct) {
        opt.classList.add('wrong');
      }
    });
  },

  nextQuestion() {
    const total = this.state.shuffledQuestions.length;

    if (this.state.currentQuestion === total - 1) {
      // Check all questions answered before finishing
      const unanswered = this.state.answers.filter(a => a === null).length;
      if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
          return;
        }
      }
      this.finishQuiz();
      return;
    }

    this.state.currentQuestion++;
    this.state.answered = false;
    this.showQuestion();
  },

  prevQuestion() {
    if (this.state.currentQuestion === 0) return;
    this.state.currentQuestion--;
    this.state.answered = this.state.answers[this.state.currentQuestion] !== null;
    this.showQuestion();
  },

  finishQuiz() {
    const total = this.state.shuffledQuestions.length;
    const correct = this.state.answers.filter((a, i) => a === this.state.shuffledQuestions[i].correct).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= 80;

    this.state.completed = true;
    App.state.quizScore = score;
    App.saveState();

    this.active.style.display = 'none';
    this.results.style.display = 'block';

    this.scoreValue.textContent = score + '%';
    this.passStatus.textContent = passed ? 'Congratulations! You passed the assessment!' : 'You did not pass. A score of 80% is required.';
    this.passStatus.style.color = passed ? 'var(--success)' : 'var(--danger)';
    this.correctCount.textContent = `You answered ${correct} out of ${total} questions correctly.`;

    // Update completion page score
    const completionScore = document.getElementById('completion-quiz-score');
    if (completionScore) {
      completionScore.textContent = score + '%';
    }

    // Update dashboard
    App.updateDashboard();
  },

  resetQuiz() {
    this.state.currentQuestion = 0;
    this.state.answers = new Array(this.questions.length).fill(null);
    this.state.answered = false;
    this.state.completed = false;

    this.results.style.display = 'none';
    this.intro.style.display = 'block';
  },

  reviewAnswers() {
    this.state.currentQuestion = 0;
    this.state.answered = true;
    this.results.style.display = 'none';
    this.active.style.display = 'block';
    this.showQuestion();
  },

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};
