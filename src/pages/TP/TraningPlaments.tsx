import { FC, useState } from "react";

const TrainingPlacement: FC = () => {
  const [searchText, setSearchText] = useState("");

  // Highlights every occurrence of searchText in a given string
  const highlightText = (text: string) => {
    if (!searchText) return text;
    const regex = new RegExp(`(${searchText})`, "gi");
    // wrap in a <span> so the browser default mark style is bypassed
    return text.replace(
      regex,
      `<span class="bg-yellow-300 text-orange-900 font-semibold">$1</span>`
    );
  };

  // Data arrays
  const interviewItemsLeft = [
    "Types of Interview",
    "Attire",
    "Postures",
    "Commonly Asked Interview Questions",
    "Basic tips for Power Point Presentation",
  ];
  const interviewItemsRight = [
    "Orientation",
    "Etiquettes",
    "Interviewer looks for during job interview",
    "Technical Interview",
  ];

  const resumeItemsLeft = [
    "Introduction",
    "Formatting Your Resume",
    "Emailing a Resume",
    "Cover Letter Writing",
  ];
  const resumeItemsRight = [
    "Basics Of Resume Writing",
    "Highlighting Your Resume",
    "Resume Writing for Freshers",
    "Resume Mistakes to Avoid",
  ];

  const gdItemsLeft = [
    "Are Reservation In Jobs Justified?",
    "Are the huge expenses on election campaigns justified?",
    "Banning Beef-Is it Justified?",
    "Cutting money supply to terror groups will end terrorism!",
    "Dead Yesterday, Unborn Tomorrow",
    "Privatization will lead to less corruption",
    "Food security bill - an attempt to make dependents further dependent",
    "Girls should get married first, and then focus on their career",
    "Humans are aliens",
    "I am the best- Organic foods",
    "Inclusive development or forces - What's a better solution to Naxalism?",
    "Is Science a curse or a boon?",
    "Juvenile Justice Amendment Bill- Pros and Cons",
    "Namo Government: Smiles And Frowns",
  ];
  const gdItemsRight = [
    "Net Neutrality – Advantages and Disadvantages",
    "Opening up the agriculture sector for MNCs - Advantages and Disadvantages",
    "Seniority, Not Merit, Must Be The Criterion For Promotions",
    "Should Capital punishment be abolished?",
    "Should Geeta be adopted as national book of India?",
    "Should Porn Websites be Banned in India?",
    "Should Sunny Leone be deported from India?",
    "Should we allow incurably diseased persons to live or not?",
    "Should You Invest In Gold monetization scheme?",
    "What form of Democracy is better parliamentary or presidential?",
    "What’s better – Regular College or correspondence courses?",
    "Arranged marriage is better than love marriage",
    "Whatsapp is killing minds!",
    "Do we really need Smart Cities?",
  ];
  const mockGDItemsLeft = [
    "China Bullies India",
    "Cricket Has Spoiled Other Streams of Indian Sports",
    "If you are not part of the solution then you are the problem",
    "Should we change the present system of education in our country?",
    "Peer pressure can make or mar your future",
    "Celebrity Brand Endorsement: Effective Advertising?",
    "Social networking sites are waste of time for career oriented youth",
    "We Will Never be Corruption Free Society",
    "Are women better managers than men?",
    "Ban 500, 1000 notes :: Corruption Uprooted or just changing clothes!",
    "Should Hindi be the official language of India?",
    "Will Reliance Jio be a sustainable business model in a country like India?",
    "Are digital payments secure enough for the Indian economy to go cashless?",
    "Beauty or Brain – who can rule the world?",
    "Should Smoking be Banned Completely?",
    "Hard work or Smart work - Which is important?",
  ];
  const mockGDItemRight = [
    "Bullet train or Better trains - What does India need?",
    "Is the youth of India confident or confused?",
    "Bureaucracy or Democracy - Which is better ?",
    "Is GST really a One nation, One tax system?",
    "A mandatory year long rural posting for doctors",
    "Is Social Media Actually Connecting People?",
    "E-Commerce – Sustainable business model ?",
    "Aadhar - Mobile linking – Good or Bad ?",
    "China is a threat to Indian IT industry.",
    "Flexible or fixed – What’s your preferred timing at work?",
    "Increasing no. of Engineering Colleges is a boon to the society.",
    "Multinational Companies: Are they devils in disguise?",
    "NGOs - Do they serve people's interests or are they pressure groups?",
    "One Billion and just One Gold Medal",
    "Should triple talaq be abolished from India?",
    "Why can’t we be world’s players in industry as we are in software?",
    "Aadhar project and right to privacy",
    "Mars mission for India justified?",
    "There can never be cashless society ?",
  ];

  // Helper: should show a card if the heading or any item matches the search
  const shouldShowSection = (heading: string, items: string[]) =>
    heading.toLowerCase().includes(searchText.toLowerCase()) ||
    items.some((item) => item.toLowerCase().includes(searchText.toLowerCase()));

  // Decide visibility of each section
  const showInterview = shouldShowSection("Interview Preparation", [
    ...interviewItemsLeft,
    ...interviewItemsRight,
  ]);
  const showResume = shouldShowSection("Resume Preparation", [
    ...resumeItemsLeft,
    ...resumeItemsRight,
  ]);
  const showGD = shouldShowSection("Group Discussion", [
    ...gdItemsLeft,
    ...gdItemsRight,
  ]);
  const showMockGD = shouldShowSection("Mock Group Discussion Topics", [
    ...mockGDItemsLeft,
    ...mockGDItemRight,
  ]);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-gradient-to-r rounded-lg">
      {/* Search Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Enter Keyword"
          className="border px-4 py-2 rounded-md shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Interview Section */}
      {showInterview && (
        <div>
          <h2
            className="text-xl font-bold bg-blue-100 p-2 text-blue-800 mb-4 pb-2"
            dangerouslySetInnerHTML={{
              __html: highlightText("Interview Preparation"),
            }}
          ></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ul className="list-disc pl-6 space-y-2">
              {interviewItemsLeft.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
            <ul className="list-disc pl-6 space-y-2">
              {interviewItemsRight.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Resume Section */}
      {showResume && (
        <div>
          <h2
            className="text-xl font-bold bg-blue-100 p-2 text-blue-800 mb-4 pb-2"
            dangerouslySetInnerHTML={{
              __html: highlightText("Resume Preparation"),
            }}
          ></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ul className="list-disc pl-6 space-y-2">
              {resumeItemsLeft.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
            <ul className="list-disc pl-6 space-y-2">
              {resumeItemsRight.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Group Discussion Section */}
      {showGD && (
        <div>
          <h2
            className="text-xl font-bold bg-blue-100 p-2 text-blue-800 mb-4 pb-2"
            dangerouslySetInnerHTML={{
              __html: highlightText("Group Discussion"),
            }}
          ></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ul className="list-disc pl-6 space-y-2">
              {gdItemsLeft.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
            <ul className="list-disc pl-6 space-y-2">
              {gdItemsRight.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mock GD Section */}
      {showMockGD && (
        <div>
          <h2
            className="text-xl font-bold bg-blue-100 p-2 text-blue-800 mb-4 pb-2"
            dangerouslySetInnerHTML={{
              __html: highlightText("Mock Group Discussion Topics"),
            }}
          ></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ul className="list-disc pl-6 space-y-2">
              {mockGDItemsLeft.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
            <ul className="list-disc pl-6 space-y-2">
              {mockGDItemRight.map((item) => (
                <li
                  key={item}
                  dangerouslySetInnerHTML={{ __html: highlightText(item) }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingPlacement;
