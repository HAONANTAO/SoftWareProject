import React, { useEffect, useState } from "react";
import { Input, Radio, Checkbox, Button, Select } from "antd";

function CreateQuestionsForm(props) {
  const { getQuestions, defaultQuestionList } = props;

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [questionList, setQuestionList] = useState(defaultQuestionList);
  const [disableList, setDisableList] = useState([true, true, true, true]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionNum, setQuestionNum] = useState(defaultQuestionList.length);
  const [curNum, setCurNum] = useState(1);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getQuestions(questionList);

    if (curNum > questionNum) {
      setAnswers(["", "", "", ""]);
      setCorrectAnswer(0);
      setDisableList([true, true, true, true]);
      setQuestionStatement("");
    } else {
      const tempList = [0, 0, 0, 0];
      const newDisableList = tempList.map((_, index) => {
        return questionList[curNum - 1].choices[index] === undefined;
      });

      const newAnswers = tempList.map((_, index) => {
        return questionList[curNum - 1].choices[index] === undefined
          ? ""
          : questionList[curNum - 1].choices[index].choice;
      });

      setAnswers(newAnswers);
      setCorrectAnswer(questionList[curNum - 1].correctAnswer);
      setDisableList(newDisableList);
      setQuestionStatement(questionList[curNum - 1].question);
    }
  }, [curNum, questionList, questionNum]);

  const onChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleCheckBox = (num) => {
    const nextDisableList = disableList.map((c, i) => {
      if (i === num) {
        return !c;
      } else {
        return c;
      }
    });
    setDisableList(nextDisableList);
  };

  const handleInputChoice = (e, num) => {
    console.log("input: ", e.target.value, num);
    const nextAnswers = answers.map((c, i) => {
      if (i === num - 1) {
        return e.target.value;
      } else {
        return c;
      }
    });
    setAnswers(nextAnswers);
  };

  const handleSaveQuestion = () => {
    let choices = answers.map((item, index) => {
      if (disableList[index] === false) {
        return { id: index + 1, choice: item };
      } else {
        return undefined;
      }
    });
    choices = choices.filter((item) => item != undefined);

    const newQuestion = {
      id: curNum,
      question: questionStatement,
      correctAnswer: correctAnswer,
      choices: choices,
    };

    if (curNum > questionNum) {
      setQuestionList([...questionList, newQuestion]);
      setQuestionNum(questionNum + 1);
    } else {
      const nextQuestionList = questionList.map((c, i) => {
        if (i === curNum - 1) {
          return newQuestion;
        } else {
          return c;
        }
      });
      setQuestionList(nextQuestionList);
    }
    console.log("save:", questionList);
    setSaved(true);
  };

  const handleCreateNewQuestion = () => {
    setSaved(false);
    setCurNum(questionNum + 1);
  };

  const handleChangeQuestionNum = (e) => {
    setSaved(false);
    setCurNum(e);
  };

  const handleChangeStatement = (e) => {
    setQuestionStatement(e.target.value);
  };

  const generateQuestionsNumOptions = () => {
    let result = [];
    for (let i = 0; i <= questionNum; i++) {
      result[i] = { label: i + 1, value: i + 1 };
    }
    return result;
  };

  return (
    <div>
      <div>
        Question{" "}
        <span>
          <Select
            value={curNum}
            options={generateQuestionsNumOptions()}
            onChange={(e) => handleChangeQuestionNum(e)}
          />
        </span>
      </div>

      <p>Question Statement: </p>
      <Input
        placeholder="Input question statement."
        value={questionStatement}
        onChange={(e) => handleChangeStatement(e)}
      ></Input>
      <Radio.Group onChange={onChange} value={correctAnswer}>
        <Checkbox
          checked={!disableList[0]}
          onClick={() => {
            handleCheckBox(0);
          }}
        >
          <Radio value={1} disabled={disableList[0]}>
            <span>Choice 1: </span>
            <Input
              disabled={disableList[0]}
              value={answers[0]}
              onChange={(e) => handleInputChoice(e, 1)}
            ></Input>
          </Radio>
        </Checkbox>
        <Checkbox
          checked={!disableList[1]}
          onClick={() => {
            handleCheckBox(1);
          }}
        >
          <Radio value={2} disabled={disableList[1]}>
            <span>Choice 2: </span>
            <Input
              disabled={disableList[1]}
              value={answers[1]}
              onChange={(e) => handleInputChoice(e, 2)}
            ></Input>
          </Radio>
        </Checkbox>
        <Checkbox
          checked={!disableList[2]}
          onClick={() => {
            handleCheckBox(2);
          }}
        >
          <Radio value={3} disabled={disableList[2]}>
            <span>Choice 3: </span>
            <Input
              disabled={disableList[2]}
              value={answers[2]}
              onChange={(e) => handleInputChoice(e, 3)}
            ></Input>
          </Radio>
        </Checkbox>
        <Checkbox
          checked={!disableList[3]}
          onClick={() => {
            handleCheckBox(3);
          }}
        >
          <Radio value={4} disabled={disableList[3]}>
            <span>Choice 4: </span>
            <Input
              disabled={disableList[3]}
              value={answers[3]}
              onChange={(e) => handleInputChoice(e, 4)}
            ></Input>
          </Radio>
        </Checkbox>

        {saved ? (
          <Button
            onClick={() => handleCreateNewQuestion()}
            disabled={correctAnswer === 0}
          >
            Create New
          </Button>
        ) : (
          <Button
            onClick={() => handleSaveQuestion()}
            disabled={correctAnswer === 0}
          >
            Save Question
          </Button>
        )}
      </Radio.Group>
    </div>
  );
}

export default CreateQuestionsForm;
