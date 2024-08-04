import React from 'react'
import './Home.scss'
import Layout from './../../components/Layout';
import ListStory from '../ListStory/ListStory';
import HeaderFile from '../../components/HeaderFile';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Home() {
    const { nenToi } = useSelector(state => state.TienIchReducer);
    console.log(nenToi)
    return (
        <div className={nenToi ? "darktheme" : null}>

            <HeaderFile></HeaderFile>
            <div className="main">
                <div className="container">

                    <Outlet></Outlet>

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
