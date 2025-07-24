import React, { useState } from "react";
import type { UserRole } from "../../types/UserRole";
import { useError } from "../../ErrorContext";
import { API_BASE_URL } from "../../api/axios";
import { FcGoogle } from "react-icons/fc";

interface TabInfo {
  role: string;
  registerLink: string;
}

interface Tabs {
  student: TabInfo;
  employer: TabInfo;
}

const tabs: Tabs = {
  student: {
    role: "Candidate",
    registerLink: "#",
  },
  employer: {
    role: "Employer / T&P",
    registerLink: "#",
  },
};

type TabKey = keyof Tabs;

interface LoginTabsProps {
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
}

const LoginTabs: React.FC<LoginTabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<TabKey>("student");
  const { setRole } = props;
  const { setFormErrors } = useError();

  const handleGoogleClick = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  // const {role, registerLink} = tabs[activeTab];

  return (
    <>
      <div className="flex border-b mt-3 border-gray-200 mb-4">
        {(Object.entries(tabs) as [TabKey, TabInfo][]).map(
          ([tabKey, tabInfo]) => (
            <button
              key={tabKey}
              onClick={() => {
                setActiveTab(tabKey);
                const role: string =
                  tabKey === "student" ? "STUDENT" : "EMPLOYER";
                setRole(role as UserRole);
                setFormErrors("login", {});
              }}
              className={`flex-1 py-2 cursor-pointer font-semibold text-sm ${
                activeTab === tabKey
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tabInfo.role}
            </button>
          )
        )}
      </div>

      {activeTab === "student" && (
        <button
          onClick={handleGoogleClick}
          className="w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <FcGoogle size={25} />
          Login with Google
        </button>
      )}

      {activeTab === "student" && (
        <div className="flex items-center my-2 text-gray-400 text-sm">
          <hr className="flex-grow border-t" />
          <span className="px-2">OR</span>
          <hr className="flex-grow border-t" />
        </div>
      )}
    </>
  );
};

export default LoginTabs;
