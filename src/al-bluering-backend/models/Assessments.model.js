module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        description: String,
        isAnswerVisible: {
            type: Boolean,
            default: false,
            required: true
        },
        questions: [
            {
                id: Number,
                question: String,
                choices: [
                    {
                        id: Number,
                        choice: String
                    }
                ],
                correctAnswer: Number
            }
        ],
        name: {
            type: String,
            required: true
        },
        lastModified: {
            type: Date,
            default: new Date(),
            required: true
        }
      },
      { timestamps: true }
    );
  
    schema.methods = {
        view() {
            return {
                timeLimit: this.timeLimit,
                description: this.description,
                isAnswerVisible: this.isAnswerVisible,
                questions: this.questions,
                name: this.name,
                lastModified: this.lastModified
            };
        }
    };
  
    const Assessments = mongoose.model("Assessments", schema);
    return Assessments;
  };
  