import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  member: any;
  isOpen: boolean;
  onClose: () => void;
}

const MemberProfile: React.FC<Props> = ({ member, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-4">
              {member.imgurl && (
                <img
                  src={member.imgurl}
                  alt={member.name}
                  className="mx-auto w-32 h-32 rounded-full object-cover mb-2"
                />
              )}
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-sm text-gray-600">{member.classification}</p>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Mobile:</strong> {member.mobile}</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>DOB:</strong> {member.memberdob}</p>
              <p><strong>Spouse:</strong> {member.spousename}</p>
              <p><strong>Spouse DOB:</strong> {member.spousedob}</p>
              <p><strong>Anniversary:</strong> {member.memberaniversary}</p>
              {member.description && (
                <p><strong>Description:</strong> {member.description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemberProfile;
