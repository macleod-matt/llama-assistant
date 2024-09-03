import React, { FormEvent } from 'react';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMicrophoneClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Form = ({
  onSubmit,
  onKeyDown,
  value,
  onChange,
  onMicrophoneClick,
}: FormProps) => {
  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.inputContainer}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputWrapper}>
          <input
            autoComplete='off'
            id='inputId'
            value={value}
            onChange={onChange}
          />
          <div className={styles.microphone} onClick={onMicrophoneClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z' />
              <path d='M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5' />
            </svg>
          </div>
        </div>
      </form>
      <p className={styles.info}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur
        accusantium libero dicta quas magnam voluptates soluta maxime corporis!
        Eius, asperiores?
      </p>
    </div>
  );
};

export default Form;
