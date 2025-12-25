import React, { useEffect, useState } from "react";
import { Button, Progress, Radio, Space, Spin, Modal } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  WarningOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../config/supabaseClient";

interface Question {
  id: string;
  question: string;
  topic_id: string;
}

interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  /* ---------------- FULLSCREEN ---------------- */

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
  };

  const handleFullscreenChange = () => {
    const fs = !!document.fullscreenElement;
    setIsFullscreen(fs);

    if (!fs && quizStarted && !showResults) {
      setShowWarning(true);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [quizStarted, showResults]);

  /* ---------------- DATA FETCH ---------------- */

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);

    const { data: qData } = await supabase
      .from("questions")
      .select("*")
      .eq("topic_id", id);

    if (!qData || qData.length === 0) {
      setLoading(false);
      return;
    }

    setQuestions(qData);

    const ids = qData.map((q) => q.id);
    const { data: oData } = await supabase
      .from("options")
      .select("*")
      .in("question_id", ids);

    if (oData) setOptions(oData);

    setLoading(false);
  };

  /* ---------------- QUIZ LOGIC ---------------- */

  const currentQuestion = questions[currentIndex];
  const currentOptions = options.filter(
    (o) => o.question_id === currentQuestion?.id
  );

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  const handleSubmit = async () => {
    let correct = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      const opt = options.find((o) => o.id === selected);
      if (opt?.is_correct) correct++;
    });

    setScore(correct);
    setShowResults(true);
    exitFullscreen();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("progress").insert({
        user_id: user.id,
        topic_id: id,
        score: correct,
      });
    }
  };

  /* ---------------- START SCREEN ---------------- */

  if (!quizStarted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <Button
          size="large"
          icon={<FullscreenOutlined />}
          onClick={() => {
            enterFullscreen();
            setQuizStarted(true);
          }}
          className="bg-white text-black font-bold text-xl px-12 py-6"
        >
          START QUIZ
        </Button>
      </div>
    );
  }

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <Spin size="large" className="mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  /* ---------------- RESULT SCREEN ---------------- */

  if (showResults) {
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= 70;

    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <TrophyOutlined
            className={`text-7xl ${
              passed ? "text-yellow-400" : "text-gray-400"
            }`}
          />
          <h1 className="text-4xl font-bold mt-4">
            {passed ? "PASSED" : "FAILED"}
          </h1>
          <p className="text-2xl mt-2">
            {score}/{questions.length} ({percent}%)
          </p>
          <Button
            size="large"
            onClick={() => navigate("/topics")}
            className="mt-6 bg-white text-black font-bold"
          >
            Back to Topics
          </Button>
        </div>
      </div>
    );
  }

  /* ---------------- QUIZ UI ---------------- */

  return (
    <div className="h-screen w-screen bg-black text-white p-10">
      {/* Fullscreen Warning */}
      <Modal open={showWarning} footer={null} closable={false} centered>
        <div className="text-center">
          <WarningOutlined className="text-5xl text-red-500 mb-4" />
          <p className="mb-4">Quiz cancelled fullscreen is required.</p>
          <Space>
            <Button danger onClick={() => navigate("/topics")}>
              Exit
            </Button>
          </Space>
        </div>
      </Modal>

      <Progress
        percent={((currentIndex + 1) / questions.length) * 100}
        showInfo={false}
        strokeColor="#fff"
      />

      <h2 className="text-3xl font-bold mt-8">{currentQuestion.question}</h2>

      <Radio.Group
        value={answers[currentQuestion.id]}
        onChange={(e) => handleSelect(e.target.value)}
        className="mt-6 w-full"
      >
        <Space direction="vertical" className="w-full text-white">
          {currentOptions.map((opt) => (
            <Radio
              key={opt.id}
              value={opt.id}
              className="!text-white !text-2xl !pt-5"
            >
              {opt.option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      <div className="flex justify-between mt-10">
        <Button
          icon={<ArrowLeftOutlined />}
          disabled={currentIndex === 0}
          onClick={handlePrev}
        >
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            icon={<CheckCircleOutlined />}
            disabled={!answers[currentQuestion.id]}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            icon={<ArrowRightOutlined />}
            disabled={!answers[currentQuestion.id]}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
