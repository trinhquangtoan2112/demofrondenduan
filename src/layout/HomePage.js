
import React from 'react'
import ListStory from './ListStory/ListStory'
import Layout from './../components/Layout';
 
export default function HomePage() {
    return (
        <Layout>
            <div className="main-content">
                <ListStory />
            </div>
        </Layout >
    )
}
