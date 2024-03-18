import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
  const NUMS = [...Array(10).keys()].map((i) => i.toString());
  const OPS = ['C', '+', '-', '='];

  let [operand1, setOperand1] = useState('');
  let [operand2, setOperand2] = useState('');
  let [operator, setOperator] = useState('');

  const enterNumber = (e) => {
    setOperand1(operand1 => operand1 + e.target.innerText);
    console.log(operand1);
  }

  return (
    <div className={styles.container}>
      <h1>Калькулятор</h1>

      <div className={styles['calculator-content']}>
        {operand1 + operator + operand2}        
      </div>
      <div className={styles['keys-container']}>
        <ul className={styles['number-keys-list']}>
          {NUMS.reverse().map((key) => (
            <li key={key} className={styles['number-key-item'] + ' ' + styles.done}>
              <button className={styles['keys-item-button']} onClick={enterNumber}>{key}</button>
            </li>
          ))}
        </ul>
        <ul className={styles['number-keys-list']}>
          {OPS.map((op) => (
            <li key={op} className={styles['number-key-item'] + ' ' + styles.done}>
              <button className={styles['keys-item-button']}>{op}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
