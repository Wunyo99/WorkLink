import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-150 bg-black/30 backdrop-blur-sm flex justify-center items-start overflow-y-auto py-10"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-200 p-5 rounded-lg w-[95%] md:w-150 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;