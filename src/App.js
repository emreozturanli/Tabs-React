import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project';
function App() {

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUrl = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data)
            setJobs(data)
            setJob(data[0])
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUrl()
    }, [])

    if (isLoading) {
        return (
          <section>
            <h1>Loading...</h1>
          </section>
        )
      }

    return (
        <section>
            <h1>Experience</h1>
            <main>
                <aside>
                    {
                        jobs.map((job, index) => {
                            return (
                                <button
                                    key={job.id}
                                    onClick={() => {setJob(job); setSelectedIndex(index)}}
                                    className={(index === selectedIndex) && 'line-effect'}
                                >
                                    {job.company}
                                </button>
                            )
                        })
                    }
                </aside>
                <article>
                    <h2>{job.title}</h2>
                    <h3>{job.company}</h3>
                    <p className='history'> {job.dates}</p>
                    <div className='duties' >
                        {
                            job.duties.map((duty) => {
                                return (
                                    <div className='duty'>
                                        <div> 
                                            <FaAngleDoubleRight className="icon" />
                                        </div>
                                        <p>{duty}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </article>
            </main>
            <footer>
                <button className='info'>MORE INFO</button>
            </footer>
        </section>
    )
}

export default App