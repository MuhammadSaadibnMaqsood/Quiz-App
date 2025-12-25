import React, { useEffect, useState } from "react";
import { Button, Spin, Empty } from "antd";
import { 
  TrophyOutlined, 
  LockOutlined, 
  CheckCircleOutlined,
  ThunderboltOutlined,
  FireOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Topic {
  id: string;
  title: string;
  description: string;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userCompletedTopics, setUserCompletedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([getTopics(), getUserProgress()]);
    setLoading(false);
  };

  const getUserProgress = async () => {
    try {
      // Import supabase dynamically
      const { default: supabase } = await import("../../config/supabaseClient");
      
      const { data, error } = await supabase
        .from("progress")
        .select("topic_id");

      if (error) {
        console.error("Error fetching progress:", error);
        return;
      }

      if (data) {
        const completedIds = data.map((item: any) => item.topic_id);
        setUserCompletedTopics(completedIds);
      }
    } catch (error) {
      console.error("Error in getUserProgress:", error);
    }
  };

  const getTopics = async () => {
    try {
      // Import supabase dynamically
      const { default: supabase } = await import("../../config/supabaseClient");
      
      const { data, error } = await supabase
        .from("topics")
        .select("*");

      if (error) {
        console.error("Error fetching topics:", error);
        return;
      }

      if (data) {
        setTopics(data);
      }
    } catch (error) {
      console.error("Error in getTopics:", error);
    }
  };

  const handleTopicClick = (topicId: string) => {
    console.log("Navigate to quiz:", topicId);
    // Add navigation logic here
    navigate(`/quiz/${topicId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center">
          <Spin size="large" className="mb-4" />
          <p className="text-white text-lg">Loading Topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-6 mb-8">
            <div className="relative">
              <ThunderboltOutlined className="text-6xl text-white animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-white opacity-30"></div>
            </div>
            <div className="relative">
              <FireOutlined className="text-6xl text-white" />
              <div className="absolute inset-0 blur-xl bg-white opacity-30"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            CHOOSE YOUR
            <span className="block mt-2">ARENA</span>
          </h1>
          <div className="h-1 w-40 mx-auto bg-white mb-6"></div>
          <p className="text-xl text-gray-400">
            Select a topic and prove your mastery
          </p>
        </div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <div className="text-center py-20">
            <Empty
              description={
                <span className="text-gray-400 text-lg">
                  No topics available yet
                </span>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => {
              const isCompleted = userCompletedTopics.includes(topic.id);
              
              return (
                <div
                  key={topic.id}
                  className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 ${
                    isCompleted
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-white/10 hover:border-white/30 hover:scale-105 cursor-pointer"
                  }`}
                  onClick={() => !isCompleted && handleTopicClick(topic.id)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isCompleted ? (
                      <div className="bg-green-500/20 border border-green-500/50 px-3 py-1 flex items-center gap-2">
                        <CheckCircleOutlined className="text-green-400 text-lg" />
                        <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                          Completed
                        </span>
                      </div>
                    ) : (
                      <div className="bg-white/10 border border-white/30 px-3 py-1">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">
                          Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-8">
                    {isCompleted ? (
                      <TrophyOutlined className="text-5xl text-yellow-400" />
                    ) : (
                      <div className="relative">
                        <ThunderboltOutlined className="text-5xl text-white group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 blur-xl bg-white opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {topic.description}
                  </p>

                  {/* Action Button */}
                  <Button
                    disabled={isCompleted}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTopicClick(topic.id);
                    }}
                    className={`w-full font-bold text-base tracking-wide h-12 transform transition-all ${
                      isCompleted
                        ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
                        : "bg-white text-black border-0 hover:bg-gray-200 hover:scale-105"
                    }`}
                    style={{ borderRadius: 0 }}
                    icon={isCompleted ? <LockOutlined /> : <ThunderboltOutlined />}
                  >
                    {isCompleted ? "COMPLETED" : "START QUIZ"}
                  </Button>

                  {/* Hover effect line */}
                  {!isCompleted && (
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-4xl font-black text-white mb-2">
                {topics.length}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Total Topics
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">
                {userCompletedTopics.length}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Completed
              </div>
            </div>
            <div>
              <div className="text-4xl font-black text-white mb-2">
                {topics.length - userCompletedTopics.length}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Remaining
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;