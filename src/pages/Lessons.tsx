import { Link } from "react-router-dom";

const lessons = [
  {
    id: "1",
    title: "Introduction to Modern Farming",
    description: "Learn the basics of modern farming techniques",
    video_id: "dQw4w9WgXcQ",
    category: "Farming",
  },
  {
    id: "2",
    title: "Sustainable Agriculture",
    description: "Sustainable and cost-effective solutions",
    video_id: "tVj0ZTS4WF4",
    category: "Farming",
  },
];

const Lessons = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learning Modules</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive courses on modern farming techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                Thumbnail
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold">{lesson.title}</h2>
                <p className="text-muted-foreground">{lesson.description}</p>
                <p className="text-sm mt-2">{lesson.category}</p>
                <Link to={`/lesson/${lesson.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Start Learning</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
