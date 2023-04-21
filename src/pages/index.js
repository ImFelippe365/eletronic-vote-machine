import Tab from '@/components/Tab';
import { api } from '@/services/api';
import { useEffect, useState } from 'react'
import { Users, BarChart2 } from 'react-feather';

export default function Home() {

  const [candidates, setCandidates] = useState([]);
  const [ranking, setRanking] = useState([]);

  const [currentTab, setCurrentTab] = useState(1);

  const getCandidates = async () => {
    const { data } = await api.get('candidates/');

    setCandidates(data)
  }

  const getRanking = async () => {
    const { data } = await api.get('report/');

    setRanking(data)
  }

  const onVoteCandidate = async (candidate) => {
    const response = await api.patch(`candidates/${candidate.id}/`, {
      votes_quantity: candidate.votes_quantity + 1,
    });

    getRanking();
    alert(`Sucesso, você votou em ${candidate.name}!`)
    console.log(response)
  }

  useEffect(() => {
    getCandidates();
    getRanking();
  }, []);

  return (
    <main className='mt-16 m-auto max-w-[30%]'>
      <h1 className='font-bold text-2xl'>Urna eletrônica</h1>
      <p>Vote com sabedoria</p>

      <nav className='flex flex-row items-center gap-8 mt-4'>
        <Tab
          icon={<Users size={20} />}
          title={"Candidatos"}
          onClick={() => setCurrentTab(1)}
          active={currentTab === 1}
        />
        <Tab
          icon={<BarChart2 size={20} />}
          title={"Ranking"}
          onClick={() => setCurrentTab(2)}
          active={currentTab === 2}
        />
      </nav>

      <section className='mt-6'>
        {currentTab === 1 &&
          candidates?.map((candidate) =>
            <div key={candidate.id} className='flex flex-row justify-between items-center py-3'>
              <div>
                <h2 className='font-bold white text-lg'>{candidate.name}</h2>
                <p className='text-gray-400'>Número do partido: {candidate.vote_number}</p>
              </div>

              <button onClick={() => onVoteCandidate(candidate)} className='bg-green-400 text-gray-800 px-6 py-2 rounded'>
                Votar
              </button>
            </div>
          )
        }
        {currentTab === 2 &&
          ranking?.map((candidate, index) =>
            <div key={candidate.id} className='flex flex-row justify-between items-center py-3'>
              <div className='flex items-start gap-2'>
                <span className={`text-lg text-gray-200 ${index < 3 && 'text-yellow-500'}`}>{index + 1}°</span>
                <div>
                  <h2 className='font-bold white text-lg'>{candidate.name}</h2>
                  <p className='text-gray-400'>Número do partido: {candidate.vote_number}</p>
                </div>
              </div>

              <span className='text-green-400 font-bold px-6 py-2 rounded'>
                {candidate.votes_quantity} votos
              </span>
            </div>
          )
        }
      </section>
    </main>
  )
}
