import '../styles/Home.css';

function Home() {
    return (
    <>
        <h1>
            VisualizeIt
        </h1>

        <div className='content'>
            <div className='algoGrid'>
                <div className='gridCard'>
                    <a href="/sorting">
                        <h1>Sorting</h1>
                    </a>
                </div>
                <div className='gridCard'>
                    <a href="/pathfinding">
                        <h1>Pathfinding</h1>
                    </a>
                </div>

            </div>
        </div>
    </>
    );
}

export default Home;