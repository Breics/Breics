import '../../styles/WhyBreics.css';
import icon from '../../image/icon1.png'
import landlord from '../../image/landlordi.jpg'
// import land from '../../image/landlords.png'



const WhyBreics = () => {
    return (
        <>
            <div className='whysection'>
                <div className='whytext'>
                    <div>

                    <h3> Why Should I Use Breics</h3>
                    <p>Breics is designed exclusively for you. <br />
                        Breics is for landlords, property owners and property managers alike, to help eliminate the <br /> stress that comes with managing and overseeing their properties.</p>
                    </div>

                </div>
                <div className="whyimg">
                    <div className='A'>
                        <div className='card'>
                            <img src={icon} alt="" width={40}/>
                            <div >
                                <h4>Assured Tenancy Income</h4>
                                <p>With Breics you never need to bother about tenants failing to <br /> pay their rents or giving excuses for late payments.</p>
                            </div>

                        </div>
                        <div className='card'>
                        <img src={icon} alt="" width={40}/>
                            <div >
                                <h4>Assured Tenancy Income</h4>
                                <p>With Breics you never need to bother about tenants failing to <br /> pay their rents or giving excuses for late payments.</p>
                            </div>

                        </div>
                        <div className='card'>
                        <img src={icon} alt="" width={40}/>
                            <div >
                                <h4>Assured Tenancy Income</h4>
                                <p>With Breics you never need to bother about tenants failing to <br /> pay their rents or giving excuses for late payments.</p>
                            </div>
                            
                        </div>
                        <div className='card'>
                        <img src={icon} alt="" width={40}/>
                            <div >
                                <h4>Assured Tenancy Income</h4>
                                <p>With Breics you never need to bother about tenants failing to <br /> pay their rents or giving excuses for late payments.</p>
                            </div>

                        </div>
                        <button>List your property</button>

                    </div>
                    <div className='B'>
                        <img src={landlord} alt="" />
                        {/* <img src={land} alt=""  className='S' width={200}/> */}
                    </div>

                </div>
            </div>
        </>
    )
}


export default WhyBreics