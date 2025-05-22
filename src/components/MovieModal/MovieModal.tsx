import { createPortal } from "react-dom";
import css from './MovieModal.module.css';

interface MovieModalProps {
    onClose: ()=> void;
}

export default function MovieModal({onClose}: MovieModalProps) {
  
const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  
  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body
  );
}


