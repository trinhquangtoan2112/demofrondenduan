import React from 'react'
import './Home.scss'
import Layout from './../../components/Layout';
import ListStory from '../ListStory/ListStory';
import HeaderFile from '../../components/HeaderFile';
import { Outlet } from 'react-router-dom';
export default function Home() {

    return (
        <>

            <HeaderFile></HeaderFile>
            <div className="main">
                <div className="container">

                    <Outlet></Outlet>

                </div>
            </div>

        </>
    )
}
