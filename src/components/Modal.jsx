import { useRef } from "react";

const Modal = () => {
  const dialogRef = useRef();

  function openModal() {
    dialogRef.current.showModal();
  }

  function closeModal() {
    dialogRef.current.close();
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-purple-600 text-white px-5 py-2 rounded"
      >
        Open Modal
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef.current.close();
          }
        }}
        className="rounded-xl p-0 w-100 backdrop:bg-black/50"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">Welcome</h2>

          <p className="mt-3">This modal is controlled using useRef.</p>

          <button
            onClick={closeModal}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
