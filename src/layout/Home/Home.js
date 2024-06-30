import React from 'react'
import './Home.scss'
import Layout from './../../components/Layout';
import ListStory from '../ListStory/ListStory';
export default function Home() {
    return (
        <>
            <Layout>
                <div className="main-content">
                    <ListStory />
                </div>
            </Layout>


        </>
    )
}
