import { useState } from 'react';
import './styles.css';

export default function App() {
  const [result, setResult] = useState('');

  function handleReset() {
    setResult('');
  }

  return (
    <div className='app'>
      <Header />

      <div className='grid'>
        {result ? (
          <BMIInformation result={+result} onReset={handleReset} />
        ) : (
          <AddForm onSetResult={setResult} />
        )}
      </div>
    </div>
  );
}

function Header() {
  return <h1 className='app-name'> BMI Calculator </h1>;
}

function AddForm({ onSetResult }) {
  const [height, setHeight] = useState(153);
  const [weight, setWeight] = useState(55);

  function handleCalculateBMI(e) {
    e.preventDefault();

    const bmiCalc = (weight / Math.pow(height / 100, 2)).toFixed(1);
    onSetResult(bmiCalc);
  }

  function handleSetWeight(action) {
    setWeight((weight) => (action === 1 ? weight + 1 : weight - 1));
  }

  function handleSetHeight(action) {
    setHeight((height) => (action === 1 ? height + 1 : height - 1));
  }

  return (
    <form className='form' onSubmit={handleCalculateBMI}>
      <div className='form__wrapper'>
        <Input onSetValue={handleSetWeight}>
          <p className='title'> Weight (kg) </p>
          <h3 className='output'> {weight} </h3>
        </Input>

        <Input onSetValue={handleSetHeight}>
          <p className='title'> Height (cm) </p>
          <h3 className='output'> {height} </h3>
        </Input>
      </div>

      <Button>Calculat MBI</Button>
    </form>
  );
}

function Input({ children, onSetValue }) {
  return (
    <div className='input'>
      {children}

      <div className='actions'>
        <button type='button' onClick={() => onSetValue(-1)}>
          -
        </button>
        <button type='button' onClick={() => onSetValue(+1)}>
          +
        </button>
      </div>
    </div>
  );
}

function BMIInformation({ result, onReset }) {
  return (
    <div className='info'>
      <h3 className='status'>
        {result < 18.5 && 'Underweight'}
        {result >= 18.5 && result <= 24.9 && 'Normal'}
        {result >= 25 && 'Overweight'}
      </h3>
      <h1 className='amount'> {result ? result : '🧮'} </h1>
      <div>
        <p> Normal BMI range : </p>
        <p> 18.5 - 22 kg/m2 </p>
      </div>

      <Button onReset={onReset}> GOT IT !</Button>
    </div>
  );
}

function Button({ children, onReset }) {
  return (
    <button className='btn' onClick={onReset}>
      {children}
    </button>
  );
}
