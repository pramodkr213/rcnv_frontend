import StudentProfileUpdateForm from "../../../components/StudentProfileUpdateForm";

const StudentProfileUpdate = () => {
  return (
    <section>
      <div>
        <h2 className="text-center bg-blue-100 text-gray-800 py-10 text-2xl font-medium">
          Update Your <span className="text-blue-800">Profile</span>
        </h2>
        <StudentProfileUpdateForm />
      </div>
    </section>
  );
};

export default StudentProfileUpdate;
