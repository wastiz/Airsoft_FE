import airsoftTeam from '../../img/airsoft-team.jpg'

function Teams () {
    return (
        <>
        <section className='display-row'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src={airsoftTeam} alt="Team preview" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-white">Team name</h2>
                    <p className='text-white'>Team short description</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary text-white">Read more</button>
                    </div>
                </div>
            </div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl ml-6">
                <figure><img src={airsoftTeam} alt="Team preview" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-white">Team name</h2>
                    <p className='text-white'>Team short description</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary text-white">Read more</button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Teams;