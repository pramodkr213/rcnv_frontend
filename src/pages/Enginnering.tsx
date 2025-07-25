import React from 'react';

const Engineering = () => {
  return (
    <div className="bg-gray-50 text-gray-800 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">RCNV Careers</h1>
        <h2 className="text-2xl font-semibold mb-6">Undergraduate (UG)</h2>

        {/* Section: What is Business Management */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">What is Business Management?</h3>
          <p className="mb-4">
            Business Management is a dynamic field of study that prepares students to take on leadership roles in the corporate world. It involves understanding, analyzing, and applying strategies to manage people, processes, and resources effectively within an organization.
          </p>
          <p className="mb-2">Specialized skills include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Finance:</strong> Financial planning, investment strategies, risk management.</li>
            <li><strong>Human Resources (HR):</strong> Recruitment, training, performance, organizational behavior.</li>
            <li><strong>Marketing:</strong> Consumer behavior, branding, market research.</li>
            <li><strong>Operations & Systems:</strong> Logistics, supply chain, business process optimization.</li>
          </ul>
        </section>

        {/* Section: Why pursue */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Why Should You Pursue a Management Course?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Hands-on Learning:</strong> Case studies, industry projects, internships.</li>
            <li><strong>Diverse Career Opportunities:</strong> Finance, consulting, entrepreneurship, etc.</li>
            <li><strong>Leadership Skills:</strong> Problem-solving, communication, decision-making.</li>
            <li><strong>Entrepreneurial Insight:</strong> Business planning, strategy, innovation.</li>
          </ul>
        </section>

        {/* Section: Who Can Study */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Who Can Study Business Management?</h3>
          <p className="mb-2">
            Students from Arts, Commerce, or Humanities can apply after Class XII. Some institutes may require Mathematics for analytical programs.
          </p>
        </section>

        {/* Section: UG Courses */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Undergraduate Management Courses in India</h3>

          <h4 className="text-lg font-semibold mt-4 mb-1">1. Integrated Program in Management (IPM)</h4>
          <ul className="list-disc list-inside mb-2 space-y-1">
            <li>IIM Indore</li>
            <li>IIM Rohtak</li>
            <li>IIM Ranchi</li>
            <li>IIM Jammu</li>
            <li>IIM Bodh Gaya</li>
            <li>IIM Shillong</li>
            <li>IIM Amritsar</li>
          </ul>
          <p><strong>Structure:</strong> 3+2 years (Undergrad + Postgrad)</p>
          <p className="mt-2"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Early entry into IIMs</li>
            <li>Corporate and social internships</li>
            <li>PGP/MBA degree with strong foundation</li>
          </ul>

          <h4 className="text-lg font-semibold mt-6 mb-1">2. Bachelor of Business Administration (BBA) / Bachelor of Management Studies (BMS)</h4>
          <p className="mb-2">Three-year undergraduate courses covering core business skills.</p>
          <p><strong>Top Colleges:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Shaheed Sukhdev College (DU)</li>
            <li>NMIMS</li>
            <li>Christ University</li>
            <li>SCMS</li>
            <li>IIM Ranchi, Jammu, Bodh Gaya, Kozhikode</li>
            <li>St. Xavier’s Mumbai</li>
          </ul>
        </section>

        {/* Section: Table */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">New Integrated & Non Integrated UG Programs at Top B-Schools</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border border-gray-300">Institution</th>
                  <th className="p-2 border border-gray-300">Program</th>
                  <th className="p-2 border border-gray-300">Duration</th>
                  <th className="p-2 border border-gray-300">Degrees</th>
                  <th className="p-2 border border-gray-300">Eligibility</th>
                  <th className="p-2 border border-gray-300">Admission</th>
                  <th className="p-2 border border-gray-300">Highlights</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">IIM Amritsar</td>
                  <td className="p-2 border">IPM</td>
                  <td className="p-2 border">5 Years</td>
                  <td className="p-2 border">B.Sc. (QFE) + MBA</td>
                  <td className="p-2 border">12th with Maths, 60%, under 20</td>
                  <td className="p-2 border">IPMAT + PI</td>
                  <td className="p-2 border">BFSI & Fintech focus, Exit after 3 yrs</td>
                </tr>
                <tr>
                  <td className="p-2 border">IIM Shillong</td>
                  <td className="p-2 border">IPM</td>
                  <td className="p-2 border">5 Years</td>
                  <td className="p-2 border">BBA + MBA</td>
                  <td className="p-2 border">10th & 12th with 60%, Maths in 11-12</td>
                  <td className="p-2 border">IPMAT + PI</td>
                  <td className="p-2 border">Global Perspective, ₹3.05L/year</td>
                </tr>
                <tr>
                  <td className="p-2 border">IIM Kozhikode</td>
                  <td className="p-2 border">BMS</td>
                  <td className="p-2 border">4 Years</td>
                  <td className="p-2 border">BMS (Majors/Minors)</td>
                  <td className="p-2 border">12th or Diploma</td>
                  <td className="p-2 border">BMS-AT</td>
                  <td className="p-2 border">AI/ML, ₹7L/year</td>
                </tr>
                <tr>
                  <td className="p-2 border">IIM Bangalore</td>
                  <td className="p-2 border">BBA-DBE</td>
                  <td className="p-2 border">3 Years</td>
                  <td className="p-2 border">BBA</td>
                  <td className="p-2 border">12th with Maths</td>
                  <td className="p-2 border">DBE-AT + PI</td>
                  <td className="p-2 border">AI, Startup Projects, ₹9L/year</td>
                </tr>
                <tr>
                  <td className="p-2 border">IIM Sirmaur</td>
                  <td className="p-2 border">BMS</td>
                  <td className="p-2 border">4 Years</td>
                  <td className="p-2 border">BMS</td>
                  <td className="p-2 border">IPMAT + WAT + PI</td>
                  <td className="p-2 border">MBA CGPA ≥ 8.0</td>
                  <td className="p-2 border">Internships, NEP Compliant</td>
                </tr>
                <tr>
                  <td className="p-2 border">NMIMS</td>
                  <td className="p-2 border">IPM</td>
                  <td className="p-2 border">5 Years</td>
                  <td className="p-2 border">BBA + MBA</td>
                  <td className="p-2 border">12th with 50%, Maths/Stats</td>
                  <td className="p-2 border">NPAT + PI</td>
                  <td className="p-2 border">Bloomberg Lab, Digital</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Conclusion */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Conclusion</h3>
          <p>
            Business Management is a versatile and rewarding field. Whether you pursue an IPM or a BBA/BMS, each offers academic depth and practical exposure. If you are passionate about leadership, strategy, innovation, and managing people, business management could be your ideal start.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Engineering;