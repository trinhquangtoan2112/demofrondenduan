import React from 'react'
import './Home.scss'
import Layout from './../../components/Layout';
import ListStory from '../ListStory/ListStory';
import HeaderFile from '../../components/HeaderFile';
export default function Home() {
    return (
        <>
            <HeaderFile></HeaderFile>
            <Layout>
                <div className="main-content">
                    <ListStory />
                </div>
            </Layout>


        </>
    )
}
