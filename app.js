const { createApp } = Vue; 

        createApp({
            data() {
                return {
                    isStartOfGame: true,
                    gameHasStarted: false,
                    gameHasEnded: false,
                    results: [],
                    index: 0,
                    score: 0,
                    levels: ["Easy", "Medium", "Hard"],
                    level: "",
                    questions: []
                }
            },
            methods: {
                // Start game
                startGame(level) {

                    // Hide start section
                    this.isStartOfGame = false

                    // Display gameplay
                    this.gameHasStarted = true

                    // Filter questions to only contain corresponding levels questions
                    this.level = level.toLowerCase()
                    this.results = this.results.results
                    this.questions = this.results.filter(function(question) {
                        return question.difficulty === level.toLowerCase()
                    })
                },
                // Reload page to retart game
                restartGame() {
                        window.location.reload()
                },
                // Increment question index and display end section
                nextQuestionAndDisplayEnd() {
                    
                    // Display end page if questions are finshed
                    if (this.index == 9) {
                        this.gameHasStarted = false
                        this.gameHasEnded = true
                    // Move to next question
                    } else {
                        this.index++
                    }
                },
                // Check is answer is correct
                verifyAnswer(question, answer) {
                    
                    // Increment score if correct
                    if (answer ==  question.correct_answer) this.score ++

                    // Move to next question
                    this.nextQuestionAndDisplayEnd()
                }
            },
            // Get questions
            async created() {
                const res = await fetch('https://opentdb.com/api.php?amount=50&type=multiple')
                // Format in JSON
                const data = await res.json()
                this.results = data
            }
        }).mount('#app')