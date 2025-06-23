
import { useState } from 'react';
import Step1 from '../components/Step1VehicleType';
import Step2 from '../components/Step2BodyStyle';
import Step3 from '../components/Step3Drive';
import Step4 from '../components/Step4Transmission';
import Step5 from '../components/Step5Drivetrain';
import Step6 from '../components/Step6Budget';
import Step7 from '../components/Step7Equipment';

export default function Home() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <main>
      <h1>Carculator</h1>
      {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onNext={next} onBack={prev} />}
      {step === 3 && <Step3 onNext={next} onBack={prev} />}
      {step === 4 && <Step4 onNext={next} onBack={prev} />}
      {step === 5 && <Step5 onNext={next} onBack={prev} />}
      {step === 6 && <Step6 onNext={next} onBack={prev} />}
      {step === 7 && <Step7 onBack={prev} />}
    </main>
  );
}
