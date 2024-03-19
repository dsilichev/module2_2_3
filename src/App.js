import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
  const NUMS = [...Array(10).keys()].map((i) => i.toString());
  const OPS = ['C', '+', '-', '='];

  let [isFirstOperandActive, setIsFirstActive] = useState(true);
  let [isResult, setIsResult] = useState(false);

  let [operand1, setOperand1] = useState('');
  let [operand2, setOperand2] = useState('');
  let [operator, setOperator] = useState('');

  const enterNumber = (e) => {
    if (isResult) {
      setOperand1('');
    }
    if (isFirstOperandActive) {
      setOperand1((operand1) => operand1 + e.target.innerText);
    } else if (!isFirstOperandActive) {
      setOperand2((operand2) => operand2 + e.target.innerText);
    }
    setIsResult(false);
  };

  const clearField = () => {
    setOperand1('');
    setOperand2('');
    setOperator('');
  };

  const calc = (operator) => {
    if (operator === '+') {
      setOperand1(Number(operand1) + Number(operand2));
      setOperand2('');
      setOperator('');
    } else if (operator === '-') {
      setOperand1(Number(operand1) - Number(operand2));
      setOperand2('');
      setOperator('');
    }
  };

  const enterOperator = (e) => {
    if (e.target.innerText === 'C') {
      clearField();
      setIsFirstActive(true);
    } else if (e.target.innerText === '=') {
      setIsResult(true);
      calc(operator);
      setIsFirstActive(true);
    } else if (e.target.innerText === '+' || e.target.innerText === '-') {
      setIsResult(false);

      if (operand1 && operand2) {
        calc(operator);
        setOperator(e.target.innerText);
      } else {
        setIsFirstActive((isFirstOperandActive) => !isFirstOperandActive);
        setOperator(e.target.innerText);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Калькулятор</h1>
      {isResult ? (
        <div
          className={
            styles['calculator-content'] + ' ' + styles['calculator-content-result']
          }
        >
          {operand1 + operator + operand2}
        </div>
      ) : (
        <div className={styles['calculator-content']}>
          {operand1 + operator + operand2}
        </div>
      )}

      <div className={styles['keys-container']}>
        <ul className={styles['number-keys-list']}>
          {NUMS.reverse().map((key) => (
            <li key={key} className={styles['number-key-item'] + ' ' + styles.done}>
              <button className={styles['keys-item-button']} onClick={enterNumber}>
                {key}
              </button>
            </li>
          ))}
        </ul>
        <ul className={styles['number-keys-list']}>
          {OPS.map((op) => (
            <li key={op} className={styles['number-key-item'] + ' ' + styles.done}>
              <button className={styles['keys-item-button']} onClick={enterOperator}>
                {op}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
