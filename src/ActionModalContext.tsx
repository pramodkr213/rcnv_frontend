import React, { createContext, useContext, useState } from "react";

interface ActionModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isNormal?: boolean;
}

interface ActionModalContextType {
  showModal: (props: ActionModalProps) => void;
  closeModal: () => void;
}

const ActionModalContext = createContext<ActionModalContextType | undefined>(
  undefined
);

export const useActionModal = () => {
  const context = useContext(ActionModalContext);
  if (!context) {
    throw new Error("useActionModal must be used within ActionModalProvider");
  }
  return context;
};

export const ActionModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalProps, setModalProps] = useState<ActionModalProps | null>(null);

  const showModal = (props: ActionModalProps) => {
    setModalProps(props);
  };

  const closeModal = () => {
    setModalProps(null);
  };

  return (
    <ActionModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalProps && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded shadow-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold mb-2">{modalProps.title}</h2>
            <p className="text-gray-700 mb-4">{modalProps.message}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 cursor-pointer rounded bg-gray-300 text-black"
                onClick={closeModal}
              >
                {modalProps.cancelText || "Cancel"}
              </button>
              <button
                className={`px-4 py-2 cursor-pointer rounded ${
                  modalProps.isNormal ? "bg-blue-600" : "bg-red-600"
                } text-white`}
                onClick={() => {
                  modalProps.onConfirm();
                  closeModal();
                }}
              >
                {modalProps.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ActionModalContext.Provider>
  );
};
