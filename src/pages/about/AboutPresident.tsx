const AboutPresident = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-4 flex flex-col justify-center">
          <img
            src="/president.jpg"
            alt="Dr. Rashmi Shahu"
            className="img-fluid rounded-circle shadow-lg"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
          <h5 className="mt-3  fw-normal">Dr. Rashmi Shahu</h5>
          <p className="fw-bold">President</p>
        </div>

        <div className="col-md-8">
          <h2 className="mb-4 text-primary">About the President</h2>
          <p>
            Dr. Rashmi Shahu is currently the Director of Admissions at
            Ramdeobaba University, Nagpur. With over 27 years of teaching
            experience, she is a distinguished academician and a double
            doctorate holder — with a PhD in Industrial Engineering from NITIE,
            Mumbai (now IIM Mumbai) and another PhD in Management from RTM
            Nagpur University.
          </p>
          <p>
            Her academic qualifications include M.Tech (Production), MBA (HRM),
            B.E. (Industrial Engineering), and B.A. (Psychology), all from RTM
            Nagpur University. She has published more than 75 research papers in
            reputed national and international journals and has presented her
            work at global conferences in countries like Dubai, Austria, Japan,
            Indonesia, Ireland, Netherlands, France, and India.
          </p>
          <p>
            Dr. Shahu has 3 granted patents to her name. Her notable book
            publication is
            <em> “Emotional Intelligence, Job Satisfaction and Performance”</em>
            , published by Lambert Academic Publishing (ISBN:
            978-3-8484-3920-1), available on Amazon.
          </p>
          <p>
            She was awarded the{" "}
            <strong>Dr. Sarvapalli Radhakrishnan Gold Medal Award</strong> for
            outstanding research work in 2013 by the Government of India, and
            the{" "}
            <strong>Outstanding Young Women Researcher Gold Medal Award</strong>{" "}
            at IIM Ahmedabad by AIMS International, Texas, U.S.A., in 2011. She
            also received the <strong>Nation Builder Award</strong> in 2015 from
            the Rotary Club of Nagpur and an appreciation from the RTMNU Career
            Counselling Cell for her contributions to education.
          </p>
          <p>
            Her areas of expertise include{" "}
            <strong>Human Factor Engineering</strong>,{" "}
            <strong>Industrial Psychology</strong>, and{" "}
            <strong>Organizational Behaviour</strong>.
          </p>
        </div>
      </div>

      <hr className="my-5" />

      <div>
        <h3 className="text-primary mb-4">My Rotary Journey</h3>
        <p>
          {/* Replace the below content with actual Rotary points dynamically or hardcoded */}
          <ul className="list-unstyled">
            <li>• Actively involved with Rotary Club Nagpur since 2014</li>
            <li>
              • Contributed to Kidathon, Nirmalya Collection, Medical camps,
              blood donations or Udan
            </li>
            <li>• Led various educational and community service projects</li>
            <li>• Recognized for outstanding leadership and impact</li>
            {/* Add more points as needed */}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default AboutPresident;
