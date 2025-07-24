import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ActionModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isNormal?: boolean;
}

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  animation: "fadeInBackdrop 0.25s cubic-bezier(0.4,0,0.2,1)",
};

const modalBoxStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: 32,
  minWidth: 340,
  boxShadow: "0 4px 24px rgba(80, 63, 205, 0.15)",
  textAlign: "center",
  animation: "scaleInModal 0.25s cubic-bezier(0.4,0,0.2,1)",
};

const iconStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  margin: "0 auto 16px auto",
  display: "block",
};

const ActionModal: React.FC<ActionModalProps> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isNormal,
}) => {
  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleInModal {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={modalBackdropStyle}>
        <div style={modalBoxStyle}>
          <svg style={iconStyle} viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="#FFF3CD"
              stroke="#FFB300"
              strokeWidth="2"
            />
            <path
              d="M24 14v12"
              stroke="#FFB300"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="24" cy="33" r="2" fill="#FFB300" />
          </svg>
          <h2
            style={{ marginBottom: 12 }}
            className="text-xl font-semibold uppercase"
          >
            {title}
          </h2>
          <p style={{ marginBottom: 24 }}>{description}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button
              onClick={onCancel}
              style={{
                padding: "8px 20px",
                borderRadius: 4,
                border: "1px solid #ccc",
                background: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: "8px 20px",
                borderRadius: 4,
                border: "none",
                background: "#e53935",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface ActionModalContextType {
  show: (
    options: Omit<ActionModalProps, "open" | "onCancel" | "onConfirm"> & {
      onConfirm?: () => void;
      onCancel?: () => void;
    }
  ) => void;
  hide: () => void;
}

const ActionModalContext = createContext<ActionModalContextType | undefined>(
  undefined
);

export const ActionModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalProps, setModalProps] = useState<
    | null
    | (ActionModalProps & { onConfirm?: () => void; onCancel?: () => void })
  >(null);

  const show = (
    options: Omit<ActionModalProps, "open" | "onCancel" | "onConfirm"> & {
      onConfirm?: () => void;
      onCancel?: () => void;
    }
  ) => {
    setModalProps({
      ...options,
      open: true,
      onConfirm: () => {
        options.onConfirm?.();
        setModalProps(null);
      },
      onCancel: () => {
        options.onCancel?.();
        setModalProps(null);
      },
    });
  };

  const hide = () => setModalProps(null);

  return (
    <ActionModalContext.Provider value={{ show, hide }}>
      {children}
      <ActionModal
        {...(modalProps || {
          open: false,
          onConfirm: () => {},
          onCancel: () => {},
        })}
      />
    </ActionModalContext.Provider>
  );
};

export const useActionModal = () => {
  const context = useContext(ActionModalContext);
  if (!context)
    throw new Error(
      "useActionModal must be used within an ActionModalProvider"
    );
  return context;
};

export default ActionModal;
