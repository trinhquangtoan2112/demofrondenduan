import React, { useState } from 'react'
import Section, { SectionBody, SectionHeading } from './../../components/Section';
import Story from '../Account/Story';
function AllStory() {
    const [datas, setDatas] = useState([])
    return (
        <>
            <a><span
                className='imgHero'>
            </span></a>

            <div className="main">
                <div className="container">
                    <div className="main-content">
                        <div className='d-flex'>
                            <Section>
                                <SectionHeading>
                                    <h4 className='section-title'>Tất cả</h4>
                                </SectionHeading>
                                <SectionBody>
                                    <div className='list-story'>
                                        {datas.map((data, index) => <Story key={index} data={data} />)}
                                    </div>
                                </SectionBody>
                            </Section>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default AllStory