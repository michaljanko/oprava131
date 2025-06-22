import Head from 'next/head';
import CarculatorWizard from '../components/CarculatorWizard';

export default function Home() {
  const handleComplete = (formData) => {
    console.log('Zadane vstupy:', formData);
  };

  return (
    <>
      <Head>
        <title>Carculator</title>
      </Head>
      <main className="min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-center my-6">Carculator</h1>
        <CarculatorWizard onComplete={handleComplete} />
      </main>
    </>
  );
}